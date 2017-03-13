app.controller('HeroListController', ['$http', function($http){
    console.log('Hero List Controller loaded');

    var self = this;
    var heroList = {list: []};

    getHeroes();

    function getHeroes(){
      $http({
        method: 'GET',
        url: '/heroes'
      }).then(function(response) {
        console.log('response from server: ', response);
        heroList.list = response.data;
        self.heroArray = heroList.list;
      });
} // end of getHeroes function

self.deleteHero = function(heroId){
  $http({
    method: 'DELETE',
    url: '/heroes/' + heroId
  }).then(function(response) {
    getHeroes();
  });
}

}]); // end of myApp controller
