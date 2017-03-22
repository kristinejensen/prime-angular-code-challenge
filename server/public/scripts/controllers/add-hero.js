app.controller('AddHeroController', ['$http', function($http){
  console.log('Add controller hero loaded');

  var self = this;
  self.newHero = {};
  self.heroReport = {};

  self.addHero = function(){
    console.log('add hero button clicked');
    $http({
      method: 'POST',
      url: '/heroes',
      data: self.newHero
    }).then(function(response){
      console.log(response);
    });
    self.newHero = {};
  }

  self.reportHero = function(){
      $http({
        method: 'POST',
        url: '/heroes/reportHero',
        data: self.heroReport
      }).then(function(response){
        console.log(response);
      })
    self.heroReport = {};
  };
}]); // end of myApp controller
