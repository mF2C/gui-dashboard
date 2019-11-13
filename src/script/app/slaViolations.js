
  var 	app = angular.module("slaViolations", []);
	app.controller('slaCtrl', function($scope,  $http) {
		var temp = this;

		$(".active").removeClass('active');
		$("#menuSla").addClass('active');
		
		this.init = function(){
			var temp = this;
			//console.log("init");
		};

	});