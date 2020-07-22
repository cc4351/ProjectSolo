//initialize svgs and bind with DOM elements
var svg0 = d3.select("#growth").append("svg")
				 .attr("width", $(growth).width())
				 .attr("height", $(growth).height())
				 .attr("x", 0)
				 .attr("y", 0)
				 .attr("viewBox", "0 0 "+ $(growth).width() + " "+$(growth).height())
				 .attr("preserveAspectRatio", "xMinYMin meet")
				 .attr("id", "svg0");


var svg1 = d3.select("#graph1").append("svg")
				 .attr("width", $(graph1).width())
				 .attr("height", $(graph1).height())
				 .attr("x", 0)
				 .attr("y", 0)
				 .attr("viewBox", "0 0 "+ $(graph1).width() + " "+$(graph1).height())
				 .attr("preserveAspectRatio", "xMinYMin meet")
				 .attr("id", "svg1");
		

var svg2 = d3.select("#graph2").append("svg")
				 .attr("width", $(graph2).width())
				 .attr("height", $(graph2).height())
				 .attr("x", 0)
				 .attr("y", 0)
				 .attr("viewBox", "0 0 "+ $(graph2).width() + " "+$(graph2).height())
				 .attr("preserveAspectRatio", "xMinYMin meet")
				 .attr("id", "svg2");

var svg3 = d3.select("#graph3").append("svg")
				 .attr("width", $(graph3).width())
				 .attr("height", $(graph3).height())
				 .attr("x", 0)
				 .attr("y", 0)
				 .attr("viewBox", "0 0 "+ $(graph3).width() + " "+$(graph3).height())
				 .attr("preserveAspectRatio", "xMinYMin meet")
				 .attr("id", "svg3");


//nodeCoordinates
var nodeData = [{ x: 55, y: 59 },
				{ x: 48, y: 81 },
				{ x: 51, y: 34 },
				{ x: 74, y: 71 },
				{ x: 33, y: 58 },
				{ x: 76, y: 37 },
				{ x: 58, y: 96 },
				{ x: 34, y: 31 },
				{ x: 91, y: 68 },
				{ x: 22, y: 72 },
				{ x: 64, y: 24 },
				{ x: 76, y: 88 },
				{ x: 22, y: 47 },
				{ x: 86, y: 49 },
				{ x: 33, y: 88 }
			  ];


//if necessary, change the identifier to id instead of index
//centralized connections
var c1 = [{from: 0, to: 1},
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


//decentralized connections
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
			{from: 4, to: 12},
			{from: 2, to: 4},
			{from: 3, to: 1}
			];


//distributed connections
var c3 = [{from: 0, to: 2},
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
			{from: 10, to: 5}];


var mulFactor = 3;

//multiply the xy coordinates by mulFactor
function adjustCoord(nodeData, mulFactor){
	for(let i =0; i<nodeData.length; i++){
		nodeData[i].x *= mulFactor;
		nodeData[i].y *= mulFactor;
	}
	return nodeData;
}

var crimson = "rgb(204, 51, 51)";

//create lines and adjust node locations
function cLine(connect, nData, idx, mulFactor=1){
	var lineData = [];
	var nodeData = nData;
	var sumLen = 0;
	nodeData = adjustCoord(nodeData, mulFactor);
	for(let i = 0; i<connect.length; i++){
		var pt1, pt2, x1, x2, y1, y2, len, tmp;
		pt1 = nodeData[connect[i].from];
		pt2 = nodeData[connect[i].to];
		x1 = pt1.x;
		y1 = pt1.y;
		x2 = pt2.x;
		y2 = pt2.y;
		//calculate full length of link
		len = Math.sqrt((x1-x2)**2 + (y1-y2)**2);
		sumLen += len;//for the cumulative length
		//link-related information
		tmp = {from: idx+"_"+"n"+connect[i].from, to: idx+"_"+"n"+connect[i].to, x1: x1, y1: y1, x2: x2, y2: y2, len: len, id: idx+"_"+"l"+i};
		lineData.push(tmp);
		//add the link information to nodes as well
		if(pt1.hasOwnProperty("link")){
			pt1.link.push(idx+"_"+"l"+i);
		}else{
			pt1.link = [idx+"_"+"l"+i];
			pt1.color = crimson;
		}
		if(pt2.hasOwnProperty("link")){
			pt2.link.push(idx+"_"+"l"+i);
		}else{
			pt2.link = [idx+"_"+"l"+i];
			pt2.color = crimson;
		}
	}
	return [lineData, nodeData, sumLen];
}

