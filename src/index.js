const { ApolloServer } 	= require('@apollo/server');
const { startStandaloneServer } = require("@apollo/server/standalone")
const { schema } 		= require( __dirname + '/schema' )
const { createContext } = require( __dirname + '/services/context' )
const { hash } 			= require( __dirname + '/services/cryptohash' )
const PORT 				= 4000;


const logPass = async () => {
	console.log( await hash( '1111111' )  );
}

//	logPass();

const start = async () => {

	const server = await new ApolloServer({ 
		schema,
		introspection: true,
		playground: true,
	});
	
	const { url } = await startStandaloneServer( server, {
		context: createContext, 
		listen: { port: PORT }
	});	
	
	console.log( `💿 ======================================================================= ☂` );	
	console.log( `🚀 Server ready at: ${url}` );
    console.log( `🚀 Restarted at ${new Date()}` );
    console.log( `⭐️ See sample queries: http://pris.ly/e/js/graphql-auth#using-the-graphql-api` );
    console.log( `\r\n` );

};

start();