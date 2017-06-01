angular.module('myApp').controller('AppCtrl', function($scope) {
	$scope.hidden = true;
	$scope.user_name = "";
	$scope.user_photo = "";
	$scope.days = "";
	$scope.posts = [];
	$scope.likes = [];

	// Bejelentkezés a Facebookkal
	function login() {
		FB.login(function(response) {
			if (response.status === 'connected') {
				console.log('A Facebookkal történő bejelentkezés sikeres.');
				console.log(response.authResponse);
				console.log("---------------------------------");
				$scope.hidden = false;
				$scope.$apply();
				getInfo();
			} else if (response.status === 'not_authorized') {
				console.log('Bejelentkezve a Facebookon, de ezen az oldalon nem.');
			} else {
				console.log('Nincs kapcsolat a Facebookkal.');
			}
		}, {scope: 'public_profile, email, user_posts, user_likes, user_status'});
	}
	$scope.login = login;

	// Felhasználói adatok lekérdezése
	function getInfo() {

		FB.api(
			'/me',
			'GET',
			{fields: 'id, last_name, first_name, name, picture.width(100).height(100)'},
			function(response) {
				console.log("/me");

				if(response && !response.error){
					$scope.user_name = response.name;
					$scope.user_photo = response.picture.data.url;
					$scope.$apply();
					console.log(response);
				}else{
					console.log("Nincs válasz, vagy hiba! Részletek:");
					console.log(response);
				}

				console.log("---------------------------------");
			}
		);
		
		FB.api(
			'/me/feed',
			'GET',
			function(response) {
				console.log("/me/feed");

				if(response && !response.error){
					var d = new Date();
					var days = 7;
					var posts = [];
					var postContent = "";
					var fromDate = d.setDate(d.getDate() - days);
					
					response.data.forEach(function(item){
						if(Date.parse(item.created_time) >= fromDate){
							if(item.story) postContent = item.story;
							if(item.message) postContent = item.message;
							
							posts.push(item.created_time.replace(/T/g, " ").slice(0, -5) + " - " + postContent);
						}
					});
					
					$scope.days = days;
					$scope.posts = posts;
					$scope.$apply();
					console.log(response);
				}else{
					console.log("Nincs válasz, vagy hiba! Részletek:");
					console.log(response);
				}

				console.log("---------------------------------");
			}
		);
		
		FB.api(
			'/me/likes',
			'GET',
			function(response) {
				console.log("/me/likes");

				if(response && !response.error){
					var d = new Date();
					var days = 7;
					var likes = [];
					var fromDate = d.setDate(d.getDate() - days);
					
					response.data.forEach(function(item){
						if(Date.parse(item.created_time) >= fromDate){
							likes.push(item.created_time.replace(/T/g, " ").slice(0, -5) + " - " + item.name);
						}
					});
					
					$scope.days = days;
					$scope.likes = likes;
					$scope.$apply();
					console.log(response);
				}else{
					console.log("Nincs válasz, vagy hiba! Részletek:");
					console.log(response);
				}

				console.log("---------------------------------");
			}
		);
	}
});