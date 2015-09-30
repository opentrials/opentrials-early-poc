$ = jQuery = require('jquery');

(function($) {

  $(function() {
    $('[data-toggle="tooltip"]').tooltip();

    $('body')
      .on('click', '.ot-collapsed-text .button-expand', function() {
        $(this).parents('.ot-collapsed-text').eq(0).addClass('expanded')
          .find('.block-contents').slideDown(150);
      })
      .on('click', '.ot-collapsed-text .button-collapse', function() {
        $(this).parents('.ot-collapsed-text').eq(0).removeClass('expanded')
          .find('.block-contents').slideUp(150);
      });

    $('[data-lookup]').each(function() {
      var input = $(this);
      input.autoComplete({
        minChars: 2,
        delay: 200,
        cache: false,
        source: function(term, suggest) {
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
