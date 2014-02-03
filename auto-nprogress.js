if(Meteor.isClient){
  
  var isFunction = function (functionToCheck) {
   var getType = {};
   return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }

  Meteor._originalSubscribe = Meteor.subscribe;

  Meteor.subscribe = function(){

    //preserves original onReady and onError functions
    var newArgs = arguments;
    var callbacks = {};

    var _this = this;

    function makeFn(fn){
      return function(){
        console.log('done');
        if(document.body) {
          NProgress.done();
        }
        if(fn){
          fn.apply(_this, arguments);          
        }
      };
    }

    if(arguments.length > 1) {
      var lastObj = arguments[arguments.length - 1];
      if(lastObj) {
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
      }
    };
 
    if(!callbacks.onReady){
      callbacks.onReady = makeFn();
    }
    if(!callbacks.onError){
      callbacks.onError = makeFn();
    }

    Array.prototype.push.call(newArgs, callbacks);

    console.log(newArgs);
    if(document.body){
      NProgress.start();
      setTimeout(function(){
        if(document.body) {
          NProgress.done();
        }
      }, 20000);
    }
    var handle = Meteor._originalSubscribe.apply(_this, newArgs);
    return handle;      
  };

  Meteor.withoutBar =  {
    subscribe: Meteor._originalSubscribe
  };
}