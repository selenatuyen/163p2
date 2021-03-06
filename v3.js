//bar of avg temp with high/low toggle
function v3(monthData) {
	var margin = {top: 30, right: 20, bottom: 34, left: 60},
	width = 960,
	height = 500;
	var monthWord;
	var x = d3.scaleBand()
				.range([0, width])
				.padding(0.1);
	var y = d3.scaleLinear()
				.range([height, 50]);
	var div = d3.select("#vis3").append("div")   
	    .attr("class", "tooltip")               
	    .style("opacity", 0);			
	switch(monthData){
		case 1:
			monthWord = "January";
			break;
		case 2:
			monthWord = "Febuary";
			break;
		case 3:
			monthWord = "March";
			break;
		case 4:
			monthWord = "April";
			break;
		case 5:
			monthWord = "May";
			break;
		case 6:
			monthWord = "June";
			break;
		case 7:
			monthWord = "July";
			break;
		case 8:
			monthWord = "August";
			break;
		case 9:
			monthWord = "September";
			break;
		case 10:
			monthWord = "October";
			break;
		case 11:
			monthWord = "November";
			break;
		case 12:
			monthWord = "December";
			break;
	}



var shapeData = ["Compare to Overall Average Temperature"],
	j = 1; 
var form = d3.select("body").append("form");

labels = form.selectAll("label")
    .data(shapeData)
    .enter()
    .append("label")
    .text(function(d) {return d;})
    .insert("input")
    .attr("type", "checkbox")
    .attr("name", "mode")
    .attr("value", function(d, i) {return i;})
    .property("checked", function(d, i) {return i===j;});

	var svg = d3.select("#vis3").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	svg.append("text")
		.attr("x", (width/2))
		.attr("y", 0 - (margin.top/2) + 1)
		.attr("text-anchor", "middle")
		.style("font-size", "18px")
		.style("font-weight", "bold")
        .text("Average Temperature for " + monthWord);  
    	
	d3.csv('201608_weather_data.csv', function(err, data){
		if(err){
			console.log(err);
		}
		var selectedMonth = monthData;
		var dyCount = 31;
		if(selectedMonth == 8 || selectedMonth == 3 || selectedMonth == 5 || selectedMonth == 11){
			dyCount = 30;
		}
		else if(selectedMonth == 2){
			dyCount = 29;
		}
		var temps = [];
		var i = 1;
		data.forEach(function(d){
			var zip = d["ZIP"];
			if(zip == "95113"){
				var dt = new Date(d["PDT"]);
				var mth = dt.getMonth() + 1;
				if(mth == selectedMonth){
					var day = dt.getDay();
					if(i <= dyCount){
						temps.push({dy: i, tmp: d["Mean TemperatureF"]});
						i++;
					}
				}
			}
			
		})	
		x.domain(temps.map(function(d){return d.dy;}));
		y.domain([0, d3.max(temps, function(d){return d.tmp;})]);

		svg.selectAll(".bar")
		.data(temps)
		.enter().append("rect")
			.attr("class", "bar")
			.attr("fill", "#004080")
			.attr("x", function(d){return x(d.dy);})
			.attr("width", x.bandwidth())
			.attr("y",  function(d){return y(d.tmp);})
			.attr("height", function(d) {return height - y(d.tmp);})
		.on("mouseover", function(d){
			d3.select(this).transition()
					.duration(200)
					.style("fill", "#808080");
			div.transition()
				.duration(200)
				.style("opacity", .9);
			div.text("Day: " + d.dy+ ": " + d.tmp + "°F" )
				.style("left", (d3.event.pageX) + "px")
				.style("top", (d3.event.pageY-20) + "px");
		})
		.on("mouseout", function(){
			d3.select(this).transition()
				.duration(500)
				.style("fill", "#004080");
			div.transition()
				.duration(500)
				.style("opacity", 0);	
		});
		//x axis
		svg.append("g")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x));
		svg.append("text")
			.attr("x", width - 440)
			.attr("y", height + 28)
			.attr("dx", ".71em")
			.style("text-anchor", "end")
			.text("Day of Month");
		//y axis
		svg.append("g")
			.call(d3.axisLeft(y));
		svg.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y",-40)
			.attr("x", -60)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("Average Temperature (Farenheit)");
		// console.log(temps);	
		});

    d3.selectAll("input").on("change", function(){
		if(d3.selectAll('input').property('checked')){
			// console.log(choice);
			d3.select('#vis3').text("");
		var div = d3.select("#vis3").append("div")   
	    .attr("class", "tooltip")               
	    .style("opacity", 0);	
			var svg = d3.select("#vis3").append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			svg.append("text")
				.attr("x", (width/2))
				.attr("y", 0 - (margin.top/2) + 1)
				.attr("text-anchor", "middle")
				.style("font-size", "18px")
				.style("font-weight", "bold")
		        .text("Average Temperature for " + monthWord);  	
				d3.csv('201608_weather_data.csv', function(err, data){
					if(err){
						console.log(err);
					}
					var selectedMonth = monthData;
					var dyCount = 31;
					if(selectedMonth == 8 || selectedMonth == 3 || selectedMonth == 5 || selectedMonth == 11){
						dyCount = 30;
					}
					else if(selectedMonth == 2){ //febuary
						dyCount = 29;
					}
					var temps = [];
					var i = 1;
					data.forEach(function(d){
						var zip = d["ZIP"];
						if(zip == "95113"){
							var dt = new Date(d["PDT"]);
							var mth = dt.getMonth() + 1;
							if(mth == selectedMonth){
								var day = dt.getDay();
								if(i <= dyCount){
									temps.push({dy: i, tmp: d["Mean TemperatureF"]});
									i++;
								}
							}
						}
						
					})	
					x.domain(temps.map(function(d){return d.dy;}));
					y.domain([0, d3.max(temps, function(d){return d.tmp;})]);

					svg.selectAll(".bar")
					.data(temps)
					.enter().append("rect")
						.attr("class", "bar")
						.attr("fill", function(d){
							var oaAverage = d3.mean(temps, function(d){return d.tmp;});
							// console.log("d temp:" + d.tmp + " overall average:" + oaAverage);
							if(d.tmp >= oaAverage){
								return "#80ff80";
							}
							return "#ff6666";})
						.attr("x", function(d){return x(d.dy);})
						.attr("width", x.bandwidth())
						.attr("y",  function(d){return y(d.tmp);})
						.attr("height", function(d) {return height - y(d.tmp);})
					.on("mouseover", function(d){
						div.transition()
							.duration(200)
							.style("opacity", .9);
						div.text("Day: " + d.dy+ ": " + d.tmp + "°F")
							.style("left", (d3.event.pageX) + "px")
							.style("top", (d3.event.pageY-20) + "px");
					})
					.on("mouseout", function(){
						div.transition()
							.duration(500)
							.style("opacity", 0);	
					});
					//x axis
					svg.append("g")
						.attr("transform", "translate(0," + height + ")")
						.call(d3.axisBottom(x));
					svg.append("text")
						.attr("x", width - 440)
						.attr("y", height + 28)
						.attr("dx", ".71em")
						.style("text-anchor", "end")
						.text("Day of Month");
					//y axis
					svg.append("g")
						.call(d3.axisLeft(y));
					svg.append("text")
						.attr("transform", "rotate(-90)")
						.attr("y",-40)
						.attr("x", -60)
						.attr("dy", ".71em")
						.style("text-anchor", "end")
						.text("Average Temperature (Farenheit)");
					// console.log(temps);	
					});
					
					var legend = svg.append("g");
					legend.append("rect")
					   .attr("x", "-60")
					   .attr("y", "-15")
					   .attr("width", "10")
					   .attr("height", "10")
					   .style("fill", "rgb(255, 102, 102)");
					legend.append("text")
					   .attr("x", "-48")
					   .attr("y", "-5")
					   .attr("height", "10")
					   .text("Lower");
					legend.append("rect")
					   .attr("x", "-60")
					   .attr("y", "-30")
					   .attr("width", "10")
					   .attr("height", "10")
					   .style("fill", "rgb(128, 255, 128)");
					legend.append("text")
					   .attr("x", "-48")
					   .attr("y", "-20")
					   .attr("height", "10")
					   .text("Higher");
			}
			else{
				d3.select('#vis3').text("");
				d3.select("form").remove();
				v3(monthData);
			}
	});
}