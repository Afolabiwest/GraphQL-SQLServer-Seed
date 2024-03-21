const sendGrid 	= require( '../sendgrid-mailer' );
const {
	header,	footer	
} 				= require( './partials' );

const subject 		= 'Account Setup Verification OTP';
const getTemplate 	= ( message, m_subject ) => {
	return header( m_subject ) + `<tr>
		<td>
			<table class="t46" role="presentation" cellpadding="0" cellspacing="0" align="center">
				<tr>
					<!--[if !mso]><!-->
					<td class="t47" style="width:480px;">
						<!--<![endif]-->
						<!--[if mso]><td class="t47" style="width:480px;"><![endif]-->
						${message}
					</td>
				</tr>
			</table>
		</td>
	</tr>` + footer();
}

const sendUserWelcomeMail = ( recepientEmail, HTMLMessage, txtMessage, mail_subject ) => {
	let mailSubject  = mail_subject || subject;	
	let mailTemplate =  getTemplate( HTMLMessage, mailSubject );
	sendGrid.send( recepientEmail, mailSubject, txtMessage, mailTemplate );
}
module.exports = sendUserWelcomeMail;