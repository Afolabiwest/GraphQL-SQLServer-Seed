const {	unionType } = require('nexus');

const SampleResult = unionType({
	name: 'SampleResult',
	resolveType( data ) {
		const __typename = 'sample_id' in data ? 'Sample' : 'SubSample';
		if ( !__typename ) {
			throw new Error( `Could not resolve the type of data passed to union type "SampleResult"` );
		}
		return __typename
	},
	definition(t) {
		t.members( 'FavouriteBusiness', 'Business' )
	},
})

// sampleresult.js
module.exports = SampleResult;