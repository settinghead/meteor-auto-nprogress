#meteor-auto-nprogress [![Build Status](https://travis-ci.org/settinghead/meteor-auto-nprogress.png?branch=master)](https://travis-ci.org/settinghead/meteor-auto-nprogress) [![Code Climate](https://codeclimate.com/github/settinghead/meteor-auto-nprogress.png)](https://codeclimate.com/github/settinghead/meteor-auto-nprogress)
--------------------------

A Meteorite package that automatically shows a [NProgress.js](http://ricostacruz.com/nprogress/) bar during DDP data exchange.

(In plain words, it automatically adds a slick-looking, unintrusive progress bar and a spinner at the top of your web app for any loading activities in your Meteor app.)

##Compatibility
Tested on Meteor 0.7.1. May work for Meteor 0.6.x, but this has yet to be confirmed.

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