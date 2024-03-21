const { PrismaClient, Prisma }  = require('@prisma/client');
const prismaORM					= new PrismaClient();

// Fetch Users referree_code
const getUsersReferreeCodes = async () => {
	let usersReferreeCodes 	= await prismaORM.$queryRaw(
		Prisma.sql`SELECT id, referree_code, role_id, permission FROM public.\"User\"` 
	);
	return usersReferreeCodes;
}

// Fetch Users referree_code
const getConsumersReferreeCodes = async () => {
	let usersReferreeCodes 	= await prismaORM.$queryRaw(
		Prisma.sql`SELECT id, referree_code, role_id, permission FROM public.\"User\" WHERE role_id = 'CONSUMER'` 
	);
	return usersReferreeCodes;
}

// Fetch Users referree_code
const getProfessionalsReferreeCodes = async () => {
	let usersReferreeCodes 	= await prismaORM.$queryRaw(
		Prisma.sql`SELECT id, referree_code, role_id, permission FROM public.\"User\" WHERE role_id = 'BUSINESS'` 
	);
	return usersReferreeCodes;
}

// Fetch Reward Level Config Data
const getRewardLevels 	= async () => {
	let rewardLevels 	= await prismaORM.$queryRaw(
		Prisma.sql`SELECT id, key, level, user_type, points, amount FROM public.\"RewardLevel\" ORDER BY id ASC`  
	);
	return rewardLevels;
}

// Fetch Reward Level Config Data for Consumers
const getConsumerRewardLevels 	= async () => {
	let rewardLevels 	= await prismaORM.$queryRaw(
		Prisma.sql`SELECT id, key, level, user_type, points, amount FROM public.\"RewardLevel\" WHERE user_type = 'consumer' ORDER BY id ASC`  
	);
	return rewardLevels;
}

// Fetch Reward Level Config Data for Professionals
const getProfessionalRewardLevels 	= async () => {
	let rewardLevels 	= await prismaORM.$queryRaw(
		Prisma.sql`SELECT id, key, level, user_type, points, amount FROM public.\"RewardLevel\" WHERE user_type = 'professional' ORDER BY id ASC`  
	);
	return rewardLevels;
}

// Fetch User's Current Reward Level
// this happens to the last entry in the Reward table for the user
const getUserCurrentRewardLevel 	= async ( userId ) => {
	let userCurrentRewardLevel 		= await prismaORM.$queryRaw(
		Prisma.sql`SELECT id, user_id, level_id, level_number FROM public.\"Reward\" WHERE user_id = ${userId} ORDER BY id DESC LIMIT 1`  
	);
	return userCurrentRewardLevel.length > 0 ? userCurrentRewardLevel[ 0 ] : null;
}
const getConsumerCurrentRewardLevel 	= async ( userId ) => {
	let userCurrentRewardLevel 		= await prismaORM.$queryRaw(
		Prisma.sql`SELECT id, user_id, level_id, level_number FROM public.\"Reward\" WHERE user_id = ${userId}  ORDER BY id DESC LIMIT 1`  
	);
	return userCurrentRewardLevel.length > 0 ? userCurrentRewardLevel[ 0 ] : null;
}

const userDownlinesCount = async ( referral_code ) => {
	let count  = await prismaORM.User.count( {
		where: {
			referree_code: referral_code
		}
	} );
	return count;
}


const userFriendInvitesCount = async ( userId ) => {
	let count  = await prismaORM.FriendsInvite.count( {
		where: {
			user_id: userId
		}
	} );
	return count;
}

const userCompletedRatingsCount = async ( userId ) => {
	let count  = await prismaORM.Review.count( {
		where: {
			user_id: userId
		}
	} );
	count  += await prismaORM.ProductReview.count( {
		where: {
			user_id: userId
		}
	} );
	return count;
}

const userCompletedBookingsCount = async ( userId ) => {
	let count  = await prismaORM.Appointment.count( {
		where: {
			user_id: userId,
			status: 'COMPLETED'
		}
	} );
	return count;
}

