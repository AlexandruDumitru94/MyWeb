

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
    var screenWidth = document.getElementsByClassName("page")[0].scrollWidth;
    var screenHeight = document.getElementsByClassName("page")[0].scrollHeight;
    var quarterSizeDif = (screenWidth - screenHeight) / 4;
    var pageScroll = 0;
    if  (pageNumber > 0) {
        pageScroll += (quarterSizeDif + (bodyWidth - screenWidth) / 4) * pageNumber;
    }
    window.scrollTo(0, pageScroll);
}