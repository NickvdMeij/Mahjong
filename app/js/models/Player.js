module.exports = function (){

	function Player (playerData){
		if (playerData)	{
			this.setData(playerData);
		}
	};

	Player.prototype = {
		setData: function (playerData){
			this.__v = playerData.__v;
			this._id = playerData._id;
			this.name = (playerData.name || playerData._id);
			this.numberOfMatches = 0;
		},
		foundMatch : function (){
			this.numberOfMatches += 2;
		}
	};

	return Player;
};