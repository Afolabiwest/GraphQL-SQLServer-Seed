const { verify } = require('jsonwebtoken');
require('dotenv').config();
const APP_SECRET = process.env.APP_SECRET;

const getUserId 		= ( context ) => {
	const authHeader 	= context.req.get( 'Authorization' )
	if (authHeader) {
		const token 	= authHeader.replace( 'Bearer ', '' )
		if( token !== 'undefined' ){
			const { userId } = verify( token, APP_SECRET );
			return userId;
		}
		return null;			
	}
}

const getUserPermission = ( context ) => {
	const authHeader 	= context.req.get( 'Authorization' )
	if (authHeader) {
		const token 	= authHeader.replace( 'Bearer ', '' )
		if( token !== 'undefined' ){
			const { userPermission } = verify( token, APP_SECRET );
			return userPermission;
		}
		return null;			
	}
	
}

const getUserRoleId 	= ( context ) => {
	const authHeader 	= context.req.get( 'Authorization' )
	if (authHeader) {
		const token 	= authHeader.replace( 'Bearer ', '' )
		if( token !== 'undefined' ){
			const { userRoleId } = verify( token, APP_SECRET );
			return userRoleId;
		}
		return null;			
	}
}

module.exports = {
	getUserId: getUserId,
	getUserPermission: getUserPermission,
	getUserRoleId: getUserRoleId
}
