
  var 	app = angular.module("eventStatus", []);
	app.controller('eventCtrl', function($scope,  $http) {
		var temp = this;

		$(".active").removeClass('active');
		$("#menuEventStatus").addClass('active');
		
		this.init = function(){
			var temp = this;
			//console.log("init");
		};

	});