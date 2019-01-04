$(document).ready(function(){
    $(".nav-link").hover(function() {
            $(`#${this.id}-ttl`).removeClass( "text-off" );
            $(`#${this.id}-img`).removeClass( "img-off" );
            $(`#${this.id}-solid`).removeClass( "solid-off" );
            $(`#${this.id}-ttl`).addClass( "text-hover" ); 
            $(`#${this.id}-img`).addClass( "img-hover" );  
            $(`#${this.id}-solid`).addClass( "solid-hover" ); 
        }, function() {
            $(`#${this.id}-ttl`).addClass( "text-off" );
            $(`#${this.id}-img`).addClass( "img-off" );
            $(`#${this.id}-solid`).addClass( "solid-off" );
            $(`#${this.id}-ttl`).removeClass( "text-hover" );
            $(`#${this.id}-img`).removeClass( "img-hover" );
            $(`#${this.id}-solid`).removeClass( "solid-hover" );
        }
    );
});