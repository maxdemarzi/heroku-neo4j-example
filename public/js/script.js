$(document).ready(function(){
	
	// Caching the movieName textbox:
	var movieName = $('#movieName');
	
	// Defining a placeholder text:
	movieName.defaultText('Type a Movie Title or Actor Name');
		

	// Using jQuery UI's catcomplete widget:
       $.widget( "custom.catcomplete", $.ui.autocomplete, {
		_renderMenu: function( ul, items ) {
			var self = this,
				currentCategory = "";
			$.each( items, function( index, item ) {
				if ( item.category != currentCategory ) {
					ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
					currentCategory = item.category;
				}
				self._renderItem( ul, item );

			});
		}
	});
	

	movieName.catcomplete({
		minLength	: 3,
		source		: '/autocomplete.json',
		select: function( event, ui ) {
			window.location =  window.location.href + ui.item.value;
			return false;
		}

	});

	$('#holder .button').click(function(){
		if(movieName.val().length && movieName.data('defaultText') != movieName.val()){
			$('#holder form').submit();
		}
	});
});

// A custom jQuery method for placeholder text:

$.fn.defaultText = function(value){
	
	var element = this.eq(0);
	element.data('defaultText',value);
	
	element.focus(function(){
		if(element.val() == value){
			element.val('').removeClass('defaultText');
		}
	}).blur(function(){
		if(element.val() == '' || element.val() == value){
			element.addClass('defaultText').val(value);
		}
	});
	
	return element.blur();
}