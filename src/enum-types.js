const SortOrder = enumType({
	name: 'SortOrder',
	members: ['asc', 'desc'],
});

const AdvertType = enumType({
	name: 'AdvertType',
	members: [ 'BOOKMI_SPECIAL', 'CUSTOM_ADVERT' ],
});

const AdvertSubscriptionPeriod = enumType({
	name: 'AdvertSubscriptionPeriod',
	members: [ 'hourly', 'daily', 'weekly', 'monthly' ],
});


const AdvertRunningStatus = enumType({
	name: 'AdvertRunningStatus',
	members: [ 'PENDING', 'RUNNING', 'STOPPED' ],
});


const ActiveStatus = enumType({
	name: 'ActiveStatus',
	members: [ 'ACTIVE', 'INACTIVE' ],
});

const ApprovalStatus = enumType({
	name: 'ApprovalStatus',
	members: [ 'PENDING', 'REVIEW', 'APPROVED', 'DECLINED' ],
});


const PermissionType = enumType({
	name: 'PermissionType',
	members: [ 'read:consumer', 'read:business', 'read:admin' ],
});


module.exports = {
	SortOrder, 
	AdvertSubscriptionPeriod,
	AdvertRunningStatus,
	ActiveStatus,
	ApprovalStatus,
	PermissionType,
}


