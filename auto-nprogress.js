if(Meteor.isClient){
  
  var isFunction = function (functionToCheck) {
   var getType = {};
   return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  };

  var isMeteorSubscription = function (name){
    return (name.indexOf("meteor.")===0 
        || name.indexOf("meteor_")===0);
  };

  Meteor.startup(function(){

    Meteor._originalSubscribe = Meteor.subscribe;

    Meteor.subscribe = function(subscribeName){

      if(subscribeName && !isMeteorSubscription(subscribeName)) {

        //preserves original onReady and onError functions
        var newArgs = arguments;
        var callbacks = {};

        var _this = this;

        var params = Array.prototype.slice.call(arguments, 1);

        function makeFn(fn){
          return function(){
            if(document.body) {
              NProgress.done();
            }
            if(fn){
              fn.apply(_this, arguments);          
            }
          };
        }

        function cut(args){
          return Array.prototype.slice.call(args, 0, args.length - 1);
        }

        if(arguments.length > 1) {
          var lastObj = arguments[arguments.length - 1];
          if(lastObj) {
            if(isFunction(lastObj)){
              callbacks.onReady = makeFn(lastObj);
              newArgs = cut(arguments);
            }
            else{
              if(lastObj.onReady && isFunction(lastObj.onReady)) {
                callbacks.onReady = makeFn(lastObj.onReady);
                newArgs = cut(arguments);
              }

              if(lastObj.onError && isFunction(lastObj.onError)) {
                callbacks.onError = makeFn(lastObj.onError);
                newArgs = cut(arguments);
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

        if(document.body){
          NProgress.start();
          var c = setInterval(function(){
            if(document.body && DDP._allSubscriptionsReady()) {
              NProgress.done();
              clearInterval(c);
            }
          }, 80);
        }
        var handle = Meteor._originalSubscribe.apply(_this, newArgs);
        return handle;      
      }
    };

    Meteor.withoutBar =  {
      subscribe: Meteor._originalSubscribe
    };
  });
}