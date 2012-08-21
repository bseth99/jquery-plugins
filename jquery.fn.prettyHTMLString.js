/*
* jQuery prettyHTMLString plugin
*
* Copyright 2012, HireGenics, Inc
* Licensed under the MIT license.
*
* http://github.com/hiregenics/jquery-ui-widgets
*
* Returns a formatted string of the HTML represented by the
* calling element.  Pass an array of attributes to ignore
* when building the string.
*/

(function( $, undefined ) {

   function _prettyHTMLString($el, ignattr, indent)
   {
      var $sub = $el.children(),
          ignattr = ignattr || [],
          indent = indent || '';

      return (
           indent + '<' + $el[0].tagName.toLowerCase() + ' ' +

                  $($el[0].attributes).map(function ()
                        {
                            return (
                                 $.inArray(this.name, ignattr) < 0
                               ? this.name + '="' + this.value + '"'
                               : ''
                            );

                        }).get()
                          .join(' ')
                          .replace(/^\s+|(\s)\s+|\s+$/g, '$1') +

                  '>\n' +

                  (
                      $sub.length > 0
                    ? $sub.map(function()
                        {
                           return _prettyHTMLString( $(this), ignattr, (indent+'   ') );
                        }).get().join('')
                    : $el.text()
                  ) +

           indent + '</' + $el[0].tagName.toLowerCase() + '>\n'
      );
   }

   $.fn.extend({
      prettyHTMLString: function(ignattr)
       {
          return _prettyHTMLString(this, ignattr);
       }
   });

})( jQuery );
