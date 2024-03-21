// @ts-ignore
const GraphQLUpload 	= require( './modules/GraphQLUpload' );

const {
	intArg,
	nonNull,
	nullable,
	inputObjectType,
	stringArg,
	arg,
	asNexusMethod
} = require('nexus');

const { DateTimeResolver } 	= require( 'graphql-scalars' );
const DateTime 				= asNexusMethod(DateTimeResolver, 'date');
const Upload 				= GraphQLUpload;




const NewProfessionalDataInput = inputObjectType({
  name: 'NewProfessionalDataInput',
  definition(t) {
    t.nonNull.string( 'firstname' )
    t.string( 'lastname' )
    t.nonNull.string( 'email' )
    t.nullable.string( 'phone' )
    t.nonNull.string( 'password' )
    t.nonNull.string( 'role_id' )
    t.nonNull.string( 'permission' )
    t.nonNull.string( 'is_active' )
    t.nullable.string( 'jwt_token' )
    t.nullable.string( 'apns_token' )
    t.nullable.string( 'fcm_token' )
    
  },
})



const NewBusinessDataInput = inputObjectType({
	name: 'NewBusinessDataInput',
	definition(t) {
		t.nonNull.string( 'name' )
		t.nonNull.string( 'user_id' )
		t.nonNull.boolean( 'is_business_location' )
		t.nonNull.boolean( 'is_client_location' )
		t.nonNull.boolean( 'is_men_service' )
		t.nonNull.boolean( 'is_women_service' )
		t.nonNull.boolean( 'is_children_service' )
		t.nonNull.float( 'general_discount' )
		t.nonNull.string( 'address' )
		t.nonNull.string( 'state' )
		t.nonNull.string( 'city' )
		t.nonNull.string( 'location' )
		t.nonNull.string( 'schedule' )
		t.nonNull.string( 'cover_photo' )
		t.nonNull.string( 'images' )
		t.nonNull.int( 'rating' )		
		t.nonNull.string( 'intro' )
		t.nullable.string( 'x_link' )
		t.nullable.string( 'facebook_link' )
		t.nullable.string( 'instagram_link' )
		t.nonNull.string( 'is_active' )
	},
})

const BusinessUpdateDataInput = inputObjectType({
  name: 'BusinessUpdateDataInput',
  definition(t) {
    t.nonNull.string( 'id' )
    t.nullable.string( 'name' )    
    t.nullable.boolean( 'is_business_location' )
    t.nullable.boolean( 'is_client_location' )
    t.nullable.boolean( 'is_men_service' )
    t.nullable.boolean( 'is_women_service' )
    t.nullable.boolean( 'is_children_service' )
    t.nullable.float( 'general_discount' )
    t.nullable.string( 'address' )
    t.nullable.string( 'state' )
    t.nullable.string( 'city' )
    t.nullable.string( 'location' )
    t.nullable.string( 'schedule' )
    t.nullable.string( 'cover_photo' )
	t.nullable.string( 'images' )
	t.nullable.int( 'rating' )
	t.nullable.string( 'intro' )	
	t.nullable.string( 'x_link' )
	t.nullable.string( 'facebook_link' )
	t.nullable.string( 'instagram_link' )
  },
})

const BusinessReviewUpdateDataInput = inputObjectType({
  name: 'BusinessReviewUpdateDataInput',
  definition(t) {
    t.nonNull.string( 'business_id' )
    t.nonNull.string( 'rating' )
  },
})

const NewServiceDataInput = inputObjectType({
  name: 'NewServiceDataInput',
  definition(t) {
    t.nonNull.int( 'sub_category_id' )
    t.nonNull.int( 'compound_service_id' )   
    t.nonNull.boolean( 'compound_service_id' )   
    t.nonNull.float( 'price' )   
    t.nonNull.string( 'is_active' )   
  },
})

const ServiceUpdateDataInput = inputObjectType({
  name: 'ServiceUpdateDataInput',
  definition(t) {
    t.nonNull.int( 'id' )
    t.nonNull.int( 'sub_category_id' )
    t.nonNull.int( 'compound_service_id' )   
    t.nonNull.boolean( 'compound_service_id' )   
    t.nonNull.float( 'price' )   
    t.nonNull.string( 'is_active' )   
  },
})



const NewFavouriteServiceDataInput = inputObjectType({
  name: 'NewFavouriteServiceDataInput',
  definition( t ) {
    t.string( 'user_id' )
    t.string( 'business_id' )
    t.int( 'service_offering_id' )
    t.int( 'service_id' )
  },
});

