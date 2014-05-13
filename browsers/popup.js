/*document.addEventListener("beforeload", function() {
	if (window.top !== window)
		event.preventDefault();
}, true);*/

var currentURL=function(){}, oblako=function(){}, makeScreenshot=function(){}, oblakoClose=function(){}, postOblako=function(){}, openLink=function(){ return true; };

// CHROME
if (typeof chrome != 'undefined'){
	//messages from inject js
	window.addEventListener("message", function (e) {
		switch(e.data.action){
			case 'setHTML':
				if (typeof e.data.item.result != 'undefined')
					angular.element(document.getElementById('stepsController')).scope().actions.setFormData(e.data.item);
			break;
			case 'setScreenshot':
				angular.element(document.getElementById('stepsController')).scope().actions.setCapturedPage(e.data.dataURI);
			break;
		}
	});

	oblako = function(params) {
		if (raindropId==0)
			window.parent.postMessage({action: 'raindrop-getHTML', params: params},'*');
	};

	makeScreenshot = function(callback) {
		window.parent.postMessage({action: 'raindrop-getScreenshot'},'*');
	};

	oblakoClose = function(param) {
		window.parent.postMessage({action: 'raindrop-closePopup', param:param},'*');
	};
}


//SAFARI
if (typeof safari != 'undefined') {
	currentURL = function(callback) {
		callback(safari.application.activeBrowserWindow.activeTab.url);
	};

	oblako = function() {
		if (raindropId==0){
			if (typeof safari.application.activeBrowserWindow.activeTab.page != 'undefined'){
				safari.application.activeBrowserWindow.activeTab.page.dispatchMessage('getHTML','please');
				//safari.self.height = window.innerHeight;
			}
		}
	};

	safari.application.addEventListener("message", function(e){
		switch(e.name){
			case 'refreshOblako':
				location.href="#/add";
				angular.element(document.getElementById('stepsController')).scope().actions.checkUrlDublicates();
			break;
			case 'sendRequest':
				if (typeof e.message.result != 'undefined')
					angular.element(document.getElementById('stepsController')).scope().actions.setFormData(e.message);
			break;
		}
	}, false);

	makeScreenshot = function(callback) {
		safari.application.activeBrowserWindow.activeTab.visibleContentsAsDataURL(function(dataURI) {
			callback(dataURI);
		});
	};

	postOblako = function() {
		setTimeout(function(){
			safari.self.height = $('#stepsController').height();
		},0);
	}

	oblakoClose = function(ok) {
		safari.self.hide();
	};

	openLink = function(obj){
		var nwin = safari.application.activeBrowserWindow.openTab();
		nwin.url = obj.getAttribute("href");
		safari.self.hide();

		return false;
	};
}