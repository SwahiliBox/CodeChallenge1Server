/* 
   when scrolling the page the navigation menu 
   will change its background from nothing to a transparent black
   color once we scroll past the main site title
*/
$(document).ready(function () {
  var scrollStart = 0;
  var startChange  = $(".call-to-action .content");
  var offset       = startChange.offset();

  if (startChange.length) {
    $(document).scroll(function () {
      scrollStart = $(this).scrollTop();
      if (scrollStart > offset.top) {
        $("nav").css('background-color', 'rgba(0,0,0,.75)', 'margin-top', '0px')
                .animate({'margin-top': "0px"}, 10);
      } else {
        $('nav').css('background-color', 'transparent')
                .animate({'margin-top': '30px'}, 10);
      }
    });
  }
});
