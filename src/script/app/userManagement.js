
  var 	app = angular.module("userManagement", []);
	app.controller('userCtrl', function($scope,  $http) {
		var temp = this;

		this.init = function(){
			var temp = this;
			console.log("init");
		};

	});