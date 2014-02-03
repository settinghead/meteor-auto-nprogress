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

  Meteor.publish("superLargeFakeErroneousCollection", function(){
    var _this = this;
    var fut = new Future();

    setTimeout(function () {
      fut['return'](_this.error("some erroneous shit has transpired"));
    }, 1000);

    return fut.wait();
  });
}

if(Meteor.isClient) {
  testAsyncMulti("Auto NProgress - Shows and hides the progress bar on DDP subscription", [
    function(test, expect) {
      Meteor.subscribe('superLargeFakeCollection', expect(function(){
        test.isFalse(NProgress.isStarted());
      }));

      test.isTrue(NProgress.isStarted());
    }
  ]);

  testAsyncMulti("Auto NProgress - Shows and hides the progress bar on DDP subscription errors", [
    function(test, expect) {

      Meteor.subscribe('superLargeFakeErroneousCollection', {
        onError: expect(function(){
          test.isFalse(NProgress.isStarted());
        })
      });

      test.isTrue(NProgress.isStarted());
    }
  ]);

  testAsyncMulti("Auto NProgress - Disabling NProgress bar", [
    function(test, expect) {

      Meteor.withoutBar.subscribe('superLargeFakeErroneousCollection', {
        onError: expect(function(){
          test.isFalse(NProgress.isStarted());
        })
      });

      test.isFalse(NProgress.isStarted());
    }
  ]);
}