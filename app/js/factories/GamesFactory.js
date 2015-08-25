module.exports = function (HttpLoader, Game, User){

    return {
        getOpenGames: function(callback, pageSize, pageIndex){
            if(!pageSize || pageSize <= 0){
                pageSize = 25;
            }

            if(!pageIndex || pageIndex < 0){
                pageIndex = 0;
            }

            HttpLoader.get('/games?pageSize='+ pageSize +'&pageIndex='+ pageIndex + '&state=open', function(err, response){
                if(err) {
                    return callback(err);
                }

                return callback(null, response);
            });
        },
        getPlayingGames: function(callback, pageSize, pageIndex){
            if(!pageSize || pageSize <= 0){
                pageSize = 25;
            }

            if(!pageIndex || pageIndex < 0){
                pageIndex = 0;
            }

            HttpLoader.get('/games?pageSize='+ pageSize +'&pageIndex='+ pageIndex + '&state=playing', function(err, response){
                if(err) {
                    return callback(err);
                }

                return callback(null, response);
            });
        },
        getFinishedGames: function(callback, pageSize, pageIndex){
            if(!pageSize || pageSize <= 0){
                pageSize = 25;
            }

            if(!pageIndex || pageIndex < 0){
                pageIndex = 0;
            }

            HttpLoader.get('/games?pageSize='+ pageSize +'&pageIndex='+ pageIndex + '&state=finished', function(err, response){
                if(err) {
                    return callback(err);
                }

                return callback(null, response);
            });
        },
        getOwnOpenGames: function(callback, pageSize, pageIndex){
            if(!pageSize || pageSize <= 0){
                pageSize = 25;
            }

            if(!pageIndex || pageIndex < 0){
                pageIndex = 0;
            }

            HttpLoader.get('/games?pageSize='+ pageSize +'&pageIndex='+ pageIndex + '&state=open&player=' + User.getEmail(), function(err, response){
                if(err) {
                    return callback(err);
                }

                return callback(null, response);
            });
        },
        getOwnPlayingGames: function(callback, pageSize, pageIndex){
            if(!pageSize || pageSize <= 0){
                pageSize = 25;
            }

            if(!pageIndex || pageIndex < 0){
                pageIndex = 0;
            }

            HttpLoader.get('/games?pageSize='+ pageSize +'&pageIndex='+ pageIndex + '&state=playing&player=' + User.getEmail(), function(err, response){
                if(err) {
                    return callback(err);
                }

                return callback(null, response);
            });
        },
        getOwnFinishedGames: function(callback, pageSize, pageIndex){
            if(!pageSize || pageSize <= 0){
                pageSize = 25;
            }

            if(!pageIndex || pageIndex < 0){
                pageIndex = 0;
            }

            HttpLoader.get('/games?pageSize='+ pageSize +'&pageIndex='+ pageIndex + '&state=finished&player=' + User.getEmail(), function(err, response){
                if(err) {
                    return callback(err);
                }

                return callback(null, response);
            });
        },
        createNewGame: function(game, callback){
            HttpLoader.post('/games', game, function(err, response){
               if(err){
                   return callback(err);
               }

                return callback(null, response);
            });
        }

    };
};