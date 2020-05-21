
$(document).ready(function() {
   fetch('/countries')
   .then(response => response.json())
   .then(data => {
  
   year = 1800
   
   
 //figure out max and min, call the funstion in translate / transform  x y 
    var g = d3.select("svg").selectAll("g").data(data);
                   
    var enter = g.enter().append("g")
    .attr("transform",function(d){ 
      incyear = d3.keys(d.data.income_per_person_gdppercapita_ppp_inflation_adjusted)
      var maxincyear = d3.max(d3.values(incyear).map(function(d){return +d}))
      console.log("maxincyear",maxincyear)
     year = d3.keys(d.data.child_mortality_0_5_year_olds_dying_per_1000_born)
     var maxyear = d3.max(d3.values(year).map(function(d){return +d}))
      // convert to number
      
     console.log("max child year",maxyear)
     var minyear = d3.min(d3.values(year).map(function(d){return +d}))
     console.log("max child year",minyear)
  
    //console.log(d.data.child_mortality_0_5_year_olds_dying_per_1000_born)
   // console.log(d3.keys(d.data.child_mortality_0_5_year_olds_dying_per_1000_born))
    //console.log(d3.values(d.data.child_mortality_0_5_year_olds_dying_per_1000_born))
    if (d && d.data && d.data.child_mortality_0_5_year_olds_dying_per_1000_born && d.data.child_mortality_0_5_year_olds_dying_per_1000_born[minyear] )
    return "translate("+ d.data.child_mortality_0_5_year_olds_dying_per_1000_born[minyear] + "," + d.data.child_mortality_0_5_year_olds_dying_per_1000_born[maxyear] +")" 
    else if(d && d.data && d.data.income_per_person_gdppercapita_ppp_inflation_adjusted && d.data.income_per_person_gdppercapita_ppp_inflation_adjusted[minyear])
    return "translate("+ d.data.income_per_person_gdppercapita_ppp_inflation_adjusted[minyear] + "," + d.data.income_per_person_gdppercapita_ppp_inflation_adjusted[maxincyear] +")" 
   //domain and range look into this , mapping function
   
  // for later d3 code plot circles funtion draw
  });
// made colourful circles need to join with text?
    var circle = enter.append("circle")
    .attr("r",19)
    .attr("fill", function(d,i){return d3.schemeCategory10[i % 10] });
    enter.append("text").text(function(d){ return d.name });
   
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
