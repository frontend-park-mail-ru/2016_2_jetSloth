function trySendForm(form, url) {
	    let context = form.validator();
	    if (context.isValid) {
	    var myHeaders = new Headers();
	    myHeaders.append("Content-Type", "application/json");
	    fetch(url, {method: "post", headers: myHeaders, body: JSON.stringify(body)}) 
		.then(
		function(response) {
		if (response.status == 200) {
			let session = response.headers.get('session');
			signInPage.hidden = true;
			signUpPage.hidden = true;
			gameBox.start(session);
			gamePage.hidden = false;
		}
		else {
			alert("Что-то пошло не так (пользователь уже существует?)");
		}
	        });
		}
	else {
		alert("error");
	}
