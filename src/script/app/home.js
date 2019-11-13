
  var 	app = angular.module("home",['ngVis']);
	app.controller('homeCtrl', function($scope,  $http, VisDataSet) {
		var temp = this;
		$(".active").removeClass('active');
		$("#menuHome").addClass('active');
		
		
		var pop_x = 0, 
			pop_y = 0,
			pop_shown = false,
			pop_content = '';
		
		var agentObj = {}, 
			deviceID = null, 
			deviceIP = null,
			dynamicTemplate = null,
			agentTopology = [];
		
		function getIpFromTopology(_id /* topology id */){
			for(let i=0; i<agentTopology.length; i++){
				if(agentTopology[i].id == _id)
					return agentTopology[i].ip;
			}
			return null;
		}
		
		this.networkEvents = {
			click: function(event) {
				$('#info-popup').remove();
				let nodeid = -1; 
				if(event.nodes.length>0)
					nodeid = event.nodes[0];
				if(nodeid > 0 ){
					nodeip = getIpFromTopology(nodeid);
					if(nodeip != null){
						let _elem = '<div id="info-popup" style="position: absolute; right: 0px; padding: 20px; border: 1px solid rgba(0,0,0,.2); z-index: 1000"><a href="https://' +
									nodeip + '/dashboard/" target="_blank">' +
									nodeip + '</a></div>';
						$('.vis-network').prepend(_elem);
					}
				}
			}
		}

		this.init = function(){
			var temp = this;
			try {
				temp.getAgent()
				.then(function(response) {
					agentObj = response.data || {};
					
					// get childrens
					if(agentObj.agents.length>0){
						var _children = agentObj.agents[0].childrenIPs || [],
							_childrenDetails = [];
						for(var i=0; i<_children.length; i++){
							let _child = _children[i], 
								_detail = {
									ip: _child,
									url: 'https://' + _child + '/dashboard/'
								}
							_childrenDetails.push(_detail);
						}
						temp.childrenDetails = _childrenDetails;
					}
	
					temp.networkGraph();
					//temp.statusGraph();
					temp.getNodeData();
					//temp.getEntryPoint();
					// refresh dynamics
					setInterval(temp.refreshDynamics, 3000);
				})
			    .catch(function (err) {
					console.log('error', err);
				});	
			}
			catch(e){
				console.log('init error', e);
			}
		};
		
		this.getAgent = function(){
			var temp=this;
			var req = {
				method: 'GET',
				url: './api/api.php',
				headers: {
					'Content-Type': 'application/json'
				},
				params:{
					'action':'getAgent'
				}
			};
			return $http(req);
		};
		
		this.getEntryPoint = function(){
			var temp=this;
			var req = {
					  method: 'POST',
					  url: './api/api.php',
					  headers: {
						   'Content-Type': 'application/json'
						 },
						 params:{
							 	'action':'getEntryPoint'
						}
				};
				$http(req)
				.then(function(response) {
					//console.log(response);
				})
			    .catch(function (err) {
					//console.log(err);
				});	
		};
		
		
		/*
		this.getGraphData = function(){
			var temp=this;
			var req = {
					  method: 'POST',
					  url: './api/api.php',
					  headers: {
						   'Content-Type': 'application/json'
						 },
						 params:{
							 	'action':'getGraphData'
						}
				};
				$http(req)
				.then(function(response) {
					//console.log(response);
				})
			    .catch(function (err) {
					//console.log(err);
				});	
		};
		*/
		
		
		this.getNodeData = function(){
			var temp=this,
				_device = null,
				_dynamic = null;
			
			try {
				if(agentObj.agents.length>0){
					var _self = agentObj.agents[0];
					deviceID = _self.device_id;
					deviceIP = _self.device_ip;
					// get agent properties
					let req = {
						  method: 'GET',
						  url: './script/sample/nodeProperties.tmpl.json',
						  headers: {
							   'Content-Type': 'application/json'
						 }
					};
					$http(req)
					.then(function(response) {
						var _props = response.data;
						for(var i=0; i<_props.length; i++){
							_props[i].value = _self[_props[i].key] || "";
						}
						temp.nodeProperties = _props;
						
						/*
						let req = {
							  method: 'GET',
							  url: './script/sample/L-device.json',
							  headers: {
								   'Content-Type': 'application/json'
							 }
						};
						*/
						var req = {
							method: 'GET',
							url: './api/api.php',
							headers: {
								'Content-Type': 'application/json'
							},
							params:{
								'action':'getDevice'
							}
						};
						return $http(req);
					})
					.then(function(response) {
						var _deviceObj = response.data, 
							_devices = _deviceObj.devices || [];
						for(var i=0; i<_devices.length; i++){
							_device = _devices[i];
							if(_device.deviceID == deviceID)
								break;
						}
						if(_device != null){
							let req = {
								method: 'GET',
								url: './script/sample/nodeTechDetails.tmpl.json',
								headers: {
									'Content-Type': 'application/json'
								}
							};
							return $http(req);
						}
					})
					.then(function(response) {
						var _details = response.data;
						for(var i=0; i<_details.length; i++){
							_details[i].value = _device[_details[i].key] || "";
						}
						temp.nodeTechDetails = _details;
						
						// get device dynamics
						if(deviceIP != null){
							let req = {
								method: 'GET',
								url: './api/api.php',
								headers: {
									'Content-Type': 'application/json'
								},
								params:{
									'action':'deviceDynamic'
								}
							};
							return $http(req);
						}
					})
					.then(function(response) {
						// dynamic
						let _dynamicObj = response.data, 
							_dynamics = _dynamicObj.deviceDynamics || [];
						for(var i=0; i<_dynamics.length; i++){
							_dynamic = _dynamics[i];
							if(_dynamic.wifiAddress == deviceIP || _dynamic.ethernetAddress == deviceIP)
								break;
						}
						if(_dynamic != null){
							let req = {
								method: 'GET',
								url: './script/sample/nodeDynamic.tmpl.json',
								headers: {
									'Content-Type': 'application/json'
								}
							};
							return $http(req);
						}
					})
					.then(function(response) {
						dynamicTemplate = response.data;
						var _dyndata =  dynamicTemplate.slice();
						for(var i=0; i<_dyndata.length; i++){
							_dyndata[i].value = _dynamic[_dyndata[i].key] || "";
						}
						temp.nodeDynamics = _dyndata;
					})
				    .catch(function (err) {
						console.log('CIMI error', err);
					});	
				}
			}
			catch(e){
				console.log('get node data error', e);
			}
		};
		
		this.refreshDynamics = function() {
			var temp = this;
			// get device dynamics
			if(deviceIP != null){
				let req = {
					method: 'GET',
					url: './api/api.php',
					headers: {
						'Content-Type': 'application/json'
					},
					params:{
						'action':'deviceDynamic'
					}
				};
				$http(req)
				.then(function(response) {
					// dynamic
					let _dynamicObj = response.data, 
						_dynamics = _dynamicObj.deviceDynamics || [];
					for(var i=0; i<_dynamics.length; i++){
						_dynamic = _dynamics[i];
						if(_dynamic.wifiAddress == deviceIP || _dynamic.ethernetAddress == deviceIP)
							break;
					}
					if(_dynamic != null && dynamicTemplate != null){
						var _dyndata = dynamicTemplate.slice();
						for(var i=0; i<_dyndata.length; i++){
							_dyndata[i].value = _dynamic[_dyndata[i].key] || "";
						}
						temp.nodeDynamics = _dyndata;
					}
				})
			    .catch(function (err) {
					console.log('CIMI error', err);
				});	
			}
		}
		
		
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
		   
			var _topology = {
					nodes:[],
					edges: []
			};
			var nodeCount = agentObj.count || 0; 
			if(nodeCount>0){
				// the node itself;
				var _self = agentObj.agents[0];
				_topology.nodes.push({
					id: 0,
					label: (_self.isLeader? "Leader\n\n": "Agent\n\n") + _self.device_ip,
					shape: "circle", 
					color: _self.isLeader? "orange": "#00ccFF",
					level:0
				});
				agentTopology.push({id: 0, ip: _self.device_ip});
				var _children = _self.childrenIPs || [];
				for(var i=0; i<_children.length; i++){
					var _child = _children[i], 
						_id = i+1;
					_topology.nodes.push({
						id: _id,
						label: "Child\n\n"+_child,/* _child.isLeader? "L": "C",*/
						shape: "circle", 
						color: _child.isLeader? "orange": "#00ccFF",
						level: 1
					});
					_topology.edges.push({"from": 0,"to": _id});
					agentTopology.push({id: i+1, ip: _child});
				}
			}
			temp.data = _topology;
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