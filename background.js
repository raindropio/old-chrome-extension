//Tabs functions
var tabs = {
	id: null,
	setIcon: function(src) {
		if (typeof src=='undefined') src='icon-19.png';

		chrome.pageAction.setIcon({
			tabId: this.id,
			path:'images/'+src
		});
	}
}


//Check URL
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {	
	if ((tab.url.indexOf('://raindrop.io')<0)&&(tab.url.indexOf('http')==0)) {
		chrome.pageAction.show(tabId);

		tabs.id = tabId;
		tabs.setIcon();
	}
});


//On Click
chrome.pageAction.onClicked.addListener(function(tab) {
	chrome.tabs.sendMessage(tab.id, {action: "showPopup", url:tab.url}, function(response) {});
});


//Messages from inject js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	switch(request.action){
		case 'getScreenshot':
			//sendResponse(tempScreen);
			chrome.tabs.captureVisibleTab(null, {format:'jpeg', quality: 100}, function(dataURI) {
				sendResponse(dataURI);
			});
		break;

		case 'close':
			if (request.param=='save')
				tabs.setIcon('icon-19-ok.png');
			else if (request.param=='delete')
				tabs.setIcon();
		break;
	}
	return true;
});