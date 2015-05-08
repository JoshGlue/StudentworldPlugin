/* Dit javascript bestand draait op de achtergrond.
 * Dit script is verantwoordelijk voor het ophalen van nieuwe notificaties,
 *  als de gebruiker niet met de plugin bezig is.
 * 
 *  */

function MyExtension() {
	var self = this;
	// het interval waarbij hij kijkt of er nieuwe notificaties zijn (tijd in
	// milliseconden)
	var interval = 180000;
	// voor de eerste keer moet er gekeken worden of er nieuwe notificaties
	// zijn.
	getNotifications();
	// instellen dat dit html-bestand geopend moet worden.
	kango.ui.browserButton.setPopup({
		url : 'popup.html',
		width : 300,
		height : 500
	});
	// hier wordt om de zoveel tijd gekeken of er nieuwe notificaties zijn
	window.setInterval(function() {
		getNotifications();
	}, interval);

	// kijkt of er nieuwe notificaties zijn
	/*
	 * Via de JSON-Feed van Student.world die ook gebruikt wordt om de
	 * notificaties op te halen op de normale site, wordt er gekeken of er
	 * nieuwe notificaties zijn. Als er nieuwe notificaties zijn, worden deze
	 * als badge op de knop van de plugin gepresenteerd en als pop-up. Als er
	 * dan op de plugin-button geklikt wordt, worden de nieuwe notificaties
	 * getoond. In het geval als de notificatie gelezen is, wordt de badge weer
	 * verwijderd.
	 */
	function getNotifications() {
		// jsonfeed wordt opgehaald
		$
				.getJSON(
						'http://student.world/notifications/default/notifications',
						function(json) {
							/*
							 * checkt of er een goed json bestand wordt
							 * opgehaald. De code 1 betekent dat het goed gaat.
							 * Code 3 betekent dat iemand niet in is gelogd.
							 * 
							 */
							if (json.status == 1) {
								// haalt het aantal nieuwe notificaties op
								var count = parseInt(json.result.count);
								// zet de achtergrondkleur van de badge.
								kango.ui.browserButton
										.setBadgeBackgroundColor([ 255, 0, 0,
												255 ]);
								// zet het aantal nieuwe notificaties in de
								// badge
								kango.ui.browserButton.setBadgeValue(count);
								/*
								 * Elke notificatie heeft een unieke ID, om te
								 * voorkomen dat een notificatie 2 keer op popt,
								 * wordt er een interne lijst in de plugin
								 * bijgehouden van
								 * nothttp://kangoextensions.com/docs/api-reference/kango-storage.htmlificaties
								 * die opgepopt zijn voor de gebruiker. Wanneer
								 * deze ID al in de interne lijst voorkomt, zal
								 * de notificatie niet oppoppen. Er wordt
								 * gebruik gemaakt van de storage functie van
								 * kango
								 * (http://kangoextensions.com/docs/api-reference/kango-storage.html)
								 */
								var notificatedIDs = kango.storage.getKeys();
								// Gaat het x aantal laatste nieuwe notificaties
								// af en laat deze dan zien aan de gebruiker als
								// notificatie-popup.
								for (i = 0; i < count; i++) {
									// De link als er op de notificatie-popup
									// wordt geklikt
									var link = 'http://student.world';
									// De image als er op de notificatie-popup
									// wordt geklikt
									var image = 'http://student.world/images/start/logo_root_node.svg';
									// De ID die in de interne lijst wordt
									// opgeslagen.
									var ID = json.result.messages[i].id;
									// Als er een foto van de gebruiker wordt
									// meegestuurd in de JSON-feed, dan wordt
									// deze gebruikt als foto bij de
									// notificatie-popup. Anders wordt gewoon
									// het student.world plaatje gebruikt
									if (json.result.messages[i].user_img != undefined) {
										image = json.result.messages[i].user_img;
									}
									// Als er een deeplink mee wordt gegeven,
									// dan wordt deze gebruikt, zodat de
									// gebruiker direct op het item komt waar
									// een notificatie was. Anders komt hij
									// gewoon terecht op student.world
									if (json.result.messages[i].deeplink_id != null) {
										link += "?ref="
												+ json.result.messages[i].deeplink_id;
									}
									// Hier wordt gekeken of een
									// notificatie-popup al een keer is getoond
									// aan de gebruiker. -1 wordt teruggegeven
									// als het ID niet voorkomt in de interne
									// lijst.
									if ($.inArray(ID, notificatedIDs) == -1)
										kango.ui.notifications
												.show(
														'Student.world',
														json.result.messages[0].description,
														image,
														function() {
															kango.browser.tabs
																	.create({
																		url : link
																	});
														});
									//zet de getoonde notificatie-popup in de internelijst
									kango.storage.setItem(ID, 'notificatie');

								}

							} else {
								kango.console.log('Jsonfeed niet goed opgehaald');

							}

						});

	}

}

// De extensie wordt geïnitialiseerd.
var extension = new MyExtension();