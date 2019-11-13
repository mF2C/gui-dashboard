
  var 	app = angular.module("app",['ngRoute', 'home', 'cimi', 'eventStatus', 'userManagement', 'slaViolations', 'services']);
  app.config(function($sceDelegateProvider) {
	    $sceDelegateProvider.resourceUrlWhitelist([
	        // Allow same origin resource loads.
	        'self',
	    ]);
  });
	app.config(function($routeProvider) {
		//console.log($routeProvider);
		_now = Date.now();
	    $routeProvider.when("/", {    
					    	templateUrl: "templates/home.html?t=" + _now,
					        controller: "homeCtrl as home",
					        	init: "home.init();"})
	        		   .when("/home", {    
					    	templateUrl: "templates/home.html?t=" + _now,
					        controller: "homeCtrl as home",
				        	init: "home.init();"})
					   .when("/cimi",{
						   templateUrl: "templates/cimi.html?t=" + _now,
					        controller: "cimiCtrl",
					        controllerAs: "cimi"})
					   .when("/eventStatus",{
						   templateUrl: "templates/eventStatus.html?t=" + _now,
					        controller: "eventCtrl",
					        controllerAs: "event"})
					   .when("/userManagement",{
						   templateUrl: "templates/userManagement.html?t=" + _now,
					        controller: "userCtrl",
					        controllerAs: "user"})
					   .when("/slaViolations",{
						   templateUrl: "templates/slaViolations.html?t=" + _now,
					        controller: "slaCtrl",
					        controllerAs: "sla"})
					   .when("/services",{
						   templateUrl: "templates/services.html?t=" + _now,
					        controller: "servicesCtrl",
					        controllerAs: "services"})
					   ;
	});  
  app.controller('appCtrl', function($scope, $route, $routeParams, $location,  $http) {
		var temp = this;
		$scope.$route = $route;
	     $scope.$location = $location;
	     $scope.$routeParams = $routeParams;

		this.remoteHost = $location.host();
		this.guiUrls = {
				lmui: 'http://' + temp.remoteHost + ':5000/'
		}
	});
	