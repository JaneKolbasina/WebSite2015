'use strict';

(function(window, $){
    $(function(){

        if(Materialize) {
            window.onerror = function OnError(errorMsg, url, lineNumber, column, errorObj) {
                var message = 'Error: ' + errorMsg + ' Script: ' + url
                    + ' Line: ' + lineNumber + ' Column: ' + column
                    + ' StackTrace: ' +  errorObj;
                Materialize.toast(message, 4000);
                return false;
            };

            $('.button-collapse').sideNav();
        }

        if($.fn.fancybox) {
            $(".fancybox").fancybox();
        }
    });
})(window, jQuery);