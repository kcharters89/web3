$(document).ready(function() {
  fetch('/countries')
  .then(response => response.json())
  .then(data => {
   
  //having issue with scale and domain range
  d3.max(data, function(d) { 
    console.log(d.data[0])   //Returns undefined
    return d[0];  //References first value in each sub-array
});

  var myScale = d3.scaleLinear()
  .domain([0, 10])
  .range([0, 600]);
 console.log (myScale(5))//outputs 300

    var g = d3.select("svg").selectAll("g").data(data);
                   
    var en = g.enter().append("g")
    .attr("transform",function(d){ 
      //replace math with d. something with your data console log the d no need to loop
    //console.log(d.data.child_mortality_0_5_year_olds_dying_per_1000_born)
    //translate expects a number but i dont know what number
  // x and y coords
  
  //d.data.child_mortality_0_5_year_olds_dying_per_1000_born[] income_per_person_gdppercapita_ppp_inflation_adjusted[]
  //domain and range look into this , mapping function
  
    return "translate("+ (Math.random() * 100) + 40 + "," + (Math.random() * 100) + 40 +")" 
    
  });
// made colourful circles need to join with text?
    var circle = en.append("circle")
    .attr("cx", function(d,i){return 30 + i*60})
    .attr("cy", 250).attr("r", 19)
    .attr("fill", function(d,i){return d3.schemeCategory10[i % 10] })
    en.append("text").text(function(d){ return d.name });
  
  });

$('#sub_button').click(function(){
  var name = $('#countryName').val()
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

  var name = $('#countryName').val()
    $.ajax({
      url: "/countries",
      type:"DELETE",
     
    }).done(function(response){
    console.log(response)
    }).fail(function(response){
    console.log(response)
    }).always(function(response){
    console.log(response)
    
    });
  }) ;


});
