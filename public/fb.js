// Facebook JS SDK inicializálása és beállítása
window.fbAsyncInit = function() {
	FB.init({
		appId      : '1882038602062157',
		cookie     : true,
		xfbml      : true,
		version    : 'v2.8'
	});
	FB.AppEvents.logPageView();

	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			console.log('Be van jelentkezve.');
		} else {
			console.log('Nincs bejelentkezve.');
		}
	});
};

(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/hu_HU/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
