
$(document).ready(function () {
  var mydata = null;
  h = 500;
  w = 1000;
  fetch('/countries')
    .then(response => response.json())
    .then(data => {
      mydata = data;
      var year = 1800; //first year in data 

      // var interval = null;
      draw(year);
      // interval = setInterval(function () {
      //   //animation of years with data 
      //   year++;

      //   draw(year);

      //   if (year == 2020) {
      //     clearInterval(interval);
      //   }
      // }, 1000);


      // var g = d3.select("svg").selectAll("g").data(data);
      // console.log(year)
      // var svg = d3.select("svg");
      // svg.selectAll("*").remove();
      //var g = svg.selectAll("g").data(mydata);


      function draw(year) {

        var margin = { top: 20, right: 30, bottom: 30, left: 50 },
          w = 1200 - margin.left - margin.right;
        h = 500 - margin.top - margin.bottom;
        var svg = d3.select("svg");
        svg.selectAll("*").remove();
        var g = svg.selectAll("g").data(mydata);
        // append the svg object to the body of the page
        var svg = d3.select("#mysvg")
          .append("g")
          .attr("width", w - margin.left - margin.right)
          .attr("height", h - margin.top - margin.bottom)
          .append("g")
          .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

        var xScale = d3.scaleLinear().domain([0, 800]).range([0, w]);
        svg.append("g")          
          .attr("transform", "translate(0," + h + ")")          
          .call(d3.axisBottom(xScale))
          .attr('class', 'x label')
          .attr("text-anchor", "end")
          .append("text")
          .text("Child mortality")
          ;

        var yScale = d3.scaleLinear().domain([0, 10]).range([h, 0])
        svg.append("g")

          .call(d3.axisLeft(yScale))


        var zScale = d3.scaleLinear()
          .domain([350, 160000])
          .range([10, 50]);

        var enter = g.enter().append("g").attr("transform", function (d) {

          if (d && d.data && d.data.children_per_woman_total_fertility && d.data.children_per_woman_total_fertility[year] && d.data.child_mortality_0_5_year_olds_dying_per_1000_born && d.data.child_mortality_0_5_year_olds_dying_per_1000_born[year])
            return "translate(" + xScale(d.data.child_mortality_0_5_year_olds_dying_per_1000_born[year]) + "," + yScale(d.data.children_per_woman_total_fertility[year]) + ")"
          else
            return "translate(-1000,-1000)"

        });

        var circle = enter.append("circle")
          .attr("r", function (d) {
            if (d && d.data && d.data.income_per_person_gdppercapita_ppp_inflation_adjusted)
              return zScale(d.data.income_per_person_gdppercapita_ppp_inflation_adjusted[year])
          })         
          .attr("stroke", "black")
          .attr("fill", function (d, i) { return d3.schemeCategory10[i % 10] });
        enter.append("text").text(function (d) { return d.name });

      }
      $('#play').click(function () {
        var interval = null;
        interval = setInterval(function () {
          //animation of years with data 
          year++;

          draw(year);

          if (year == 2020) {
            clearInterval(interval);
          }
        }, 100);
      });

      // same for data
      $('#slider').on("input", function (e) {

        var year = parseInt($(e.target).val());
        if ($("#yearLabel").text("Year: " + $("#slider").val())) {
          draw(year);
        }

      });

      // $('#year').on("keyup", function (e) {
      //   console.log("keyup");
      //   if (e.keyCode == 13) {
      //     console.log(13);
      //     var year = parseInt($(e.target).val());
      //     console.log(year);
      //     draw(year);
      //   }

      // });

      $('#sub_button').click(function () {
        let name = $('#countryName').val()
        $.ajax({
          url: "/countries",
          type: "POST",
          data: { name: name },

        }).done(function (response) {
          console.log(response)
        }).fail(function (response) {
          console.log(response)
        }).always(function (response) {
          console.log(response)

        });
      });

      $('#del_button').click(function () {

        let name = $('#countryName').val()
        $.ajax({
          url: "/countries",
          type: "DELETE",
          data: { name: name },
        }).done(function (response) {
          console.log(response)
        }).fail(function (response) {
          console.log(response)
        }).always(function (response) {
          console.log(response)

        });
      });


    });
});