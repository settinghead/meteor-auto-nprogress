if(Meteor.isClient){
  Meteor.startup(function(){
    Meteor._originalSubscribe = Meteor.subscribe;
    Meteor.subscribe = function(){
      var handle = Meteor._originalSubscribe.apply(Meteor, arguments);
      NProgress.start();
      var id = setInterval(function(){
        if(handle.ready()){
          clearInterval(id);
          NProgress.done();          
        }
      },80);
      return handle;      
    };

    Meteor.withoutBar = function(){
      return {
        subscribe: Meteor._originalSubscribe
      };
    };
    
  });
}