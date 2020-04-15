//Home page slider
(function ($) {
  $(document).ready(function(){
    if($('.highlightslider .flexslider').length){
      $('.highlightslider .flexslider').flexslider({
        animation: 'slide',
        slideshow: 0,
        slideshowSpeed: 7000,
        startAt: 0,
        controlNav: false,
        mousewheel: false
      });
    }else if($('.fullslider .flexslider').length){
      $('.fullslider .flexslider').flexslider({
        animation: 'slide',
        slideshow: 0,
        slideshowSpeed: 7000,
        startAt: 0,
        controlNav: false,
        mousewheel: false,
        start: function (slider) {
          $('.fullslider .flex-active-slide .slider-excerpt').addClass('show-excerpt');
        },
        before: function (slider) {
          $('.fullslider .flex-active-slide .slider-excerpt').removeClass('show-excerpt');
        },
        after: function (slider) {
          $('.fullslider .flex-active-slide .slider-excerpt').addClass('show-excerpt');
        }
      });
    }
  });
})(jQuery);

//Trending posts slider
(function ($) {
  $(document).ready(function() {
    if($("#popular-slider").length){
      $("#popular-slider").owlCarousel({
        autoPlay: false,
        items : 4,
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [979,3]
      });
    }
  });
})(jQuery);

//Add background stack slider
(function ($) {
  $(document).ready(function() {
    if($(".stackbg").length){
      $(".stackbg").each(function(){
        $(this).css("background-image","url('"+$(this).data('bgImg')+"')");
      });
    }
  });
})(jQuery);

//Replace main sub-menu & clone mobile menu
(function ($) {
  $(document).ready(function() {
    if($(".navigation>.menu").length){
      $(".navigation>.menu .menu").each(function(){
        $(this).removeClass("menu");
        $(this).addClass("sub-menu");
      });
      mainMenuHTML = $(".navigation").html();
      $(".mobile-menu").html(mainMenuHTML);
      $(".mobile-menu .menu").attr('id','menu-main-menu');
      do_mobile_menu();
    }
  });
  function do_mobile_menu(){
    $(".mobile-menu li.menu-item-has-children > a").bind('click', function(e){
      e.preventDefault();
      if( e.target === this ){
        var $navigator = $(this).parent();
        var $childmenu = $navigator.find('> .sub-menu');

        if($navigator.hasClass('collapse')) {
          $navigator.removeClass('collapse');
          $childmenu.slideUp('fast');
        } else {
          $navigator.addClass('collapse');
          $childmenu.slideDown('fast');
        }
      }
    });
  }
})(jQuery);

//Fix css for masonry content
(function ($) {
  $(document).ready(function() {
    if($(".blog-masonry-wrapper").length){
      var element = $(".blog-masonry-wrapper");
      var container = $(element).find('.isotopewrapper');
      var get_blog_column_number = function() {
        var ww = $(container).width();
        if (ww < 480) return 1;
        if (ww < 800) return 2;
        return 3;
      };
      var blog_resize = function() {
        $(container).addClass('no-transition');

        var elepadding = $(element).css('padding-left').replace("px", "");
        var blognumber = get_blog_column_number();
        var wrapperwidth = $(element).width() - elepadding;
        var itemwidth = Math.floor(wrapperwidth / blognumber) - 1;

        $(".article-masonry-container", container).width(itemwidth);
        $(container).removeClass('no-transition');
      };
      var initialize_blog = function() {
        blog_resize();

        $(container).isotope({
            itemSelector: ".article-masonry-container",
            masonry: {
                columnWidth: 1
            }
        });

        $(container).imagesLoaded(function() {
            $(container).isotope('layout');
        });

        setInterval(function () {
            $(container).isotope('layout');
            console.log('relayout');
        }, 2000);

        $(window).bind('resize', function(){
            $(container).isotope('layout');
        });
      };
      $(window).bind("resize load", function () {
          blog_resize();
      });
      initialize_blog();
    }
  });
})(jQuery);

//Add background for Boxed layout
(function ($) {
  $(document).ready(function() {
    if($("#wrapper").hasClass("boxed")){
      boxedBg = $("#wrapper").data('boxedBg');
      
      $("body").css('background-image','url("'+boxedBg+'")');
    }
    
    if($("#footer .grid.one-third").length)
      $("#footer .grid.one-third").last().addClass('last');
  });
})(jQuery);