var module = angular.module('myApp', ["ngAnimate",'duScroll',"countUpModule",'ngRoute','ngMap'])

.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '../partials/news-list.html',
    })
    .when('/index.html', {
        redirectTo: '/',
    })
    .when('/:id', {
      templateUrl: '../partials/news-item.html',
      controller: 'newsItemCtrl'
    })
    .otherwise({
      redirectTo: '/'
    })
    $locationProvider.html5Mode(true);
})


.controller('mainCtrl', ['$scope', '$http','NgMap', function ($scope, $http, NgMap) {
  $scope.news = {};

  $http({
    method: 'GET',
    url: 'data.json'
  }).then(function successHandler(response){
    $scope.news = response.data.map(function(el,i){
      el.date = new Date(el.date);
      return el;
    });
  }, function errorHandler(response){
    alert('Error!!! ' + response.statusText);
  });

  NgMap.getMap().then(function(map) {
    $scope.showCustomMarker= function(evt) {
      map.customMarkers.foo.setVisible(true);
      map.customMarkers.foo.setPosition(this.getPosition());
    };
  });

}])


.controller("newsItemCtrl", function($scope, $routeParams) {
  $scope.newsId = $routeParams.id
  for (var i = 0; i<$scope.news.length; i++){
    if($scope.news[i].id == $scope.newsId){
      $scope.newsCaption = $scope.news[i].text;
      $scope.newsDate = $scope.news[i].date;
    }
  }
})


.directive('navigationBar', function() {
  return {
    restrict: 'A',
    templateUrl: '../partials/nav.html',
    scope: true,
    controller: function($scope, $location, $log) {
      $scope.links = [
        {caption:'HOME', href:'#home'},
        {caption:'SERVICES', href:'#services-top'},
        {caption:'PORTFOLIO', href:'#portfolio'},
        {caption:'ABOUT', href:'#about'},
        {caption:'NEWS', href:'#news-container'},
        {caption:'CONTACT', href:'#contact-us'},
      ];
    }
  }
})

.directive('servicesTabs', function() {
  return {
    restrict: 'A',
    templateUrl: '../partials/services-tabs.html',
    scope: true,
    controller: function($scope, $location, $log) {
      $scope.tabIndex = 'tab_0';
      $scope.tabs = [
        {caption:'WEB DESIGN', img:'tab_0.png'},
        {caption:'GRAPHIC DESIGN', img:'tab_1.png'},
        {caption:'PROGRAMMING', img:'tab_2.png'},
        {caption:'PHOTOGRAPHY', img:'tab_3.png'},
      ];
      $scope.selectTab = function(i){
        $scope.tabIndex = 'tab_'+i;
      }
    }
  }
})

.directive('servicesBottom', function() {
  return {
    restrict: 'A',
    templateUrl: '../partials/services-bottom.html',
    scope: true,
    controller: function($scope, $location, $log) {
      $scope.tabIndex = 'tab_0';
      $scope.selectTab = function(tab){
        $scope.tabIndex = tab;
      }
    }
  }
})

.directive('portfolio', function() {
  return {
    restrict: 'A',
    templateUrl: '../partials/portfolio.html',
    scope: true,
    controller: function($scope) {
      $scope.selectedCategory = 'all';
      $scope.filterItems = [
        {name:'all',caption:'ALL'},
        {name:'web',caption:'WEB'},
        {name:'photography',caption:'PHOTOGRAPHY'},
        {name:'graphic',caption:'GRAPHIC DESIGN'},
      ];
      $scope.items = [
        {category:'web',src:'portfolio_1.jpg',caption:'SAMGPLE IMMAGE',text:'WEB DESIGN'},
        {category:'web',src:'portfolio_2.jpg',caption:'SAMGPLE IMMAGE',text:'WEB DESIGN'},
        {category:'web',src:'portfolio_3.jpg',caption:'SAMGPLE IMMAGE',text:'WEB DESIGN'},
        {category:'web',src:'portfolio_4.jpg',caption:'SAMGPLE IMMAGE',text:'WEB DESIGN'},
        {category:'graphic',src:'portfolio_5.jpg',caption:'SAMGPLE IMMAGE',text:'GRAPHIC DESIGN'},
        {category:'graphic',src:'portfolio_6.jpg',caption:'SAMGPLE IMMAGE',text:'GRAPHIC DESIGN'},
        {category:'photography',src:'portfolio_7.jpg',caption:'SAMGPLE IMMAGE',text:'WEB DESIGN'},
        {category:'photography',src:'portfolio_8.jpg',caption:'SAMGPLE IMMAGE',text:'PHOTOGRAPHY'},
        {category:'photography',src:'portfolio_9.jpg',caption:'SAMGPLE IMMAGE',text:'PHOTOGRAPHY'},
        {category:'graphic',src:'portfolio_10.jpg',caption:'SAMGPLE IMMAGE',text:'GRAPHIC DESIGN'},
        {category:'graphic',src:'portfolio_11.jpg',caption:'SAMGPLE IMMAGE',text:'GRAPHIC DESIGN'},
        {category:'graphic',src:'portfolio_12.jpg',caption:'SAMGPLE IMMAGE',text:'GRAPHIC DESIGN'},
      ];
      $scope.selectCategory = function(category){
        $scope.selectedCategory = category;
      }
      $scope.filterFunc = function(item){
        if($scope.selectedCategory == 'all') {
          return item;
        }
        else if (item.category == $scope.selectedCategory) {
            return item;
        }
      }
    }
  }
})

