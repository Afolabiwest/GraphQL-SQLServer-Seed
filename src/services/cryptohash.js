const crypto 			= require('crypto');
const SALT_LENGTH 		= 32;
const HASH_LENGTH 		= 64;
const HASH_ALG 			= 'sha512';
const HASH_ITERATIONS 	= 100000;

const generateSalt = () =>  {
    return new Promise( ( resolve, reject ) => {
		crypto.randomBytes(
			SALT_LENGTH,
			function ( err, buf ) {
			  if ( err ) {
				reject();
			  }
			  const salt = buf.toString( 'base64' );
			  resolve( salt );
			}
		);
    });
};


const hash = async ( password ) => {
    const salt = await generateSalt();
    return new Promise( ( resolve, reject ) => {
		crypto.pbkdf2(
			password,
			salt,
			HASH_ITERATIONS,
			HASH_LENGTH,
			HASH_ALG,
			async function ( err, derivedKey ) {
				if (err) {
					reject(err);
				}
				let hashedPassword = salt + derivedKey.toString( 'base64' );
				resolve( hashedPassword );
			}
		);
    });
 };
 
 
const  compare = async ( providedPassword, storedPassword ) => {
	// +12 because salt was generated in bytes but is stored as base64
    const salt = storedPassword.substr(  0,  SALT_LENGTH + 12 );
    return new Promise( ( resolve, reject ) => {
		crypto.pbkdf2(
			providedPassword,
			salt,
			HASH_ITERATIONS,
			HASH_LENGTH,
			HASH_ALG,
			async function ( err, derivedKey ) {
				if ( err ) reject( new Error( `Password hashing error.` ) );
				if ( !derivedKey ) reject( new Error( `Password hashing error.` ) );
				if ( storedPassword === salt + derivedKey.toString( 'base64' ) ) {
					resolve( true );
				} else {
					resolve( false )
				}
			}
		);
    });
}

module.exports = { hash, compare };