var app=angular.module('options', ['avenger.services'])
.run(function($rootScope) {

});

function Import($scope, Api){
	var win = document.getElementById("worker").contentWindow;

	$.get('http://motor.ru/articles/2014/04/21/chinarace/', function(html){
		win.document.write(html);
		$('#worker').contents().find('html body:eq(0)').append('<script src="libs/jquery.js"></script><script src="browsers/inject.js"></script><script src="inject.js"></script>');
	
		win.postMessage({action: 'raindrop-getHTML'},'*');
	}, 'html');
}