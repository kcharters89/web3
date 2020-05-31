
$(document).ready(function() {
  var mydata = null;
   fetch('/countries')
   .then(response => response.json())
   .then(data => {
  mydata = data;
   var year = 1800;
var interval = null;
   drawGraph(year);
   interval = setInterval(function(){ 
    year++;
   drawGraph(year);
   if(year == 2020)
   {
     clearInterval(interval);
   }
},100);
   function drawGraph(year){
 //figure out max and min, call the funstion in translate / transform  x y 
   // var g = d3.select("svg").selectAll("g").data(data);
   console.log(year)
    var svg = d3.select("svg");
    svg.selectAll("*").remove();
    var g = svg.selectAll("g").data(mydata);
    var enter = g.enter().append("g").attr("transform",function(d){ 
     
      if (d && d.data && d.data.child_mortality_0_5_year_olds_dying_per_1000_born && d.data.child_mortality_0_5_year_olds_dying_per_1000_born[year] && d.data.income_per_person_gdppercapita_ppp_inflation_adjusted && d.data.income_per_person_gdppercapita_ppp_inflation_adjusted[year])
      return "translate("+ d.data.child_mortality_0_5_year_olds_dying_per_1000_born[year] + "," +d.data.income_per_person_gdppercapita_ppp_inflation_adjusted[year] +")" 
    // else if(d && d.data && d.data.income_per_person_gdppercapita_ppp_inflation_adjusted && d.data.income_per_person_gdppercapita_ppp_inflation_adjusted[year])
    // return "translate("+ d.data.income_per_person_gdppercapita_ppp_inflation_adjusted[year] + "," + d.data.income_per_person_gdppercapita_ppp_inflation_adjusted[year] +")" 
   //domain and range look into this , mapping function
   
  // for later d3 code plot circles funtion draw
  });
// made colourful circles need to join with text?
    var circle = enter.append("circle")
    .attr("r",19)
    .attr("fill", function(d,i){return d3.schemeCategory10[i % 10] });
    enter.append("text").text(function(d){ return d.name });
  } 
    
 
    $('#year').on("keyup",function(e){
      console.log("keyup");
      if(e.keyCode == 13)
      {
        console.log(13);
       var year = parseInt($(e.target).val());
       console.log(year);
       drawGraph(year);
      }
  
    });

$('#sub_button').click(function(){
  let name = $('#countryName').val()
    $.ajax({
      url: "/countries",
      type:"POST",
      data:{name:name},
    
    }).done(function(response){
    console.log(response)
    }).fail(function(response){
    console.log(response)
    }).always(function(response){
    console.log(response)
    
    });
  });
    
$('#del_button').click(function(){

  let name = $('#countryName').val()
    $.ajax({
      url: "/countries",
      type:"DELETE",
      data:{name:name},
    }).done(function(response){
    console.log(response)
    }).fail(function(response){
    console.log(response)
    }).always(function(response){
    console.log(response)
    
    });
  }) ;


});
});