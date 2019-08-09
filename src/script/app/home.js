
  var 	app = angular.module("home",['ngVis']);
	app.controller('homeCtrl', function($scope,  $http, VisDataSet) {
		var temp = this;
		$(".active").removeClass('active');
		$("#menuHome").addClass('active');
		
		this.init = function(){
			var temp = this;
			console.log("init");
			temp.networkGraph();
			//temp.statusGraph();
			temp.getNodeData();
				
				
		};
		
		this.getNodeData = function(){
			var temp=this;
			var req = {
					  method: 'POST',
					  url: './script/sample/nodeProperties.json',
					  headers: {
						   'Content-Type': 'application/json'
						 }
					 };
				$http(req)
				.then(function(response) {
					temp.nodeProperties=response.data;
				})
			    .catch(function (err) {
					console.log(err);
				});	

				 req = {
						  method: 'POST',
						  url: './script/sample/nodeTechDetails.json',
						  headers: {
							   'Content-Type': 'application/json'
							 }
						 };
					$http(req)
					.then(function(response) {
						temp.nodeTechDetails=response.data;
					})
				    .catch(function (err) {
						console.log(err);
					});	
		};
	    this.networkGraph = function(){
	    	var temp = this;
		    temp.options = {
		    		width: '100%',
		    		height: '400px',
		        	edges:{
		    	    	arrows: {
		    		      to:     {enabled: true, scaleFactor:1, type:'arrow'},
		    		      middle: {enabled: false, scaleFactor:1, type:'arrow'},
		    		      from:   {enabled: false, scaleFactor:1, type:'arrow'}
		    	    	}
		        	},
		        	layout: {
		                    hierarchical: {
		                        direction: "UD"
		                    }
		                   },
		        	nodes:{
		    		    color: {
		    		      border: '#2B7CE9',
		    		      background: '#D2E5FF',
		    		      highlight: {
		    		        border: '#2B7CE9',
		    		        background: '#D2E5FF'
		    		      },
		    		      hover: {
		    		        border: '#2B7CE9',
		    		        background: '#D2E5FF'
		    		      }
		    		   }
		        	}
		        };
		   
		    var req = {
					  method: 'POST',
					  url: './script/sample/dataTopology.json',
					  headers: {
						   'Content-Type': 'application/json'
						 }
					 };
				$http(req)
				.then(function(response) {
					temp.data=response.data;
				})
			    .catch(function (err) {
					console.log(err);
				});	

		    
	    	
	    };
		
	    this.statusGraph = function(){
	    	var temp = this;
	    	temp.names = ['CPU', 'MEM', 'DISK'];
	    	temp.groups = new vis.DataSet();
	    	temp.groups.add({
	            id: 0,
	            content: temp.names[0],
	            options: {
	                drawPoints: {style: 'circle',
	                    size: 10
	                }
	            }});

	    	temp.groups.add({
	            id: 1,
	            content: temp.names[1],
	            options: {
	                drawPoints: {style: 'circle',
	                    size: 10
	                }
	            }});

	    	temp.groups.add({
	            id: 2,
	            content: temp.names[2],
	            options: {
	                drawPoints: {style: 'circle',
	                    size: 10
	                }
	            }
	        });


	    	temp.items = [
	            {x: '2014-06-12 08:00:00', y: 24 , group: 0},
	            {x: '2014-06-12 09:00:00', y: 20, group: 0},
	            {x: '2014-06-12 10:00:00', y: 15, group: 0},
	            {x: '2014-06-12 11:00:00', y: 25, group: 0},
	            {x: '2014-06-12 12:00:00', y: 28, group: 0},
	            {x: '2014-06-12 08:00:00', y: 30, group: 1},
	            {x: '2014-06-12 09:00:00', y: 34, group: 1},
	            {x: '2014-06-12 10:00:00', y: 36, group: 1},
	            {x: '2014-06-12 11:00:00', y: 35, group: 1},
	            {x: '2014-06-12 12:00:00', y: 38, group: 1},
	            {x: '2014-06-12 08:00:00', y: 39, group: 2},
	            {x: '2014-06-12 09:00:00', y: 43, group: 2},
	            {x: '2014-06-12 10:00:00', y: 45, group: 2},
	            {x: '2014-06-12 11:00:00', y: 48, group: 2},
	            {x: '2014-06-12 12:00:00', y: 50, group: 2}
	        ];

	    	temp.dataStatus = {items: new vis.DataSet(this.items), groups: this.groups};
	    	temp.optionsStatus = {
	            dataAxis: {showMinorLabels: false},
	            legend: {left:{position:"top-right"}},
	            start: '2014-06-12 07:00',
	            end: '2014-06-12 14:00'
	        };	
	    };
	});