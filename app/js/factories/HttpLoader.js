module.exports = function ($http){
	var baseUrl = "https://mahjongmayhem.herokuapp.com";

	return {
		get: function (url, callback){
			$http.get(baseUrl + url, {
                cache: false
            })
				.success(function (response){
					return callback(null, response)
				})
                .error(function (response){
                    return callback({
                        status: response.code,
                        message: response.message
                    });
                });
		},
		post: function (url, data, callback){

			$http.post(baseUrl + url, JSON.stringify(data))
                .success(function (response){
                    return callback(null, response)
                })
                .error(function (response){
                    return callback({
                        status: response.code,
                        message: response.message
                    });
                });
		}
	};
};