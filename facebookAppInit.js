var FB;
window.fbAsyncInit = function() {
    FB.init({
        appId      : FB_APP_ID.id,
        cookie     : true,
        xfbml      : true,
        version    : 'v7.0'
    });
    
    FB.AppEvents.logPageView();
    
    console.log(FB)
};

( function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));