var loggedin = true;
function MyExtension() {
	var self = this;
	var interval = 180000;
	getNotifications();
	kango.ui.browserButton.setPopup({
		url : 'popup.html',
		width : 300,
		height : 500
	});

	window.setInterval(function() {
		getNotifications();
	}, interval);

	// kijkt of er nieuwe notificaties zijn
	/*
	 * Via de JSON-Feed van Student.world die ook gebruikt wordt om de
	 * notificaties op te halen op de normale site, wordt er gekeken of er
	 * nieuwe notificaties zijn. Als er nieuwe notificaties zijn, worden deze
	 * als badge op de knop van de plugin gepresenteerd. Als er dan op de plugin
	 * geklikt wordt, worden de nieuwe notificaties getoond. In het geval als de
	 * notificatie gelezen is, wordt de badge weer verwijderd *
	 */
	function getNotifications() {
		var timestamp = Math.floor(Date.now() / 1000);

		$
				.getJSON(
						'http://student.world/notifications/default/notifications',
						function(json) {

							// het countveld bestaat, als er een
							// nieuwe notificatie is
							if (json.result.count != undefined) {
								var count = parseInt(json.result.count);
								kango.console.log('nieuwe notificatie');
								kango.ui.browserButton
										.setBadgeBackgroundColor([ 255, 0, 0,
												255 ]);
								kango.ui.browserButton.setBadgeValue(count);								
								var notificatedIDs = kango.storage.getKeys();
								for (i = 0; i < count; i++) {
									var link = 'http://student.world';
									var image = 'http://student.world/images/start/logo_root_node.svg';
									var ID = json.result.messages[i].id;
									
									if(json.result.messages[i].user_img != undefined){
										image = json.result.messages[i].user_img;
									}
									if (json.result.messages[i].deeplink_id != null) {
										link += "?ref=" + json.result.messages[i].deeplink_id;
									}
									if($.inArray(ID, notificatedIDs) == -1)
									kango.ui.notifications
											.show(
													'Student.world',
													json.result.messages[0].description,
													image,
													function() {
														kango.browser.tabs.create({url: link});
													});
									kango.storage.setItem(ID, 'notificatie');
									
								}

							} else {
								kango.console.log('geen nieuwe notificatie');
								kango.ui.browserButton
										.setBadgeBackgroundColor([ 0, 0, 0, 0 ]);
								kango.ui.browserButton.setBadgeValue(0);
							}

						});

	}

}

//

// MyExtension.prototype = {
//
// _onCommand: function() {
// kango.browser.tabs.create({url: 'http://kangoextensions.com/'});
// }
// };

var extension = new MyExtension();