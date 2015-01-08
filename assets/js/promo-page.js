//Script makes anchor scrolling smooth
      $(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

      // page init
jQuery(window).load(function() {
	initAnchors();
});

// smooth anchor scroll
function initAnchors() {
	// find elements
	var anchorLinks = jQuery('.controller a').filter('[href^="#"]'),
		mainAnchorLinks = jQuery('.controller a').filter('[href^="#"]'),
		mainAnchorParents = mainAnchorLinks.parent(),
		page = jQuery('html,body'),
		win = jQuery(window),
		activeClass = 'active',
		scrollDuration = 700;

	// Smooth scrolling
	function scrollTo(offset) {
		page.stop().animate({
			scrollTop: offset
		}, scrollDuration);
	}

	// Anchor links
	anchorLinks.on('click', function(e) {
		e.preventDefault();

		var link = jQuery(this),
			targetBlock = link.attr('href').length > 1 ? jQuery(link.attr('href')) : jQuery('body'),
			targetOffset = targetBlock.offset().top;

		scrollTo(targetOffset);
	});

	// Active anchor sections handler
	var handleActiveClasses = function() {
		var scrollTop = win.scrollTop();

		mainAnchorLinks.each(function() {
			var anchorLink = jQuery(this),
				anchorSection = jQuery(anchorLink.attr('href'));

			if(anchorSection.length && anchorSection.offset().top <= scrollTop+1)  {
				mainAnchorParents.removeClass(activeClass);
				anchorLink.parent().addClass(activeClass);
			}
		});
		if (jQuery(mainAnchorLinks.eq(0).attr('href')).length && jQuery(mainAnchorLinks.eq(0).attr('href')).offset().top > scrollTop+1) {
			mainAnchorParents.removeClass(activeClass);
		}
	};
	handleActiveClasses();
	win.on('scroll', handleActiveClasses);
}