#meteor-auto-nprogress
--------------------------

A Meteorite package that automatically shows a [NProgress.js](http://ricostacruz.com/nprogress/) bar during DDP data exchange.

##Usage

Run the following [Meteorite](https://github.com/oortcloud/meteorite) command: 

    mrt add auto-nprogress


And you are done! 

Now all your Meteor applications will automatically display an NProgress bar whenever a DDP subscription takes place.

##Make Exceptions for Certain Subscriptions

If you do not wish to show NProgress for specific subscription events, change your Meteor subsciption code from 

    Meteor.subscribe(...)
    
into

    Meteor.withoutBar.subscribe(...)
    
##Styling & Customization

If you wish to change the apprearance of the progress bar (e.g. color, width, etc.) , create your custom CSS classes that overrides the default, and include your CSS file in your project. [See NProgress doc here](https://github.com/rstacruz/nprogress/#customization).
##Questions? Comments?

Email me: <settinghead@gmail.com>

##Contribute
Issues submissions and pull requests are welcome.