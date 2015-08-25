describe("Filters", function ()
{
	var matchedFilter;
	var stateFilter;
	var playedGamesFromFilter;

	beforeEach(module('mahjong'));

	beforeEach(inject(function (_matchedFilter_,  _stateFilter_, _playedgamesfromFilter_)
	{
		matchedFilter 			= _matchedFilter_;
		stateFilter 			= _stateFilter_;
		playedGamesFromFilter 	= _playedgamesfromFilter_;
	}));

	/* matchedFilter */
	it('should turn an object of multi dimensional arrays into one array', function (done)
	{
		var arrayObj 			= {};
		arrayObj[0] 			= [[1,2,3],[4,5,6],[7,8,9]];
		arrayObj[1] 			= [[1,2,3],[4,5,6],[7,8,9]];
		arrayObj[2] 			= [[1,2,3],[4,5,6],[7,8,9]];
		arrayObj[3] 			= [[1,2,3],[4,5,6],[7,8,9]];

		var result 				= matchedFilter(arrayObj);
		
		expect(result).to.have.length(36);

		done();
	});

	var testData 				= [];
	testData.push({'state': 'open', 'players': [{'_id': 'test@avans.nl'}]});
	testData.push({'state': 'open', 'players': [{'_id': 'test1@avans.nl'}]});
	testData.push({'state': 'open', 'players': [{'_id': 'test1@avans.nl'}, {'_id': 'test2@avans.nl'}]});
	testData.push({'state': 'open', 'players': [{'_id': 'test@avans.nl'}, {'_id': 'test1@avans.nl'}]});

	testData.push({'state': 'playing', 'players': [{'_id': 'test@avans.nl'}]});
	testData.push({'state': 'playing', 'players': [{'_id': 'test1@avans.nl'}]});
	testData.push({'state': 'playing', 'players': [{'_id': 'test1@avans.nl'}, {'_id': 'test2@avans.nl'}]});
	testData.push({'state': 'playing', 'players': [{'_id': 'test@avans.nl'}, {'_id': 'test1@avans.nl'}]});

	testData.push({'state': 'finished', 'players': [{'_id': 'test@avans.nl'}]});
	testData.push({'state': 'finished', 'players': [{'_id': 'test1@avans.nl'}]});
	testData.push({'state': 'finished', 'players': [{'_id': 'test1@avans.nl'}, {'_id': 'test2@avans.nl'}]});
	testData.push({'state': 'finished', 'players': [{'_id': 'test@avans.nl'}, {'_id': 'test1@avans.nl'}]});

	/* stateFilter */
	it('should return 4 open games', function (done)
	{
		var result 				= stateFilter(testData, 'open');
		
		expect(result).to.have.length(4);

		done();
	});

	it('should return 4 playing games', function (done)
	{
		var result 				= stateFilter(testData, 'playing');
		
		expect(result).to.have.length(4);

		done();
	});

	it('should return 4 finished games ', function (done)
	{
		var result 				= stateFilter(testData, 'finished');
		
		expect(result).to.have.length(4);

		done();
	});

	/* playedGamesFromFilter */
	it('should return 2 open games played by player with id test@avans.nl', function (done)
	{
		var result 				= playedGamesFromFilter(testData, 'open', 'test@avans.nl');
		
		expect(result).to.have.length(2);

		done();
	});

	it('should return 3 open games played by player with id test1@avans.nl', function (done)
	{
		var result 				= playedGamesFromFilter(testData, 'open', 'test1@avans.nl');
		
		expect(result).to.have.length(3);

		done();
	});

	it('should return 3 playing games played by player with id test1@avans.nl', function (done)
	{
		var result 				= playedGamesFromFilter(testData, 'playing', 'test1@avans.nl');
		
		expect(result).to.have.length(3);

		done();
	});

	it('should return 1 finished games played by player with id test2@avans.nl', function (done)
	{
		var result 				= playedGamesFromFilter(testData, 'finished', 'test2@avans.nl');
		
		expect(result).to.have.length(1);

		done();
	});
});