
(function(){

	var 
	target = 'sherpa-widget',
	css, html;
	
	
	/* Create HTML element and assiging attributes to append to the head of the document */
	css = document.createElement('link');
	css.setAttribute('rel', 'stylesheet');
	css.setAttribute('href', 'http://webstandardssherpa.com/w/widget.css');
	document.head.appendChild(css);
	
	html = 	'<div class="sherpa-widget-content">' +
			'<ul>' +
						'<li>' +
			'<em class="issue"><i>Issue </i>No. 38</em>' +
			'<h2 class="title"><a href="http://webstandardssherpa.com/reviews/sass-for-big-sites-part-2">Sass for Big Sites, Part 2</a></h2>' +
			'<p class="author"><strong>by </strong>Jackie Balzer</p>' +
			'</li>' +
						'<li>' +
			'<em class="issue"><i>Issue </i>No. 37</em>' +
			'<h2 class="title"><a href="http://webstandardssherpa.com/reviews/sass-for-big-sites-part-1">Sass for Big Sites, Part 1</a></h2>' +
			'<p class="author"><strong>by </strong>Jackie Balzer</p>' +
			'</li>' +
						'<li>' +
			'<em class="issue"><i>Issue </i>No. 36</em>' +
			'<h2 class="title"><a href="http://webstandardssherpa.com/reviews/responsive-discovery">Responsive Discovery</a></h2>' +
			'<p class="author"><strong>by </strong>Emily Gray</p>' +
			'</li>' +
						'<li>' +
			'<em class="issue"><i>Issue </i>No. 35</em>' +
			'<h2 class="title"><a href="http://webstandardssherpa.com/reviews/facilitating-collaboration">Facilitating Collaboration</a></h2>' +
			'<p class="author"><strong>by </strong>Ben Callahan</p>' +
			'</li>' +
						'<li>' +
			'<em class="issue"><i>Issue </i>No. 34</em>' +
			'<h2 class="title"><a href="http://webstandardssherpa.com/reviews/reflecting-on-the-revamped-sherpa">Reflecting on the Revamped Sherpa</a></h2>' +
			'<p class="author"><strong>by </strong>Aaron Gustafson</p>' +
			'</li>' +
						'</ul>' +
			'</div>' +
			'<footer>' +
			'<a href="http://webstandardssherpa.com">Webstandardssherpa.com</a>' +
			'</footer>';
	
	document.getElementById(target).innerHTML = html;
	
}());