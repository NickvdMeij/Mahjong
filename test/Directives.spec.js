describe("Directives", function ()
{
	var tileDirective;
	var $compile;
	var $rootScope;

	beforeEach(module('mahjong'));

	beforeEach(module('templates/tile.html'));

	beforeEach(inject(function (_tileDirective_, _$compile_, _$rootScope_)
	{
		tileDirective 		= _tileDirective_;
		$compile 			= _$compile_;
		$rootScope 			= _$rootScope_;
	}));

	it('should render the tile directive', function ()
	{ 
		var $scope 			= $rootScope.$new();
		$scope.tile 		= { mismatched: true };

		var element 		= $compile('<div class="img-holder" ng-class="{\'mismatch\': tile.mismatched}"></div>')($scope);
		$scope.$digest();

		expect(element.attr("class")).to.have.string('mismatch');
	});
});