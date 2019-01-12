$(document).ready(function(){
    const links = $(".links");
    const navLink = $(".nav-link");
    const all = $(".all");
    const main = $("main");
    const triangles = $(".triangles");
    const footer = $("footer");
    const animationLength = 1000;
    const animateOut = jQLink => {

        const solid = jQLink.children(`.solid`);
        const ttl = jQLink.children(`.ttl`);
        navLink.css({"z-index":"-1"});
        jQLink.css({"z-index":"1"});
        ttl.css({"height": "87px"});
        solid.css({"height":"100%", "max-width":"none", "width": "3000%"});
        footer.css({"height": "10px"});
        triangles.css({"margin": "0", "width": "100%", "z-index": "3"});
        main.css({"margin": "auto", "width": "50px", "height": "50px"});
    };
    const requestContent = file => {
        all.load(`${file} .all`);
    };
    const loadPage = link => {
        while (link.target && !link.target.href) {
            link.target = link.target.parentNode;
        }
        if(link.target != link.currentTarget){
            link.preventDefault();
            const data = link.target.getAttribute('data-href');
            const url = link.target.href;
            console.log('link', link);
            console.log('target', link.target);
            navLink.removeClass("active");
            $(`#${link.target.id}`).addClass("active");
            //$(`#${link.target.id}`).children(`.solid`).css({"background-color": "blue"});
            console.log($(`#${link.target.id}`));
            animateOut($(`#${link.target.id}`));
            //$(`#${link.target.id}`).animateOut(data);
            
            //animateOut(link.target);
            //setTimeout(function(){
            requestContent(url);
            history.pushState(data, null, url);
            //animateIn();
            //}, animationLength);
        }
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
    links.on("click", function(clickedElement) {
        console.log("triggered");
        let target = clickedElement.target;
        if (target) {
            clickedElement.preventDefault();
        }
        //clickedElement.stopPropogation();
        loadPage(clickedElement);
    });
    
});