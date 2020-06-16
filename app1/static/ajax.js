
$(document).ready(function () {
//button to add a country name to the database 
      $('#sub_button').click(function () {
        //set name value
        let name = $('#countryName').val()
        $.ajax({
          //call post
          url: "/countries",
          type: "POST",
          data: { name: name },

        }).done(function (response) {
          //last minute attempt at using error codes 
          console.log(200)
        }).fail(function (response) {
          console.log(404)
        }).always(function (response) {
          

        });
      });

      $('#del_button').click(function () {

        let name = $('#countryName').val()
        $.ajax({
          url: "/countries",
          type: "DELETE",
          data: { name: name },
        }).done(function (response) {
          console.log(200)
        }).fail(function (response) {
          console.log(404)
        }).always(function (response) {
          

        });
      });


    });
