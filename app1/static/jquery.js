$(document).ready(function() {
    $('.SpecButton').click(function(){
        var colour = 'rgb(' + Math.floor(Math.random() *255) + ','
                            + Math.floor(Math.random() * 255) + ','                            
                            + Math.floor(Math.random() * 255) + ')';
        $('body').css('background-color',colour);
    });
    
        // $('#dtHorizontalVerticalExample').DataTable({
        // "scrollX": true,
        // "scrollY": 200,
        // });
        // $('.dataTables_length').addClass('bs-select');
        
   
});