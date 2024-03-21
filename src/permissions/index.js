const { rule, shield, or, and } 		= require( 'graphql-shield' )
const { getUserId, getUserPermission } 	= require( '../services/auth' )

const rules = {
	isNotAuthenticatedUser: rule()( async (_parent, _args, context) => {
		const userId = await getUserId( context );
		return userId === null;	
	}),
	
	isAuthenticatedUser: rule()( async (_parent, _args, context) => {
		const userId = await getUserId(context)
		return userId !== null;		
	}),
	
	isConsumer: rule()( async (_parent, args, context) => {
		const userPermission = await  getUserPermission( context );
		return userPermission === "read:consumer";
	}),
	
	isProfessional: rule()( async (_parent, args, context) => {
		const userPermission = await getUserPermission( context );
		return userPermission === "read:business";
	}),
	
	isAdmin: rule()( async (_parent, args, context) => {
		const userPermission = await  getUserPermission( context );
		return userPermission === "read:admin";
	}),	
	
	isArticleOwner: rule()(async (_parent, args, context) => {
		const userId = getUserId(context)
		const author = await context.prisma.Article.findUnique({
			where: {
				id: Number(args.id),
			},
		})
		.author()
		return userId === author.id
	}),
	
	isBusinessOwner: rule()(async (_parent, args, context) => {
		const userId = getUserId(context)
		const owner = await context.prisma.Business.findUnique({
			where: {
				id: Number(args.id),
			},
		})
		.owner()
		return userId === owner.id
	}),
	
	isOwner: rule()(async (_parent, args, context) => {
		const userId = getUserId(context)
		const owner = await context.prisma.User.findUnique({
			where: {
				id: String(args.id),
			},
		})
		return userId === owner.id;
	}),
	
	
}

const permissions = shield({
	Query: {
		//	me: rules.isAuthenticatedUser,
		//	draftsByUser: rules.isAuthenticatedUser,
		//	postById: rules.isAuthenticatedUser,
		
		myAccount: rules.isAuthenticatedUser,
		deleteMyAccount: and( rules.isAuthenticatedUser, or( rules.isConsumer, rules.isProfessional ) ),
		disableMyAccount: and( rules.isAuthenticatedUser, rules.isAdmin )
	
	},
	
	Mutation: {		
		createAccountt : and( rules.isAuthenticatedUser, or( rules.isConsumer, rules.isProfessional, rules.isAdmin ) ),		
	}
},
{
  debug: true
});

module.exports = {
  permissions,
}
