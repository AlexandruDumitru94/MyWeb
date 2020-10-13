var galleryContainer, modal, bodyWidth, screenWidth, screenHeight, quarterSizeDif, maxScroll, body, 
htmlElement, htmlOverflow, navButtons, deleteStopScroll, finalWords, finalHeight, contact, contactHeight, 
endTimeline, camera, cameraWidth, cameraHeight, cameraHeightPx, cameraWidthPx, cameraContainer, gallerySwiper, 
modalPage,  modalContainer, span, upperCameraText, outerSparkles, innerSparkles, planets, planetsInfoClose, headShot, 
headShotWidth, headShotHeight, welcomeText, welcomeTextLeft, startTimeline;

bodyWidth = document.getElementsByClassName("section--fourth")[0].scrollWidth;
screenWidth = document.getElementsByClassName("page")[0].scrollWidth;
screenHeight = document.getElementsByClassName("page")[0].scrollHeight;
quarterSizeDif = (screenWidth - screenHeight) / 4;

maxScroll =  (quarterSizeDif + (bodyWidth - screenWidth) / 4) * 4;

body = document.getElementsByTagName("body")[0];
htmlElement = document.getElementsByTagName("html")[0];
htmlOverflow = window.getComputedStyle(htmlElement).getPropertyValue("overflow");
navButtons = document.getElementsByClassName("nav");

finalWords = document.getElementById("final-words");
finalHeight = window.getComputedStyle(finalWords).getPropertyValue("bottom");
contact = document.getElementById("contact");
contactHeight = window.getComputedStyle(contact).getPropertyValue("height");

camera = document.getElementsByClassName("camera-wip")[0];

cameraContainer = document.getElementsByClassName("camera-container")[0];
modal = document.getElementById("modal");

galleryContainer = document.getElementsByClassName("swiper-container")[0];

modalPage = document.getElementsByClassName("photos-screen-modal")[0];
modalContainer = document.getElementsByClassName("swiper-container")[1];
span = document.getElementsByClassName("modal-close")[0];
upperCameraText = document.getElementById("photos-text");
outerSparkles = document.getElementsByClassName("outer-sparkle");
innerSparkles = document.getElementsByClassName("inner-sparkle");

headShot = document.getElementById("head-shot");
headShotWidth = window.getComputedStyle(headShot).getPropertyValue("width");
console.log(headShotWidth);
headShotHeight = window.getComputedStyle(headShot).getPropertyValue("height");
welcomeText = document.getElementById("welcome");
welcomeTextLeft = window.getComputedStyle(welcomeText).getPropertyValue("left");

startTimeline = gsap.timeline({defaults: {duration: 1}});

        startTimeline.fromTo(".greeting__text", {opacity: 0, top: "-=100", visibility: "hidden"}, {opacity: 1, top: 0, visibility: "visible", stagger: 1});
        startTimeline.fromTo("#head-shot", {opacity: 0, width: 0, height: 0, visibility: "hidden"}, {opacity: 1, width: headShotWidth, height: headShotHeight, visibility: "visible"}, "+=0.5");
        startTimeline.fromTo("#welcome", {opacity: 0, left: "-50%", visibility: "hidden"}, {opacity: 1, left: welcomeTextLeft, visibility: "visible"}, "-=1");

