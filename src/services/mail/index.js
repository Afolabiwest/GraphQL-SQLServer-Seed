const sendProfessionalReceiptMail 	= require( __dirname + '/professional-payment-receipt-template' );
const sendConsumerReceiptMail 		= require( __dirname + '/consumer-payment-receipt-template' );
const sendUserWelcomeMail 		= require( __dirname + '/user-welcome-template' );
module.exports = {	
	sendProfessionalReceiptMail,
	sendConsumerReceiptMail,
	sendUserWelcomeMail
}