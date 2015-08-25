module.exports = function (HttpLoader){
	var tiles;
	var matchedTiles;

	function mapTiles (response, matched){
		//Reset current tiles;
		if (!matched){
			tiles = [];
			matchedTiles = [];
		}

		for (var l = 0; l < response.length; l++)
		{
			var xPos = response[l].xPos;
			var yPos = response[l].yPos;
			var zPos = response[l].zPos;

			if (tiles[zPos] === undefined){
				tiles[zPos] = [];
			}

			if(tiles[zPos][yPos] === undefined)	{
				tiles[zPos][yPos] = [];
			}

			response[l].selected = false;
			response[l].mismatched = false;
			response[l].matched = matched;
			tiles[zPos][yPos][xPos] = response[l];

			if (matched){
				matchedTiles.push(response[l]);
			}
		}

		if (matched){
			pairMatchedTiles();
		}

		return tiles;
	}

	function pairMatchedTiles (){
		var pairTiles = [];
		var tilePaired = false;

		for (var index = 0; index < matchedTiles.length; index++){
			tilePaired = false;

			for (var pairIndex = 0; pairIndex < pairTiles.length; pairIndex++){
				if (matchedTiles[index]._id == pairTiles[pairIndex][0]._id || matchedTiles[index]._id == pairTiles[pairIndex][1]._id){
					tilePaired = true;
					break;
				}
			}

			if (!tilePaired){
				for (var otherIndex = 0; otherIndex < matchedTiles.length; otherIndex++){
					if (matchedTiles[index].match.otherTileId == matchedTiles[otherIndex]._id){
						pairTiles.push([ matchedTiles[index], matchedTiles[otherIndex] ]);
						break;
					}
				}
			}
		}

		matchedTiles = pairTiles;
	}

	return {
		loadTiles: function (gameId, callback){
			HttpLoader.get("/Games/" + gameId + "/Tiles", function(err, response){
				if(err){
					return callback(err);
				}

				return callback(null, response);
			});
		},
		loadMatchedTiles: function (gameId, callback){
			HttpLoader.get("/Games/" + gameId + "/Tiles/matches", function(err, response){
				if(err){
					return callback(err);
				}

				return callback(null, response);
			});
		},
		mapTiles: function (response){
			return mapTiles(response, false);
		},
		mapMatchedTiles: function (response){
			return mapTiles(response, true);
		},
		getTiles: function (){
		  return tiles;
		},
		getMatchedTiles: function (){
			return matchedTiles;
		},
		setMatched: function(gameId, tilePair, callback){
			HttpLoader.post("/Games/" + gameId + "/Tiles/matches", {tile1Id: tilePair[0]._id, tile2Id: tilePair[1]._id}, function(err, response){
				if(err){
					return callback(err);
				}

				return callback(null, response);
			});
		}
	};
};

