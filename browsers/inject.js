if (window.top === window) {
	// CHROME
	if (typeof chrome != 'undefined'){
		//messages from background js
		chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
			if (!sender.tab)
				switch(request.action){
					case 'showPopup':
						var args={
							css: chrome.extension.getURL("css/inject-popup.css"),
							iframe: chrome.extension.getURL("popup.html")
						}

						if ($('#inject-raindrop-popup').length==0){
							$('body').append('<div id="inject-raindrop-popup"><link rel="stylesheet" href="'+args.css+'"><iframe id="inject-raindrop-iframe" src=\''+args.iframe+'#{"url":"'+encodeURIComponent(request.url)+'"}\' frameborder="0" allowtransparency></iframe></div>');
							$('#inject-raindrop-iframe').load(function(){
								$('#inject-raindrop-popup').addClass('irp-js-showing');

								sendResponse(true);
							});
						}
					break;
				}
			return true;
		});

		//messages from iframe
		window.addEventListener("message", function (e) {
			switch(e.data.action){
				case 'raindrop-getHTML':
					RainDropPanzer.run(function(item) {
						document.getElementById("inject-raindrop-iframe").contentWindow.postMessage({action: 'setHTML', item: item},'*');
					}, e.data.params);
				break;
				case 'raindrop-getScreenshot':
					$('#inject-raindrop-popup').hide();
					setTimeout( function() {
						chrome.runtime.sendMessage({action: "getScreenshot"}, function(response) {
							document.getElementById("inject-raindrop-iframe").contentWindow.postMessage({action: 'setScreenshot', dataURI: response},'*');
							$('#inject-raindrop-popup').show();
						});
					},100);
				break;
				case 'raindrop-closePopup':
					chrome.runtime.sendMessage({action: "close", param: e.data.param});
					$('#inject-raindrop-popup').remove();
				break;
			}
		});
	}

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
}