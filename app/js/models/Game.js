module.exports = function (Player, HttpLoader, User, $filter){

	function Game (gameData){
		if (gameData){
			this.setData(gameData);
		}
	};

	Game.prototype = {
		setData : function (gameData) {
			this.__v = gameData.__v;
			this._id = gameData._id;
			this.createdBy = new Player(gameData.createdBy);
			this.createdOn = gameData.createdOn;
			this.endedOn = gameData.endedOn;
			this.gameTemplate = gameData.gameTemplate;
			this.id = gameData.id;
			this.maxPlayers = gameData.maxPlayers;
			this.minPlayers = gameData.minPlayers;
			this.players = [];
			this.userJoined = false;
			this.playable = false;
			this.startedOn = gameData.startedOn;
			this.state = gameData.state;
			this.waitingToStart = (this.state == 'open');
			this.grid = [];
			this.matchedPairs = [];
			this.selection = [];

			if (gameData.players){
				for (var i = 0; i < gameData.players.length; i++){
					this.players.push(gameData.players[i]);

					if (gameData.players[i]._id == User.getEmail())	{
						this.userJoined = true;
					}
				}
			}

			this.canStart = (this.createdBy._id == User.getEmail() && this.minPlayers <= this.players.length);
			
			if (this.userJoined && this.state == 'playing')	{
				this.playable = true;
			}
		},
		join : function (){
			var game = this;

			HttpLoader.post("/Games/" + this.id + "/Players", {}, function (err, response){
				if(!err){
					game.setData(response);
				}
			});
		},
		start : function (){
			var game = this;

			HttpLoader.post("/Games/" + this.id + "/Start", {}, function (err, response){
				if(!err){
					game.setStarted();
				}
			});
		},
		setStarted : function (){
			this.state = "playing";
			this.waitingToStart = false;

			if (this.userJoined){
				this.playable = true;
			}
		},
		setFinished: function (){
			this.state = "finished";
			this.playable = false;
			this.endedOn = new Date();
			this.resetSelection();
		},
		setGrid : function (newGrid){
			this.grid = newGrid;
		},
		getGrid: function (){
			return this.grid;
		},
		addMatchedPair: function (matchedPair){
			this.matchedPairs.push(matchedPair);

			if (matchedPair[0].match){
				var player = this.getPlayerById(matchedPair[0].match.foundBy);
				player.foundMatch();
			}else{
				var player = this.getPlayerById(User.getEmail());
				player.foundMatch();
			}
		},
		getMatchedPairs: function (){
			return this.matchedPairs;
		},
		getSelection: function (){
			return this.selection;
		},
		addSelected: function (selectedTile){
			this.selection.push(selectedTile);
		},
		resetSelection: function (){
			angular.forEach(this.getSelection(), function (selectedTile){
				selectedTile.selected = false;
				selectedTile.mismatched = false;
			});

			this.selection = [];
		},
		getAdjacentTiles : function (tile){
			var grid = {
				left: [
					"0,0,-2",
					"0,-1,-2",
					"0,1,-2"
				],
				right: [
					"0,0,+2",
					"0,-1,+2",
					"0,1,+2"
				],
				onTop: [
					"1,0,0",
					"1,-1,0",
					"1,1,0",
					"1,0,-1",
					"1,0,1",
					"1,-1,-1",
					"1,-1,1",
					"1,1,-1",
					"1,1,1"
				]
			};

			var data = {};
			var gameGrid = this.grid;

			angular.forEach(grid, function (direction, directionKey){
				angular.forEach(direction, function (value, key){
					var positions = value.split(",");
					
					var posx = parseInt(parseInt(tile.xPos) + parseInt(positions[2]));
					var posy = parseInt(parseInt(tile.yPos) + parseInt(positions[1]));
					var posz = parseInt(parseInt(tile.zPos) + parseInt(positions[0]));

					if (gameGrid[posz] !== undefined){
						if (gameGrid[posz][posy] !== undefined){
							if (gameGrid[posz][posy][posx] !== undefined && !gameGrid[posz][posy][posx].matched){
								if (data[directionKey] === undefined){
									data[directionKey] = [];
								}
								data[directionKey].push(gameGrid[posz][posy][posx]);
							}
						}
					}
				});
			});

			return data;
		},
		checkSelectable: function (tile){
			var adjacentTiles = this.getAdjacentTiles(tile);

			return (this.playable && (((typeof(adjacentTiles.left) === 'undefined') || (typeof(adjacentTiles.right) === 'undefined')) && (typeof(adjacentTiles.onTop) === 'undefined')));
		},
		getPlayerById: function (playerId){
			for (var index = 0; index < this.players.length; index++){
				if (this.players[index]._id == playerId){
					return new Player(this.players[index]._id);
				}
			}

			return null;
		}
	};

	return Game;
};