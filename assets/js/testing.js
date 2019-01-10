    const navLink = $(".nav-link");
    const main = $("main");
    const ttlAniLnth = 1000; //Total animation length
    const cache = {};
    const loadPage = url => {
        if(cache[url]){
            return new Promise(resolve => resolve(cache[url]));
        } else{
            return fetch(url, {
            method: 'GET'
            }).then(response => {cache[url] = response.text; return cache[url]});
        }
    };
    const animateContent = (bfor, aftr) => {
        bfor.style.position = 'absolute';
        const fadeOut = bfor.animate({
            opacity: [1, 0],
        }, ttlAniLnth);
        const fadeIn = aftr.animate({
            opacity: [0, 1], 
        }, ttlAniLnth);
        fadeIn.onfinish = function() {
            bfor.parent().remove(bfor);
        };
    };
    const animateHeader = (bfor, aftr) => {
        //bfor.style.position = 'absolute';
        const fadeOut = bfor.animate({
            position: "absolute",
            max-width: "100%"
        }, ttlAniLnth);
        const fadeIn = setTimeout(function(){
            aftr.animate({
                position: "relative",
                max-width: "150px" 
            }, ttlAniLnth);
        }, ttlAniLnth);
        fadeIn.onfinish = function() {
            bfor.parent().remove(bfor);
        };
    };
    const switchPage = () => {
        const url = location.href;
        loadPage(url).then(responseText => {
            const loadedDiv = $("<div>");
            loadedDiv.html(responseText);
        });
        const oldStuff = $(".all");
        const newStuff = loadedDiv.querySelector(".all");
        main.append(newStuff);
        animateContent(oldStuff, newStuff);
    };
    const listen = x => {
        let target = x.target;
        while (target && !target.href) {
            target = target.parentNode;
        } 
        if (target) {
            x.preventDefault();
            history.pushState(null, null, target.href);
            changePage();
            return true;
        }
    };
    navLink.on("click", function(){

    });

