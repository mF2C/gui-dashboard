
  var 	app = angular.module("userManagement", []);
	app.controller('userCtrl', function($scope,  $http) {
		var temp = this;
		
		$(".active").removeClass('active');
		$("#menuUserMgmt").addClass('active');
		
		this.init = function(){
			var temp = this;
			//console.log("init");
		};

	});