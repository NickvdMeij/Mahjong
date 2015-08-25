module.exports = function (){
	var email = null;
	var token = null;
	var loggedIn = false;

	return {
		openLogin: function (){
			window.location.href = "http://mahjongmayhem.herokuapp.com/auth/avans?callbackUrl=http://localhost:8080/%23/callback";
		},
		login : function (newEmail, newToken){
			email 		= newEmail;
			token 		= newToken;

			loggedIn 	= true;
		},
		logout: function ()	{
			email 		= null;
			token 		= null;
			loggedIn 	= false;
		},
		isLoggedIn: function ()	{
			return loggedIn;
		},
		getEmail: function (){
			return email;
		},
		getToken: function (){
			return token;
		},
		getUserObject: function (){
			return {
				email: email,
				token: token,
				loggedIn: loggedIn
			};
		}
	};
};