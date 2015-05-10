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
		var success =	getNotifications();
		
	if(success == 0){
		$('#error_form').removeClass("alert-warning");
		$('#error_form').removeClass("alert-success");
		$('#error_form').addClass("alert-danger");
		 $('#error_form').html('Oeps, er is iets fout gegaan met inloggen.');
			$('#error_form').show();
	}
			
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
