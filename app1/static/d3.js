
$(document).ready(function () {

  var mydata = null;

  fetch('/countries')
  //fetchs data from country api
    .then(response => response.json())
    .then(data => {
      //response turns into json 
      mydata = data;
      var year = 1800; //first year in data 

      draw(year);

      function draw(year) {
        //set margin height and width of graph
        var margin = { top: 20, right: 30, bottom: 30, left: 50 },
          w = 1200 - margin.left - margin.right;
        h = 500 - margin.top - margin.bottom;



        var svg = d3.select("svg");
        svg.selectAll("*").remove();
        //removes while drawing 
        var g = svg.selectAll("g").data(mydata);
        // append the svg object to set values 
        var svg = d3.select("#mysvg")
          .append("g")
          .attr("width", w - margin.left - margin.right)
          .attr("height", h - margin.top - margin.bottom)
          .append("g")
          .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
        
        //create X axis
        var xScale = d3.scaleLinear().domain([0, 180000]).range([0, w]);
        svg.append("g")
          .attr("class", "axis x")
          .attr("transform", "translate(0," + h + ")")
          .call(d3.axisBottom(xScale));
          //Creat X axis label
        svg.append("text")
          .attr("x", w / 2)
          .attr("y", h + margin.bottom)
          .style("text-anchor", "middle")
          .text("Income per person");
        //create Y axis
        var yScale = d3.scaleLinear().domain([800, 0]).range([0, h])
        svg.append("g")
          .attr("class", "axis y")
          .call(d3.axisLeft(yScale))

        //Create Y axis label
        svg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - margin.left)
          .attr("x", 0 - (h / 2))
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .text("Child Mortality");
        // scale for circle size 
        // var zScale = d3.scaleLinear()
        //   .domain([350, 160000])
        //   .range([10, 50]);


          //changing of the circles by data and relation to axis 
        var enter = g.enter().append("g").attr("transform", function (d) {

          if (d && d.data && d.data.child_mortality_0_5_year_olds_dying_per_1000_born && d.data.child_mortality_0_5_year_olds_dying_per_1000_born[year] && d.data.income_per_person_gdppercapita_ppp_inflation_adjusted && d.data.income_per_person_gdppercapita_ppp_inflation_adjusted[year])
            return "translate(" + xScale(d.data.income_per_person_gdppercapita_ppp_inflation_adjusted[year]) + "," + yScale(d.data.child_mortality_0_5_year_olds_dying_per_1000_born[year]) + ")"
          else
          return"translate (- 1000, -1000)"

        });
        //create tool tip so country names arent always there 
        var tooltip = 
        enter
        .append("text")
        .attr("x", 20)
        .attr("y", 10)
          .style("visibility", "hidden")
          .style("padding-left", "10px")
          .text(function (d) { return "Country:" + d.name  })

        // var secondtooltip =
        // enter
        // .append("text")
        //   .style("visibility", "hidden")
        //   .attr("x", 20)
        //   .attr("y", 25)
        //   .text(function (d) {
        //     if (d && d.data && d.data.income_per_person_gdppercapita_ppp_inflation_adjusted)
        //     return "Income:" + d.data.income_per_person_gdppercapita_ppp_inflation_adjusted[year]
        //     });
         
          //append data to the circle 
        var circle = enter.append("circle")
        //mouse over event that shows the tool tip when hovered 
        .on("mouseover", function (d,i) { 
          //filter the tool tip
          tooltip.filter(function(p){
            //if p equals d show tool tip
           if(p === d) d3.select(this).style("visibility","visible");
           else d3.select(this).style("visibility","hidden");

          //  secondtooltip.filter(function(p){
          //   if(p === d) d3.select(this).style("visibility","visible");
          //   else d3.select(this).style("visibility","hidden");
           //})
        })
           }) 
           //change the radius y used the income data 
          .attr("r", 19)     
          .attr("stroke", "black")
          .attr("fill", function (d, i) { return d3.schemeCategory10[i % 10] });

          
      }
      //play button
      $('#play').click(function () {
        //set interval 
        var interval = null;
        interval = setInterval(function () {
          //animation of years with data 
          year++;
          //draw graph for each year
          draw(year);
          //if year reaches 2020 stop animation
          if (year == 2020) {
            clearInterval(interval);
          }
        }, 100);
      });

      
      $('#slider').on("input", function (e) {
        //slider is set to year 
        var year = parseInt($(e.target).val());
        if ($("#yearLabel").text("Year: " + $("#slider").val())) {
          //slider value draws the year
          draw(year);
        }

      });
    });
});