const FavouriteServiceUpdateDataInput = inputObjectType({
  name: 'FavouriteServiceUpdateDataInput',
  definition(t) {
    t.string( 'id' )
    t.string( 'user_id' )
    t.string( 'business_id' )
    t.int( 'service_offering_id' )
    t.int( 'service_id' )
  },
});

const NewFavouriteProductDataInput = inputObjectType({
	name: 'NewFavouriteProductDataInput',
	definition(t) {
		t.string( 'user_id' )
		t.string( 'business_id' )
		t.string( 'product_id' )
	},
});

const FavouriteProductUpdateDataInput = inputObjectType({
  name: 'FavouriteProductUpdateDataInput',
  definition(t) {
    t.string( 'id' )
    t.string( 'user_id' )
    t.string( 'business_id' )
    t.int( 'service_offering_id' )
    t.int( 'service_id' )
  },
});




const NewCategoryDataInput = inputObjectType({
	name: 'NewCategoryDataInput',
	definition(t) {
		t.string( 'name' )
		t.string( 'description' )
		t.nullable.string( 'icon' )
	},
});

const CategoryUpdateDataInput = inputObjectType({
	name: 'CategoryUpdateDataInput',
	definition(t) {
		t.int( 'id' )
		t.string( 'name' )
		t.string( 'description' )
		t.nullable.string( 'icon' )
	},
});

const CategoryActiveStatusUpdateDataInput = inputObjectType({
	name: 'CategoryActiveStatusUpdateDataInput',
	definition(t) {
		t.string( 'id' )
	},
});


const ActiveStatusUpdateDataInput = inputObjectType({
	name: 'ActiveStatusUpdateDataInput',
	definition(t) {
		t.string( 'id' )
	},
});


const StatusUpdateDataInput = inputObjectType({
	name: 'StatusUpdateDataInput',
	definition(t) {
		t.string( 'id' )
		t.string( 'status' )
	},
});

const NewAppointmentDataInput = inputObjectType({
	name: 'NewAppointmentDataInput',
	definition(t) {
		t.nonNull.int( 'service_offering_id' )
		t.nonNull.string( 'user_id' )
		t.nonNull.string( 'business_id' )
		t.nonNull.boolean( 'is_business_location' )
		t.nonNull.boolean( 'is_client_location' )
		t.nonNull.string( 'status' )
		t.nonNull.string( 'date' )
		t.nonNull.float( 'price' )
		t.nonNull.string( 'start_time' )
		t.nonNull.string( 'stop_time' )
		t.nonNull.int( 'day' )
		t.nonNull.int( 'week' )
		t.nonNull.int( 'month' )
		t.nonNull.int( 'year' )
	},
});


const AppointmentUpdateDataInput = inputObjectType({
	name: 'AppointmentUpdateDataInput',
	definition(t) {
		t.int( 'id' )
		t.int( 'service_offering_id' )
		t.string( 'user_id' )
		t.string( 'business_id' )
		t.boolean( 'is_business_location' )
		t.boolean( 'is_client_location' )
		t.string( 'status' )
		t.string( 'date' )
		t.string( 'start_time' )
		t.string( 'stop_time' )
	},
});


const AppointmentStatusUpdateDataInput = inputObjectType({
	name: 'AppointmentStatusUpdateDataInput',
	definition(t) {
		t.int( 'id' )
		t.string( 'status' )
		t.string( 'is_active' )
	},
});


const NewPaymentDataInput = inputObjectType({
	name: 'NewPaymentDataInput',
	definition(t) {
		t.int( 'appointment_id' )
		t.string( 'user_id' )
		t.string( 'business_id' )
		t.float( 'amount' )
		t.string( 'mode' )
		t.string( 'description' )
		t.string( 'gateway' )
		t.string( 'status' )
	},
});



const PaymentUpdateDataInput = inputObjectType({
	name: 'PaymentUpdateDataInput',
	definition(t) {
		t.string( 'id' )
		t.int( 'appointment_id' )
		t.string( 'order_id' )
		t.string( 'order_ref' )
		t.string( 'user_id' )
		t.string( 'business_id' )
		t.string( 'amount' )
		t.string( 'mode' )
		t.string( 'description' )
		t.string( 'gateway' )
		t.string( 'status' )
	},
});


