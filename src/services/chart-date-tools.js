
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


const getMonthFromWeek = ( weeknumber ) => {
	return new Date(1000 * 60 * 60 * 24 * 7 * weeknumber).getMonth();
}

const getCurrentDayWeekMonthYear = () => {
	const date = new Date();
	return {
		day_number: date.getDay(),
		day: date.getDate(),
		week: date.getWeek(),
		month: parseInt( date.getMonth() ) + 1,
		year: date.getFullYear()
	}		
}

const getMonthlyChartKeys = ( label_count, target_year ) => {
	let dt = getCurrentDayWeekMonthYear();	
	let currentMonth 	= dt.month;
	let currentYear 	= target_year || dt.year;
	let monthObjects 	= [];
	let counter 		= currentMonth;
	const months 		= [ 
		"Jan.", 
		"Feb.", 
		"Mar.", 
		"Apr.", 
		"May", 
		"Jun.",           
		"Jul.", 
		"Aug.", 
		"Sep.", 
		"Oct.", 
		"Nov.", 
		"Dec." 
	];
	
	let labelCount 	= label_count || 6;
	labelCount 		= labelCount > 12 ? 12 : labelCount;
	
	for( var i = labelCount; i >= 1; i-- ){
		
		if( counter < 1 ){
			counter = 12;
			currentYear--;	
		}
		monthObjects.push( {
			month_name: months[counter-1],
			month_number: counter,
			year: currentYear
		} );
		counter--;
	}

	return monthObjects.reverse();
}

const getWeeklyChartKeys = ( label_count, target_year ) => {
	let dt 				= getCurrentDayWeekMonthYear();
	let currentMonth 	= dt.month;
	let currentWeek 	= dt.week;
	let currentYear 	= target_year || dt.year;
	let weekObjects 	= [];
	let counter 		= currentWeek;	
	let weeks 			= [];
	for( var i = 1; i <= 54; i++ ){
		weeks.push( "WK-" + i);
	}
	let labelCount 	= label_count || 6;
	labelCount 		= labelCount > 54 ? 54 : labelCount;
	for( var i 	= labelCount; i >= 1; i-- ){
		
		if( counter < 1 ){
			counter = 54;
			currentYear--;	
		}
		
		weekObjects.push( {
			week_name: weeks[counter-1],
			week_number: counter,
			year: currentYear
		} );
		
		counter--;
		
	}

	return weekObjects.reverse();
}

const getDailyChartKeys = ( label_count, target_year ) => {
	let dt 				= getCurrentDayWeekMonthYear();
	let currentWeek 	= dt.week;
	let currentDay 		= dt.day_number;
	let currentMonth 	= dt.month;
	let currentYear 	= target_year || dt.year;
	let dayObjects 		= [];
	let counter 		= currentDay;	
	let days 			= [
		"Mon.",
		"Tue.",
		"Wed.",
		"Thu.",
		"Fri.",
		"Sat.",
		"Sun."
	];
	
	let labelCount = label_count || 6;
	labelCount = labelCount > 7 ? 7 : labelCount;
	for( var i = labelCount; i >= 1; i-- ){
		
		if( counter < 1 ){
			counter = 7;	
		}
		dayObjects.push( {
			day_name: days[counter-1],
			day_number: counter,
			week: currentWeek,			
			month: currentMonth,
			year: currentYear
		} );
		counter--;
	}

	return dayObjects.reverse();
}

module.exports = {
	getCurrentDayWeekMonthYear,
	getMonthlyChartKeys,
	getWeeklyChartKeys,
	getDailyChartKeys
};