const {	inputObjectType } = require('nexus');

const NewUserDataInput = inputObjectType({
  name: 'NewUserDataInput',
  definition(t) {
    t.nonNull.string( 'firstname' )
    t.string( 'lastname' )
    t.nonNull.string( 'email' )
    t.nullable.string( 'phone' )
    t.nonNull.string( 'password' )
    t.nullable.string( 'jwt_token' )
    t.nullable.string( 'apns_token' )
    t.nullable.string( 'fcm_token' )
  },
});

const NewUserDataWithReferralCodeInput = inputObjectType({
  name: 'NewUserDataWithReferralCodeInput',
  definition(t) {
    t.nonNull.string( 'firstname' )
    t.string( 'lastname' )
    t.nonNull.string( 'email' )
    t.nullable.string( 'phone' )
    t.nonNull.string( 'password' )
    t.nullable.string( 'jwt_token' )
    t.nullable.string( 'apns_token' )
    t.nullable.string( 'fcm_token' )
    t.nonNull.string( 'referree_code' )
  },
});


const UserUpdateDataInput = inputObjectType({
  name: 'UserUpdateDataInput',
  definition(t) {
    t.nonNull.string( 'id' )
    t.nonNull.string( 'firstname' )
    t.string( 'lastname' )
    t.nullable.string( 'phone' )
  },
});

// user.input.js
module.exports = {
	NewUserDataInput,
	UserUpdateDataInput,
	NewUserDataWithReferralCodeInput
}
