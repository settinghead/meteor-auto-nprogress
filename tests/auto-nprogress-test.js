if(Meteor.isServer) {
  
  var Future = Npm.require('fibers/future');

  Meteor.publish("superLargeFakeCollection", function(){

    var _this = this;
    var fut = new Future();

    setTimeout(function () {
      fut['return'](_this.ready());
    }, 2000);

    return fut.wait();
  });
}

if(Meteor.isClient) {
  testAsyncMulti("Auto NProgress - Shows on DDP subscription", [
    function(test, expect) {

      Meteor.subscribe('superLargeFakeCollection', expect(function(){
        test.isFalse(NProgress.isStarted());
      }));

      test.isTrue(NProgress.isStarted());
    }
  ]);

  testAsyncMulti("Auto NProgress - Hides when subscription is ready", [
    function(test, expect) {
      
    }
  ]);
}