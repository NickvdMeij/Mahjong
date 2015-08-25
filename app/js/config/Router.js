module.exports 			= function($stateProvider, $urlRouterProvider)
{
	$stateProvider

	.state('main',{
		abstract : true,
		templateUrl : "partials/menu.html"
	})

	.state('main.home', {
		url: '/home',
		templateUrl: "partials/home.html"
	})

	.state('main.games', {
		url: "/games",
		abstract: true,
		templateUrl : "partials/games/games.html"
	})

	.state('main.games.open',
	{
		url 			: "/open",
		templateUrl 	: "partials/games/games-list.html",
		controller: function($scope, GamesFactory, $state){
			GamesFactory.getOpenGames(function(err, games){
				if(err){
					$scope.error = true;
				}else{
					$scope.games = games;
				}
			});

			$scope.toGame = function(game){
				$state.go("main.game.board", {
					id: game._id
				});
			}
		}
	})

	.state('main.games.playing',
	{
		url 			: "/playing",
		templateUrl 	: "partials/games/games-list.html",
		controller: function($scope, GamesFactory, $state){
			GamesFactory.getPlayingGames(function(err, games){
				if(err){
					$scope.error = true;
				}else{
					$scope.games = games;
				}
			});

			$scope.toGame = function(game){
				$state.go("main.game.board", {
					id: game._id
				});
			}
		}
	})

	.state('main.games.finished',
	{
		url 			: "/finished",
		templateUrl 	: "partials/games/games-list.html",
		controller: function($scope, GamesFactory, $state){
			GamesFactory.getFinishedGames(function(err, games){
				if(err){
					$scope.error = true;
				}else{
					$scope.games = games;
				}
			});

			$scope.toGame = function(game){
				$state.go("main.game.board", {
					id: game._id
				});
			}
		}
	})

	.state('main.games.ownopen',
	{
		url 			: "/own/open",
		templateUrl 	: "partials/games/games-list.html",
		controller: function($scope, GamesFactory, $state){
			GamesFactory.getOwnOpenGames(function(err, games){
				if(err){
					$scope.error = true;
				}else{
					$scope.games = games;
				}
			});

			$scope.toGame = function(game){
				$state.go("main.game.board", {
					id: game._id
				});
			}
		}
	})

	.state('main.games.ownplaying',
	{
		url 			: "/own/playing",
		templateUrl 	: "partials/games/games-list.html",
		controller: function($scope, GamesFactory, $state){
			GamesFactory.getOwnPlayingGames(function(err, games){
				if(err){
					$scope.error = true;
				}else{
					$scope.games = games;
				}
			});

			$scope.toGame = function(game){
				$state.go("main.game.board", {
					id: game._id
				});
			}
		}
	})

	.state('main.games.ownfinished',
	{
		url 			: "/own/finished",
		templateUrl 	: "partials/games/games-list.html",
		controller: function($scope, GamesFactory, $state){
			GamesFactory.getOwnFinishedGames(function(err, games){
				if(err){
					$scope.error = true;
				}else{
					$scope.games = games;
				}
			});

			$scope.toGame = function(game){
				$state.go("main.game.board", {
					id: game._id
				});
			}
		}
	})

	.state('main.games.new',
	{
		url 			: "/new",
		templateUrl 	: "partials/games/games-new.html",
		controller: 'GamesController as gameCtrl'
	})

	.state('main.game',
	{
		url 			: "/game/:id",
		controller 		: "GameController",
		templateUrl 	: "partials/game/game.html"
	})
	.state('main.game.board',
	{
		url 			: "/board",
		templateUrl 	: "partials/game/game-board.html"
	})
	.state('main.game.players',
	{
		url 			: "/players",
		templateUrl 	: "partials/game/game-players.html"
	})
	.state('main.game.logs',
	{
		url 			: "/logs",
		templateUrl 	: "partials/game/game-logs.html"
	})

	.state('main.callback',
	{
		url 			: "/callback",
		controller 		: "CallbackController"
	})
	.state('main.logout',
	{
		url 			: "/logout",
		controller 		: "LogoutController"
	});

	$urlRouterProvider.otherwise('/home');
};