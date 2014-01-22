document.addEventListener("beforeload", function() {
	if (window.top !== window)
		event.preventDefault();
}, true);

var currentURL=function(){}, oblako=function(){}, makeScreenshot=function(){}, oblakoClose=function(){}, postOblako=function(){}, openLink=function(){ return true; };

// CHROME
if (typeof chrome != 'undefined'){
	currentURL = function(callback) {
		chrome.tabs.getSelected(null, function(tab) {
			callback(tab.url);
		});
	};

	oblako = function() {
		if ((chrome.tabs!=undefined)&&(raindropId==0))
		chrome.tabs.getSelected(null, function(tab) {
			chrome.tabs.sendRequest(tab.id, {action: "getHTML"}, function(response) {
				if (typeof response.result != 'undefined')
					angular.element(document.getElementById('stepsController')).scope().actions.setFormData(response);
			});
		});
	};

	makeScreenshot = function(callback) {
		chrome.tabs.captureVisibleTab(null, {format:'jpeg', quality: 100}, function(dataURI) {
			callback(dataURI);
		});
	};

	oblakoClose = function(ok) {
		chrome.tabs.getSelected(null, function(tab) {
			chrome.pageAction.setIcon({
				tabId:tab.id,
				path: (ok==true ? 'images/icon-19-ok.png' : 'images/icon-19.png')
			});
		});
		window.close();
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
				//angular.element(document.getElementById('stepsController')).scope().actions.checkUrlDublicates();
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
		safari.self.height = $('#stepsController').height();
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