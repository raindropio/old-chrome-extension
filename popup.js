var raindropId = 0;
//window.onload = oblako;

var helpers={
	trim:function(s) {
		return s.replace(/(^\s*|\s*$)/g, '');
	}
}







$(function() {
	$('.global-wrap').click(function(e) {
		if ($(event.target).hasClass('closable'))
			oblakoClose();
	});
});

var app=angular.module('avenger', [/*'ngRoute',*/ 'ngAnimate', 'ngCookies', 'avenger.services', 'monospaced.elastic', 'ui.keypress', 'pascalprecht.translate'])
.run(function($rootScope, $translate, $cookieStore) {
	$rootScope.currentController='add';

	//language
	var lang = (navigator.language || navigator.systemLanguage || navigator.userLanguage || 'en').substr(0, 2).toLowerCase();
	if ($cookieStore.get('App-Language')!=null) lang = $cookieStore.get('App-Language');

	if ((lang == "ru") || (lang == "ru_RU"))
		lang = 'ru_RU';
	else
		lang = 'en_US';

	$translate.uses(lang);
	$cookieStore.put('App-Language', lang);
});
/*.config(function($routeProvider, $locationProvider) {
	$routeProvider.
		when('/add', {templateUrl: "add.html", controller: Add}).
		when('/auth', {templateUrl: "auth.html", controller: Auth}).
		otherwise({redirectTo: '/add'});
})
.run(function() {

});*/
app.config(["$translateProvider", function($translateProvider) {

    $translateProvider.translations("en_US", {
      server: "Server error",
      server0: "Enter old password!",
      server1: "E-mail is not valid!",
      server2: "Enter your name!",
      server3: "Old password is not valid!",
      server4: "Password is not valid!",
      server5: "This email is already registered!",
      server6: "Enter title!",
      server7: "Wrong E-mail and/or password combination!",
      collection: "Collection",
      collectionNew: "New Collection",
      collectionDeleteConfirm: "Delete collection?\nAll bookmarks will be deleted!",
      saveChanges: "Save changes",
      saveError: "Save error!",
      saveSuccess: "Successfully saved!",
      addSuccess: "Successfully added!",
      moveSuccess: "Successfully moved!",
      removeSuccess: "Successfully removed!",
      coverUpload: "Cover upload",
      fileUploadUnable: "This file can not be uploaded!",
      fileUploadError: "File upload error. Try another file!",
      linkNotRecognized: "Link is not recognized",
      permalink: "Permalink:",
      profile: "Profile",
      signIn: "Log in",
      myCollections: "My collections",
      save: "Save",
      remove: "Remove",
      elements: "elements",
      about: "About",
      blog: "Blog",
      tools: "Tools",
      signInSocial: "Log in with",
      signUpSocial: "Sign up with",
      signUp: "Sign up",
      register: "Sign up",
      recoverPassword: "Reset password",
      password: "Password",
      edit: "Edit",
      editMin: "Edit",
      collectionEmpty: "Collection is empty",
      fillItTwoWays: "The two ways to fill collection",
      recommend: "Recommend",
      installExtension: "Install extension",
      extensionDescription: "The most simple, easy and super fast way to keep \n important of the web.",
      enterLink: "Enter link",
      enterLinkDescription: "Enter a link to any web page,\n article, photo or video. Anything you want.",
      backToCollection: "Back to collection",
      viewOn: "View on",
      articled: "article",
      imaged: "photo",
      videod: "content",
      linkd: "link",
      article: "Article",
      image: "Photo",
      video: "Content",
      link: "Link",
      vkontakte: "Вконтакте",
      facebook: "Facebook",
      twitter: "Twitter",
      on: "on",
      basicData: "Account settings",
      yourName: "Your name",
      changePassword: "Change password",
      newPassword: "New password",
      currentPassword: "Current password",
      findBookmarkLong: "Find bookmark by title, description or website...",
      nothingFound: "Nothing found",
      add: "Add",
      cancel: "Cancel",
      covers: "Covers",
      upload: "Upload",
      imagesOnly: "Images only. \n Max size: 5mb.",
      uploadProgress: "Uploading...",
      fontFamily: "Font family",
      fontSize: "Font size",
      interfaceStyle: "Interface style",
      additional: "Additional",
      fixedWidth: "Fixed width",
      logOut: "Logout",
      titleAndDescription: "Title & description",
      enterTitle: "Enter title",
      enterDescription: "Enter description",
      enable: "Enabled",
      type: "Type",
      publicCollection: "Public collection",
      shareCollection: "Share collection",
      sendEmail: "Send email",
      copyLink: "Copy a link",
      language: "Language",
      iHaveAccount: "I have account already",
      createFirstCollection: "Create first collection",
      checkYourEmail: "Check your inbox!",
      und: "&",
      from: "from",
      passwordChangeSuccess: "Password successfully changed!",
      smartSearch: "Smart search",
      subscribe: "Follow",
      youSubscribed: "Following",
      subscriptions: "Following",
      subscriptionsCollection: "Follow collections",
      tags: "Tags",
      addTag: "Add a tag",
      noDescription: "No description",
      basic: "Basic",
      background: "Background",
      removeBackground: "Remove background",
      or: "or",
      noCollections: "No collections",
      noSubscriptions: "No subscriptions",
      welcome: "Welcome",
      toRefreshedRaindrop: "to Raindrop",
      comfortableReading: "Comfortable reading",
      publicCollections: "Public collections",
      collectionsCount: "collections",
      noPublicCollections: "No public collections",
      noPublicCollectionsD: "This user has not created or does not have any public collection.",
      all: "All",
      mobileApp: "Mobile App",
      exportBookmarks: "Export bookmarks",

        cover: "Cover",
	    saveToCollection: "Save to collection",
	    selectCollection: "Select Collection",
	    myAccount: "My account",
	    enterTitleAndCollection: "Enter title and collection",
	    selectPreferedType: "Select prefered type",
	    back: "Back",
      bySort: "Sorted",
	    byName: "By name",
	    byDate: "By date",
	    findOrCreateCollection: "Find or create new collection",
	    createCollection: "New collection",
	    startToSave: "Please, log in to start!",
	    checkAgain: "Check again!",
	    clickToMakeScreenshot: "Click to make screenshot"
    });

  $translateProvider.translations("ru_RU", {
    server: "Неизвестная ошибка",
    server0: "Укажите старый пароль!",
    server1: "E-mail введен не верно!",
    server2: "Укажите пожалуйста ваше имя",
    server3: "Ваш старый пароль указан не верно!",
    server4: "Пароль указан не верно!",
    server5: "Данный e-mail уже используется!",
    server6: "Название/заголовок не указано!",
    server7: "Пользователь с таким e-mail не найден!",
    collection: "Коллекция",
    collectionNew: "Новая коллекция",
    collectionDeleteConfirm: "Действительно удалить коллекцию?\nВсе закладки внутри коллекции будут также удалены!",
    saveChanges: "Сохранить", //изменения
    saveError: "Произошла ошибка при сохранение!",
    saveSuccess: "Успешно сохранен!",
    addSuccess: "Успешно добавлен!",
    moveSuccess: "Успешно перемещен!",
    removeSuccess: "Успешно удален!",
    coverUpload: "Загрузка обложки",
    fileUploadUnable: "Данный файл невозможно загрузить!",
    fileUploadError: "Произошла ошибка при загрузке файла. Попробуйте другой файл!",
    linkNotRecognized: "Ссылка не распознана",
    permalink: "Постоянная ссылка на коллекцию:",
    profile: "Профиль",
    signIn: "Войти",
    myCollections: "Мои коллекции",
    save: "Сохранить",
    remove: "Удалить",
    elements: "елемента",
    about: "О проекте",
    blog: "Блог",
    tools: "Инструменты",
    signInSocial: "Войти через социальную сеть",
    signUpSocial: "Зарегистрироваться через социальную сеть",
    signUp: "Регистрация",
    register: "Зарегистрироваться",
    recoverPassword: "Восстановить пароль",
    password: "Пароль",
    edit: "Редактировать",
    editMin: "Ред",
    collectionEmpty: "Коллекция пуста",
    fillItTwoWays: "Заполнить ее можно двумя способами",
    recommend: "Рекомендуем",
    installExtension: "Установить расширение",
    extensionDescription: "Самый простой, удобный и супер быстрый\nспособ сохранить важное из интернета.",
    enterLink: "Указать ссылку",
    enterLinkDescription: "Укажите ссылку на любую\nстраницу, статью, фото или видео.",
    backToCollection: "В коллекцию",
    viewOn: "Смотреть на",
    articled: "статью",
    imaged: "фото",
    videod: "контент",
    linkd: "ссылку",
    article: "Статья",
    image: "Фото",
    video: "Контент",
    link: "Ссылка",
    vkontakte: "Вконтакте",
    facebook: "Facebook",
    twitter: "Twitter",
    on: "на",
    basicData: "Основные данные",
    yourName: "Ваше имя",
    changePassword: "Сменить пароль",
    newPassword: "Новый пароль",
    currentPassword: "Текущий пароль",
    findBookmarkLong: "Найти закладку по заголовку, описанию или сайту...",
    nothingFound: "Ничего не найдено",
    add: "Добавить",
    cancel: "Отмена",
    covers: "Обложки",
    upload: "Загрузить",
    imagesOnly: "Картинка не более 5 мб.",
    uploadProgress: "Идет загрузка...",
    fontFamily: "Семейство шрифта",
    fontSize: "Размер шрифта",
    interfaceStyle: "Стиль интерфейса",
    additional: "Дополнительно",
    fixedWidth: "Фиксированная ширина",
    logOut: "Выйти",
    titleAndDescription: "Заголовок и описание",
    enterTitle: "Введите заголовок",
    enterDescription: "Введите описание",
    enable: "Вкл.",
    type: "Тип",
    publicCollection: "Публичная коллекция",
    shareCollection: "Поделиться коллекцией",
    sendEmail: "Отправить по почте",
    copyLink: "Скопировать ссылку",
    language: "Язык",
    iHaveAccount: "У меня уже есть аккаунт",
    createFirstCollection: "Создать первую коллекцию",
    checkYourEmail: "Проверьте ваш почтовый ящик!",
    und: "и",
    from: "от",
    passwordChangeSuccess: "Пароль успешно изменен!",
    smartSearch: "Умный поиск",
    subscribe: "Подписаться",
    youSubscribed: "Вы подписаны!",
    subscriptions: "Подписки",
    subscriptionsCollection: "Подписки",
    tags: "Теги",
    addTag: "Добавить тег",
    noDescription: "Нет описания",
    basic: "Основное",
    background: "Фон",
    removeBackground: "Удалить фон",
    or: "или",
    noCollections: "Нет коллекций",
    noSubscriptions: "Нет подписок",
    welcome: "Добро пожаловать",
    toRefreshedRaindrop: "В обновленный Raindrop",
    comfortableReading: "Комфортное чтение",
    publicCollections: "Публичные коллекции",
    collectionsCount: "коллекций",
    noPublicCollections: "Нет публичных коллекций",
    noPublicCollectionsD: "Пользователь еще не создал либо не имеет публичных коллекции.",
    all: "Все",
    mobileApp: "Мобильное приложение",
    exportBookmarks: "Экспорт закладок",

    cover: "Обложка",
    saveToCollection: "Сохранить в коллекцию",
    selectCollection: "Выбрать коллекцию",
    myAccount: "Мой аккаунт",
    enterTitleAndCollection: "Укажите заголовок и коллекцию",
    selectPreferedType: "Выберите подходящий тип страницы",
    back: "Назад",
    bySort: "Отсортировано",
    byName: "По имени",
    byDate: "По дате",
    findOrCreateCollection: "Найти или создать коллекцию",
    createCollection: "Создать коллекцию",
    startToSave: "Пожалуйста, войдите, чтобы начать сохранять закладки",
    checkAgain: "Проверить еще раз!",
    clickToMakeScreenshot: "Нажмите, чтобы создать скриншот"
  });
}
]);


