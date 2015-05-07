// ==UserScript==
// @name Test
// @include http://*
// ==/UserScript==

//interval ingesteld op 3 seconden voor testredenen.
var interval = 3000;
var colorNumber = 0;
var colors = [ 'red', 'green', 'blue' ];

// kijkt of er nieuwe notificaties zijn
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
	var lastUpdateParam = 'lastUpdate';
	var timestamp = Math.floor(Date.now() / 1000);
	kango.console.log('timestamp ' + timestamp);
	var lastupdated = kango.storage.getItem('lastUpdate');
	kango.console.log('lastupdated ' + lastupdated);
	var difference = timestamp - lastupdated;
	kango.console.log('difference ' + difference);
	if (difference >= interval) {
		
		alert("refresh1");
		

		$.getJSON(
				'http://student.world/notifications/default/notifications?timestamp='
						+ timestamp, function(json) {
					// zet de nieuwe waarde wanneer het voor het laatst geUpdate
					// is
					kango.storage.setItem('lastUpdate', timestamp);
					// het countveld bestaat, als er een nieuwe notificatie is
					if (json.result.count != undefined) {
						var count = parseInt(json.result.count);
						kango.console.log('defined');
						kango.ui.browserButton.setBadgeBackgroundColor([ 255,
								0, 0, 255 ]);
						kango.ui.browserButton.setBadgeValue(count);

					} else {
						kango.console.log('undefined');
						kango.ui.browserButton.setBadgeBackgroundColor([ 0, 0,
								0, 0 ]);
						kango.ui.browserButton.setBadgeValue(0);
					}

				});

		kango.ui.notifications.show('Notification title', 'Notification text',
				'http://kangoextensions.com/images/logos/kango.png',
				function() {
					kango.console.log('Notification click');
				});
	}
}