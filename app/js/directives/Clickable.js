module.exports = function (){
	return {
		restrict: 'A',
		scope: 'GameController',
		link: function (scope, element)	{
			element.bind('click', function (){
				if (scope.tile.matched)	{
					element.addClass('hidden');
				}

				if (scope.checkSelectable(scope.tile)){
					var index = scope.getSelection().indexOf(scope.tile);
					if (index > -1)	{
						scope.setMismatch(false);
						scope.setSelected(scope.tile, false);
						scope.getSelection().splice(index, 1);
					}else{
						if (scope.getSelection().length < 2){
							scope.setSelected(scope.tile, true);
							scope.addSelected(scope.tile);

							if (scope.getSelection().length == 2){
								if (scope.checkMatch(scope.getSelection()[0], scope.tile)){
									element.parent().children().removeClass('selected');
									element.removeClass('selected');
									scope.addToMatched(scope.getSelection());

									angular.forEach(scope.getSelection(), function (valueS){
										angular.forEach(element.parent().children(), function (valueE){
											if (valueE.id == valueS.tile._id){
												valueE.remove();
											}
										});
										valueS.matched = true;
								  	});

									scope.$apply();
							  		scope.resetSelection();
								}else{
									scope.setMismatch(true);
								}
							}
						}
					}
				}
				scope.$apply();
			});
		}
	};
};