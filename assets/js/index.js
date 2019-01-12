$(document).ready(function(){
    const links = $(".links");
    const navLink = $(".nav-link");
    const all = $(".all");
    const main = $("main");
    const triangles = $(".triangles");
    const footer = $("footer");
    const animationLength = 5000;
    const animateOut = jQLink => {
        const solid = jQLink.children(`.solid`);
        const ttl = jQLink.children(`.ttl`);
        //instant changes
        navLink.unbind('mouseenter mouseleave');
        navLink.css({"z-index":"-1"});
        jQLink.css({"z-index":"1"});
        triangles.css({"z-index": "3"});
        //animated changes
        ttl.animate({"height": "87px"}, {duration: animationLength});
        solid.animate({"height":"100%", "max-width":"none", "width": "3000%"}, {duration: animationLength, queue: false});
        footer.animate({"height": "10px"}, {duration: animationLength, queue: false});
        triangles.animate({"margin": "0", "width": "100%"}, {duration: animationLength, queue: false});
        main.animate({"left": "50%", "top": "50%", "transform":"translate(-50%, -50%)", "width": "50px", "height": "50px"}, {duration: animationLength, queue: false});
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
            console.log($(`#${link.target.id}`));
            animateOut($(`#${link.target.id}`));
            
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