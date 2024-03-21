const {
	intArg,
	nonNull,
	nullable,
	objectType,
	stringArg,
	arg,
	enumType,
	asNexusMethod
} = require('nexus');
const { DateTimeResolver } 		= require( 'graphql-scalars' );
const DateTime 					= asNexusMethod(DateTimeResolver, 'date');


const Sample = objectType( {
	name: "Sample",
	definition( t ){
		t.nonNull.int( 'id' )
		t.nonNull.string( 'name' )
		t.nonNull.string( 'description' )
		t.nullable.string( 'icon' )
		t.nonNull.string( 'is_active')
		t.nonNull.field( 'created_at', { type: 'DateTime' })
		t.nonNull.field( 'updated_at', { type: 'DateTime' })
		
		t.nullable.list.nonNull.field( 'subSample', { 
			type: 'SubSample',
			resolve: ( _parent, __, context) => {
				return context.prisma.SubSample.findMany({
					where: { Sample_id: _parent.id	}
				});
			}
		});
		
		
		
	}
} );

// sample.js
module.exports = Sample;