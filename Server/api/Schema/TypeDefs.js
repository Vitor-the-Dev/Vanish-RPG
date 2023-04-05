import { gql } from "apollo-server-express";

const typeDefs = gql`

    type AuthPayload {
        user: User
    },
    type User{
        id: ID
        name:String!
        discordtag:String
        email:String
    },

    type nationsstr {
        nations: String
    }

    type Query {
        currentUser: User
        callchangeyear: nationsstr
    },

    type Mutation {
        logout: Boolean
        login(email: String!, password: String!): AuthPayload
        
    },

`;

export default typeDefs;