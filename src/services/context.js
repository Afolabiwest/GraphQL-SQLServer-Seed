const { PrismaClient }  = require('@prisma/client');
const { PubSub }  		= require( 'graphql-subscriptions' );
const prisma 			= new PrismaClient();

//	const prisma = new PrismaClient( { errorFormat: 'pretty', log: ['query', 'info'] } );
//	const prisma = new PrismaClient( { errorFormat: 'pretty', log: [ 'info'] } );
//	const prisma = new PrismaClient( {
//		errorFormat: 'pretty',
//	  	log: [
//	  	  { level: 'warn', emit: 'event' },
//	  	  { level: 'info', emit: 'event' },
//	  	  { level: 'error', emit: 'event' },
//	  	],
//	} );

const pubSub = new PubSub();

async function createContext( req ) {	
	return {
		...req,
		prisma,
		pubSub,
	}
}

module.exports = {
  createContext,
  prisma,
}
