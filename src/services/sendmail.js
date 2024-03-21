const nodemailer 			= require("nodemailer");
require('dotenv').config();

/**
//	Mail Config Example
//	const mailConfig = {
//		subject: "Some subject here",
//		recepients: "recepient1@gmail.com, recepient2@gmail.com",
//		text: "Mail message texts here",
//		html: "<h3>Mail message html and texts here</h3>",
//	}
*/

const sendMail = ( mail_config ) => {
	try{
		const config 				= mail_config || {};
		const mailerConfig 			= {};
		mailerConfig.subject 		= 'subject' in config ? config.subject : 'Welcome Message';
		// Mail recepients in comma separated format
		mailerConfig.recepients 	= 'recepients' in config ? config.recepients : '';
		mailerConfig.text 			= 'text' in config ? config.text : 'Welcome to our platform';
		mailerConfig.html 			= 'html' in config ? config.html : '<h3>Welcome to our platform</h3>';
		
		const transporter = nodemailer.createTransport({
			host: process.env.MAIL_HOST || 'smtp.forwardemail.net',
			port: process.env.MAIL_PORT || 465,
			secure: process.env.MAIL_SECURED || true,
			auth: {
				user: process.env.MAIL_SUPPORT || '',
				pass: process.env.MAIL_SUPPORT_PASSWORD || '',
			},
		});
		
		const main = async () => {
			const info = await transporter.sendMail({
				from: process.env.MAIL_SENDER || '', // sender address
				to: mailerConfig.recepients, // list of receivers
				subject: mailerConfig.subject, // Subject line
				text: mailerConfig.text, // plain text body
				html: mailerConfig.html, // html body
			});	
			
			console.log( "Message sent: %s", info.messageId );
			
		}

		main().catch( console.error );	
	}catch( { name, message } ){
		console.log( name );
		console.log( message );
	}
	
	
}

module.exports = sendMail;
