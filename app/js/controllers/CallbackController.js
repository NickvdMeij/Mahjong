module.exports			= function ($location)
{
	var locationObject = $location.search();

	window.localStorage.setItem('email', locationObject.username);
	window.localStorage.setItem('token', locationObject.token);

	$location.url('/#/home');
	window.location.reload();
};