const {
	intArg,
	nonNull,
	nullable,
	extendType,
	stringArg,
	arg
} = require('nexus');

const SampleQuery = extendType( {
	type: 'Query',
	definition: ( t ) => {
		
		t.nullable.list.nonNull.field( 'allSamples', {
			type: 'Sample',
			args: {
				skip: nullable( intArg() ),
				take: nullable( intArg() ),
			},
			resolve: ( _parent, { skip, take }, context ) => {
				
				const isSkip 	= ( skip === null || skip === '' || typeof skip !== 'number' ) ? false : true;
				const isTake 	= ( take === null || take === '' || typeof take !== 'number' ) ? false : true;
				
				let skipTakeArg = {};
				
				if( isSkip ){
					skipTakeArg[ 'skip' ] = skip;
				}
				
				if( isTake ){
					skipTakeArg[ 'take' ] = take;
				}
				
				return context.prisma.Sample.findMany( {
					...skipTakeArg,
					include: {
						sub_categories: false
					},
					orderBy: [
						{
							created_at: 'desc',
						}
					] 
				} );
				
			},
		})
		
		
	}
} );

// sample.query.js
module.exports = SampleQuery;