//see https://stackoverflow.com/a/5344074/12144813 for JS shallow/deep copy
var lineData1, nodeData1, lineData2, nodeData2, lineData3, nodeData3, sumLen1, sumLen2, sumLen3;
nodeData1 = JSON.parse(JSON.stringify(nodeData));
nodeData2 = JSON.parse(JSON.stringify(nodeData));
nodeData3 = JSON.parse(JSON.stringify(nodeData));
[lineData1, nodeData1, sumLen1] = cLine(c1, nodeData1, "svg1", mulFactor);
[lineData2, nodeData2, sumLen2] = cLine(c2, nodeData2, "svg2", mulFactor);
[lineData3, nodeData3, sumLen3] = cLine(c3, nodeData3, "svg3", mulFactor);


//for svg0 --> spiral appearance of nodes 
var centroid = 0;//center of the spiral
function cDist(centroid, nData){
	var len;
	var max = 0;
	var cX = nData[centroid].x;
	var cY = nData[centroid].y;
	for(let i = 0; i<nData.length; i++){
		len = Math.sqrt((nData[i].x-cX)**2 + (nData[i].y-cY)**2);
		max = len>max?len:max;
		nData[i].cDist = len;
	}

	return [nData, max];
}

var nodeData0 = JSON.parse(JSON.stringify(nodeData));
nodeData0 = adjustCoord(nodeData0, mulFactor);
var maxDist;
[nodeData0, maxDist] = cDist(centroid, nodeData0);
//sort nodeData0 by distance from center
nodeData0.sort(function (a, b){
    return a.cDist-b.cDist;
});


var lineAttrs = {
	x1: function(d){ return d.x1;},
	x2: function(d){ return d.x2;},
	y1: function(d){ return d.y1;},
	y2: function(d){ return d.y2;},
	from: function(d){ return d.from;},
	to: function(d){ return d.to;},
	stroke: "black",
	"stroke-width": 2,
	// opacity: 0.5,
	id: function(d){return d.id;},
	standardLen: function(d){return d.len;}
};

function drawLine(svgC, lData, lAttrs){
	lines = svgC.selectAll("line")
			.data(lData)
			.enter()
			.append("line")
			.attr(lAttrs);
	return lines;
}

var lines1 = drawLine(svg1, lineData1, lineAttrs);
var lines2 = drawLine(svg2, lineData2, lineAttrs);
var lines3 = drawLine(svg3, lineData3, lineAttrs);

var circleAttrs = {
	  cx: function(d) { return d.x; },
	  cy: function(d) { return d.y; },
	  id: function(d, i){return "n"+i;},
	  fill: function(d){
		  if (d.color){
			  return d.color;
		  }else{
			  return "black";
		  }
	  },
	  cDist: function(d){
		  if(d.cDist){
			  return d.cDist;
		  }
	  },
	  r: 7,
  };

function drawCircle(svgC, nData, cAttrs, idx){
	var nodes = svgC.selectAll("circle")
			  .data(nData)
			  .enter()
			  .append("circle")
			  .attr(cAttrs);
	nodes.each(function(){
		var id = idx +"_" + d3.select(this).attr("id");
		d3.select(this).attr("id", id);
	});

	return nodes;
}
var nodes0 = drawCircle(svg0, nodeData0, circleAttrs, "svg0");
var nodes1 = drawCircle(svg1, nodeData1, circleAttrs, "svg1");
var nodes2 = drawCircle(svg2, nodeData2, circleAttrs, "svg2");
var nodes3 = drawCircle(svg3, nodeData3, circleAttrs, "svg3");

