//popup
function checkForValidUrl(tabId, changeInfo, tab) {
	if ((tab.url.indexOf('://raindrop.io')<0)&&(tab.url.indexOf('http')==0)) {
		chrome.pageAction.show(tabId);
		chrome.pageAction.setIcon({
			tabId:tabId,
			path:'images/icon-19.png'
		});
	}
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);