// global namespace
if ( !( 'WSS' in window ) ) { window.WSS = {}; }

 
/*! Easy Responsive Tools */
/* Easy Responsive Tools
 * A collection of useful fixes and helpers for responsive projects
 **/
(function( $, window ){
	
	window.getActiveMQ = function()
	{
		$('<div id="getActiveMQ-watcher"></div>')
			.appendTo('body')
			.hide();
	
		var computed = window.getComputedStyle,
			watcher = document.getElementById('getActiveMQ-watcher');
			if ( 'currentStyle' in watcher )
			{
				window.getActiveMQ = function()
				{
					return watcher.currentStyle['fontFamily'].replace(/['"]/g,'');
				};
			}
			else if ( computed )
			{
				window.getActiveMQ = function()
				{
					return computed( watcher, null ).getPropertyValue( 'font-family' ).replace(/['"]/g,'');
				};
			}
			else
			{
				window.getActiveMQ = function()
				{
					return 'unknown';
				};
			}
			return window.getActiveMQ();
	};

	/*! resize watcher */
	window.watchResize = function( callback )
	{
		var resizing;
		function done()
		{
			clearTimeout( resizing );
			resizing = null;
			callback();
		}
		$(window).resize(function(){
			if ( resizing )
			{
				clearTimeout( resizing );
				resizing = null;
			}
			resizing = setTimeout( done, 50 );
		});
		// init
		callback();
	};
	window.watchResize(function(){
		var size = window.getActiveMQ().replace("break-","");
		
		if ( ! $('.reviews .spacer').length ) 
		{
			if (size =="3" || size == "4") 
			{
				$('#promo-in-the-end').before('<li class="spacer"></li>');
			}
		}
		
			
		window.WSS.screen_size = window.getActiveMQ();
	});

	/*! A fix for theWebKit Resize Bug https://bugs.webkit.org/show_bug.cgi?id=53166. */
	$(window).on('load',function(){
		window.watchResize(function(){
			var $body = $('body');
			$body.css('overflow', 'hidden').height();
			$body.css('overflow', 'auto');
		});
	});
	
	// Adaptive images
	window.watchResize(function(){
		
		var $img = $('<img alt=""/>'),
			$els = $('[data-image]:not([data-imaged])'),
			curr_break = window.WSS.screen_size.replace("break-","");

		$els.each(function(){
			
			var $el = $(this),
				bp = $el.data('image-min-breakpoint') || 'break-4';
			
			bp = bp.replace("break-","");
			
			if ( curr_break >= bp )
			{
				$img.clone()
					.attr( 'src', $el.data('image') )
					.prependTo(
						$el.attr('data-imaged','')
					 );
			}
				
		});

	});

}( jQuery, window ));/*------------------------------------------------------------------------------
Function:		FunctionHandler()
Author:			Aaron Gustafson (aaron at easy-designs dot net)
Creation Date:	2009-04-02
Version:		0.2
Homepage:		http://github.com/easy-designs/FunctionHandler.js
License:		MIT License (see homepage)
Note:			If you change or improve on this script, please let us know by
				emailing the author (above) with a link to your demo page.
------------------------------------------------------------------------------*/
(function(){var FunctionHandler={version:"0.2"},pages={};function initialize(){var body_id=$("body").attr("id");if(body_id!=false&&typeof(pages[body_id])!="undefined"){run(pages[body_id])}if(typeof(pages["*"])!="undefined"){run(pages["*"])}}$(document).ready(initialize);FunctionHandler.register=function(id,callback){if((typeof(id)!="string"&&!(id instanceof Array))||typeof(callback)!="function"){return false}if(typeof(id)=="string"&&id.indexOf(", ")!=-1){id=id.split(", ")}if(id instanceof Array){for(var i=id.length-1;i>=0;i--){add(id[i],callback)}}else{add(id,callback)}return true};function add(id,callback){if(typeof(pages[id])=="undefined"){pages[id]=[]}pages[id].push(callback)}function run(arr){if(!(arr instanceof Array)){return}for(var i=arr.length-1;i>=0;i--){arr[i]()}}window.FunctionHandler=FunctionHandler})();

/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);


(function(){
	
	// global namespace
	if ( !( 'WSS' in window ) ) { window.WSS = {}; }

	// test transitions
	window.WSS.hasTransitions = css_support('transition-property','color');

	// Testing framework
	function css_support( property, value )
	{
		// protected
		var
		pfxs	= [ 'khtml', 'moz', 'ms', 'o', 'webkit' ],
		p_len	= pfxs.length,
		body	= document.body,
		styles	= body.style,
		style	= window.getComputedStyle(body, null),
		prefixed_property;
		// redefine the function
		css_support = function( property, value )
		{
			var result = false;
			if ( property in styles ) 
			{
				result = true;
			}
			else
			{
				// try prefixing
				p_len = pfxs.length;
				while ( p_len-- )
				{
					// try normal
					prefixed_property = '-'+pfxs[p_len]+'-'+property;
					if ( prefixed_property in styles ||
						 camelize(prefixed_property) in styles )
					{
						result = true;
						break;
					}
				}
			}
			return result;
		};
		return css_support( property, value );
	}
	function camelize( str )
	{
		var
		regex = /(-[a-z])/g,
		func  = function( bit ){
			return bit.toUpperCase().replace( '-', '' );
		};
		camelize = function( str )
		{
			return ( typeof str == 'string' ? str.toLowerCase().replace( regex, func )
			                         	    : str );
		};
		return camelize( str );
	}	
	
})();


// login/logout
FunctionHandler.register('*',function(){

		// break out of frames (except ClickTale)
		if ( ( typeof ClickTaleIsPlayback != "function" ||
		       ! ClickTaleIsPlayback() ) &&
			 top.location != document.location )
		{
			top.location = document.location.href;
		}
		
		if ( '{group_id}'=='8' )
		{
			$('#logout').submit(function(e){
				e.preventDefault();
				RPXNOW.Social.clearSocialCookies('{site_url}?ACT=15');
			});
		}
		
		var
		$reg = $('#registration-confirmation'),
		$closer;
		if ( $reg.length > 0 )
		{
			$closer	= $('<a class="button">Close</a>')
						.click(function(){
							$reg.slideUp('fast');
						})
						.appendTo($reg.find('p:last-child'));
		}

	});

// Deprecated code
FunctionHandler.register('review', function(){
	var

	// re-used strings
	explanation	= 'explanation',
	preamble	= 'preamble',
	hidden		= 'hidden',
	href		= 'href',
	id			= 'id',
	a			= 'a',
	HYPHEN		= '-',
	HASH		= '#',

	// elements
	$notice = $('<p class="deprecated-notice">The following code block is deprecated. <a>Learn why</a>.</p>')
				// set up the event listeners
				.find(a)
					.click(reveal).keydown(reveal)
					// make sure we're returning the paragraph
					.end(),
	$close	= $('<p class="closer"><a class="button">Ok</a></p>')
				// set up the event listeners
				.find(a)
					.click(hide).keydown(hide)
					// make sure we're returning the paragraph
					.end();

	$('pre.deprecated').each(function(i){
		// the code block
		$(this)
			// the explanation
			.next('.'+explanation)
				// give it an ID
				.attr( id, explanation + HYPHEN + i )
				// hide it
				.addClass(hidden)
				// turn it into an overlay
				.addClass('overlay')
				// append the closer
				.append(
					$close.clone(true)
						.find(a)
							// set the anchor reference
							.attr( href, HASH + preamble + HYPHEN + i )
							// make sure we're returning the clone
							.end()
				)
				// return to the code block
				.end()
			// clone the preamble
			.before(
				$notice.clone(true)
					// give it an ID
					.attr( id, preamble + HYPHEN + i )
					// update the anchor
					.find(a)
						// set the anchor reference
						.attr( href, HASH + explanation + HYPHEN + i )
						// make sure we're returning the clone
						.end()
			);
	});
	function hide(e)
	{
		e.preventDefault();
		var $this = $(this);
		// hide the overlay
		$this.parents('.overlay').addClass('hidden');
		// show the preamble
		$($this.attr('href')+' '+a).removeClass('hidden');
	}
	function reveal(e)
	{
		e.preventDefault();
		// hide the button
		var $this = $(this).addClass('hidden');
		// show the overlay
		$($this.attr('href')).removeClass('hidden');

	}

	// blockquote citations
	$citation = $('<p class="citation"><a rel="external"></a></p>');
	$('#review blockquote[cite]').each(function(){
		var
		$this	= $(this),
		url		= $this.attr('cite');
		// not in the sidebar
		if ( $this.parents('.sidebar').length == 0 )
		{
			$citation
				.clone()
				.find('a')
					.attr('href',url)
					.text(url)
					.end()
				.appendTo($this);
		}
	});
	
	// sharing
	$('#share').delegate('a','click',function(e){
		if ( $(window).width() > 700 )
		{
			e.preventDefault();
			window.open(this.href,'share-this','height=300,width=500,status=no,toolbar=no');
		}
	});
});

if ( navigator.userAgent.match(/iPad/i) == null )
{
	FunctionHandler.register(['sign-up','submit'], function(){
		var $overlay = $('<div class="hidden overlay terms">' +
						 '<div class="scroll"></div>' +
						 '<p class="closer"><a class="button">Ok</a></p>' +
						 '</div>');
		$overlay
			.find('.closer a')
				.click(hide)
				.keypress(hide)
				.end()
			.css({
				'width':		($(window).width()/2) + 'px',
				'margin-left':	'-' + ($(window).width()/4) + 'px',
				'height':		($(window).width()/3) + 'px',
				'margin-top':	'-' + ($(window).width()/6) + 'px'
			})
			.find('.scroll')
				.css( 'height', ($overlay.height()-25) + 'px' );
		$('label a').click(reveal).keypress(reveal);
		$('body').append($overlay);
		function reveal(e){
			e.preventDefault();
		//	console.log($(this).attr('href'));
			$overlay
				.find('.scroll')
					.load($(this).attr('href') + ' article *' )
					.end()
				.removeClass('hidden');
		}
		function hide(){
			$overlay.addClass('hidden');
			$(this).prev('input').get(0).focus();
		}
	});
}
	
// carousel
FunctionHandler.register('home', function(){

	var $new_carousel =null,
	    $container	= $('.carousel'),
	    $prev		= $('<a href="#prev" title="Previous" class="prev-btn">Previous</a>'),
		$next		= $prev.clone(true).attr({'href': '#next', 'title': 'Next', 'class': 'next-btn'}).text('Next'),
		$controls		= $('<div aria-controls="carousel-container" class="controls"></div>'),
	    $old_carousel	= $container.find('.hfeed');
	    $jeff = $old_carousel.clone();
	    

	// Function to create the carousel
	function createCarousel( callback ) {
	
		var
		id			= 0,
//		size = window.getActiveMQ().replace("break-",""),
		curr_pos, curr_entry;
		
		$container.blur(function(){
			$(this)
				.find('.hentry, .hentry a').attr('tabindex','-1')
				.find('.current, .current a').attr('tabindex','0');
		});
		
		
	// get the initial data download
		$.get('/apis/carousel/', function(data){
			var
			$data  			= $old_carousel.clone().empty(), // Creates a clone of .hfeed and removes all the child nodes
			next			= -1;
			
			$new_carousel	= $data.clone(); // This is what is swapped in
			$data.html(data);  // Flowing in the content from AJAX call
			
		
			$data.find('.hentry').each(function(){
				var $this = $(this);
				if ( ! $this.attr('id') )
				{
					$this.attr('id','carousel-item-'+(id++));
				}
				$this
					.find('a')
						.attr('tabindex','-1')
						.end()
					.find('header')
						.attr('id',	$this.attr('id') + '-header')
						.end()
					.attr({
						'aria-hidden':	'true',
						'tabindex':		'-1'
					})
					.prependTo($new_carousel);
			});
			
			if ( $new_carousel.find('.hentry:eq(-2) header').hasClass('future') ) 
			{
				next = -2;
			}
			
			
			// initial class setup
			$new_carousel
				.find('.hentry:eq(' + next + ')')
					.addClass('next')
					.end()
				.find('.hentry:eq(' + (next - 2) + ')')
					.addClass('prev')
					.end()
				.find('.hentry:eq(' + (next - 1) + ')')
					.addClass('current')
					.attr({
						'aria-hidden':	'false',
						'tabindex':		'0'
					})
					.find('a')
						.attr('tabindex','0')
						.end()
					.prev('.hentry')
						.addClass('prev')
						.prevAll()
							.addClass('prev-more')
							.end()
						.end()
					.next('.hentry')
						.addClass('next')
						.nextAll()
							.addClass('next-more');
			
			if ( ! $container.attr('id') ) 
			{
				$container.attr('id','carousel-container');
			}
			
			callback();
		},'html');	// Get function closing
	}; //function closing
	
	function createControls(callback) {
		$controls
		.append($prev.attr('aria-describedby',$old_carousel.find('.prev header').attr('id')))
			.append($next.attr('aria-describedby',$old_carousel.find('.next header').attr('id')));
		callback();
	};
	
	function initCarousel() {
		$('.reviews .hfeed').replaceWith($new_carousel);
		  
		  $container
				.addClass('carousel-on')
				.removeClass('carousel')
				.attr({
					'role':						'application',
					'tabindex': 				0,
					'aria-activedescendant':	$new_carousel.find('.current').attr('id')
				});
		$('.reviews .spacer').remove();
	}
	
	function initControls () {
		$controls.insertBefore($('.reviews .see-all'));
	}
	
	// Rewatch function to replace carousel
	window.watchResize(function(){
		size = window.getActiveMQ().replace("break-","");
		carousel_is_dynamic = $('.reviews .controls').length > 0;
		
		if ( size >= 6 && !carousel_is_dynamic) // Firing 4 times when resized
		{	
		  if ( !$new_carousel )
		  {
		    createCarousel( initCarousel );
		    createControls( initControls );
		  }
		  else 
		  {
			  initCarousel();
			  initControls();
		  }
		  
		}
		
		else if ( size < 6 && carousel_is_dynamic) // This script is firing multiple times
		{
		//	$new_carousel.replaceWith($old_carousel);
			$('.reviews .hfeed').replaceWith($old_carousel);
			$('.controls').remove();
	
			$container
				.removeClass('carousel-on')
				.addClass('carousel')
				.removeAttr('role')
				.removeAttr('tabindex')
				.removeAttr('aria-activedescendant');		
		}
	});
	
	$('body').on('click','.carousel-on .controls a[class$="-btn"]',move);
	$('body').on('keydown','.carousel-on',keys);
	
	function keys(e)
		{
			var
			$target	= $(e.target),
			pass	= true;
			// only apply this on certain elements
			if ( $target.is('.reviews, .prev-btn, .next-btn, .hentry') )
			{
				pass = false;
				switch ( e.which )
				{
					// up or left
					case 37:
					case 38:
						$prev.click();
						break;
					// down or right
					case 39:
					case 40:
						$next.click();
						break;
					// home
					case 36:
						focusOn( $new_carousel.find('.hentry:first-child') );
						break;
					// end
					case 35:
						focusOn( $new_carousel.find('.hentry:last-child') );
						break;
					// escape
					case 27:
						$container.blur();
						break;
					// enter
					case 13 && $target.is('.reviews, .hentry'):
						$new_carousel.find('.current').focus();
						break;
					default:
						pass = true;
						break;
				}
			}
			if ( ! pass )
			{
				e.preventDefault();
				e.stopPropagation();
			}
		}
	
		function move(e)
		{
			e.preventDefault();
			var $curr	= $new_carousel.find('.current');
			focusOn( $(this).is('.next-btn') ? $curr.next('.hentry') : $curr.prev('.hentry') );
		}
	
		function focusOn( $li )
		{
			if ( $li.size() )
			{
				// make the previous entry "prev" (and make sure it's not "current")
				$new_carousel.find('.hentry, .hentry a').attr('tabindex','-1');
				$li
					.prev('.hentry')
						.attr({
							'class':		'hentry prev',
							'aria-hidden':	'true'
						})
						// make all other previous entries "prev-more"
						.prevAll('.hentry')
							.attr({
								'class':		'hentry prev-more',
								'aria-hidden':	'true'
							})
							.end()
						// return to the $li
					  	.end()
					// switch its class to "current"
				   	.attr({
						'class':		'hentry current',
						'aria-hidden':	'false',
						'tabindex':		'0'
					})
					// make the links focusable
					.find('a')
						.attr('tabindex','0')
						.end()
					// make the next entry "next" (and make sure it's not "current")
					.next('.hentry')
						.attr({
							'class':		'hentry next',
							'aria-hidden':	'true'
						})
						// make all other next entries "next-more"
				        .nextAll('.hentry')
							.attr({
								'class':		'hentry next-more',
								'aria-hidden':	'true'
							});
			}
			// reset the active decendent
			$container.attr('aria-activedescendant',$new_carousel.find('.current').focus().attr('id'));
			// reset the described by text
			$prev.attr('aria-describedby',$new_carousel.find('.prev header').attr('id'));
			$next.attr('aria-describedby',$new_carousel.find('.next header').attr('id'));
			// showing and hiding the next/previous
			if ( $new_carousel.find('.current').is(':first-child') )
			{
				$prev.fadeOut('fast');
			}
			else
			{
				$prev.fadeIn('fast');
			}
			// showing and hiding the next/previous
			if ( $new_carousel.find('.current').is(':last-child') )
			{
				$next.fadeOut('fast');
			}
			else
			{
				$next.fadeIn('fast');
			}
		}
});
/*! Dependent Anchor Include Pattern */
/*
 * Copyright 2011, Scott Jehl (scottjehl.com), Emil Bjorklund (thatemil.com),
 * and Aaron Gustafson (aaron-gustafson.com)
 * 
 * Dual licensed under the MIT
 * Idea from Scott Gonzalez
 * 
 * to use, place attributes on an already-functional anchor pointing to content
 * that should either replace, or insert before or after that anchor
 * after the page has loaded
 * 
 * Replace:	<a href="…" data-replace="articles/latest/fragment">Latest Articles</a>
 * Before:	<a href="…" data-before="articles/latest/fragment">Latest Articles</a>
 * After:	<a href="…" data-after="articles/latest/fragment">Latest Articles</a>
 * 
 * On domready, you can use it like this: 
 * 
 *	$("[data-append],[data-replace],[data-after],[data-before]").ajaxInclude();
 * 
 * To set certain elements to lazy load based on specific CSS-based breakpoint
 * indicators, set the indicator in your CSS like this:
 * 
 * 	body:after {
 *		content: 'large';
 *		display: none;
 *	}
 * 
 * Then add a corresponding attribute to the lazy-loading element:
 * 
 *   <a href="…" data-include-size="large" data-replace="articles/latest/fragment">Latest Articles</a>
 * 
 * If you would like the element to insert the fragment when the user taps it,
 * add the data-include-on-tap attribute:
 * 
 *   <a href="…" data-include-on-tap data-replace="articles/latest/fragment">Comments</a>
 * 
 */
(function( $, window, document, UNDEFINED ){

	var anchorInclude;
	
	if ( $.fn.jquery.replace(/\./g,'') < 143 )
	{ 
		throw new Error('jQuery 1.4.3 or higher is required');
		return;
	}
	
	var tap_evt = 'click';
	if ( 'ontouchstart' in window ||
		 'createTouch' in document )
	{
		tap_evt = 'touchend';
	}
	
	function watchResize( callback )
	{
		var resizing;
		callback.size = 0;
		function done()
		{
			var curr_size = window.innerWidth;
			clearTimeout( resizing );
			resizing = null;
			// only run on a true resize
			if ( callback.size != curr_size )
			{
				callback();
				callback.size = curr_size;
			}
		}
		window.addEventListener('resize', function(){
			if ( resizing )
			{
				clearTimeout( resizing );
				resizing = null;
			}
			resizing = setTimeout( done, 50 );
		});
		// init
		callback();
	}
	
	$.fn.ajaxInclude = function()
	{
		return this.each(function(){
			
			var $el			= $( this ),
				target		= $el.data( 'target' ),
				size		= $el.data('include-size'),
				$targetEl	= target && $( target ) || $el,
				methods		= [ 'append', 'replace', 'before', 'after' ],
				ml			= methods.length,
				loaded		= false,
				method,
				url;
			
			// Lazy loader function
			function lazyLoad()
			{
				if ( loaded )
				{
					return;
				}
				
				while ( ml-- )
				{
					method	= methods[ ml ];
					if ( $el.is( '[data-' + method + ']' ) )
					{
						url		= $el.data( method );
						break;
					}
				}

				if ( method == 'replace' )
				{
					method += 'With';
				}

				if ( url && method )
				{
					$.get( url, function( data ){
						$el.trigger( 'ajaxInclude', [$targetEl, data] );
						$targetEl[ method ]( data );
					});
				}
				
				loaded = true;
				
			}
			
			// manage link or button clicks
			if ( $el.is('[data-include-on-tap]') )
			{
				$el.on( tap_evt, function(e){
					
					e.preventDefault();
					lazyLoad();
					
				});
			}

			// watch resizing of the browser
			watchResize(function(){
				// get the current size and match it against the test value (sans quotes)
				if ( size != UNDEFINED && size > window.WSS.screen_size.replace("break-","") )
				{
					return;
				}
				if ( anchorInclude != true )
				{
					lazyLoad();
					anchorInclude = true;
				}
				
			});

		});
		
	};
	
	$("[data-append],[data-replace],[data-after],[data-before]").ajaxInclude();
	
})( jQuery, window, document );

