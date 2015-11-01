  /************************************************************************************
  This is your Page Code. The appAPI.ready() code block will be executed on every page load.
  For more information please visit our docs site: http://docs.crossrider.com
*************************************************************************************/

appAPI.ready(function($) {

    // Place your code here (you can also define new functions above this scope)
    // The $ object is the extension's jQuery object

    // alert("My new Crossrider extension works! The current page is: " + document.location.href);
    appAPI.resources.includeCSS('css/main.css',{});
});
