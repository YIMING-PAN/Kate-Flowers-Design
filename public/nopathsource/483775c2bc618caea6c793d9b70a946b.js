(function ($, window) {
    "use strict";

    function do_search_open(){
        var searchicon = 'fa-search';
        var timesicon = 'fa-times';

        $(".nav-search i").bind('click', function(e){
            if(e.target == this) {
                var parent = $(this).parent();
                var currentstate = $(this).hasClass(searchicon);

                if(currentstate) {
                    $(this).removeClass(searchicon).addClass(timesicon);
                    $(parent).find('.searchbox').stop().fadeIn("fast");
                } else {
                    $(this).removeClass(timesicon).addClass(searchicon);
                    $(parent).find('.searchbox').stop().fadeOut("fast");
                }
            }
        });
    }

    function do_hover_menu () {
        var selectormenu = $(".navigation li.menu-item-has-children");
        $(selectormenu).unbind('click');

        $(selectormenu).unbind("mouseenter mouseleave")
            .removeProp('hoverIntent_t')
            .removeProp('hoverIntent_s');


        $(selectormenu).hoverIntent({
            over: function () {
                $(this).find('> .sub-menu').fadeIn("fast");
            },
            out: function () {
                $(this).find('> .sub-menu').fadeOut("fast");
            },
            timeout: 300
        });
    }

    function do_article_gallery() {
        $("article .flexslider").flexslider({
            animation: "slide",
            slideshow: false
        });
    }

    /****************************
     * type video
     ***************************/

    $.youtube_parser = function (url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);

        if (match && match[7].length === 11) {
            return match[7];
        }
        /*jshint latedef: true */
        window.alert("Url Incorrect");
    };

    $.vimeo_parser = function (url) {
        var regExp = /http:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
        var match = url.match(regExp);

        if (match) {
            return match[2];
        }

        // check if using https
        regExp = /https:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
        match = url.match(regExp);

        if (match) {
            return match[2];
        }

        /*jshint latedef: true */
        window.alert("not a vimeo url");
    };

    $.type_video_youtube = function (ele, autoplay, repeat) {
        var youtube_id = $.youtube_parser($(ele).attr('data-src'));
        var additionalstring = '';
        var iframe = '';
        if(repeat) {
            additionalstring += ( autoplay === true ) ? "autoplay=1&" : "";
            additionalstring += (repeat === true ) ? "loop=1&playlist=" + youtube_id : "";
            iframe = '<iframe width="700" height="500" src="http://www.youtube.com/v/' + youtube_id + '?version=3&' + additionalstring + 'showinfo=0&theme=light&autohide=1&rel=0&wmode=opaque" frameborder="0" allowfullscreen></iframe>';
        } else {
            additionalstring += ( autoplay === true ) ? "autoplay=1&" : "";
            iframe = '<iframe width="700" height="500" src="http://www.youtube.com/embed/' + youtube_id + '?' + additionalstring + 'showinfo=0&theme=light&autohide=1&rel=0&wmode=opaque" frameborder="0" allowfullscreen></iframe>';
        }
        $('.video-container', ele).append(iframe);
    };

    $.type_video_vimeo = function (ele, autoplay, repeat) {
        var vimeo_id = $.vimeo_parser($(ele).attr('data-src'));
        var additionalstring = '';
        additionalstring += ( autoplay === true ) ? "autoplay=1&" : "";
        additionalstring += (repeat === true ) ? "loop=1&" : "";
        var iframe = '<iframe src="http://player.vimeo.com/video/' + vimeo_id + '?' + additionalstring + 'title=0&byline=0&portrait=0" width="700" height="500" frameborder="0"></iframe>';
        $('.video-container', ele).append(iframe);
    };

    $.type_soundcloud = function (ele) {
        var soundcloudurl = $(ele).attr('data-src');
        var iframe = '<iframe src="https://w.soundcloud.com/player/?url=' + encodeURIComponent(soundcloudurl) + '" width="700" height="500" frameborder="0"></iframe>';
        $('.music-container', ele).append(iframe);
    };

    $.type_audio = function(ele){
        var musicmp3 = '';
        var musicogg = '';

        if ($(ele).data('mp3') !== '') {
            musicmp3 = "<source type='audio/mpeg' src='" + $(ele).data('mp3') + "' />";
        }

        if ($(ele).data('ogg') !== '') {
            musicogg = "<source type='audio/ogg' src='" + $(ele).data('ogg') + "' />";
        }

        var audio =
            "<audio preload='none' style='width: 100%; visibility: hidden;' controls='controls'>" +
            musicmp3 + musicogg +
            "</audio>";

        $(ele).append(audio);


        var settings = {};

        if ( typeof _wpmejsSettings !== 'undefined' ) {
            settings = _wpmejsSettings;
        }

        settings.success = function (mejs) {
            var autoplay, loop;

            if ( 'flash' === mejs.pluginType ) {
                autoplay = mejs.attributes.autoplay && 'false' !== mejs.attributes.autoplay;
                loop = mejs.attributes.loop && 'false' !== mejs.attributes.loop;

                autoplay && mejs.addEventListener( 'canplay', function () {
                    mejs.play();
                }, false );

                loop && mejs.addEventListener( 'ended', function () {
                    mejs.play();
                }, false );
            }
        };

        $(ele).find('audio').mediaelementplayer( settings );
    };

    $.type_video_html5 = function (ele, autoplay, options, container) {
        var cover = $(ele).data('cover');

        options.pauseOtherPlayers = false;

        var videomp4 = '';
        var videowebm = '';
        var videoogg = '';

        var themesurl = '';

        if ($(ele).data('mp4') !== '') {
            videomp4 = "<source type='video/mp4' src='" + $(ele).data('mp4') + "' />";
        }

        if ($(ele).data('webm') !== '') {
            videowebm = "<source type='video/webm' src='" + $(ele).data('webm') + "' />";
        }

        if ($(ele).data('ogg') !== '') {
            videoogg = "<source type='video/ogg' src='" + $(ele).data('ogg') + "' />";
        }

        var preload = autoplay ? "preload='auto'" : "preload='none'";
        var object = "<object width='100%' height='100%' type='application/x-shockwave-flash' data='" + themesurl + "/public/mediaelementjs/flashmediaelement.swf'>" +
            "<param name='movie' value='" + themesurl + "/public/mediaelementjs/flashmediaelement.swf' />" +
            "<param name='flashvars' value='controls=true&file=" + $(ele).data('mp4') + "' />" +
            "<img src='" + cover + "' alt='No video playback capabilities' title='No video playback capabilities' />" +
            "</object>";
        var iframe = "<video id='player' style='width:100%;height:100%;' width='100%' height='100%' poster='" + cover + "' controls='controls' " + preload + ">" +
            videomp4 + videowebm + videoogg + object +
            "</video>";

        $(container, ele).append(iframe);
        if (autoplay) {
            options.success = function (mediaElement) {
                if (mediaElement.pluginType === 'flash') {
                    mediaElement.addEventListener('canplay', function () {
                        mediaElement.play();
                    }, false);
                } else {
                    mediaElement.play();
                }
            };
        }

        $(ele).find('video').mediaelementplayer(options);
    };

    function do_media_render(){
        // youtube
        if ($("[data-type='youtube']").length) {
            $("[data-type='youtube']").each(function () {
                var autoplay = $(this).data('autoplay');
                var repeat = $(this).data('repeat');
                $.type_video_youtube($(this), autoplay, repeat);
            });
        }

        // vimeo
        if ($("[data-type='vimeo']").length) {
            $("[data-type='vimeo']").each(function () {
                var autoplay = $(this).data('autoplay');
                var repeat = $(this).data('repeat');
                $.type_video_vimeo($(this), autoplay, repeat);
            });
        }

        // sound cloud
        if ($("[data-type='soundcloud']").length) {
            $("[data-type='soundcloud']").each(function () {
                $.type_soundcloud($(this));
            });
        }

        // audio
        if ($("[data-type='audio']").length) {
            $("[data-type='audio']").each(function () {
                $.type_audio($(this));
            });
        }

        // html 5 video
        if($("video").length) {
            $('video').mediaelementplayer();
        }
    }

    function do_facebook_widget(){
        if($(".blog-fb-likebox").length){

            window.fbAsyncInit = function() {
                FB.init({
                    xfbml      : true,
                    version    : 'v2.0'
                });
            };

            (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        }
    }

    function do_scroll_top() {
        $(".gototop").bind('click', function(){
            $('html, body').animate({
                scrollTop: 0
            }, 1000);
        });
    }

    function do_mobile_menu(){
        $(".mobile-navigation").bind('click', function(){
            var $navigator = $(this);
            var $mobilemenu = $(".mobile-menu");

            if($navigator.hasClass('collapse')) {
                $navigator.removeClass('collapse');
                $mobilemenu.slideUp('fast');
            } else {
                $navigator.addClass('collapse');
                $mobilemenu.slideDown('fast');
            }
        });

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

    function do_related_effect(){

        var $related = $(".related");
        var $relatedflag = $(".related-flag");
        var effect = 'auto';

        if($related.length) {
            $related.hover(function(){
                effect = 'normal';
                $related.addClass('open');
            }, function(){
                $related.removeClass('open');
            });

            $relatedflag.waypoint(function (direction) {
                if(effect == 'auto') {
                    if(direction == 'up'){
                        $related.removeClass('open');
                    } else {
                        $related.addClass('open');
                    }
                }

            }, {
                offset: '100%',
                context: window
            });
        }
    }

    function do_sidebar_follow() {
        $(".sidebar-container").jFollowSidebar({
            listen_height : ["#wrapper"],
            container : ".post-container",
            stop: 1024
        });
    }

    function do_share_click() {

        $(".sharing > div > a").each(function(){
            $(this).bind('click', function(e){
                e.preventDefault();
                var url = '';
                if($(this).data('href')) {
                    url = $(this).data('href');
                } else {
                    url = $(this).attr('href');
                }
                var social = $(this).data('shareto');
                window.open(url, "Share Article to " + social , "height=300,width=600");
            });
        });
    }

    function do_sticky_menu() {
        
        if($("#post-wrapper").length && $("#post-wrapper").data('stickyHeader')) {
            var topposition = 0;
            var helperheight = 0;
            var scrolltop = 0;
            var calculate_top = function(){
                topposition = $("#heading .nav-helper").offset().top;
                helperheight = $("#heading .nav-container ").height();
            };

            var sticky_menu = function() {
                scrolltop = $(window).scrollTop();
                if(scrolltop > topposition) {
                    $("#heading").addClass('sticky');
                    $("#heading .nav-helper").css('height', helperheight);
                } else {
                    $("#heading").removeClass('sticky');
                    $("#heading .nav-helper").css('height', 0);
                }
            };

            calculate_top();
            $(window).bind('load resize', calculate_top);
            $(window).bind('scroll', sticky_menu);
        }
    }

    function do_ready() {
        do_search_open();
        do_hover_menu();
        do_article_gallery();
        do_media_render();
        do_facebook_widget();
        do_scroll_top();
        do_mobile_menu();
        do_related_effect();
        do_sidebar_follow();
        do_share_click();
        do_sticky_menu();
    }

    $(document).ready(do_ready);
})(jQuery, window);