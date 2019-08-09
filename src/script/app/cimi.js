
  var 	app = angular.module("cimi", []);
	app.controller('cimiCtrl', function($scope,  $http) {
		var temp = this;

		this.init = function(){
			var temp = this;
			console.log("init");
		};

	});