
  var 	app = angular.module("eventStatus", []);
	app.controller('eventCtrl', function($scope,  $http) {
		var temp = this;

		this.init = function(){
			var temp = this;
			console.log("init");
		};

	});