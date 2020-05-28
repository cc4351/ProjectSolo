		
			var WIDTH = window.innerWidth / 2;
			var HEIGHT = window.innerHeight;

			//center the d3 object in the middle of the right panel
			var translate = 'translate(' + (WIDTH / 2) + ',' + (HEIGHT / 2) + ')';
			
				
			
			var svgContainer = d3.select("#graph").append("svg")
							 .attr("width", 300)
							 .attr("height", 800);
//							 .attr('transform', translate);
			var svg2 = d3.select("#graph2").append("svg")
							 .attr("width", 300)
							 .attr("height", 800);
							 
			
			
			var nodeData = [{ x: 55, y: 59 },
							{ x: 48, y: 81 },
							{ x: 51, y: 34 },
							{ x: 74, y: 71 },
							{ x: 33, y: 58 },
							{ x: 76, y: 37 },
							{ x: 58, y: 96 },
							{ x: 34, y: 31 },
							{ x: 91, y: 68 },
							{ x:  22, y: 72 },
							{ x:  64, y:  24 },
							{ x: 76, y: 88 },
							{ x: 22, y: 47 },
							{ x: 86, y: 49 },
							{ x: 33, y: 88 }

						  ];
			
			
			var circleAttrs = {
				  cx: function(d) { return d.x*3; },
				  cy: function(d) { return d.y*3; },
				  id: function(d, i){return "n"+i;},
				  r: 7,
			  };
			
			
			//draw all the circles/nodes
			var nodes = svgContainer.selectAll("circle")
						  .data(nodeData)
						  .enter()
						  .append("circle")
						  .attr(circleAttrs);
						
		
			
			//if necessary, change the identifier to id instead of index
			//centralized
			var connect = [{from: 0, to: 1},
						   {from: 0, to: 2}, 
						   {from: 0, to: 3},
						   {from: 0, to: 4},
						   {from: 0, to: 5},
						   {from: 0, to: 6},
						   {from: 0, to: 7},
						   {from: 0, to: 8}, 
						   {from: 0, to: 9}, 
						   {from: 0, to: 10},
						   {from: 0, to: 11},
						   {from: 0, to: 12}, 
						   {from: 0, to: 13},
						   {from: 0, to: 14}]
			
			
			//decentralized
			var c2 = [{from: 0, to: 1},
							{from: 0, to: 2},
							{from: 0, to: 3},
							{from: 0, to: 4},
							{from: 2, to: 5},
							{from: 2, to: 10},
							{from: 2, to: 7},
							{from: 3, to: 13},
							{from: 3, to: 8},
							{from: 3, to: 11},
							{from: 1, to: 6},
							{from: 1, to: 14},
							{from: 4, to: 9},
							{from: 4, to: 12}
							];

			/*//distributed
			var connect = [{from: 0, to: 2},
							{from: 0, to: 10},
							{from: 0, to: 5},
							{from: 0, to: 3},
							{from: 0, to: 6},
							{from: 0, to: 1},
							{from: 0, to: 4},
							{from: 0, to: 7},
							{from: 0, to: 13},
							{from: 2, to: 7},
							{from: 2, to: 10},
							{from: 7, to: 10},
							{from: 4, to: 7},
							{from: 4, to: 12},
							{from: 4, to: 9},
							{from: 4, to: 14},
							{from: 4, to: 1},
							{from: 12, to: 7},
							{from: 12, to: 9},
							{from: 14, to: 9},
							{from: 14, to: 6},
							{from: 1, to: 14},
							{from: 1, to: 6},
							{from: 3, to: 6},
							{from: 3, to: 11},
							{from: 3, to: 8},
							{from: 11, to: 6},
							{from: 11, to: 8},
							{from: 3, to: 13},
							{from: 13, to: 8},
							{from: 13, to: 5},
							{from: 10, to: 5}];*/
			
			var lineData = [];
			
			/*
			javascript for loop tidbits: https://stackoverflow.com/questions/8681593/does-javascript-have-an-enhanced-for-loop-syntax-similar-to-javas
			*/
			for(i = 0; i<connect.length; i++){
				var pt1, pt2, x1, x2, y1, y2, len, tmp;
				pt1 = nodeData[connect[i].from];
				pt2 = nodeData[connect[i].to];
				x1 = pt1.x;
				y1 = pt1.y;
				x2 = pt2.x;
				y2 = pt2.y;
				//square runtime performance: https://stackoverflow.com/questions/26593302/whats-the-fastest-way-to-square-a-number-in-javascript/53663890
				len = Math.sqrt((x1-x2)**2 + (y1-y2)**2);
				tmp = {from: "n"+connect[i].from, to: "n"+connect[i].to, x1: x1, y1: y1, x2: x2, y2: y2, len: len, id: "l"+i};
//				console.log(tmp);
				lineData.push(tmp);
				if(pt1.hasOwnProperty("link")){
					pt1.link.push("l"+i);
				}else{
					pt1.link = ["l"+i];
				}
				if(pt2.hasOwnProperty("link")){
					pt2.link.push("l"+i);
				}else{
					pt2.link = ["l"+i];
				}
//				console.log("node 1: "+'#n'+tmp.from);
				d3.select('#'+tmp.from).attr("fill", "red");
				d3.select('#'+tmp.to).attr("fill", "red");
				
			}
				
			
			
			
			//console.log(nodeData);
			
			var lineAttrs = {
				x1: function(d){ return d.x1*3;},
				x2: function(d){ return d.x2*3;},
				y1: function(d){ return d.y1*3;},
				y2: function(d){ return d.y2*3;},
				stroke: "black",
				"stroke-width": 2,
				opacity: 0.9,
				id: function(d){return d.id;},
				pathLength: function(d){return d.len*3;}
			};
			
		
		    //draw all the lines/links
			lines = svgContainer.selectAll("line")
						.data(lineData)
						.enter()
						.append("line")
						.attr(lineAttrs);
