$ = jQuery = require('jquery');

(function($) {

  $(function() {
    $('[data-toggle="tooltip"]').tooltip();

    $('[data-lookup]').each(function() {
      var input = $(this);
      input.autoComplete({
        minChars: 2,
        delay: 200,
        cache: false,
        source: function (term, suggest) {
          $.get('/search/lookup', {
            filter: input.attr('data-lookup'),
            value: term
          }, function(data) {
            suggest(data);
          }).fail(function() {
            suggest([]);
          });
        }
      });
    });
  });

})(jQuery);
