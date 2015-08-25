module.exports = function ($rootScope){
	var baseUrl	= "http://mahjongmayhem.herokuapp.com?gameId=";
	var socket = null;

	return {
		connect: function (gameId, callback){
			socket = io.connect(baseUrl + gameId);
			return callback();
		},
		on : function (eventName, callback)	{
			socket.on(eventName, function (){
				var args 	= arguments;

				$rootScope.$apply(function () {
					callback.apply(socket, args);
				});
			});
		},
		emit : function (eventName, data, callback)	{
			socket.emit(eventName, data, function (){
				var args = arguments;

				$rootScope.$apply(function (){
					if (callback) { callback.apply(socket, args); }
				});
			});
		}
	};
};