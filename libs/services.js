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
			input='https://raindrop.io'+input;
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
	template: '<div class=\"extra-search\" onClick=\"$(\'#extraSearchInput\').focus()\">\n\t\t<ul>\n\t\t\t<li ng-repeat=\"(i,key) in keys\" class=\"es-key key-{{key.key}}\" ng-class=\"{\'active\' : i == keys.length-1 && editMode}\">\n\t\t\t\t<a href=\"\" class=\"es-close\" ng-click=\"actions.remove(i)\">&times;<\/a>\n\t\t\t\t<span class=\"es-wrap\">{{key.q}}<\/span>\n\t\t\t<\/li>\n\n\t\t\t<li class=\"es-input\"><form ng-submit=\"actions.add()\"><input type=\"search\" list=\"extracomplete\" ng-model=\"key\" autofocus autocomplete=\"on\" placeholder=\"{{placeholder}}\" size=\"{{key.length || placeholder.length}}\" id=\"extraSearchInput\" ng-blur=\"actions.add()\" ui-keydown=\"{\',\': \'actions.add()\', \'backspace\': \'actions.back()\'}\" ng-keyup=\"actions.check()\" ng-keypress=\"actions.reset()\"\/><\/form><\/li>\n\t\t\t<li class=\"clear\"><\/li>\n\t\t<\/ul>\n\t\t<datalist id=\"extracomplete\">\n\t\t\t<option ng-repeat=\"tag in autocomplete\" value=\"{{tag._id}}\" \/>\n\t\t<\/datalist>\n\t\t<div class=\"clear\"><\/div>\n\t<\/div>',
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