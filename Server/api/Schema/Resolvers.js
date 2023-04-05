
const resolvers = {
    Query: {
        currentUser: (parent, args, context) => context.getUser(),

        callchangeyear: async () => {

            async function changeyear() {
                return await new Promise((resolve, reject) => {
                    try { 
                        console.log("Changing the year....")
                        const spawn = require("child_process").spawn;
                  
                        const process = spawn('python',["Server\\Bot\\changeyear.py",]);
              
            
                        process.stdout.on('data', function(data) {
                            resolve(data.toString());
                        })
                    }
                    catch (err) {
                        reject(err)
                    } 
                }
                )
            }
            const this_year_loganomics = await changeyear()
            return { this_year_loganomics }
        },
        

    },
    Mutation: {
        login: async (parent, { email, password }, context) => {
            const { user } = await context.authenticate('graphql-local', { email, password });
            await context.login(user);
            return { user }
        },
        logout: (parent, args, context) => context.logout(),
    },

};

export { resolvers };