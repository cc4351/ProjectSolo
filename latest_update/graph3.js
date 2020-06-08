var svg0 = d3.select("#growth").append("svg")
				 .attr("width", $(growth).width())
				 .attr("height", 800);


var svg1 = d3.select("#graph1").append("svg")
				 .attr("width", $(graph1).width())
				 .attr("height", 800);
		

var svg2 = d3.select("#graph2").append("svg")
				 .attr("width", $(graph2).width())
				 .attr("height", 800);
var svg3 = d3.select("#graph3").append("svg")
				 .attr("width", $(graph3).width())
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
				{ x: 22, y: 72 },
				{ x: 64, y: 24 },
				{ x: 76, y: 88 },
				{ x: 22, y: 47 },
				{ x: 86, y: 49 },
				{ x: 33, y: 88 }
			  ];



//if necessary, change the identifier to id instead of index
//centralized
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
			{from: 4, to: 12},
			{from: 2, to: 4},
			{from: 3, to: 1}
			];


//distributed
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


function cLine(connect, nData, idx){
	var lineData = [];
	var nodeData = nData;
	for(i = 0; i<connect.length; i++){
		var pt1, pt2, x1, x2, y1, y2, len, tmp;
		pt1 = nodeData[connect[i].from];
		pt2 = nodeData[connect[i].to];
		x1 = pt1.x;
		y1 = pt1.y;
		x2 = pt2.x;
		y2 = pt2.y;
		len = Math.sqrt((x1-x2)**2 + (y1-y2)**2);
		tmp = {from: idx+"_"+"n"+connect[i].from, to: idx+"_"+"n"+connect[i].to, x1: x1, y1: y1, x2: x2, y2: y2, len: len, id: idx+"_"+"l"+i};
		lineData.push(tmp);

		if(pt1.hasOwnProperty("link")){
			pt1.link.push(idx+"_"+"l"+i);
		}else{
			pt1.link = [idx+"_"+"l"+i];
			pt1.color = "red";
		}
		if(pt2.hasOwnProperty("link")){
			pt2.link.push(idx+"_"+"l"+i);
		}else{
			pt2.link = [idx+"_"+"l"+i];
			pt2.color = "red";
		}
		d3.select('#'+tmp.from).attr("fill", "red");
		d3.select('#'+tmp.to).attr("fill", "red");
	}
	return [lineData, nodeData];
}

//see https://stackoverflow.com/a/5344074/12144813 for JS shallow/deep copy
var lineData1, nodeData1, lineData2, nodeData2, lineData3, nodeData3;
nodeData1 = JSON.parse(JSON.stringify(nodeData));
nodeData2 = JSON.parse(JSON.stringify(nodeData));
nodeData3 = JSON.parse(JSON.stringify(nodeData));
[lineData1, nodeData1] = cLine(c1, nodeData1, "svg1");
[lineData2, nodeData2] = cLine(c2, nodeData2, "svg2");
[lineData3, nodeData3] = cLine(c3, nodeData3, "svg3");


//for svg0
var centroid = 0;
function cDist(centroid, nData){
	var len;
	var max = 0;
	var cX = nData[centroid].x;
	var cY = nData[centroid].y;
	for(i = 0; i<nData.length; i++){
		len = Math.sqrt((nData[i].x-cX)**2 + (nData[i].y-cY)**2);
		max = len>max?len:max;
		nData[i].cDist = len;
	}
	return [nData, max];
}

var nodeData0 = JSON.parse(JSON.stringify(nodeData));
var maxDist;
[nodeData0, maxDist] = cDist(centroid, nodeData0);
//sort nodeData0 by distance from center
nodeData0.sort(function (a, b){
    return a.cDist-b.cDist;
});

