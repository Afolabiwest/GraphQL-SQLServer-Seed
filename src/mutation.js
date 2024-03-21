const { compare, hash } 		= require('bcryptjs')
const { sign } 					= require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('./utils')

const {
	intArg,
	nonNull,
	objectType,
	stringArg,
	arg,
	asNexusMethod
} = require('nexus');

const { DateTimeResolver } 	= require( 'graphql-scalars' );
const DateTime 				= asNexusMethod(DateTimeResolver, 'date');


const {
	NewUserDataInput,
	NewBusinessDataInput,
	BusinessUpdateDataInput,
	BusinessReviewUpdateDataInput,
	NewServiceDataInput,
	UploadInput
} = require('./input-types');


const {
	Service,
	AuthPayload,
	Business,
	UploadFile,
	Upload
} = require('./custom-types');



const uploadFile = async ( createReadStream, filename ) => {	

	aws.config.update({
		region: process.env.AWS_REGION || 'us-east-1',
		accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
	})
	
	// Create S3 service object
	const s3 = new aws.S3({ apiVersion: '2006-03-01' });
	const { Location } = await s3.upload({
		Body: createReadStream(),
		//	Key: `${uuidv4()}${extname(filename)}`,
		Key: filename,
		Bucket: process.env.AWS_S3_BUCKET.toString() || '',
		ACL: 'public-read',
	}).promise();
	
	console.log( Location );
	return Location;
  
}

const Mutation = objectType( { name: 'Mutation' } );
module.exports =  Mutation;