/*
    -   -   -   -   /ADD  -   -   -   -
*/
function Add($scope, Api, $cookieStore, $timeout, $translate, fixURLFilter) {
	var urlParams = JSON.parse(window.location.hash.substr(1));
		urlParams.url = decodeURIComponent(urlParams.url);

  $scope.user = {
    me: [],
    load: function() {
      Api.get("user", function(json) {
        if (json.result) {
          $scope.user.me = json.user;
        }
      });
    }
  };
  $scope.user.load();

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

	$scope.step = '';
	$scope.actions={
		homeHeight: 0,
		filter: '',
		orderBy: 'sort',
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
					//$cookieStore.put('collections', JSON.stringify(json.items));
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
								oblakoClose('save');
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
								oblakoClose('save');
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
				oblakoClose('delete');
			});
		},

		checkUrlDublicates: function() {
			$scope.actions.loading=true;


			Api.post('check/url', {url: urlParams.url}, function(checker) {
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
				$cookieStore.put('orderBy', order);

			switch($cookieStore.get("orderBy")){
				case 'lastUpdate':
					$scope.actions.orderBy='lastUpdate';
					$scope.actions.orderDirection=true;
				break;
        case 'title':
          $scope.actions.orderBy='title';
          $scope.actions.orderDirection=false;
        break;
				default:
					$scope.actions.orderBy='sort';
					$scope.actions.orderDirection=true;
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
				oblako(urlParams);
			},0);

			//$scope.collections = $cookieStore.get("collections");
			//if ($scope.collections==null)
				$scope.actions.loadCollections();
			//else
			//	$scope.collections=JSON.parse($scope.collections);

			$scope.actions.changeOrder();

			$scope.actions.checkUrlDublicates();
			$scope.tags.load();
		},

		language: $cookieStore.get('App-Language'),

		changeLanguage: function() {
			$translate.uses(this.language);
			$cookieStore.put('App-Language', this.language);
		}
	};

	//Tags
	$scope.tags = {
		items: [],

		submit: function() {
			postOblako();
		},

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

	$scope.helpers = {
		fixURL: function(s) {
			return fixURLFilter(s);
		}
	}

	//watchers
	$scope.$watchCollection('[form.title, form.excerpt, form.tags]', function(){
		postOblako();
	});
}


function Auth($scope, $rootScope){
    $scope.goTo = function(to) {
        $rootScope.currentController=to;
        oblakoClose();
    }
}