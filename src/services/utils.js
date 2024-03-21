const { sign } 		= require('jsonwebtoken');
require('dotenv').config();
const WebSocketClient 	= require('websocket').client;



const getSlug = (Text) => {	
	return Text.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
}

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
		
		const nodemailer 			= require("nodemailer");
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
			console.log("Message sent: %s", info.messageId);		
		}	
		
		main().catch(console.error);
		
	}catch( { name, message } ){
		console.log( name );
		console.log( message );
	}	
}



Date.prototype.getWeek = function() {
	var date = new Date(this.getTime());
	date.setHours(0, 0, 0, 0);
	// Thursday in current week decides the year.
	date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
	// January 4 is always in week 1.
	var week1 = new Date(date.getFullYear(), 0, 4);
	// Adjust to Thursday in week 1 and count number of weeks from date to week1.
	return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

Date.prototype.getWeekYear = function() {
	var date = new Date(this.getTime());
	date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
	return date.getFullYear();
}


const getCurrentDayWeekMonthYear = () => {
	const date = new Date();
	return {
		day: date.getDate(),
		week: date.getWeek(),
		month: parseInt( date.getMonth() ) + 1,
		year: date.getFullYear()
	}		
}

Date.prototype.addMinutes = function( minutes ) {
    var date = new Date( this.valueOf() );
    date.setMinutes(date.getMinutes() + minutes );
    return date;
}

Date.prototype.addHours = function( hours ) {
    var date = new Date( this.valueOf() );
    date.setHours(date.getHours() + hours );
    return date;
}

Date.prototype.addDays = function( days ) {
    var date = new Date( this.valueOf() );
    date.setDate(date.getDate() + days );
    return date;
}


Date.prototype.addWeeks = function( weeks ) {
    let date 		= new Date( this.valueOf() );
    let currWeek 	= date.getWeek();
    return currWeek + weeks;
}


Date.prototype.addMonths = function( months ) {
    var date = new Date( this.valueOf() );
    date.setMonth( date.getMonth() + months );
    return date;
}


const signUserToken = async ( userObject ) => {
	const token = await sign(
		{ 
			userId: userObject.id, 
			userPermission: userObject.permission, 
			userRoleId: userObject.role_id 
		}, 
		process.env.APP_SECRET,
		{
			expiresIn: process.env.TOKEN_EXPIRATION_TIME
		}
	);
	
	return token;
}

const getFormattedTime = ( timestampStr ) => {	
	console.log( timestampStr );
	const timestamp = new Date( timestampStr ).getTime();
	const options 	= { year: 'numeric', month: 'long', day: 'numeric' };
	return new Intl.DateTimeFormat( 'en-US', options ).format( timestamp );	
}

const sendUpdateNotification = ( notificationObject ) => {
	
	const client 	= new WebSocketClient();
	client.on( 'connectFailed', function( error ) {
		console.log( 'Connect Error: ' + error.toString() );
	});

	client.on( 'connect', function( connection ) {
		
		connection.on( 'error', function( error ) {
			console.log( "Notification Socket Connection Error: " + error.toString() );
		});
		
		connection.on( 'close', function() {
			console.log( 'echo-protocol Connection Closed' );
		});
		
		connection.on( 'message', function( message ) {
			if ( message.type === 'utf8') {
				console.log("Received: '" + JSON.stringify( message.utf8Data ) + "'");
			}
		});
		
		function sendNotification() {			
			if ( connection.connected ) {
				connection.sendUTF( JSON.stringify( notificationObject ) );					
			}
		}
		
		
		sendNotification();
		
	});

	client.connect( process.env.WEBSOCKET, 'echo-protocol' );

}

const numberFormat = ( number, decimals, dec_point, thousands_sep ) => {	
	var n = !isFinite(+number) ? 0 : +number, 
		prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
		dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
		toFixedFix = function (n, prec) {
			// Fix for IE parseFloat(0.55).toFixed(0) = 0;
			var k = Math.pow(10, prec);
			return Math.round(n * k) / k;
		},
		s = (prec ? toFixedFix(n, prec) : Math.round(n)).toString().split('.');
	if (s[0].length > 3) {
		s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	}
	if ((s[1] || '').length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1).join('0');
	}
	return s.join(dec);
};


const shortenTexts = ( text, count ) => {
	const textsCount = [...text].length;
	let desc = [...text].splice( 0, count );
	desc = desc.join( "" );
	return textsCount > count ? desc + " ..." : desc;
}



module.exports = {
	getSlug,
	sendMail,
	getCurrentDayWeekMonthYear,
	signUserToken,
	getFormattedTime,
	sendUpdateNotification,
	numberFormat,
	shortenTexts
}
