var galleryContainer, modal;


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
    var bodyWidth =document.getElementsByClassName("section--fourth")[0].scrollWidth;
    console.log(bodyWidth);
    var screenWidth = document.getElementsByClassName("page")[0].scrollWidth;
    var screenHeight = document.getElementsByClassName("page")[0].scrollHeight;
    var quarterSizeDif = (screenWidth - screenHeight) / 4;
    var pageScroll = 0;
    if  (pageNumber > 0) {
        pageScroll += (quarterSizeDif + (bodyWidth - screenWidth) / 4) * pageNumber;
    }
    window.scrollTo(0, pageScroll);
    console.log(screenWidth);
    console.log(screenHeight);
}

function ready() {
            var camera = document.getElementById("camera");

            var cameraWidth = camera.clientWidth;
            var cameraHeight = camera.clientHeight;

            var y = cameraWidth + "px";
            var x = cameraHeight + "px";

            var cameraContainer = document.getElementsByClassName("camera-container")[0];
            
            modal = document.getElementById("modal");

            cameraContainer.style.height = x;
            cameraContainer.style.width = y;
            
            modal.style.height = x;
            modal.style.width = y;
            
            galleryContainer = document.getElementsByClassName("swiper-container")[0];

            var gallerySwiper = new Swiper(galleryContainer, {
                touchReleaseOnEdges: true
            });
    }

window.onload = ready();

    
function displayModal() {
    var modalPage = document.getElementsByClassName("photos-screen-modal")[0];
    var modalContainer = document.getElementsByClassName("swiper-container")[1];
    var span = document.getElementsByClassName("close")[0];
    var upperCameraText = document.getElementById("photo-text");

    span.onclick = function() {
        modalPage.style.display = "none";
        galleryContainer.style.opacity = "1";
        upperCameraText.style.color =  "rgba(255, 255, 255, 1)";
        upperCameraText.style.zIndex = "1";
        galleryContainer.style.pointerEvents = "auto";
    }

    galleryContainer.addEventListener('click', addModalSwiper);
            
        function addModalSwiper() {
            modalPage.style.display = "flex";
            galleryContainer.style.opacity = "0.3";
            upperCameraText.style.color =  "rgba(255, 255, 255, 0.3)";
            upperCameraText.style.zIndex = "-1";
            galleryContainer.style.pointerEvents = "none";
            var modalSwiper = new Swiper(modalContainer, { 
                touchReleaseOnEdges: true
            });
        }
}

window.onload = displayModal();

$(document).ready(function () {
    $('.submit').click(function (event) {
        
        console.log('Clicked Button')

        var email = $('.email').val()
        var subject = $('.subject').val()
        var message = $('.message').val()
        var statusElm = $('.status')
        statusElm.empty()

        if(email.length > 5 && email.includes('@') && email.includes('.')) {
            statusElm.append('<div>Email is valid</div>')
        } else {
            event.preventDefault()
            statusElm.append('<div>Email is not valid</div>')
        }

        if(subject.length >= 2) {
            statusElm.append('<div>Subject is valid</div>')
        } else {
            event.preventDefault()
            statusElm.append('<div>Subject is not valid</div>')
        
        }

        if(message.length >= 10) {
            statusElm.append('<div>Message is valid</div>')
        } else {
            event.preventDefault()
            statusElm.append('<div>Message is not valid</div>')
        }
    })
})