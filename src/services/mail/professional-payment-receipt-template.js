const sendGrid 		= require( '../sendgrid-mailer' );
const {
	header,	footer	
} = require( './partials' );

const subject = 'Payment Receipt';
const textMsg = 'Payment Receipt';

const getTemplate = ( recepientFullname, payeeFullname, amount ) => {
	return header( subject ) + `<tr>
		<td>
			<table class="t46" role="presentation" cellpadding="0" cellspacing="0" align="center">
				<tr>
					<!--[if !mso]><!-->
					<td class="t47" style="width:480px;">
						<!--<![endif]-->
						<!--[if mso]><td class="t47" style="width:480px;"><![endif]-->
						<p class="t53" style="margin-bottom:21px;Margin-bottom:21px;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:21px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:-0.64px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">
							Hello ${recepientFullname},
						</p>
						<p class="t53" style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:21px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:-0.64px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">
							Payment has been received from ${payeeFullname},
						</p>
						
						<h1 style="margin:0;Margin:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:41px;font-weight:800;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;letter-spacing:-1.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;">
							${amount}
						</h1>
					</td>
				</tr>
			</table>
		</td>
	</tr>` + footer();
}

const sendProfessionalReceiptMail = ( recepientEmail, recepientFullname, payeeFullname, amount ) => {
	let mailTemplate =  getTemplate( recepientFullname, payeeFullname, amount )
	sendGrid.send( recepientEmail, subject, textMsg, mailTemplate );
}
module.exports = sendProfessionalReceiptMail;