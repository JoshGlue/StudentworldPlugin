var loggedin = true;
function MyExtension() {
	var self = this;
	kango.ui.browserButton.setPopup({
		url : 'popup.html',
		width : 710,
		height : 510
	});
	kango.ui.browserButton.setBadgeBackgroundColor([ 255, 0, 0, 255 ]);
	kango.ui.browserButton.setBadgeValue(27);
	// //
	// //Kijk elke 2 minuten of er een nieuwe notificatie is
	// //
	setInterval(getNotifications(), 3000);

}

/*
 * Via de JSON-Feed van Student.world die ook gebruikt wordt om de notificaties
 * op te halen op de normale site, wordt er gekeken of er nieuwe notificaties
 * zijn. Als er nieuwe notificaties zijn, worden deze als badge op de knop van
 * de plugin gepresenteerd. Als er dan op de plugin geklikt wordt, worden de
 * nieuwe notificaties getoond. In het geval als de notificatie gelezen is,
 * wordt de badge weer verwijderd *
 */

function getNotifications() {
	alert("refresh");
	var timestamp = Math.floor(Date.now() / 1000);
	kango.console.log('timestamp ' + timestamp);

	$.getJSON(
			'http://student.world/notifications/default/notifications?timestamp='
					+ timestamp, function(json) {
				// het countveld bestaat, als er een nieuwe notificatie is
				if (json.result.count != undefined) {
					var count = parseInt(json.result.count);
					kango.console.log('defined');
					kango.ui.browserButton.setBadgeBackgroundColor([ 255, 0, 0,
							255 ]);
					kango.ui.browserButton.setBadgeValue(count);

				} else {
					kango.console.log('undefined');
					kango.ui.browserButton
							.setBadgeBackgroundColor([ 0, 0, 0, 0 ]);
					kango.ui.browserButton.setBadgeValue(0);
				}

			});

	kango.ui.notifications.show('Notification title', 'Notification text',
			'http://kangoextensions.com/images/logos/kango.png', function() {
				kango.console.log('Notification click');
			});

}

//

// MyExtension.prototype = {
//
// _onCommand: function() {
// kango.browser.tabs.create({url: 'http://kangoextensions.com/'});
// }
// };

var extension = new MyExtension();