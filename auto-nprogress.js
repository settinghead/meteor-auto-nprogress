if(Meteor.isClient){
  Meteor.withNprogress = function(){
    // return {
    //   subscribe: function()
    // }
  }
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
  });
}