const userCompletedPaymentsCount = async ( userId ) => {
	let count  = await prismaORM.Payment.count( {
		where: {
			user_id: userId,
			status: 'COMPLETED'
		}
	} );
	count  += await prismaORM.OrderPayment.count( {
		where: {
			user_id: userId,
			status: 'COMPLETED'
		}
	} );
	return count;
}





const runCronJob = () => {
	
	//	const rewardLevels 			= getRewardLevels();
	//	const usersReferreeCodes 	= getUsersReferreeCodes();
	//	
	//	[ ...usersReferreeCodes ].forEach( async ( userData ) => {
	//	
	//		const userCurrentRewardLevel 		= getUserCurrentRewardLevel( userData.id );
	//		let now 							= new Date().toISOString();		
	//		let userNewTargetRewardLevelData 	= ( userCurrentRewardLevel !== null ) ? rewardLevels[ userData.level_number ] : rewardLevels[ 0 ];
	//		
	//		const satisfiedDownlines 			= userDownlinesCount( userData.id ) >= userNewTargetRewardLevelData.downline_count;
	//		const satisfiedFriendInvites 		= userFriendInvitesCount( userData.id ) >= userNewTargetRewardLevelData.friends_invite_count;
	//		const satisfiedCompletedRatings 	= userCompletedRatingsCount( userData.id ) >= userNewTargetRewardLevelData.completed_ratings_count;
	//		const satisfiedCompletedBookings 	= userCompletedBookingsCount( userData.id ) >= userNewTargetRewardLevelData.completed_bookings_count;
	//		const satisfiedCompletedPayments 	= userCompletedPaymentsCount( userData.id ) >= userNewTargetRewardLevelData.completed_payments_count;
	//		
	//		let isQualified = satisfiedDownlines && satisfiedFriendInvites && satisfiedCompletedRatings;
	//		isQualified 	= satisfiedCompletedBookings && satisfiedCompletedPayments;
	//		
	//		if( isQualified ){
	//			await prismaORM.Reward.create( {
	//				user_id: userData.id,
	//				level_id: userCurrentRewardLevel.id,
	//				is_active: 'ACTIVE',
	//				created_at: now,
	//				updated_at: now
	//			} );
	//		}	
	//		
	//	} );
	//	
	//	console.log( "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++" );
	//	console.log( `Ran cron job @ ${new Date()}` );
	//	console.log( "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++" );
	
	const consumerRewardLevels 			= getConsumerRewardLevels();
	const consumerReferreeCodes 		= getConsumersReferreeCodes();
	
	[ ...consumerReferreeCodes ].forEach( async ( userData ) => {
	
		const userCurrentRewardLevel 		= getUserCurrentRewardLevel( userData.id );
		let now 							= new Date().toISOString();		
		let userNewTargetRewardLevelData 	= ( userCurrentRewardLevel !== null ) ? consumerRewardLevels[ userData.level_number ] : consumerRewardLevels[ 0 ];
		
		const satisfiedDownlines 			= userDownlinesCount( userData.id ) >= userNewTargetRewardLevelData.downline_count;
		const satisfiedFriendInvites 		= userFriendInvitesCount( userData.id ) >= userNewTargetRewardLevelData.friends_invite_count;
		const satisfiedCompletedRatings 	= userCompletedRatingsCount( userData.id ) >= userNewTargetRewardLevelData.completed_ratings_count;
		const satisfiedCompletedBookings 	= userCompletedBookingsCount( userData.id ) >= userNewTargetRewardLevelData.completed_bookings_count;
		const satisfiedCompletedPayments 	= userCompletedPaymentsCount( userData.id ) >= userNewTargetRewardLevelData.completed_payments_count;
		
		let isQualified = satisfiedDownlines && satisfiedFriendInvites && satisfiedCompletedRatings;
		isQualified 	= satisfiedCompletedBookings && satisfiedCompletedPayments;
		
		if( isQualified ){
			await prismaORM.Reward.create( {
				user_id: userData.id,
				level_id: userCurrentRewardLevel.id,
				is_active: 'ACTIVE',
				created_at: now,
				updated_at: now
			} );
		}	
		
	} );
	
	console.log( "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++" );
	console.log( `Ran cron job @ ${new Date()}` );
	console.log( "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++" );
	
	
	
}

module.exports = { runCronJob, prismaORM };



