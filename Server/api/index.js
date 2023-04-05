import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import { v4 as uuid } from 'uuid';
import { ApolloServer } from 'apollo-server-express';
import { GraphQLLocalStrategy, buildContext } from 'graphql-passport';
import 'dotenv/config'

import typeDefs from "./Schema/TypeDefs.js";
import { resolvers } from "./Schema/Resolvers.js";
import { getsalt, auth, hashPassword } from "./sqlauthfunctions.js";


const portno = 3001;
const SESSION_SECRECT = process.env.SESSION_SECRET;
const corsOptions = {
    origin: '*',//('http://localhost:'+ portno),
    credentials: true,
};  


//Uses GraphQLLocalStrategy from https://jkettmann.com/password-based-authentication-with-graphql-and-passport


passport.use(
    new GraphQLLocalStrategy((Email, Password, done) => {
      var encodedpassword = Buffer.from(Password, 'utf-8').toString();
      async function dodone() {
        //First we need to get the salt for the email input to hash the password on the API, if we get no salt, this means we lack a matching user
        const awaitcsalt = async () => {
          const result = await getsalt(Email)
          return result
        };

        const salt = await awaitcsalt();
        if (!salt) done(null, false);


        //we use the hashPassword function from sqlauthfunctions, this will give us a hash on which we will compare with existing hash from which we get the salt from
        const hashedpasswrd = await hashPassword(encodedpassword, salt);

        const asyncsauth = async () => {
          const result = await auth(Email, hashedpasswrd);
          return result
        };

        const matchingUser = await asyncsauth();
        const error = matchingUser ? null : new Error('no matching user');
        done(error, matchingUser);
      }
      dodone();
    }),
);

passport.serializeUser((user, done) => {
    console.log(user.id + " from serializeUser")
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
  //deserialize the user, using the session cookie to compare it with an Id on the db
  async function getidasync() {  
    const Userretorno = await getid(id);
    console.log(Userretorno + " this is a matching user from deserializeUser")
    done(null, Userretorno);
  }
  getidasync()
});


const  app  =  express();
app.use(cors(corsOptions));

app.use(session({
  genid: (req) => uuid(),
  secret: SESSION_SECRECT,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true,
    expires: 3600000
  }
}));


app.use(passport.initialize());
app.use(passport.session());


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => buildContext({ req, res }),
});

await server.start();

server.applyMiddleware({ app, cors: false });


app.listen({port: portno }, ()=>{
    console.log('( ^ ω ^) server is running on http://localhost:' + portno + server.graphqlPath)
});



  


// built with the help of https://jkettmann.com/password-based-authentication-with-graphql-and-passport