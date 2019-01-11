$(document).ready(function(){
    const links = $(".links");
    const navLink = $(".nav-link");
    const all = $(".all");
    const main = $("main");
    const footer = $("footer");
    
    const request = file => {
        all.load(`${file} .all`);
    }
    const loadPage = link => {
        console.log(link.target);
        while (link && !link.href) {
            link = link.parentNode;
        }
        console.log(link.target);
        if(link.target != link.currentTarget){
            link.preventDefault();
            const data = link.target.getAttribute('data-href');
            console.log(data);
            const url = link.target.href;
            console.log(url);
            //animateOut();
            setTimeout(function(){
            request(url);
            history.pushState(data, null, url);
            //animateIn();
            }, 0);
        }
        link.stopPropogation();
    };
    
    navLink.hover(function() {
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
    links.on("click", clickedElement => {
        console.log("triggered");
        loadPage(clickedElement);
    });
});