nodes0.attr("opacity", 0);

//-----------------END OF NODE/LINK DRAWING-----------------------------

//requires some fixing later
var base0 = $("#intro").show().length==0?0:$(intro).height();
var base1 = $("#growth").show().length==0?base0:base0+$(growth).height();
var frameHeight = $("#graph1").height();
var scroll_length = frameHeight/4;
var lineScale = d3.scale.linear()//ref: https://www.dashingd3js.com/d3js-scales
				  .domain([0, scroll_length])
				  .range([0, 1])
				  .clamp(true);
var scrollTop = 0;
var newScrollTop = 0;
var currentScrollTop = d3.select('#currentScrollTop');
var nodeGray = "rgb(100, 100, 100)";
var nodeGreen = "rgb(1, 41, 92)";

window.addEventListener('scroll', function(e){
	newScrollTop = window.scrollY;//get the latest 
});

var segment = $(growth).height()/(nodes0[0].length+7);
var idx, tol;
//set the threshold for appearance for each node in svg0
nodes0.each(function(){
	idx = parseInt(this.id.split('_')[1].replace('n', ''));
	tol = idx*segment;
	d3.select(this).attr("tol", tol+base0);
});

var bluePts = [6, 10];
var numV = nodeData.length;
//implement a DFS path search here
//ref: https://www.geeksforgeeks.org/count-total-ways-to-reach-destination-from-source-in-an-undirected-graph/?ref=leftbar-rightbar
function countPaths(conn, numV, i, sink, visited){
	if (i == sink) { 
        return 1; 
    }
    var total = 0; 
    for(let j = 0; j < numV; j++) { 
        if (conn[i][j] == 1 && !visited[j]) { 
            visited[j] = true; 
            // Recursive function, for count ways
            total += countPaths(conn, numV, j, sink, visited); 
            // Backtracking 
            // Make vertex unvisited 
            visited[j] = false; 
        } 
    } 
   
    // Return total ways 
    return total; 
}
//conn -> connection array
//numV -> int, num of nodes in the graph
//twoEnds -> starting and ending point of the path search
function pathSearch(connData, numV, twoEnds, blockList=new Set()){
	//initialized the connectivity matrix
	var conn = [];
	for(let i=0; i<numV; i++) {
    	conn[i] = new Array(numV);
    	conn[i].fill(0);
	}
	for(let i=0; i<connData.length;i++){
		var link = connData[i];
		if(blockList.has(link.to) || blockList.has(link.from))
			continue;
		conn[link.to][link.from] = 1;
		conn[link.from][link.to] = 1;
	}
	var visited = Array(numV);
	visited.fill(false);    
    var src = twoEnds[0];
    var sink = twoEnds[1];

    visited[src] = true;
    return countPaths(conn, numV, src, sink, visited); 
}

document.getElementById("path1").innerHTML = pathSearch(c1, numV, bluePts);
document.getElementById("path2").innerHTML = pathSearch(c2, numV, bluePts);
document.getElementById("path3").innerHTML = pathSearch(c3, numV, bluePts);


