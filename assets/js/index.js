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
        const img = jQLink.children(`.nav-img`)
        //instant changes
        ttl.addClass("rollOut");
        navLink.unbind('mouseenter mouseleave');
        navLink.css({"z-index":"-1"});
        jQLink.css({"z-index":"1"});
        triangles.css({"z-index": "5"});
        all.css({"height": `${all.height()}px`, "width": `${all.width()}px`}); //fixes width of content
        //animated changes
        solid.animate({"height":"100%", "max-width":"none", "width": "3000%"}, {duration: animationLength/6, queue: false});
        footer.animate({"height": "10px", "margin-top": "105px"}, {duration: animationLength/4, queue: false});
        all.animate({"left": "-50%", "top": "-50%"}, {duration: animationLength/2});
        main.animate({"left": "50%", "top": "50%", "transform":"translate(-50%, -50%)", "width": "50px", "height": "50px"}, {duration: animationLength/2, queue: false});
        ttl.addClass("text-off");
        img.addClass("img-off");
        solid.addClass("solid-off");
        ttl.removeClass("text-hover");
        img.removeClass("img-hover");
        solid.removeClass("solid-hover");
    };
    const animateIn = jQLink => {
        const solid = jQLink.children(`.solid`);
        const ttl = jQLink.children(`.subtitle`);
        //animated changes
       
        solid.animate({"height":"0%", "max-width":"none", "width": "100%"}, {duration: animationLength/4, queue: false});
        footer.animate({"height": "90px", "margin-top":"25px"}, {duration: animationLength/4, queue: false});
        all.animate({"left": "0%", "top": "0%"}, {duration: animationLength/2});
        main.animate({"left": "0%", "top": "0%", "transform":"translate(0%, 0%)", "width": "100%", "height": "100%"}, {duration: animationLength/2, queue: false});
        //instant changes
        setTimeout(function(){
            ttl.removeClass("rollOut");
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
        all.load(`${file} .all`, function(){
            if(file==="lego.html"){
                console.log("executing:");
                let photos = [];
                const legoSlideshow = () =>{
                    let i = 0;
                    console.log(photos);
                    setInterval(function(){
                        let currentPhoto = photos[i];
                        $("#current-image").attr("src", `http://farm${currentPhoto.farm}.staticflickr.com/${currentPhoto.server}/${currentPhoto.id}_${currentPhoto.secret}.jpg`);
                        if(i===photos.length-1){
                            i = 0;
                        }else{
                            i++;
                        }
                    }, 3000);
                };
                $.ajax({
                    url: "https://api.flickr.com/services/rest/?api_key=9838075b647ec1a2393ba502cb82c148&gallery_id=72157677715358868&method=flickr.galleries.getPhotos&format=json&nojsoncallback=1",
                    method: "GET", 
                }).then(function(response){
                    console.log(response);
                    photos = response.photos.photo;
                    legoSlideshow();
                });
            }
        });
    };
    const loadPage = link => {
        while (link.target && !link.target.href) {
            link.target = link.target.parentNode;
        }
        if(link.target != link.currentTarget){
            link.preventDefault();
            const data = link.target.getAttribute('data-href');
            const url = link.target.href;
            console.log('target', link.target);
            console.log('url', url);
            navLink.removeClass("active");
            $(`#${link.target.id}`).addClass("active");
            console.log($(`#${link.target.id}`));
            //animateOut($(`#${link.target.id}`));
            requestContent(url);
            history.pushState(data, null, url);
            // setTimeout(function(){
            //     main.addClass("spin");
            //     setTimeout(function(){
            //         requestContent(url);
            //         history.pushState(data, null, url);
            //         animateIn($(`#${link.target.id}`));
            //         main.removeClass("spin");
            //     }, 2500);
            // }, animationLength/2);
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
    $(document).on("click", ".links", function(clickedElement) {
        console.log("triggered");
        let target = clickedElement.target;
        if (target) {
            clickedElement.preventDefault();
        }
        //clickedElement.stopPropogation();
        loadPage(clickedElement);
    });
    
});