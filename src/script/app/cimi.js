
  var 	app = angular.module("cimi", []);
	app.controller('cimiCtrl', function($scope,  $http) {
		var temp = this;

		$(".active").removeClass('active');
		$("#menuCimi").addClass('active');
		
		this.init = function(){
			var temp = this;
			//console.log("init");
		};

	});