module.exports = function (HttpLoader){
	return {
		getTemplates: function (callback){
			HttpLoader.get("/gameTemplates", function(err, templates){
				if(err){
					return callback(err);
				}

				return callback(err, templates);
			});
		}
	};
};