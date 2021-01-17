const env = process.env.NODE_ENV || 'production'

//insert your API Key & Secret for each environment, keep this file local and never push it to a public repo for security purposes.
const config = {
	development :{
		APIKey : 'ERulwbo2SaS5EOH1c0GPwg',
		APISecret : 'RatiG4WqGNbK3i1S1iIoCGYfZVN4Wb37FZTv'
	},
	production:{	
		APIKey : 'ERulwbo2SaS5EOH1c0GPwg',
		APISecret : 'RatiG4WqGNbK3i1S1iIoCGYfZVN4Wb37FZTv'
	}
};

module.exports = config[env]
