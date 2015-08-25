module.exports 								= function (HttpLoader, Game, User)
{
	return {
		getGame: function(id, callback){
			HttpLoader.get('/games/' + id, function(err, response){
				if(err) {
					return callback(err);
				}

				return callback(null, response);
			})
		},
        startGame: function(id, callback){
           HttpLoader.post('/games/' + id + '/start', {}, function(err, response){
               if(err){
                   return callback(err);
               }

               return callback(null, response);
           })
        },
        joinGame: function(id, callback){
            HttpLoader.post('/games/' + id + '/players', {}, function(err, response){
                if(err){
                    return callback(err);
                }

                return callback(null, response);
            })
        }
	}
};