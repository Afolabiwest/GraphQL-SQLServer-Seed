require('dotenv').config();

//	const fileFilter = ( req, file, cb ) => {
//		if ( file.mimetype === 'image/jpg' ||  file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf' ) {
//			cb( null, true );
//		} else {
//			cb( null, false );
//		}
//	};
//	const multer = require('multer');
//	const storage = multer.memoryStorage();
//	const upload = multer( { storage, fileFilter } );



const uploadFileToS3 = async ( createReadStream, filename, mimetype ) => {	
	
	const AWS 	= require('aws-sdk');
	const s3 	= new AWS.S3({
		region: process.env.AWS_REGION || 'us-east-1',
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
	});
	
	const params = {
		Body: createReadStream(),
		Key: filename,
		Bucket: process.env.AWS_S3_BUCKET_NAME.toString(),
		ContentType: mimetype
	};
	
	const { location } = await s3.upload( params ).promise();	
	console.log( location );
	return location; 
	
}

const uploadFileToPath = async ( createReadStream, filename ) => {
	
	const path 		= require( 'path' );
	const fs 		= require( 'fs' );
	const stream 	= createReadStream();
	const pathName 	= path.join( __dirname, `../../public/image/${filename}` );
	await stream.pipe( fs.createWriteStream( pathName ) );
	return {
		filename
	};
	
}

module.exports = { uploadFileToS3, uploadFileToPath };