//			console.log("length" + lineData.length)
			
			var currentScrollTop = d3.select('#currentScrollTop');
			var SCROLL_LENGTH = graph.scrollHeight/4;//scollable distance
			var scrollTop = 0;
    		var newScrollTop = 0;
			
			var lineScale = d3.scale.linear()//ref: https://www.dashingd3js.com/d3js-scales
								.domain([0, SCROLL_LENGTH])
								.range([0, 1])
								.clamp(true);
		
			//animation on connection
			lines.each(function(){
				var dashlen = d3.select(this).attr("pathLength");
				d3.select(this).attr("stroke-dasharray",  dashlen+ " "+dashlen).attr("opacity",0.5);

			});
			
			
			
			window.addEventListener('scroll', function(e){
				newScrollTop = window.scrollY;//get the latest scrollTop
//				console.log(newScrollTop);
				});
    
			//resetting all params - for resizing
			var setDimensions = function() {
			  WIDTH = window.innerWidth/4 ;
			  HEIGHT = window.innerHeight;
			  SCROLL_LENGTH = d3.select("#graph").node().scrollHeight/3;
			  lineScale.domain([0, SCROLL_LENGTH]);
			}
    
			var render = function() {
			  if (scrollTop != newScrollTop) {
				var diff = newScrollTop - scrollTop;
				scrollTop = newScrollTop//update scrollTop, needs to be done after container reacts to scroller.scroll

				//update separate clock handles
				var scales = lineScale(scrollTop);
//				console.log(scales);
//				var translate2 = 'translate(' + 0 + ',' + 0 + ')';
				lines.each(function(){
					var idx = parseInt(d3.select(this).attr("id").substring(1));
					var data1 = d3.select("#n" + connect[idx]["from"]);
					var data2 = d3.select("#n" + connect[idx]["to"]);
//					if(idx == 1){console.log("data", data1, data2);}
					var x1 = parseInt(data1.attr("cx"));
					var y1 = parseInt(data1.attr("cy"));
					var x2 = parseInt(data2.attr("cx"));
					var y2 = parseInt(data2.attr("cy"));
//					if(idx == 1){console.log("old", x1, y1, x2, y2);}
					var newx2 = x1 + (x2-x1)*scales;
					var newy2 = y1 + (y2-y1)*scales;
//					if(idx == 1){console.log(x1,(x2-x1)*scales, x1 + (x2-x1)*scales);}
//					if(idx == 1){console.log(x1, y1, newx2, newy2);}
					var newLen = Math.sqrt((x1-newx2)**2 + (y1-newy2)**2);
					d3.select(this).attr('x2', newx2)
									.attr('y2', newy2)
									.attr('x1', x1)
									.attr('y1', y1)
									.attr('stroke', "black")
									.attr('stroke-width', 2)
									.attr("opacity", 0.5)
									.attr("pathlength", newLen);

//					console.log(idx + " " + data1.attr("id") + " " + data2.attr("id"))
				});
				svgContainer.attr('transform','translate(' + 0 + ',' + newScrollTop+ ')');
//				console.log(newScrollTop);
//				lines.attr('transform', translate +' scale(' + scales + ')');
				 // 'translate(' + (WIDTH / 2) + ',' + (HEIGHT / 2)+ ')'
//				lines.attr("transform",  translate );
//				lines.attr("opacity", 0.5);

				//ref: https://www.tutorialspoint.com/d3js/d3js_svg_transformation.htm

				currentScrollTop.text(scrollTop)//not sure what this line is for, update currentScrollTop?
			  }

			  window.requestAnimationFrame(render)
			}
			window.requestAnimationFrame(render)

			window.onresize = setDimensions
			
			
			
			//click event
			//remember to fix the asymmetrical click 
			var nd, node, ind, data;
			nodes.each(function(){
				d3.select(this).on("click", function(){
					node = this.id;
//					console.log(node);
					ind = parseInt(String(node).replace('n', ''));
//					console.log(ind);
					data = nodeData[ind];
//					console.log(data);
					if(data.hasOwnProperty("link")){
						var links = data["link"];
//						console.log(links);
						for(i=0; i<links.length; i++){
							var lk = d3.select("#" + links[i]);
//							console.log(lk.attr("opacity"));
							var newOpacity =lk.attr("opacity")==0.5?0:0.5;
//							console.log("newOpac: "+ newOpacity);
							lk.attr("opacity", newOpacity);
						}
					}
				
				});
			});
		