
  var 	app = angular.module("services", []);
	app.controller('servicesCtrl', function($scope,  $http) {
		var temp = this;

		$(".active").removeClass('active');
		$("#menuServices").addClass('active');
		
		this.init = function(){
			var temp = this;
			//console.log("init");
			//console.log($("#page").contents());
		};

	});