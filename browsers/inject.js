document.addEventListener("beforeload", function() {
	if (window.top !== window)
		event.preventDefault();
}, true);

// CHROME
if (typeof chrome != 'undefined')
	chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
		if (!sender.tab){
			switch(request.action){
				case 'getHTML':
					RainDropPanzer.run(function(item) {
						sendResponse(item);
					});
				break;
			}
		}
	});

//SAFARI
if (typeof safari != 'undefined'){
	safari.self.addEventListener("message", function(e){
		switch(e.name) {
			case 'getHTML':
				safari.self.tab.dispatchMessage("refreshOblako", 'please');
				RainDropPanzer.run(function(item) {
					safari.self.tab.dispatchMessage("sendRequest", item);
				});
			break;
		}
	}, false);
}