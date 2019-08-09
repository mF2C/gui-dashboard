
  var 	app = angular.module("app",['ngRoute', 'home', 'cimi', 'eventStatus', 'userManagement', 'slaViolations', 'services']);
  app.config(function($sceDelegateProvider) {
	    $sceDelegateProvider.resourceUrlWhitelist([
	        // Allow same origin resource loads.
	        'self',
	        // Allow loading from your templates domain
	        'https://10.39.252.40/sm/**',
	        'http://php-int.pre.tiscali.sys/melita/**'
	        
	    ]);
  });
	app.config(function($routeProvider) {
		console.log($routeProvider);
	    $routeProvider.when("/", {    
					    	templateUrl: "templates/home.html",
					        controller: "homeCtrl as home",
					        	init: "home.init();"})
	        		   .when("/home", {    
					    	templateUrl: "templates/home.html",
					        controller: "homeCtrl as home",
				        	init: "home.init();"})
					   .when("/cimi",{
						   templateUrl: "templates/cimi.html",
					        controller: "cimiCtrl",
					        controllerAs: "cimi"})
					   .when("/eventStatus",{
						   templateUrl: "templates/eventStatus.html",
					        controller: "eventCtrl",
					        controllerAs: "event"})
					   .when("/userManagement",{
						   templateUrl: "templates/userManagement.html",
					        controller: "userCtrl",
					        controllerAs: "user"})
					   .when("/slaViolations",{
						   templateUrl: "templates/slaViolations.html",
					        controller: "slaCtrl",
					        controllerAs: "sla"})
					   .when("/services",{
						   templateUrl: "templates/services.html",
					        controller: "servicesCtrl",
					        controllerAs: "services"})
					   ;
	    		
	                //  .otherwise({redirectTo: "/utenti"});
	});  
  app.controller('appCtrl', function($scope, $route, $routeParams, $location,  $http) {
		var temp = this;
//		console.log($route);
//		console.log($location);
		$scope.$route = $route;
	     $scope.$location = $location;
	     $scope.$routeParams = $routeParams;
	    
	});
	