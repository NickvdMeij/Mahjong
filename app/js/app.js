require('angular/angular');
require('angular-route/angular-route');
require('angular-ui-router/build/angular-ui-router');

var app = angular.module('mahjong', ['ngRoute', 'ui.router']);

app.factory('HttpInjector', function (User) {
	return {
		request: function (config){
			if (User.isLoggedIn()){
				config.headers['x-username'] = User.getEmail();
				config.headers['x-token'] = User.getToken();
			}

			return config;
		}
	};
});

app.factory('HttpLoader', require('./factories/HttpLoader'));
app.factory('User', require('./models/User'));
app.factory('Player', require('./models/Player'));
app.factory('Game', require('./models/Game'));
app.factory('TemplateFactory', require('./factories/TemplateFactory'));
app.factory('GameFactory', require('./factories/GameFactory'));
app.factory('GamesFactory', require('./factories/GamesFactory'));
app.factory('TileFactory', require('./factories/TileFactory'));
app.factory('SocketFactory', require('./factories/SocketFactory'));

app.controller('MainController', require('./controllers/MainController'));
app.controller('GamesController', require('./controllers/GamesController'));
app.controller('GameController', require('./controllers/GameController'));
app.controller('CallbackController', require('./controllers/CallbackController'));
app.controller('LogoutController', require('./controllers/LogoutController'));

app.directive('clickable', require('./directives/Clickable'));
app.directive('tile', function (){
	return {
		restrict 			: 'E',
		templateUrl 		: 'templates/tile.html'
	};
});

app.filter("matched", require('./filters/Matched'));

app.config(require('./config/Router'));
app.config(function ($httpProvider){
	$httpProvider.interceptors.push('HttpInjector');
});