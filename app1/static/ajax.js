$(document).ready(function() {
$.ajax({
    url: '/countries/<countries_id>',
    data:{ 'name' :name },
    method: 'PUT',
    success: function(response) {
        console.log(data);
    }
});
});