module.exports = function ($location){
	window.localStorage.removeItem('email');
	window.localStorage.removeItem('token');

	$location.url('/');
	window.location.reload();
};