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

pokemonApp.filter('searchFor', function(){

	// All filters must return a function. The first parameter
	// is the data that is to be filtered, and the second is an
	// argument that may be passed with a colon (searchFor:searchString)

	return function(arr, params){
		var totalItems;
		
		if(!params[0]){
			return arr;
		}

		var result = [];

		params[0] = params[0].toLowerCase();

		
		
		angular.forEach(params[1], function(item){
			if(item.name.search(params[0]) !== -1 || item.url.search(params[0].replace(/[#0]+/g,'')) !== -1){
				result.push(item);
			}

		});
		
		if (params[2]) {
			totalItems = params[2].totalItems;	// save total items
			params[2].totalItems = result.length;
		}
		
		if (params[2].searchString.length === 1) {
			params[2].totalItems = 151;
		}
		//console.log(result, result.length, params[0], "params2 = ", params[2].searchString);
		params[2].$$apply;
		return result;
	};

});

angular.module('ui.bootstrap.demo').controller('PagerDemoCtrl', ['$scope', '$q', '$http', '$filter', 'pokemonService', function($scope, $q, $http, $filter, pokemonService) {
	$scope.currentPage = 1;
	$scope.itemsPerPage = 20;
	$scope.cols = 4; // column layout for desktop
	$scope.searchPokemon = '';

	// make web service call here and fetch all data including page numbers
	pokemonService.getPokeData().then(function(response) {
		$scope.pokedata = response;
		$scope.totalItems = ($scope.pokedata.results) ? $scope.pokedata.results.length : 151;
		$scope.pokemonPerPage = $scope.pokedata.slice((($scope.currentPage - 1) * $scope.itemsPerPage), (($scope.currentPage) * $scope.itemsPerPage));
	});

	$scope.range = function(max, step) {
		step = step || 1;
		var input = [];
		for (var i = 0; i <= max; i += step) {
			input.push(i);
		}
		return input;
	};
	
	$scope.getImage = function(row) {
		return row.url.split("/")[row.url.split("/").length - 2];
	}
}])
