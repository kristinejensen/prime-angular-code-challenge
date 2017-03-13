app.controller('AddHeroController', ['$http', function($http){
  console.log('Add controller hero loaded');

  var self = this;
  self.newHero = {};
  var newHeroData = self.newHero;

  self.addHero = function(){
    console.log('add hero button clicked');
    $http({
      method: 'POST',
      url: '/heroes',
      data: newHeroData
    }).then(function(response){
      console.log(response);
    });
    self.newHero = null;
  }
}]); // end of myApp controller
