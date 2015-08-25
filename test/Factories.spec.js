describe("Factories", function() {
	var $httpBackend,
		$controller,
		gameFactory;

	beforeEach(module('mahjong'));

	beforeEach(inject(function (_$httpBackend_, _$controller_, _GameFactory_)
	{
		$controller 				= _$controller_;
		gameFactory 				= _GameFactory_;
		$httpBackend 				= _$httpBackend_;
	}));

	var gameData 					= [[{value:[
		{id: 'id1', state: 'open'}, 
		{id: 'id2', state: 'playing'},
		{id: 'id3', state: 'finished'}
		]}]];

	it('Should return an array of games', function ()
	{
		var games 					= gameFactory.mapGames(gameData);

		expect(games).to.have.length(3);
	});

	it('Should return sorted games', function ()
	{
		var games 					= gameFactory.mapGames(gameData);

		expect(games[0].state).to.equal('playing');
	});

	it('Should not return a game by id id4', function ()
	{
		gameFactory.mapGames(gameData);

		var game 					= gameFactory.getGameById('id4');

		expect(game).to.be.undefined;
	});

	it('Should return a game by id id2', function ()
	{
		gameFactory.mapGames(gameData);

		var game 					= gameFactory.getGameById('id2');

		expect(game.id).to.be.equal('id2');
	});

	it('Should save a watching game', function ()
	{
		gameFactory.mapGames(gameData);

		var game 					= {id: 'gameId', state: 'finished'};

		gameFactory.setWatchingGame(game);

		var wGame 					= gameFactory.getWatchingGame();

		expect(wGame).to.be.equal(game);
	});

	it('Should add a game to all the games', function ()
	{
		gameFactory.mapGames(gameData);

		var game 					= {id: 'gameId', state: 'finished'};

		gameFactory.addGameToGames(game);

		var games 					= gameFactory.getGames();

		expect(games).to.have.length(4);
	});

	var templatesResponse 			= [
		{ _id: 'Shanghai', id: 'Shanghai', tiles: [] },
		{ _id: 'Ox', id: 'Ox', tiles: [] }
	];

	it('should not create a game with more minPlayers than maxPlayers', function(){

		var $scope 					= {};

		var gamesController 		= $controller('GamesController', { $scope: $scope, $httpBackend: $httpBackend, gamesResponseArray: null, templatesResponse: templatesResponse });

		var game 					= { minPlayers: 10, maxPlayers: 2, template: { id: 'Ox' }, templateName: 'Ox' };

		var acceptObject 			= { Accept: 'application/json, text/plain, */*' };

		$httpBackend
			.expectGET('https://mahjongmayhem.herokuapp.com/games?pageIndex=0&state=open', acceptObject)
			.respond(200);

		$httpBackend
			.expectGET('https://mahjongmayhem.herokuapp.com/games?pageIndex=0&state=playing', acceptObject)
			.respond(200);

		$httpBackend
			.expectGET('https://mahjongmayhem.herokuapp.com/games?pageIndex=0&state=finished', acceptObject)
			.respond(200);

		$httpBackend
			.expectGET('https://mahjongmayhem.herokuapp.com/games?pageIndex=0&player=null&state=open', acceptObject)
			.respond(200);

		$httpBackend
			.expectGET('https://mahjongmayhem.herokuapp.com/games?pageIndex=0&player=null&state=playing', acceptObject)
			.respond(200);

		$httpBackend
			.expectGET('https://mahjongmayhem.herokuapp.com/games?pageIndex=0&player=null&state=finished', acceptObject)
			.respond(200);

		$httpBackend
			.expectGET('https://mahjongmayhem.herokuapp.com/gameTemplates', acceptObject)
			.respond(200);

		$httpBackend
			.expectGET('partials/menu.html')
			.respond(200);

		$httpBackend
			.expectGET('partials/games/games.html')
			.respond(200);

		$httpBackend
			.expectGET('partials/games/games-open.html')
			.respond(200);

		gamesController.createNewGame(game);
		$httpBackend.flush(); 

		expect(gamesController.games).to.have.length(0);
	});

	it('should create a game with less minPlayers than maxPlayers', function(){

		var $scope 					= {};

		var gamesController 		= $controller('GamesController', { $scope: $scope, $httpBackend: $httpBackend, gamesResponseArray: null, templatesResponse: templatesResponse });

		var game 					= { minPlayers: 10, maxPlayers: 20, template: { id: 'Ox' }, templateName: 'Ox' };

		var acceptObject 			= { Accept: 'application/json, text/plain, */*' };

		$httpBackend
			.expectPOST('https://mahjongmayhem.herokuapp.com/games', game)
			.respond(200);

		$httpBackend
			.expectGET('https://mahjongmayhem.herokuapp.com/games?pageIndex=0&state=open', acceptObject)
			.respond(200);

		$httpBackend
			.expectGET('https://mahjongmayhem.herokuapp.com/games?pageIndex=0&state=playing', acceptObject)
			.respond(200);

		$httpBackend
			.expectGET('https://mahjongmayhem.herokuapp.com/games?pageIndex=0&state=finished', acceptObject)
			.respond(200);

		$httpBackend
			.expectGET('https://mahjongmayhem.herokuapp.com/games?pageIndex=0&player=null&state=open', acceptObject)
			.respond(200);

		$httpBackend
			.expectGET('https://mahjongmayhem.herokuapp.com/games?pageIndex=0&player=null&state=playing', acceptObject)
			.respond(200);

		$httpBackend
			.expectGET('https://mahjongmayhem.herokuapp.com/games?pageIndex=0&player=null&state=finished', acceptObject)
			.respond(200);

		$httpBackend
			.expectGET('https://mahjongmayhem.herokuapp.com/gameTemplates', acceptObject)
			.respond(200);

		$httpBackend
			.expectGET('partials/menu.html')
			.respond(200);

		$httpBackend
			.expectGET('partials/games/games.html')
			.respond(200);

		$httpBackend
			.expectGET('partials/games/games-open.html')
			.respond(200);

		gamesController.createNewGame(game);
		$httpBackend.flush();

		expect(gamesController.games).to.have.length(1);
	});
});