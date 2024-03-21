const {
	intArg,
	nonNull,
	objectType,
	unionType,
	stringArg,
	arg,
	enumType,
	asNexusMethod
} = require('nexus');

const { DateTimeResolver } 		= require( 'graphql-scalars' );
const DateTime 					= asNexusMethod(DateTimeResolver, 'date');

const Objects 	= require( './objects' );






const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token')
    t.field('user', { type: 'User' })
  },
});


/////////////////////////
////// ENUM TYPES ///////
/////////////////////////


const SortOrder = enumType({
  name: 'SortOrder',
  members: [ 'asc', 'desc' ],
})



const UploadFile = objectType({
  name: 'UploadFile',
  definition(t) {
    t.string('uri')
    t.string('filename')
  },
})


const TopPerformerType = objectType({
	name: 'TopPerformerType',
	definition(t) {
		t.field( 'business_id', { type : 'ID' } ),
		t.field( 'count', { type : 'Int' } ),
		t.field( 'business', { type : 'Business' } )		
		t.field( 'latest_appointment', { type : 'Appointment' } )		
		t.field( 'latest_time', { type : 'String' } )		
	},
});


const StateType = objectType({
	name: 'StateType',
	definition(t) {
		t.string( 'state' )
	},
});

const CityType = objectType({
	name: 'CityType',
	definition(t) {
		t.string( 'city' )
	},
});

const TestDataType = objectType({
	name: 'TestDataType',
	definition(t) {
		t.string( 'greet' )
		t.string( 'status' )
	},
});


const MediaType = unionType({
	name: 'MediaType',
	description: 'Any container type that can be rendered into the feed',
	definition(t) {
		t.members('Post', 'Image', 'Card')
	},
	resolveType: (item) => item.name,
});

const PaymentUnionType = unionType({
	name: 'PaymentObjectType',
	description: 'Any Payment Object Type',
	definition(t) {
		t.members( 'OrderPayment', 'ShopOrderPayment', 'Payment', 'BookmiSpecialSubscriptionPayment', 'CustomAdvertSubscriptionPayment' )
	},
	resolveType: (item) => item.name,
});

const UserPaymentUnionType = unionType({
	name: 'UserPaymentUnionType',
	description: 'Any Payment Object Type',
	definition(t) {
		t.members( 'OrderPayment', 'ShopOrderPayment', 'Payment' )
	},
	resolveType: (item) => item.name,
});

const UserPaymentObjectType = objectType({
	name: 'UserPaymentObjectType',
	description: 'Any User Payment Object Type',
	definition(t) {
		t.list.nonNull.field( 'shopOrderPayments', { type: 'ShopOrderPayment' } )
		t.list.nonNull.field( 'servicePayments', { type: 'Payment' } )
	},
	
});



module.exports = {	
	
	UploadFile,
	AuthPayload,
	SortOrder,
	DateTime,	
	...Objects,	
	
	TestDataType,
	TopPerformerType,
	StateType,
	CityType,
	PaymentUnionType,
	UserPaymentObjectType,
	UserPaymentObjectType,
	
}
