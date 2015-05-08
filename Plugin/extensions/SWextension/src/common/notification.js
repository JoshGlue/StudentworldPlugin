$(window).load(
		function() {
			KangoAPI.onReady(function() {
				getNotifications();
				$('body').on(
						'click',
						'.linknotification',
						function() {

							$
							.get(
									"http://student.world/notifications/default/notified",
									function(
											data) {
										kango.ui.browserButton.setBadgeValue(0);
										kango.console.log('notified');
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
			});
		})

		function getNotifications() {
	$
	.getJSON(
			'http://student.world/notifications/default/notifications',
			function(json) {
				if (json.status == 1) {
					var count = json.result.count;
					kango.ui.browserButton.setBadgeValue(count);

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
							+ '" class="imagenotification" /></div>';
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

						hoofdnode.append(img);
						hoofdnode.append(desc);
						$("#notifications").append(hoofdnode);

					}

				}
			});

}