if(window.readyState == 'loading') {
    window.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
 
function ready() {

    
    
    galleryDimensions();

    (function () {
        span.onclick = function() {
            modalPage.style.display = "none";
            galleryContainer.style.opacity = "1";
            upperCameraText.style.color =  "rgba(255, 255, 255, 1)";
            upperCameraText.style.zIndex = "1";
            galleryContainer.style.pointerEvents = "auto";
            camera.style.opacity = "1";
            for(let i = 0; i < innerSparkles.length; i++) {
                    let sparkle = innerSparkles[i];
                    sparkle.style.display = "block";
                }

            for(let j = 0; j < outerSparkles.length; j++) {
                let sparkle = outerSparkles[j];
                sparkle.style.opacity = "1";
            }
        }

        galleryContainer.addEventListener('click', addModalSwiper);
                
            function addModalSwiper() {
                modalPage.style.display = "flex";
                galleryContainer.style.opacity = "0.3";
                upperCameraText.style.color =  "rgba(255, 255, 255, 0.3)";
                upperCameraText.style.zIndex = "0";
                galleryContainer.style.pointerEvents = "none";
                camera.style.opacity = "0.5";

                for(let i = 0; i < innerSparkles.length; i++) {
                    let sparkle = innerSparkles[i];
                    sparkle.style.display = "none";
                }

                for(let j = 0; j < outerSparkles.length; j++) {
                    let sparkle = outerSparkles[j];
                    sparkle.style.opacity = "0.3";
                }

                var modalSwiper = new Swiper(modalContainer, { 
                    touchReleaseOnEdges: true
                });
            }
    })();
        
    (function () {
        planets = document.getElementsByClassName("planet");
        for(let i = 0; i < planets.length; i++) {
            var planet = planets[i];
            planet.addEventListener('click', showInfo)
        }

        function showInfo(evt) {
            var planet = evt.target;
            if(planet.previousElementSibling == undefined) {
                var planetInfo = planet.nextElementSibling;
            } else {
                var planetInfo = planet.previousElementSibling;
            }
            planetInfo.style.visibility = "visible";
        }   

        planetsInfoClose = document.getElementsByClassName("planet-info-close");
        for(var i = 0; i < planetsInfoClose.length; i++) {
            var closeButton = planetsInfoClose[i];
            closeButton.addEventListener('click', hideInfo)
        }

        function hideInfo(evt) {
            evt.target.parentElement.style.visibility = "hidden";
        }  

        fetch("https://api.le-systeme-solaire.net/rest/bodies?data=id,englishName,semimajorAxis,isPlanet,meanRadius,density,gravity&filter[]=isPlanet,neq,true&filter[]=meanRadius,gt,1190")
                .then( (response) => response.json())
                .then( (data) => fetchData(data))

            function fetchData(data) {
                var planetContainers = document.getElementsByClassName("planet-info");
                for(let i = 0; i < planetContainers.length; i++) {
                    var planet = planetContainers[i];
                    var planetIndex = planet.getAttribute("data-planet-array");
                    
                    planet.firstElementChild.innerHTML = data.bodies[planetIndex].englishName;

                    var planetListInfo = planet.getElementsByClassName("planet-list")[0].children;
                    
                    for(let j = 0; j < planetListInfo.length; j++) {
                        var listElement = planetListInfo[j];
                        var planetAxis = listElement.getAttribute("data-planet");
                        var listUnit = listElement.innerHTML;
                        
                        listElement.innerHTML = `${planetAxis}` + " = " + data.bodies[planetIndex][planetAxis] + " " + listUnit;
                    }
                }
            }

        document.getElementsByClassName("button-info")[0].addEventListener('click', evt => {
            evt.target.parentElement.previousElementSibling.style.visibility = "visible";
        });

        

    })();
}

let vh = window.innerHeight * 0.01;
window.onload = document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

$(function() {
    $.jInvertScroll([ '.scroll' ], 
    {
         // height: 6000,                   // optional: define the height the user can scroll, otherwise the overall length will be taken as scrollable height
         onScroll: function(percent) {   //optional: callback function that will be called when the user scrolls down, useful for animating other things on the page
             console.log(percent);
         }
     });
});

function scrollToPage(pageNumber) {
    bodyWidth = document.getElementsByClassName("section--fourth")[0].scrollWidth;
    screenWidth = document.getElementsByClassName("page")[0].scrollWidth;
    screenHeight = document.getElementsByClassName("page")[0].scrollHeight;
    quarterSizeDif = (screenWidth - screenHeight) / 4;
    var pageScroll = 0;
    if  (pageNumber > 0) {
        pageScroll += (quarterSizeDif + (bodyWidth - screenWidth) / 4) * pageNumber;
    }
    window.scrollTo(0, pageScroll);
}

 function stopScroll()  {
        if(pageYOffset > (maxScroll - 1) && !deleteStopScroll) {
            contact.style.overflow = "hidden";
            htmlElement.style.overflow = "hidden";
            for(let i = 0; i < navButtons.length; i++) {
                let button = navButtons[i];
                button.style.pointerEvents = "none";
            }

            endTimeline = gsap.timeline({onComplete: timelineEnd});

            endTimeline.set("#final-words", {bottom: "50%", yPercent: 50,  opacity: 0, display: "none"});
            endTimeline.to("#final-words", {opacity: 1, display: "block", duration: 2});
            endTimeline.fromTo("#final-words", {bottom: "50%", yPercent: 50, display: "block",  opacity: 1}, {bottom: finalHeight, yPercent: 0, duration: 1});
            endTimeline.fromTo("#contact", {display: "none", height: 0, padding: 0, opacity: 0}, {display: "block", height: contactHeight, padding: 10, opacity: 1, duration: 1}, 2);
            endTimeline.fromTo("#icons-container", {display: "none", height: 0, opacity: 0}, {display: "flex", height: "auto", opacity: 1, duration: 1}, 2);
            endTimeline.fromTo(".contact-icons", {display: "none", fontSize: 0, opacity: 0}, {display: "inline-block", fontSize: "2em", opacity: 1, duration: 1}, 2);
             
            function timelineEnd() {
                contact.style.overflow = "auto";
                htmlElement.style.overflow = htmlOverflow;
                for(let i = 0; i < navButtons.length; i++) {
                    let button = navButtons[i];
                    button.style.pointerEvents = "all";
                }
                deleteStopScroll = true;
            }
        } 
 };

 function galleryDimensions() {
        cameraWidth = camera.clientWidth;
        cameraHeight = camera.clientHeight;
        cameraHeightPx = cameraHeight + "px";
        cameraWidthPx = cameraWidth + "px";

        cameraContainer.style.height = cameraHeightPx;
        cameraContainer.style.width = cameraWidthPx;
        
        modal.style.height = cameraHeightPx;
        modal.style.width = cameraWidthPx;
        
        gallerySwiper = new Swiper(galleryContainer, {
            touchReleaseOnEdges: true
        });
    }