const PaymentStatusUpdateDataInput = inputObjectType({
	name: 'PaymentStatusUpdateDataInput',
	definition(t) {
		t.int( 'id' )
		t.string( 'payment_status' )
		t.string( 'is_active' )
	},
});

const ApprovalStatusUpdateDataInput = inputObjectType({
	name: 'ApprovalStatusUpdateDataInput',
	definition(t) {
		t.int( 'id' )
		t.string( 'approval_status' )
	},
});

const ApprovalStatusUpdateDataStringInput = inputObjectType({
	name: 'ApprovalStatusUpdateDataStringInput',
	definition(t) {
		t.string( 'id' )
		t.string( 'approval_status' )
	},
});


// Order
const NewOrderDataInput = inputObjectType({
	name: 'NewOrderDataInput',
	definition(t) {
		t.string( 'ref' )
		t.string( 'user_id' )
		t.string( 'business_id' )
		t.int( 'appointment_id' )
		t.string( 'product_id' )
		t.string( 'amount' )
		t.string( 'tax' )
		t.string( 'total' )
		t.string( 'items_count' )
		t.string( 'delivery_status' )
		t.string( 'payment_status' )
	},
});



const OrderUpdateDataInput = inputObjectType({
	name: 'OrderUpdateDataInput',
	definition(t) {
		t.string( 'id' )
		t.string( 'ref' )
		t.string( 'user_id' )
		t.string( 'business_id' )
		t.string( 'amount' )
		t.string( 'tax' )
		t.string( 'total' )
		t.string( 'items_count' )
		t.string( 'delivery_status' )
		t.string( 'payment_status' )
		t.string( 'is_active' )
	},
});



const OrderPaymentStatusUpdateDataInput = inputObjectType({
	name: 'OrderPaymentStatusUpdateDataInput',
	definition(t) {
		t.int( 'id' )
		t.string( 'payment_status' )
		t.string( 'is_active' )
	},
});

// BookmiSpecial
const NewBookmiSpecialDataInput = inputObjectType({
	name: 'NewBookmiSpecialDataInput',
	definition(t) {
		t.string( 'admin_id' )
		t.string( 'period_type' )
		t.float( 'rate' )
		t.string( 'title' )		
		t.string( 'comment' )		
	},
});



const BookmiSpecialUpdateDataInput = inputObjectType({
	name: 'BookmiSpecialUpdateDataInput',
	definition(t) {
		t.string( 'id' )
		t.string( 'admin_id' )
		t.string( 'period_type' )
		t.float( 'rate' )
		t.string( 'title' )		
		t.string( 'comment' )
	},
});



// BookmiSpecial Subscription
const NewBookmiSpecialSubscriptionDataInput = inputObjectType({
	name: 'NewBookmiSpecialSubscriptionDataInput',
	definition(t) {
		t.string( 'advert_id' )
		t.string( 'user_id' )
		t.string( 'business_id' )
		t.string( 'period_type' )
		t.int( 'period' )
		t.float( 'rate' )
		t.string( 'start_time' )
		t.string( 'stop_time' )
		t.string( 'payment_status' )
		t.string( 'status' )		
	},
});


const BookmiSpecialSubscriptionUpdateDataInput = inputObjectType({
	name: 'BookmiSpecialSubscriptionUpdateDataInput',
	definition( t ) {
		t.string( 'id' )
		t.string( 'advert_id' )
		t.string( 'user_id' )
		t.string( 'business_id' )
		t.string( 'period_type' )
		t.int( 'period' )
		t.float( 'rate' )
		t.string( 'start_time' )
		t.string( 'stop_time' )
		t.string( 'payment_status' )
		t.string( 'status' )
	},
});



// Custom Advert
const NewCustomAdvertDataInput = inputObjectType({
	name: 'NewCustomAdvertDataInput',
	definition(t) {
		t.string( 'admin_id' )
		t.string( 'period_type' )
		t.float( 'rate' )
		t.string( 'title' )
		t.string( 'comment' )
	},
});

const CustomAdvertUpdateDataInput = inputObjectType({
	name: 'CustomAdvertUpdateDataInput',
	definition(t) {
		t.string( 'id' )
		t.string( 'admin_id' )
		t.string( 'period_type' )
		t.float( 'rate' )
		t.string( 'title' )
		t.string( 'comment' )
	},
});