var render = function() {
  if (scrollTop != newScrollTop) {
	scrollTop = newScrollTop//update scrollTop, needs to be done after container reacts to scroller.scroll

	function introScale(svgC, top, max=0){
		svgC = "#" + svgC;
		var bottom = $(svgC).height() + top;
		var dif = scrollTop - top+40;
		d3.select(svgC).attr('transform','translate(' + d3.select(svgC).attr("width")/8 + ',' + dif+ ')');

		nodes0.each(function(){
			if(scrollTop >= d3.select(this).attr("tol")){
				d3.select(this).attr("opacity", 1).attr("fill", crimson);
			}
			if(scrollTop < d3.select(this).attr("tol")){
				d3.select(this).attr("opacity", 0.1).attr("fill", "black");
			}
			
		});
		
	}

	function rescale(lines=[], connect=[], svgC, sumLen = 0, top){
		svgC = "#" + svgC;
		var bottom = $(svgC).height() + top;
		var dif = scrollTop - top+40;
		//translate the graph down as the user scroll
		d3.select(svgC).attr('transform','translate(' + d3.select(svgC).attr("width")/8 + ',' + dif+ ')');
		var scales = lineScale(scrollTop-top);//scaling factor
		//scale the sum of length by the scaling factor
		if(scrollTop>= top && scrollTop < bottom){
			var validSum = scales*sumLen;
		}
		var header = d3.select(svgC).attr("id")+"_n";

		//color the two designated dots green if the graph is currently in range
		//otherwise color them red
		if(scrollTop - top>scroll_length && scrollTop <bottom){
			bluePts.forEach(ele => {
				var oriColor = d3.select("#"+header+ele).attr("fill");
				if(oriColor != nodeGray){d3.select("#"+header+ele).attr("fill", nodeGreen);}
				d3.select("#"+header+ele).attr("bFlag", 1);
			});
			
		}else{
			bluePts.forEach(ele => {
				var oriColor = d3.select("#"+header+ele).attr("fill");
				if(oriColor != nodeGray){d3.select("#"+header+ele).attr("fill", crimson);}
				d3.select("#"+header+ele).attr("bFlag", 0);
			});
		}

		//scale each line by the scaling factor
		lines.each(function(){
			var idx = parseInt(this.id.split('_')[1].replace('l', ''));
			var graph = this.id.split('_')[0];
			var data1 = d3.select("#" + graph+ "_n"+connect[idx]["from"]);
			var data2 = d3.select("#" + graph+ "_n"+connect[idx]["to"]);

			var x1 = parseInt(data1.attr("cx"));
			var y1 = parseInt(data1.attr("cy"));
			var x2 = parseInt(data2.attr("cx"));
			var y2 = parseInt(data2.attr("cy"));

			var newx2 = x1 + (x2-x1)*scales;
			var newy2 = y1 + (y2-y1)*scales;

			var newLen = Math.sqrt((x1-newx2)**2 + (y1-newy2)**2);
			d3.select(this).attr('x2', newx2)
							.attr('y2', newy2)
							.attr('stroke', "black")
							.attr('stroke-width', 2)
							.attr("opacity", 0.5)
							.attr("pathlength", newLen);
			//if any of the two nodes is gray, set opacity to 0
			if(data1.attr("fill") == nodeGray || data2.attr("fill") == nodeGray ){
				d3.select(this).attr('opacity', 0);
				if(typeof validSum != "undefined"){
					validSum -= newLen;
				}
			}

		});
        
        //update the total length of wire for the graph in scope
		if(typeof validSum != "undefined"){
			var elements = document.getElementsByClassName("scrollTop");
			for(i = 0;i<elements.length; i++){
				elements[i].innerHTML=validSum.toFixed(2);
			}
		}
		
	}

	introScale("svg0", base0, maxDist);
	rescale(lines1, c1, "svg1", sumLen1, base1);
	rescale(lines2, c2, "svg2", sumLen2, frameHeight+base1);
	rescale(lines3, c3, "svg3", sumLen3, frameHeight*2+base1);
      
	currentScrollTop.text(scrollTop)//update currentScrollTop?
  }

  window.requestAnimationFrame(render)
}

window.requestAnimationFrame(render)


//resetting all params - for resizing
var setDimensions = function() {
  frameHeight = $("#graph1").height();
  scroll_length =frameHeight/4;
  lineScale.domain([0, scroll_length]);		  
  // console.log("resize here");
  svg0.attr("width", $(growth).width()).attr("height", $(growth).height());
  svg1.attr("width", $(graph1).width()).attr("height", $(graph1).height());
  svg2.attr("width", $(graph2).width()).attr("height", $(graph2).height());
  svg3.attr("width", $(graph3).width()).attr("height", $(graph3).height());
			
}


