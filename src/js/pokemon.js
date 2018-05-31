var pokemonApp = angular.module('ui.bootstrap.demo', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);

pokemonApp.service('pokemonService', ['$http', '$q', function($http, $q) {
	this.getPokeData = function() {
		var data = {};
		return $http({
			method: "GET",
			url: "http://pokeapi.salestock.net/api/v2/pokemon/?limit=151" //"http://pokeapi.co/api/v2/pokemon?limit=151"
		}).then(function mySuccess(response) {
			data = response;
			return $q.resolve(response.data.results);
		}, function myError(response) {
			data = response;
			console.log(response.statusText, "ERROR");
			return $q.resolve(response.data.results);
		});

	}
}]);

pokemonApp.filter('minLength', function() {
	return function(input, len, pad) {
		input = input.toString();
		if (input.length >= len) return input;
		else {
			pad = (pad || 0).toString();
			return new Array(1 + len - input.length).join(pad) + input;
		}
	};
});

angular.module('ui.bootstrap.demo').controller('PagerDemoCtrl', ['$scope', '$q', '$http', '$filter', 'pokemonService', function($scope, $q, $http, $filter, pokemonService) {
	$scope.totalItems = 151;
	$scope.currentPage = 1;
	$scope.itemsPerPage = 20;
	$scope.cols = 4; // column layout for desktop

	// make web service call here and fetch all data including page numbers
	pokemonService.getPokeData().then(function(response) {
		$scope.pokedata = response;
		$scope.pokemonPerPage = $scope.pokedata.slice((($scope.currentPage - 1) * $scope.itemsPerPage), (($scope.currentPage) * $scope.itemsPerPage));
		
		$scope.$watch('searchPokemon', function(query) {
			$scope.pokedata = query ? $filter('filter')($scope.pokedata, query) : $scope.pokedata;
			$scope.$$apply;
		});

	});

	$scope.range = function(max, step) {
		step = step || 1;
		var input = [];
		for (var i = 0; i <= max; i += step) {
			input.push(i);
		}
		return input;
	};
	
	
	
	


}])