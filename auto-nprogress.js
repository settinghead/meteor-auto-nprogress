if(Meteor.isClient){
  
  var isFunction = function (functionToCheck) {
   var getType = {};
   return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }

  Meteor._originalSubscribe = Meteor.subscribe;

  Meteor.subscribe = function(){

    //preserves original onReady and onError functions
    var callbacks = {};
    var newArgs = arguments;

    var _this = this;

    function makeFn(fn){
      return function(){
        NProgress.done();
        fn.apply(_this, arguments);
      };
    }

    if(arguments.length > 1) {
      var lastObj = arguments[arguments.length - 1];
      if(isFunction(lastObj)){
        callbacks.onReady = makeFn(lastObj);
        newArgs = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
      }
      else{
        if(lastObj.onReady && isFunction(lastObj.onReady)) {
          callbacks.onReady = makeFn(lastObj.onReady);
          newArgs = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
        }

        if(lastObj.onError && isFunction(lastObj.onError)) {
          callbacks.onError = makeFn(lastObj.onError);
          newArgs = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
        }
      }
    };

    if(callbacks.onReady || callbacks.onError){
      newArgs.push(callbacks);
    }

    NProgress.start();
    var handle = Meteor._originalSubscribe.apply(_this, newArgs);
    return handle;      
  };

  Meteor.withoutBar =  {
    subscribe: Meteor._originalSubscribe
  };
}