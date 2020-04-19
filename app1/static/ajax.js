$(document).ready(function() {
    $.ajax({
        url: "/countries",
        type:"GET",
        success: function(result){
            alert('ok');
        },
        error:function(error){
            alert('error');
        }
   });
$('#button').click(function(){
    $.ajax({
        type:"POST",
        url:"/countries",
        data: $('form').serialize(),
        success: function(result) {
            alert('ok');
          },
          error: function(result) {
            alert('error');
          }
    })
})
$('.wrapper').on('click', '.delete_row', function(){
    var val = $('.input_row').val();
    $.ajax({
      url: "/countries",
      type: "DELETE",
      data: {id: val},
      success: function(response) {
        $('.input_row').val('');
      },

    });
  });
});
