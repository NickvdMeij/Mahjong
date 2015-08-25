describe("Factories", function() {
	var GamesFactory;

	beforeEach(module('mahjong'));

	beforeEach(inject(function (_GamesFactory_)
	{
		GamesFactory = _GamesFactory_;
	}));

	it('Should return an array of games', function ()
	{
		GamesFactory.getOpenGames(function(err, games){
			expect(games).to.be.an('array');
		});
	});


	it('Should be of length 25', function ()
	{
		GamesFactory.getOpenGames(function(err, games){
			expect(games).to.have.length(25);
		});
	});
});