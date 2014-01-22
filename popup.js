var raindropId = 0;
//window.onload = oblako;

var helpers={
	trim:function(s) {
		return s.replace(/(^\s*|\s*$)/g, '');
	}
}

angular.module('avenger.services', [])
.factory('Api', ['$http', 'Boot', function($http, Boot){
	return {
		path:'http://raindrop.io/api/',

		get:function(url,callback) {
			$http.get(this.path+url).success( function(json) {
				if (Boot.checkResult(json))
					callback(json);
			}).error( function() {
				var json={result:false};
				callback(json);
			} );
		},
		post:function(url,params,callback) {
			$http({
			  url: this.path+url,
			  method: "POST",
			  data: params,
			  headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			  }
			}).success(function(json, status, headers, config) {
				if (Boot.checkResult(json))
					callback(json);
			}).error( function() {
				var json={result:false};
				callback(json);
			} );
		},
		del:function(url,callback) {
			$http.delete(this.path+url).success( function(json) {
				if (Boot.checkResult(json))
					callback(json);
			}).error( function() {
				var json={result:false};
				callback(json);
			} );
		},
		put:function(url,params,callback) {
			$http({
			  url: this.path+url,
			  method: "PUT",
			  data: params,
			  headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			  }
			}).success(function(json, status, headers, config) {
				if (Boot.checkResult(json))
					callback(json);
			}).error( function() {
				var json={result:false};
				callback(json);
			} );
		}
	}
}])
.factory('Boot', [/*'$location',*/'$rootScope', function(/*$location*/$rootScope){
	return {
		checkResult: function(json) {
			if(json.auth!=undefined){
				$rootScope.currentController='auth';
				/*$location.url('/auth');*/
				return false;
			}
			return true;
		}
	}
}])
.filter('fixURL', function() {
	return function(input) {
		if (input.indexOf('/')==0)
			input='http://raindrop.io'+input;
		return input;
	}
})
.filter('humanize', function() {
	return function(input,end) {
		var robot={
			"article_":"Статья"
			,"image_":"Фото"
			,"video_":"Контент"
			,"link_":"Ссылка"
			,"articled":"статью"
			,"imaged":"фото"
			,"videod":"контент"
			,"linkd":"ссылку"
			,"article":"Статьи"
			,"image":"Фото"
			,"video":"Контента"
			,"link":"Ссылки"
		}
		
		if (input!=undefined)
		{
			if (end!=undefined) input+=end;
			for (var val in robot)
				input = input.replace(new RegExp(val, "g"), robot[val]);
		}
	
		return input;
	}
})
.directive("extraSearch", function() {
return {
	restrict: "EA",
	replace: true,
	template: '<div class=\"extra-search\" onClick=\"$(\'#extraSearchInput\').focus()\">\n\t\t<ul>\n\t\t\t<li ng-repeat=\"(i,key) in keys\" class=\"es-key key-{{key.key}}\" ng-class=\"{\'active\' : i == keys.length-1 && editMode}\">\n\t\t\t\t<a href=\"\" class=\"es-close\" ng-click=\"actions.remove(i)\">&times;<\/a>\n\t\t\t\t<span class=\"es-wrap\">\n\t\t\t\t\t<span>\n\t\t\t\t\t\t<b>#<\/b>\n\t\t\t\t\t<\/span>\n\t\t\t\t\t{{key.q}}\n\t\t\t\t<\/span>\n\t\t\t<\/li>\n\n\t\t\t<li class=\"es-input\"><form ng-submit=\"actions.add()\"><input type=\"search\" list=\"extracomplete\" ng-model=\"key\" autofocus autocomplete=\"on\" placeholder=\"{{placeholder}}\" size=\"{{key.length}}\" id=\"extraSearchInput\"  ui-keydown=\"{\',\': \'actions.add()\', \'backspace\': \'actions.back()\'}\" ng-keyup=\"actions.check()\" ng-keypress=\"actions.reset()\"\/><\/form><\/li>\n\t\t\t<li class=\"clear\"><\/li>\n\t\t<\/ul>\n\t\t<datalist id=\"extracomplete\">\n\t\t\t<option ng-repeat=\"tag in autocomplete\" value=\"{{tag._id}}\" \/>\n\t\t<\/datalist>\n\t\t<div class=\"clear\"><\/div>\n\t<\/div>',
	//templateUrl: 'extra-search.html',
	scope: {
		submit: '&',
		keys: '=',
		autocomplete: '='
	},
	link: function(scope, element, attrs) {
		var fixed;
		scope.allowedType = attrs.allowedType;
		scope.placeholder = attrs.placeholder;
		scope.key = '';
		
		scope.actions = {
			add: function() {
			  var canAdd, i, key, val;
			  scope.key = helpers.trim(scope.key);
			  if (scope.key.match(new RegExp(/(^|\s)#([^ ]*)/i)) || scope.allowedType === 'tag') {
				key = 'tag';
				scope.key = scope.key.replace(/[^a-zA-ZА-Яа-я0-9\.\s]/g, "");
				val = scope.key;
			  }

			  if (scope.key !== '') {
				canAdd = true;
				for (i in scope.keys) {
				  if (scope.keys[i].key === key && scope.keys[i].val === val) {
					canAdd = false;
				  }
				}
				if (canAdd) {
				  scope.keys.push({
					key: key,
					val: val,
					q: scope.key
				  });
				  this.send();
				}
				scope.key = "";
			  }
			  return this.reset();
			},
			remove: function(i) {
			  scope.keys.splice(i, 1);
			  return this.send();
			},
			back: function() {
			  if (scope.editMode) {
				this.remove(scope.keys.length - 1);
				return scope.editMode = false;
			  } else {
				if ((scope.key === '') && (scope.keys.length > 0)) {
				  return scope.editMode = true;
				}
			  }
			},
			reset: function() {
			  return scope.editMode = false;
			},
			check: function() {
			  if (scope.key[scope.key.length - 1] === ',') {
				scope.key = scope.key.replace(/,/g, '');
				return this.add();
			  }
			},
			send: function() {
				if (typeof scope.submit != 'undefined')
					scope.submit();
			}
		};
	}
  };
});

angular.module('ui.keypress',[]).
factory('keypressHelper', ['$parse', function keypress($parse){
  var keysByCode = {
    8: 'backspace',
    9: 'tab',
    13: 'enter',
    27: 'esc',
    32: 'space',
    33: 'pageup',
    34: 'pagedown',
    35: 'end',
    36: 'home',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    45: 'insert',
    46: 'delete'
  };

  var capitaliseFirstLetter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return function(mode, scope, elm, attrs) {
    var params, combinations = [];
    params = scope.$eval(attrs['ui'+capitaliseFirstLetter(mode)]);

    // Prepare combinations for simple checking
    angular.forEach(params, function (v, k) {
      var combination, expression;
      expression = $parse(v);

      angular.forEach(k.split(' '), function(variation) {
        combination = {
          expression: expression,
          keys: {}
        };
        angular.forEach(variation.split('-'), function (value) {
          combination.keys[value] = true;
        });
        combinations.push(combination);
      });
    });

    // Check only matching of pressed keys one of the conditions
    elm.bind(mode, function (event) {
      // No need to do that inside the cycle
      var metaPressed = !!(event.metaKey && !event.ctrlKey);
      var altPressed = !!event.altKey;
      var ctrlPressed = !!event.ctrlKey;
      var shiftPressed = !!event.shiftKey;
      var keyCode = event.keyCode;

      // normalize keycodes
      if (mode === 'keypress' && !shiftPressed && keyCode >= 97 && keyCode <= 122) {
        keyCode = keyCode - 32;
      }

      // Iterate over prepared combinations
      angular.forEach(combinations, function (combination) {

        var mainKeyPressed = combination.keys[keysByCode[keyCode]] || combination.keys[keyCode.toString()];

        var metaRequired = !!combination.keys.meta;
        var altRequired = !!combination.keys.alt;
        var ctrlRequired = !!combination.keys.ctrl;
        var shiftRequired = !!combination.keys.shift;

        if (
          mainKeyPressed &&
          ( metaRequired === metaPressed ) &&
          ( altRequired === altPressed ) &&
          ( ctrlRequired === ctrlPressed ) &&
          ( shiftRequired === shiftPressed )
        ) {
          // Run the function
          scope.$apply(function () {
            combination.expression(scope, { '$event': event });
          });
        }
      });
    });
  };
}]);

/**
 * Bind one or more handlers to particular keys or their combination
 * @param hash {mixed} keyBindings Can be an object or string where keybinding expression of keys or keys combinations and AngularJS Exspressions are set. Object syntax: "{ keys1: expression1 [, keys2: expression2 [ , ... ]]}". String syntax: ""expression1 on keys1 [ and expression2 on keys2 [ and ... ]]"". Expression is an AngularJS Expression, and key(s) are dash-separated combinations of keys and modifiers (one or many, if any. Order does not matter). Supported modifiers are 'ctrl', 'shift', 'alt' and key can be used either via its keyCode (13 for Return) or name. Named keys are 'backspace', 'tab', 'enter', 'esc', 'space', 'pageup', 'pagedown', 'end', 'home', 'left', 'up', 'right', 'down', 'insert', 'delete'.
 * @example <input ui-keypress="{enter:'x = 1', 'ctrl-shift-space':'foo()', 'shift-13':'bar()'}" /> <input ui-keypress="foo = 2 on ctrl-13 and bar('hello') on shift-esc" />
 **/
angular.module('ui.keypress').directive('uiKeydown', ['keypressHelper', function(keypressHelper){
  return {
    link: function (scope, elm, attrs) {
      keypressHelper('keydown', scope, elm, attrs);
    }
  };
}]);

angular.module('ui.keypress').directive('uiKeypress', ['keypressHelper', function(keypressHelper){
  return {
    link: function (scope, elm, attrs) {
      keypressHelper('keypress', scope, elm, attrs);
    }
  };
}]);

angular.module('ui.keypress').directive('uiKeyup', ['keypressHelper', function(keypressHelper){
  return {
    link: function (scope, elm, attrs) {
      keypressHelper('keyup', scope, elm, attrs);
    }
  };
}]);







var app=angular.module('avenger', [/*'ngRoute', */'ngAnimate', 'ngCookies', 'avenger.services', 'monospaced.elastic', 'ui.keypress', 'pascalprecht.translate'])
.run(function($rootScope) {
	$rootScope.currentController='add';
});
/*.config(function($routeProvider, $locationProvider) {
	$routeProvider.
		when('/add', {templateUrl: "add.html", controller: Add}).
		when('/auth', {templateUrl: "auth.html", controller: Auth}).
		otherwise({redirectTo: '/add'});
})
.run(function() {

});*/


/*
    -   -   -   -   /ADD  -   -   -   -
*/
function Add($scope, Api, $cookieStore, $timeout) {
	$scope.form={
		title:'', excerpt:'', type: 'link'
	};

	var formDefaults=function() {
		$scope.haveScreenshot=false;

		if ($scope.form.cover==undefined)
			$scope.form.cover = 0;

		if ($scope.form.collectionId==undefined)
		$scope.form.collectionId = ( $cookieStore.get('lastCollection') !=undefined ? parseInt($cookieStore.get('lastCollection')) : undefined );

		if (($scope.form.media=='')||($scope.form.media==undefined)) $scope.form.media=[];
		for(var i in $scope.form.media)
			if ($scope.form.media[i].screenshot!=undefined)
				$scope.haveScreenshot=true;

		if ($scope.haveScreenshot==false)
			$scope.form.media.push({link:''});

		if ($scope.form.tags == undefined)
			$scope.form.tags = [];
	}

	$scope.actions={
		homeHeight: 0,
		filter: '',
		orderBy: 'title',
		orderDirection: false,
		loading: false,
		editMode: false,

		currentCollection: function() {
			for(var i in $scope.collections)
				if ($scope.collections[i]['_id']==$scope.form.collectionId)
					return $scope.collections[i]['title'];
			return 'ошибка';
		},
		loadCollections: function(callback) {
			Api.get('collections', function(json) {
				if (json.items!=undefined){
					$scope.collections=json.items;
					localStorage.setItem('collections', JSON.stringify(json.items));
				}
				if (callback!=undefined) callback( json.result );
			} );
		},
		newCollection: function() {
			$scope.actions.loading=true;
			Api.post('collection', {title: $scope.actions.filter}, function(json) {
				if (json.result==true)
					$scope.actions.loadCollections(function(result){
						if (result)
						for(var i in $scope.collections)
							if ($scope.collections[i]['_id']==json.item['_id']){
								$scope.form.collectionId=json.item['_id'];
								$scope.actions.showHome();
								$scope.actions.filter='';
							}
						$scope.actions.loading=false;
					});
				else
					$scope.actions.loading=false;
			});
		},



		saveRaindrop: function() {
			$scope.actions.loading=true;

			if ($scope.form.coverEnabled==false)
				$scope.form.cover='';

			//Указана не существующая коллекция
			Api.get('collection/'+$scope.form.collectionId, function(checkCollectionJSON) {

				if (checkCollectionJSON.result==false) {
					delete $scope.form.collectionId;
					$scope.actions.notification='Укажите существующую коллекцию!';
					$scope.actions.loading=false;
					return false;
				}
				else{
					var temp=JSON.parse(JSON.stringify($scope.form));
					temp.tags = $scope.tags.clear(temp.tags);

					if ($scope.editMode)
						Api.put('raindrop/'+raindropId, temp, function(json) {
							if (json.result==true)
							{
								Api.post('prepareCover', {id:raindropId}, function() {} );
								oblakoClose(true);
							}
							else
								$scope.actions.notification='Произошла ошибка при сохранение!';

							$scope.actions.loading=false;
						});
					else
						Api.post('raindrop', temp, function(json) {
							if (json.result==true){
								Api.post('prepareCover', {id:json.item['_id']}, function() {} );
								$cookieStore.put('lastCollection', parseInt($scope.form.collectionId));
								oblakoClose(true);
							}
							else
								$scope.actions.notification='Произошла ошибка при сохранение!';

							$scope.actions.loading=false;
						});
				}

			});
		},

		deleteRaindrop: function() {
			$scope.actions.loading=true;
			Api.del('raindrop/'+raindropId, function(json) {
				$scope.actions.loading=false;
				oblakoClose(false);
			});
		},

		checkUrlDublicates: function() {
			$scope.actions.loading=true;

			currentURL( function(url) {
				Api.post('check/url', {url: url}, function(checker) {
					if (checker.id!=undefined){
						$scope.editMode=true;
						raindropId=checker.id;

						Api.get('raindrop/'+checker.id, function(json) {
							$scope.form={
								url: json.item.link,
								title: json.item.title,
								excerpt: json.item.excerpt,
								collectionId: json.item.collection.$id,
								html: json.item.html,
								media: json.item.media,
								id: json.item['_id'],
								type: json.item.type,
								cover: (json.item.coverId!=undefined?json.item.coverId:0),
								coverEnabled: (json.item.cover!=''),
								tags: $scope.tags.prepare(json.item.tags),
							};
							formDefaults();

							$scope.actions.loading=false;
						});
					}
					else {
						$scope.editMode=false;
						raindropId=0;
						$scope.actions.loading=false;
					}
				});
			});
		},



		capturePage: function() {
			makeScreenshot( $scope.actions.setCapturedPage );
		},
		setCapturedPage: function(dataURI) {
			if (dataURI) {
				$scope.form.media[ $scope.form.media.length-1 ] = {link: dataURI, type: "image", screenshot: true, dataURI: true};
				$scope.haveScreenshot=true;
				$scope.form.coverId = $scope.form.media.length-1;
				$scope.form.coverEnabled = true;

				try{$scope.$apply();}catch(err){}
			}
		},



		left: function() {
			if ($scope.form.cover>0)
			$scope.form.cover--;
			else
			$scope.form.cover=$scope.form.media.length-1;
		},
		right: function() {
			if ($scope.form.cover>=$scope.form.media.length-1)
			$scope.form.cover=0;
			else
			$scope.form.cover++;
		},

		showHome: function() {
			$scope.step = '';
		},
		showStep: function(step) {
			if (step=='collection')
				$scope.actions.loadCollections();

			$scope.actions.homeHeight = $('.addForm:eq(0)').height();
			$scope.step = step;
		},

		changeOrder: function(order) {
			if (order!=undefined)
				localStorage.setItem('orderBy', order);

			switch(localStorage.getItem("orderBy")){
				case 'lastUpdate':
					$scope.actions.orderBy='lastUpdate';
					$scope.actions.orderDirection=true;
				break;
				default:
					$scope.actions.orderBy='title';
					$scope.actions.orderDirection=false;
				break;
			}
		},

		setFormData: function(data) {
			if (raindropId==0){
				$scope.form=data;
				formDefaults();
				
				$timeout( function() {
					try{$scope.$apply();}catch(err){}

					$('#saveRaindropButton').focus();

					postOblako();
				},0);
			}
		},

		loadPage: function() {
			$timeout( function() {
				oblako();
			},0);

			$scope.collections = localStorage.getItem("collections");
			if ($scope.collections==null)
				$scope.actions.loadCollections();
			else
				$scope.collections=JSON.parse($scope.collections);

			$scope.actions.changeOrder();

			$scope.actions.checkUrlDublicates();
			$scope.tags.load();
		}
	};

	//Tags
	$scope.tags = {
		load: function(){
			Api.get('tags', function(json){
				$scope.tags.items = json.items;
			});
		},

		prepare: function(a) {
			var tags=[];

			for (var i in a)
				tags.push( {key:'tag',q:a[i],val:a[i]} );

			return tags;
		},

		clear: function(a) {
			var tags = [];
			for (var i in a)
				tags.push( a[i].val )

			return tags;
		}
	};
}


function Auth($scope, $rootScope){
    $scope.goTo = function(to) {
        $rootScope.currentController=to;
        oblakoClose();
    }
}