var lineAttrs = {
	x1: function(d){ return d.x1*3;},
	x2: function(d){ return d.x2*3;},
	y1: function(d){ return d.y1*3;},
	y2: function(d){ return d.y2*3;},
	from: function(d){ return d.from;},
	to: function(d){ return d.to;},
	stroke: "black",
	"stroke-width": 2,
	opacity: 0.5,
	id: function(d){return d.id;},
	pathLength: function(d){return d.len*3;}
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
	  cx: function(d) { return d.x*3; },
	  cy: function(d) { return d.y*3; },
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

//requires some fixing later
var base0 = $("#intro").show().length==0?0:$(intro).height();
var base1 = $("#growth").show().length==0?base0:base0+$(growth).height();
//console.log(base0);
var frameHeight = d3.select("#graph1").node().scrollHeight;
var scroll_length = frameHeight/4;
var lineScale = d3.scale.linear()//ref: https://www.dashingd3js.com/d3js-scales
				  .domain([0, scroll_length])
				  .range([0, 1])
				  .clamp(true);
var scrollTop = 0;
var newScrollTop = 0;
var currentScrollTop = d3.select('#currentScrollTop');
var nodeGray = "rgb(100, 100, 100)";

window.addEventListener('scroll', function(e){
	newScrollTop = window.scrollY;//get the latest scrollTop
});

//resetting all params - for resizing
var setDimensions = function() {
  frameHeight = d3.select("#graph1").node().scrollHeight;
  scroll_length =frameHeight/4;
  lineScale.domain([0, scroll_length]);		  
}

var segment = $(growth).height()/(nodes0[0].length+7);
var idx, tol;
nodes0.each(function(){
	idx = parseInt(this.id.split('_')[1].replace('n', ''));
	tol = idx*segment;
	d3.select(this).attr("tol", tol+base0);
});


var render = function() {
  if (scrollTop != newScrollTop) {
	scrollTop = newScrollTop//update scrollTop, needs to be done after container reacts to scroller.scroll
	function rescale(lines=[], connect=[], svgC, base, max=0){
//		console.log(base);
		var dif = scrollTop - base;
		if(svgC == svg0){
			dif +=40;
		}
		svgC.attr('transform','translate(' + svgC.attr("width")/8 + ',' + dif+ ')');
		if(svgC == svg0){
			nodes0.each(function(){
				if(scrollTop >= d3.select(this).attr("tol")){
					d3.select(this).attr("opacity", 0.8).attr("fill", "red");
				}
				if(scrollTop < d3.select(this).attr("tol")){
					d3.select(this).attr("opacity", 0.1).attr("fill", "black");
				}
				
			});
			
			return;
		}
		var scales = lineScale(scrollTop-base);
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
							.attr('x1', x1)
							.attr('y1', y1)
							.attr('stroke', "black")
							.attr('stroke-width', 2)
							.attr("opacity", 0.5)
							.attr("pathlength", newLen);
			
			if(data1.attr("fill") == nodeGray || data2.attr("fill") == nodeGray ){
				d3.select(this).attr('opacity', 0);
			}

		});
		
	}
	  rescale([], [], svg0, base0, maxDist);
	  rescale(lines1, c1, svg1, base1);
	  rescale(lines2, c2, svg2, frameHeight+base1);
	  rescale(lines3, c3, svg3, frameHeight*2+base1);

	currentScrollTop.text(scrollTop)//not sure what this line is for, update currentScrollTop?
  }

  window.requestAnimationFrame(render)
}
window.requestAnimationFrame(render)

window.onresize = setDimensions



//click event

function click(nodes, nData){
	var nd, node, ind, data;
	nodes.each(function(){
		d3.select(this).on("click", function(){
			node = this.id.split('_')[1];
			ind = parseInt(String(node).replace('n', ''));
			data = nData[ind];
			var newColor = d3.select(this).attr("fill") == "red"? nodeGray:"red";
			d3.select(this).attr("fill", newColor);
			var pt1, pt2, newOpacity;
			if(data.hasOwnProperty("link")){
				var links = data["link"];
				for(i=0; i<links.length; i++){
					var lk = d3.select("#" + links[i]);
                    pt1 = d3.select("#" + lk.attr("from"));
					pt2 = d3.select("#"+ lk.attr("to"));
					if(pt1.attr("fill") == nodeGray || pt2.attr("fill") == nodeGray){
						newOpacity = 0;
					}else{
						newOpacity =lk.attr("opacity")==0.5?0:0.5;
					}
					lk.attr("opacity", newOpacity);
				}
			}

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
