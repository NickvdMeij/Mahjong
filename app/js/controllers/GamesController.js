module.exports	= function ($scope, TemplateFactory, GamesFactory, $state) {
	TemplateFactory.getTemplates(function(err, templates){
		$scope.templates = templates;
	});

	$scope.isOwner = function(game){
		if(game.createdBy === User.getEmail()){
			return true;
		}else{
			return false;
		}
	};

	$scope.game = {
		template: null,
		minPlayers: 1,
		maxPlayers: 3
	};

	$scope.createNewGame = function (){
		$scope.game.templateName = $scope.game.template.id;
	    if ($scope.game.minPlayers <= $scope.game.maxPlayers){
			GamesFactory.createNewGame($scope.game, function (err){
				if(err){
					console.warn(err);
				}

				$state.go("main.games.open");
			});
		}
	};
};