/**
 * 
 */

$(document).ready(function() {

	$('#login_form554be769ec78a').submit(function(event) {
		// Stop form from submitting normally
		event.preventDefault();
		var data = $('#login_form554be769ec78a').serialize();
		var post = $.post('https://student.world/user/login', data);
		post.done(function(data) {
			getNotifications();
		})
	})
})
function showLogin() {
	$('.login').show(200);
	$('.notifications').hide();
	$('.newItem').hide();

}
function showNotifications() {
	$('.login').hide();
	$('.notifications').show(200);
	$('.newItem').show(200);
}
