const sgMail = require('@sendgrid/mail');
require( 'dotenv' ).config();
sgMail.setApiKey( process.env.SENDGRID_API_KEY );

const send 			= ( recipient_email_address, subject, text, html, isES8 ) => {
	const sendES8 	= isES8 || false;
	const msg 		= {
		to: recipient_email_address,
		from: process.env.SMTP_FROM, // Use the email address or domain you verified above
		subject: subject,
		text: text,
		html: html,
	};
	
	if( !sendES8 ){		
		//ES6
		sgMail.send( msg ) .then(() => {}, error => {
			console.error(error);
			if (error.response) {
			  console.error(error.response.body)
			}
		});
		
	}else{
		
		//ES8
		(async () => {
			try {
				await sgMail.send( msg );
			} catch ( error ) {
				console.error( error );
	
				if ( error.response ) {
					console.error( error.response.body );
				}
			}
		})();
	}	
}

module.exports = { send };

