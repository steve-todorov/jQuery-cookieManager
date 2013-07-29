(function($){
    /**
     * Usage:  $.cookie('cookieName');
     * Action: Retrieves a cookie with the name "cookieName"
     *
     * Usage:  $.cookie('cookieName', 'value');
     * Action: Sets "cookieName" with "value"; default expiration time is 1 day.
     *
     * Usage:  $.cookie('cookieName', 'value', {some:options});
     * Action: Sets "cookieName" with "value" and sets additional options like path, expiration time etc.
     *
     * Usage:  $.cookie('cookieName', null);
     * Usage:  $.cookie('cookieName', false);
     * Action: Removes "cookieName"
     *
     * @Author: Steve Todorov
     * @Homepage: https://github.com/steve-todorov
     */
    $.cookie = function(){
        var cookieOptions = {
            expires: '',
            path:'/'
        };

        var methods = {
            setCookie:function(cookieName, cookieValue, options) {
                var expires;
                if(options != "undefined"){ $.extend(cookieOptions, options); }
                if (cookieOptions.expires) {
                    var date = new Date();
                    date.setTime(date.getTime() + (cookieOptions.expires * 24 * 60 * 60 * 1000));
                    expires = "; expires=" + date.toGMTString();
                }
                else expires = "";
                document.cookie = cookieName + "=" + cookieValue + expires + "; path=" + cookieOptions.path
                return true;
            },
            getCookie:function(cookieName) {
                if (document.cookie.length > 0) {
                    var c_start = document.cookie.indexOf(cookieName + "=");
                    if (c_start != -1) {
                        c_start = c_start + cookieName.length + 1;
                        var c_end = document.cookie.indexOf(";", c_start);
                        if (c_end == -1) c_end = document.cookie.length;
                        return unescape(document.cookie.substring(c_start, c_end));
                    }
                }
                return false;
            },
            deleteCookie:function(cookieName) { return methods.setCookie(cookieName, "", {expires: -1}); }
        };

        if (arguments.length == 1) {
            return methods.getCookie(arguments[0]);
        }
        else if(arguments.length == 2 || arguments.length == 3) {
            if(arguments[1] !== null && arguments[1] !== false)
                return methods.setCookie.apply(this, arguments);
            else
                return methods.deleteCookie(arguments[0]);
        }
        else {
            return false;
        }
    }
})(jQuery);