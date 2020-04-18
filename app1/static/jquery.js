$(document).ready(function() {
    $('.SpecButton').click(function(){
        var colour = 'rgb(' + Math.floor(Math.random() *255) + ','
                            + Math.floor(Math.random() * 255) + ','                            
                            + Math.floor(Math.random() * 255) + ')';
        $('body').css('background-color',colour);
    });
});