const timeAgo 		= require('node-time-ago');
const getAgoTime 	= ( datetime ) => { return timeAgo( datetime ) };
module.exports 		= getAgoTime;
