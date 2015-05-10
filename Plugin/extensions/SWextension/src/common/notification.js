$(document)
		.ready(
				function() {
					KangoAPI
							.onReady(function() {
								getNotifications();
								$('body')
										.on(
												'click',
												'.linknotification',
												function() {

													$
															.get(
																	"http://student.world/notifications/default/notified",
																	function(
																			data) {
																		kango.ui.browserButton
																				.setBadgeValue(0);
																		kango.console
																				.log('notified');
																		;
																	});

													var urlhref = $(this).attr(
															'href');
													kango.browser.tabs.create({
														url : urlhref
													});

													return false;
												});

								$('body').on('click', '.link', function() {
									var urlhref = $(this).attr('href');
									kango.browser.tabs.create({
										url : urlhref
									});

									return false;

								});

								$('body').on(
										'click',
										'.sub',
										function() {
											var urlhref = $(this).attr('href');

											kango.storage
													.removeItem("lastItem");
											if (!$(urlhref).hasClass("in"))
												kango.storage.setItem(
														"lastItem", urlhref);
											var lastItem = kango.storage
													.getItem("lastItem");

										});
								var lastItem = kango.storage
										.getItem("lastItem");
								$(lastItem).addClass("in");

								return false;

							});

				});

function getNotifications() {
	var result = 0;
	$
			.getJSON(
					'http://student.world/notifications/default/notifications',
					function(json) {
						if (json.status == 1) {
							var count = json.result.count;
							$('#error_form').hide();
							$("#notificationHeader").append(" (" + count + ")");
							var messages = json.result.messages;
							for (var i = 0; i < messages.length; i++) {
								var image = 'http://student.world/images/start/logo_root_node.svg';
								var link = 'http://student.world';

								if (messages[i].user_img != null) {
									image = messages[i].user_img;
								}
								if (messages[i].deeplink_id != null) {
									link += "?ref=" + messages[i].deeplink_id;
								}
								// // div samenstellen

								var hoofdnode = $(
										'<div class="notification"></div>')
										.text("");

								var img = '<div class="imagenotification"><img src="'
										+ image
										+ '" class="img-circle imagenotification" /></div>';
								var desc = '';
								if (messages[i].read != true) {
									desc = '<div class="desc"><b><a href="'
											+ link
											+ '" class="linknotification">'
											+ messages[i].description
											+ '</a></b></div>';
								} else {
									desc = '<div class="desc"><a href="' + link
											+ '" class="link">'
											+ messages[i].description
											+ '</a></div>';
								}
								KangoAPI
										.onReady(function() {
											kango.ui.browserButton
													.setBadgeValue(count);
										});

								hoofdnode.append(img);
								hoofdnode.append(desc);
								$("#notifications").append(hoofdnode);
								showNotifications();
								
							}
							result = 1;
							
						} else {
							result = 0;
							// functie staat in login.js
							showLogin();
							
						}
					});
return result;
}