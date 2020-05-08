///https://youtu.be/v4jgr0ppw8Q

var urlParams = new URLSearchParams(window.location.search);
var FB_APP_ID = urlParams.get('id');

var FB;
window.fbAsyncInit = function() {
    FB.init({
        appId      : FB_APP_ID,
        cookie     : true,
        xfbml      : true,
        version    : 'v7.0'
    });
    
    FB.AppEvents.logPageView();
};

( function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));