.directive('stats', function() {
  return {
    restrict: 'A',
    templateUrl: '../partials/stats.html',
    scope: true,
    controller: function($scope, $location, $log) {
      $scope.achievement = [
        {caption:'COMPLETED PROJECTS',count:3054,img:'stats_1.png'},
        {caption:'CLICK PRESED',count:7234873,img:'stats_2.png'},
        {caption:'MAILS SENTED and RECIVED',count:4670,img:'stats_3.png'},
        {caption:'JOKES TOLDS',count:939,img:'stats_4.png'},
      ];
    }
  }
})

.directive('about', function() {
  return {
    restrict: 'A',
    templateUrl: '../partials/about.html',
    scope: true,
    controller: function($scope, $location, $log) {
      $scope.people = [
        {name:'Vin Diesel',
          position:'Graphic Designer',
          description:'Eum cu tantas legere complectitur, hinc utamur ea eam. Eum patrioque mnesarchum eu.',
          photo:'vin-diesel.jpg',
          facebook:'https://www.facebook.com/',
          twitter:'https://www.twitter.com/',
          googleplus:'https://plus.google.com/',
          dribble:'https://dribbble.com/'
        },
        {name:'Jason Statham',
          position:'Graphic Designer',
          description:'Eum cu tantas legere complectitur, hinc utamur ea eam. Eum patrioque mnesarchum eu.',
          photo:'jason-statham.jpg',
          facebook:'https://www.facebook.com/',
          twitter:'https://www.twitter.com/',
          googleplus:'https://plus.google.com/',
          dribble:'https://dribbble.com/'
        },
        {name:'Vinnie Jones',
          position:'Graphic Designer',
          description:'Eum cu tantas legere complectitur, hinc utamur ea eam. Eum patrioque mnesarchum eu.',
          photo:'vinnie-jones.jpg',
          facebook:'https://www.facebook.com/',
          twitter:'https://www.twitter.com/',
          googleplus:'https://plus.google.com/',
          dribble:'https://dribbble.com/'
        },
        {name:'Danny Trejo',
          position:'Graphic Designer',
          description:'Eum cu tantas legere complectitur, hinc utamur ea eam. Eum patrioque mnesarchum eu.',
          photo:'danny_trejo.jpg',
          facebook:'https://www.facebook.com/',
          twitter:'https://www.twitter.com/',
          googleplus:'https://plus.google.com/',
          dribble:'https://dribbble.com/'
        },
      ];
    }
  }
})

.directive('contactUs', function() {
  return {
    restrict: 'A',
    templateUrl: '../partials/contact-us.html',
    scope: true,
    controller: function($scope) {
      $scope.showError = function (elem) {
          var name = elem.$name;
          var err = elem.$error;
          if (angular.isDefined(err)) {
              if (err.required) {
                  return "Field is required."
              }
              else if (err.email) {
                  return "Email is incorrect.";
              }
              else if (err.pattern && name == 'clientMessage') {
                  return 'Min length - 20 characters.';
              }
              else if (err.pattern && name == "clientName") {
                  return "Only latin characters allowed.";
              }
              else if (err.pattern && name == "clientEmail") {
                  return "Email is incorrect.";
              }
          }
      }
      $scope.submitHandler = function(){
        alert('Your message has been successfully sent.');
      }
    }
  }
})
