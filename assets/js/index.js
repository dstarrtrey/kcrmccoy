$(document).ready(function(){
    $(".nav-link").hover(function() {
            $(`#${this.id}-ttl`).addClass( "hover" );   
        }, function() {
            $(`#${this.id}-ttl`).removeClass( "hover" );
        }
    );
});