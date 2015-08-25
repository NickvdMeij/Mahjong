module.exports						= function ($scope, User, GameFactory, TileFactory, SocketFactory, $stateParams, Game)
{
	GameFactory.getGame($stateParams.id, function(err, response){
		if(err){
			$scope.error = true;
		}

		$scope.game = new Game(response);

		if ($scope.game && $scope.game.id && !$scope.game.waitingToStart)
		{
			TileFactory.loadTiles($scope.game.id, function(err, response){
				TileFactory.mapTiles(response);

				TileFactory.loadMatchedTiles($scope.game.id, function (err, response){
					$scope.game.setGrid(TileFactory.mapMatchedTiles(response));

					var matchedTiles = TileFactory.getMatchedTiles();

					for (var matchedTileIndex = 0; matchedTileIndex < matchedTiles.length; matchedTileIndex++){
						$scope.game.addMatchedPair(matchedTiles[matchedTileIndex]);
					}
				});
			});
		}

		/*
		* Websockets
		*/

		SocketFactory.connect($scope.game.id, function(){
			SocketFactory.on('start', function (data){
				$scope.game.setStarted();

				TileFactory.loadTiles($scope.game.id, function(err, response){
					TileFactory.mapTiles(response);

					TileFactory.loadMatchedTiles($scope.game.id, function (err, response){
						$scope.game.setGrid(TileFactory.mapMatchedTiles(response));

						var matchedTiles = TileFactory.getMatchedTiles();

						for (var matchedTileIndex = 0; matchedTileIndex < matchedTiles.length; matchedTileIndex++){
							$scope.game.addMatchedPair(matchedTiles[matchedTileIndex]);
						}
					});
				});
			});

			SocketFactory.on('end', function (data)	{
				$scope.game.setFinished();
			});

			SocketFactory.on('playerJoined', function (data){
				$scope.game.players.push(data);
			});

			SocketFactory.on('match', function (data){
				console.log('match');
				var matchedPairs = $scope.game.getMatchedPairs();

				var matched = false;

				for (var pairIndex = 0; pairIndex < matchedPairs.length; pairIndex++){
					for (var tileIndex = 0; tileIndex < matchedPairs[pairIndex].length; tileIndex++){
						for (var dataIndex = 0; dataIndex < data.length; dataIndex++){
							if (matchedPairs[pairIndex][tileIndex]._id == data[dataIndex]._id){
								matched = true;
								dataIndex = data.length;
								tileIndex = matchedPairs[pairIndex].length;
								pairIndex = matchedPairs.length - 1;
							}
						}
					}
				}

				if (!matched){
					var pair = [];

					angular.forEach($scope.game.getGrid(), function (level){
						angular.forEach(level, function (row){
							angular.forEach(row, function (tile){
								for (var dataIndex = 0; dataIndex < data.length; dataIndex++){
									if (tile._id == data[dataIndex]._id){
										tile.match = data[dataIndex].match;
										tile.matched = true;
										pair.push(tile);
									}
								}
							});
						});
					});

					angular.forEach($scope.game.getSelection(), function (selectedTile){
						for (var dataIndex = 0; dataIndex < data.length; dataIndex++){
							if (selectedTile._id == data[dataIndex]._id){
								$scope.setSelected(selectedTile, false);
								$scope.setMismatch(false);
								$scope.game.getSelection().splice($scope.game.getSelection().indexOf(selectedTile), 1);
							}
						}
					});

					$scope.game.addMatchedPair(pair);
				}
			});
		});
	});

	$scope.checkSelectable = function (tile){
		return $scope.game.checkSelectable(tile);
	};

    $scope.addToMatched = function (tilePair){
    	TileFactory.setMatched($scope.game.id, tilePair, function(err, response){
			tilePair[0].match = response[0].match;
			tilePair[1].match = response[1].match;
    	});

    	$scope.game.addMatchedPair(tilePair);
    };

    $scope.getSelection = function (){
    	return $scope.game.getSelection();
    };

    $scope.addSelected = function (selectedTile){
    	$scope.game.addSelected(selectedTile);
    };

    $scope.resetSelection = function (){
    	$scope.game.resetSelection();
    };

    $scope.setSelected = function (tile, bool){
		tile.selected = bool;
	};

	$scope.setMismatch = function ( bool){
		angular.forEach($scope.game.getSelection(), function (tile)	{
			tile.mismatched = bool;
		});
	};

	$scope.checkMatch = function (firstTile, secondTile){
		if (firstTile.tile.suit == secondTile.tile.suit){
	 		if (firstTile.tile.suit != "Flower" && firstTile.tile.suit != "Season")	{
				return (firstTile.tile.name == secondTile.tile.name);
			}
			return true;
		}
		return false;
	};

	$scope.startGame = function(){
		GameFactory.startGame($scope.game.id, function(err, response){
			//???
			console.log("started the game");
		});
	};

	$scope.showStart = function(){
		if($scope.game && $scope.game.createdBy._id === User.getEmail()){
			if($scope.game.players.length >= $scope.game.minPlayers){
				if($scope.game.state === 'open'){
					return true;
				}
			}
		}

		return false;
	};

	$scope.joinGame = function(){
		GameFactory.joinGame($scope.game.id, function(err, response){
			//???
			console.log("joined the game");
		});
	};

	$scope.showJoin = function(){
		var joinable = true;

		if($scope.game){
			angular.forEach($scope.game.players, function(player){
				if(player._id === User.getEmail()){
					joinable = false;
				}
			});
		}

		if($scope.game && joinable && User.getEmail() && $scope.game.state === 'open'){
			if($scope.game.players.length < $scope.game.maxPlayers){
				return true;
			}
		}

		return joinable;
	};
};