window.onresize = setDimensions


//click event
//requires refactoring
//problem1: click() function is too long => possible to break into multiple reusable parts?
//minor improvement: add some comments for readability
//question(?): possible to make links clickable as well? or is it a bad idea? 
function click(nodes, nData){
	var nd, node, ind, data;
	var seq;
	var prevGray = new Set();
	nodes.each(function(){
		d3.select(this).on("click", function(){
			node = this.id.split('_')[1];
			//get the corresponding svg name
			if(seq == null){ 
				seq = this.id.split('_')[0].replace('svg', ''); 
			}
			ind = parseInt(String(node).replace('n', ''));
			data = nData[ind];
			//color alternating between green/red and gray
			if(bluePts.includes(ind) && d3.select(this).attr("bFlag") == 1){
				var newColor = d3.select(this).attr("fill") == nodeGreen? nodeGray:nodeGreen;
			}else{
				var newColor = d3.select(this).attr("fill") == crimson? nodeGray:crimson;
			}
			//update the prevGray set according to the new color
			if(newColor == nodeGray){
				prevGray.add(ind);
			}else{
				prevGray.delete(ind);
			}
			d3.select(this).attr("fill", newColor);
			var pt1, pt2, newOpacity;
			if(data.hasOwnProperty("link")){
				var links = data["link"];
			
				for(i=0; i<links.length; i++){
					//new opacity for links associated with the clicked node
					var lk = d3.select("#" + links[i]);
                    pt1 = d3.select("#" + lk.attr("from"));
					pt2 = d3.select("#"+ lk.attr("to"));
					var oldOpacity = lk.attr("opacity");
					var decision = (pt1.attr("fill") == nodeGray || pt2.attr("fill") == nodeGray);
					newOpacity = decision?0:0.5;
					lk.attr("opacity", newOpacity);
					//update the sum of total length
					var tmpLen = parseFloat(lk.attr("pathlength"));
					var scrollOne = document.getElementsByClassName("scrollTop");
					var numericalSum = parseFloat(scrollOne[0].innerHTML);

					if(newOpacity>oldOpacity){
						numericalSum += tmpLen;
					}else if(newOpacity<oldOpacity){
						numericalSum -= tmpLen;
					}
					for(let i=0; i<scrollOne.length; i++){
						scrollOne[i].innerHTML = numericalSum;
					}
					
				}
					
			}
			var id = "path" + seq;
			var tmp = [c1, c2, c3];
			document.getElementById(id).innerHTML = pathSearch(tmp[seq-1], numV, bluePts, prevGray);

		});
	});
	
}

click(nodes1, nodeData1);
click(nodes2, nodeData2);
click(nodes3, nodeData3);


//author: Mitali
//function: node repeat
function repeat(nodes){
	nodes.each(function(){
		var node = this.id.split("_")[1];
		var ind = parseInt(String(node).replace("n", ""));
		if (ind == 0){
			d3.select(this).transition().duration(1000).attr("r", 10)
				.each("end", function(){
					d3.select(this).transition().duration(1000).attr("r", 7)
					.each("end", function(){repeat(nodes);});
				});
		}
		
	});
		
}

repeat(nodes1);
repeat(nodes2);
repeat(nodes3);


// progress bar
var element = document.documentElement,
  body = document.body,
  scrollT = 'scrollTop',
  scrollH = 'scrollHeight',
  progress = document.querySelector('.progress-bar'),
  scroll;

document.addEventListener('scroll', function() {
	scroll = (element[scrollT]||body[scrollT]) / ((element[scrollH]||body[scrollH]) - element.clientHeight) * 100;
	progress.style.setProperty('--scroll', scroll + '%');
	});


//pop-up boxes
var ft_container = d3.select("footnote-container");
d3.select(".footnote-anchor").on("click", function(){
	ft_container.style("opacity", 0);
	// console.log("clicked!");
});
