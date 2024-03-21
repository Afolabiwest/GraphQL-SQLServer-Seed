const {	inputObjectType } = require('nexus');

// Articles Status Log
const NewArticlesStatusLogDataInput = inputObjectType({
	name: 'NewArticlesStatusLogDataInput',
	definition(t) {
		t.string( 'business_id' )
		t.string( 'category_id' )
		t.string( 'name' )
		t.string( 'is_active' )
	},
});

const ArticlesStatusLogUpdateDataInput = inputObjectType({
	name: 'ArticlesStatusLogUpdateDataInput',
	definition(t) {
		t.string( 'id' )
		t.string( 'business_id' )
		t.string( 'category_id' )
		t.string( 'name' )
		t.string( 'is_active' )
	},
});

const NewArticleDataInput = inputObjectType({
	name: 'NewArticleDataInput',
	definition(t) {
		t.nonNull.string( 'author_id' )
		t.string( 'title' )
		t.nullable.string( 'keywords' )
		t.nullable.string( 'description' )
		t.nonNull.string( 'content' )
		t.nullable.string( 'cover_photo' )
	},
});


const ArticleUpdateDataInput = inputObjectType({
	name: 'ArticleUpdateDataInput',
	definition(t) {
		t.string( 'id' )
		t.string( 'title' )
		t.nullable.string( 'keywords' )
		t.nullable.string( 'description' )
		t.nonNull.string( 'content' )
		t.nullable.string( 'cover_photo' )
	},
});


const ArticleActiveStatusUpdateDataInput = inputObjectType({
	name: 'ArticleActiveStatusUpdateDataInput',
	definition(t) {
		t.string( 'id' )
	},
});

// article.input.js
module.exports = {
	NewArticlesStatusLogDataInput,
	ArticlesStatusLogUpdateDataInput,
	NewArticleDataInput,
	ArticleUpdateDataInput,
	ArticleActiveStatusUpdateDataInput
}