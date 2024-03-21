const {
	intArg,
	nonNull,
	extendType,
	inputObjectType,
	stringArg,
	arg
} = require('nexus');

const SampleMutation = extendType( {
	type: "Mutation", 
	definition: ( t ) => {	
		t.field( 'createSample', { 
			type: 'Sample',					
			args: {
				post_data : nonNull( 
					arg({
						type: 'NewSampleDataInput'
					})
				)			
			},		
			
			resolve: async ( parent, { post_data }, context ) => {
				const { name, description } = post_data;
				const existingRecord 	= await context.prisma.Sample.findMany({
					where: {
						name
					},
				});
				
				if( existingRecord.length > 0 ){
					throw new Error( `Sample: "${name}" already exists!` );
				}
				
				const result 	= await context.prisma.Sample.create({
					data: {
						name, description, is_active: 'ACTIVE'
					},
				})
				return result;				
			}			
			
		});		
	
		t.field( 'updateSample', { 
			type: 'Sample',					
			args: {
				post_data : nonNull( 
					arg({
						type: 'SampleUpdateDataInput'
					})
				)			
			},		
			
			resolve: async ( parent, { post_data }, context ) => {
				const { id, name, description, icon } = post_data;
				const result 	= await context.prisma.Sample.update({
					where: {
						id
					},
					data: {
						name, description, icon
					},
				})
				return result;				
			}			
			
		});		
	
		t.field( 'enableSample', { 
			type: 'Sample',					
			args: {
				id : nonNull( stringArg() )			
			},				
			resolve: async ( parent, { id }, context ) => {
				const result 	= await context.prisma.Sample.create({
					where: {
						id
					},
					data: {
						is_active: 'ACTIVE'
					},
				})
				return result;				
			}			
			
		});		
	
		t.field( 'disableSample', { 
			type: 'Sample',					
			args: {
				id : nonNull( stringArg() )			
			},		
			
			resolve: async ( parent, { id }, context ) => {				
				const result 	= await context.prisma.Sample.create({
					where: {
						id
					},
					data: {
						is_active: 'INACTIVE'
					},
				})
				return result;				
			}			
			
		});		
	
	}
} );

// sample.mutation.js
module.exports = SampleMutation;