// Custom Advert
const NewCustomAdvertSubscriptionDataInput = inputObjectType({
	name: 'NewCustomAdvertSubscriptionDataInput',
	definition(t) {
		t.string( 'advert_id' )
		t.string( 'user_id' )
		t.string( 'business_id' )
		t.string( 'period_type' )
		t.int( 'period' )
		t.string( 'cover_image' )
		t.string( 'caption_text' )
		t.string( 'cta' )
		t.float( 'rate' )
		t.string( 'start_time' )
		t.string( 'stop_time' )
		
	},
});

const CustomAdvertSubscriptionUpdateDataInput = inputObjectType({
	name: 'CustomAdvertSubscriptionUpdateDataInput',
	definition(t) {
		t.string( 'id' )
		t.string( 'advert_id' )
		t.string( 'user_id' )
		t.string( 'business_id' )
		t.string( 'period_type' )
		t.int( 'period' )
		t.string( 'cover_image' )
		t.string( 'caption_text' )
		t.string( 'cta' )
		t.float( 'rate' )
		t.string( 'start_time' )
		t.string( 'stop_time' )
		
	},
});


// Business Category
const NewBusinessCategoryDataInput = inputObjectType({
	name: 'NewBusinessCategoryDataInput',
	definition(t) {
		t.string( 'business_id' )
		t.string( 'category_id' )
		t.string( 'name' )
		t.string( 'is_active' )
	},
});


const BusinessCategoryUpdateDataInput = inputObjectType({
	name: 'BusinessCategoryUpdateDataInput',
	definition(t) {
		t.string( 'id' )
		t.string( 'business_id' )
		t.string( 'category_id' )
		t.string( 'name' )
		t.string( 'is_active' )
	},
});


// Business Sub Category
const NewBusinessSubCategoryDataInput = inputObjectType({
	name: 'NewBusinessSubCategoryDataInput',
	definition(t) {
		t.string( 'business_id' )
		t.string( 'category_id' )
		t.string( 'name' )
		t.string( 'is_active' )
	},
});


const BusinessSubCategoryUpdateDataInput = inputObjectType({
	name: 'BusinessSubCategoryUpdateDataInput',
	definition(t) {
		t.string( 'id' )
		t.string( 'business_id' )
		t.string( 'category_id' )
		t.string( 'name' )
		t.string( 'is_active' )
	},
});


const NewChatDataInput = inputObjectType({
	name: 'NewChatDataInput',
	definition(t) {
		t.string( 'user_id' )
		t.string( 'contact_id' )
		t.string( 'message' )
		t.string( 'media_type' )
	},
});


const ChatReadStatusUpdateDataInput = inputObjectType({
	name: 'ChatReadStatusUpdateDataInput',
	definition(t) {
		t.string( 'id' )
	},
});




module.exports = {	
	NewProfessionalDataInput,
	NewBusinessDataInput,
	BusinessUpdateDataInput,
	BusinessReviewUpdateDataInput,
	NewServiceDataInput,
	Upload,	
	NewFavouriteServiceDataInput,
	FavouriteServiceUpdateDataInput,
	NewFavouriteProductDataInput,
	FavouriteProductUpdateDataInput,
	NewCategoryDataInput,
	CategoryActiveStatusUpdateDataInput,
	CategoryUpdateDataInput,
	ActiveStatusUpdateDataInput,
	StatusUpdateDataInput,
	NewAppointmentDataInput,
	AppointmentUpdateDataInput,
	AppointmentStatusUpdateDataInput,
	NewPaymentDataInput,
	PaymentUpdateDataInput,
	PaymentStatusUpdateDataInput,
	NewOrderDataInput,
	OrderUpdateDataInput,
	OrderPaymentStatusUpdateDataInput,
	NewBookmiSpecialDataInput,
	BookmiSpecialUpdateDataInput,
	NewBookmiSpecialSubscriptionDataInput,
	BookmiSpecialSubscriptionUpdateDataInput,
	NewCustomAdvertDataInput,
	CustomAdvertUpdateDataInput,
	ApprovalStatusUpdateDataInput,
	ApprovalStatusUpdateDataStringInput,
	NewCustomAdvertSubscriptionDataInput,
	CustomAdvertSubscriptionUpdateDataInput,
	NewBusinessCategoryDataInput,
	BusinessCategoryUpdateDataInput,
	NewBusinessSubCategoryDataInput,
	BusinessSubCategoryUpdateDataInput,	
	ServiceUpdateDataInput,
	NewChatDataInput,
	ChatReadStatusUpdateDataInput
}
