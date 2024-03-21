const { permissions } 			= require( __dirname + '/permissions' );
const { applyMiddleware } 		= require( 'graphql-middleware' );

const {
	makeSchema
} = require('nexus');


const Mutations 			= require( __dirname + '/mutations' )
const Query					= require( __dirname + '/query' )
const InputTypes  			= require( __dirname + '/input-types' );
const ObjectTypes 			= require( __dirname + '/object-types' );
const Queries 				= require( __dirname + '/queries' );
const Inputs 				= require( __dirname + '/inputs' );
const Subscriptions 		= require( __dirname + '/subscriptions' );

const schemaWithoutPermissions = makeSchema({
	types: [
		Mutations,		
		Query,		
		InputTypes,
		ObjectTypes,
		Queries,
		Inputs,
		Subscriptions
	],
	outputs: {
		schema: __dirname + '/../schema.graphql',
		typegen: __dirname + '/generated/nexus.ts',
	},
	contextType: {
		module: require.resolve( __dirname + '/services/context' ),
		export: 'Context',
	},
	sourceTypes: {
		modules: [
			{
				module: '@prisma/client',
				alias: 'prisma',
			},
		],
	},
})

const schema = applyMiddleware( schemaWithoutPermissions, permissions );

module.exports = {
  schema: schema,
}
