$(document).ready(function(){
    const links = $(".links");
    const navLink = $(".nav-link");
    const all = $(".all");
    const main = $("main");
    const triangles = $(".triangles");
    const footer = $("footer");
    const animationLength = 2000;
    const animateOut = jQLink => {
        const solid = jQLink.children(`.solid`);
        const ttl = jQLink.children(`.subtitle`);
        //instant changes
        ttl.addClass("rollOut");
        navLink.unbind('mouseenter mouseleave');
        navLink.css({"z-index":"-1"});
        jQLink.css({"z-index":"1"});
        triangles.css({"z-index": "3"});
        all.css({"height": `${all.height()}px`, "width": `${all.width()}px`}); //fixes width of content
        //animated changes
        solid.animate({"height":"100%", "max-width":"none", "width": "3000%"}, {duration: animationLength/4, queue: false});
        footer.animate({"height": "10px", "margin-top": "105px"}, {duration: animationLength/4, queue: false});
        all.animate({"left": "-50%", "top": "-50%"}, {duration: animationLength/2});
        main.animate({"left": "50%", "top": "50%", "transform":"translate(-50%, -50%)", "width": "50px", "height": "50px"}, {duration: animationLength/2, queue: false});
    };
    const animateIn = jQLink => {
        const solid = jQLink.children(`.solid`);
        const ttl = jQLink.children(`.subtitle`);
        //animated changes
       
        solid.animate({"height":"0%", "max-width":"none", "width": "100%"}, {duration: animationLength-4000, queue: false});
        footer.stop().delay(3000).animate({"height": "90px", "margin-top":"25px"}, {duration: animationLength-3000, queue: false});
        all.animate({"left": "0%", "top": "0%"}, {duration: animationLength-2000});
        main.animate({"left": "0%", "top": "0%", "transform":"translate(0%, 0%)", "width": "100%", "height": "100%"}, {duration: animationLength-2000, queue: false});
        //instant changes
        setTimeout(function(){
            ttl.removeClass("rollOut");
            navLink.unbind('mouseenter mouseleave');
            navLink.removeAttr("style")
            jQLink.removeAttr("style")
            triangles.removeAttr("style")
            all.removeAttr("style");
            ttl.removeAttr("style");
            solid.removeAttr("style");
            footer.removeAttr("style");
            main.removeAttr("style");
            $(`.ttl`).addClass( "text-off" );
            $(`.img`).addClass( "img-off" );
            $(`.solid`).addClass( "solid-off" );
            $(`.ttl`).removeClass( "text-hover" );
            $(`.img`).removeClass( "img-hover" );
            $(`.solid`).removeClass( "solid-hover" );
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
            }); 
        }, animationLength);
        //fixes width of content
    }
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
            setTimeout(function(){
            requestContent(url);
            history.pushState(data, null, url);
            animateIn($(`#${link.target.id}`));
            }, animationLength);
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