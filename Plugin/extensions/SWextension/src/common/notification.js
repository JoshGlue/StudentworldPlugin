/* Dit bestand is verantwoordelijk voor het laten zien van de notififcaties in het scherm van de plugin.
 *
 *  */
var nTypesMessage = {
    0: {
        name: "DEFAULT",
        iconClass: "fa fa-normal fa-bell"
    },
    10: {
        name: "USER_LIKED_ITEM",
        iconClass: "fa fa-normal fa-thumbs-up"
    },
    11: {
        name: "USER_LIKED_SHARE",
        iconClass: "fa fa-normal fa-thumbs-up"
    },
    15: {
        name: "USER_SHARED",
        iconClass: "fa fa-normal fa-user"
    },
    20: {
        name: "USER_FOLLOW",
        iconClass: "fa fa-normal fa-user"
    },
    25: {
        name: "USER_FOLLOWED_ITEM",
        iconClass: "fa fa-normal fa-heart"
    },
    30: {
        name: "FOLLOWED_USER_LIKED",
        iconClass: "fa fa-normal fa-user"
    },
    35: {
        name: "FOLLOWED_USER_ADDED",
        iconClass: "fa fa-normal fa-user"
    },
    40: {
        name: "FOLLOWED_CAT_ADDED",
        iconClass: "fa fa-normal fa-heart"
    },
    60: {
        name: "NEW_COMMENT",
        iconClass: "fa fa-normal fa-comment"
    },
    61: {
        name: "NEW_COMMENT_ITEM",
        iconClass: "fa fa-normal fa-comment"
    },
    65: {
        name: "NEW_REPLY_ACTION",
        iconClass: "fa fa-normal fa-comment"
    },
    66: {
        name: "NEW_REPLY_NODE",
        iconClass: "fa fa-normal fa-comment"
    },
    68: {
        name: "NEW_USER_COMMENT",
        iconClass: "fa fa-normal fa-comment"
    },
    70: {
        name: "ACTION_FINISHED",
        iconClass: "fa fa-normal fa-pencil"
    },
    75: {
        name: "NEW_ACTION_ITEM",
        iconClass: "fa fa-normal fa-pencil"
    },
    76: {
        name: "NEW_ACTION_FOLLOWED_ITEM",
        iconClass: "fa fa-normal fa-pencil"
    },
    120: {
        name: "USER_SHARE",
        iconClass: "fa fa-normal fa-user"
    },
    130: {
        name: "INVITE_ACCEPTED",
        iconClass: "fa fa-normal fa-user"
    },
    150: {
        name: "LEVEL_UP",
        iconClass: "fa fa-normal fa-beer"
    },
    151: {
        name: "LEVEL_DOWN",
        iconClass: "fa fa-normal fa-level-down"
    },
    152: {
        name: "LEVEL_UP_REENTER",
        iconClass: "fa fa-normal fa-beer"
    },
    155: {
        name: "SYSTEM_MESSAGE",
        iconClass: "fa fa-normal fa-exclamation-circle"
    },
    200: {
        name: "OPEN_COMPLAINTS",
        iconClass: "fa fa-normal fa-exclamation-triangle"
    },
    250: {
        name: "MOD_ACTION",
        iconClass: "fa fa-normal fa-exclamation-triangle"
    },
    275: {
        name: "COMPLAIN_COMPLETE",
        iconClass: "fa fa-normal fa-exclamation-triangle"
    }
};
$(document).ready(function () {
    //Als er een kango-commando wordt aangesproken, moet er dat binnen KangoAPI.Ready vallen.
    KangoAPI.onReady(function () {
        //Zorgt voor de initialisatie dat de notificaties getoond worden in het scherm.
        getNotifications();
        /*Normale a href's werken niet in het plugin-scherm. Deze moeten daarom omgezet worden naar
         *Kango-commando's die ervoor zorgen dat er een nieuw tabblad wordt geopend. Omdat a href's
         *ook gebruikt worden voor andere doelen, moet er worden aangegeven welke links geopend moeten
         *worden in de browser. Hierbij wordt er een klasse aan de a-tag toegevoegd met respectievelijk
         *linknotification of link. Link opent alleen een tabblad (wordt gebruikt om op het logo te kunnen klikken)
         *. linknotification zorgt ervoor dat ook de teller van nieuwe notificaties op 0 wordt gezet.
         *Beide functies staan hier beneden. */
        $('body').on('click', '.linknotification', function () {
            //service van student world waarbij aan wordt gegeven dat de notificaties gelezen zijn.
            $.get("http://student.world/notifications/default/notified", function (data) {});
            kango.ui.browserButton.setBadgeValue(0);
            var urlhref = $(this).attr('href');
            kango.browser.tabs.create({
                url: urlhref
            });
            return false;
        });
        $('body').on('click', '.link', function () {
            var urlhref = $(this).attr('href');
            kango.browser.tabs.create({
                url: urlhref
            });
            return false;
        });
        /* Wanneer men gebruik maakt van de plugin, is het gedrag wenselijk dat wanneer de plugin weer
         * geopend wordt, dat het juiste gedeelte staat uitgeklapt waar degene voor het laatst heeft gekeken
         * . In de elementen van de klasse sub, staat ook een href gedefinieerd. Deze geeft aan welk gedeelte uitgeklapt moet worden.
         * Om dezelfde staat te behouden, wordt het ID opgeslagen in kango.storage (http://kangoextensions.com/docs/api-reference/kango-storage.html)
         * met de naam "lastItem". */
        $('body').on('click', '.sub', function () {
            var urlhref = $(this).attr('href');
            kango.storage.removeItem("lastItem");
            if (!$(urlhref).hasClass("in"))
                kango.storage.setItem("lastItem", urlhref);
            var lastItem = kango.storage.getItem("lastItem");
        });
        /* Als de plugin weer geopend wordt, zorgt dit stuk code ervoor dat het juiste geedeelte staat uitgeklapt. */
        var lastItem = kango.storage.getItem("lastItem");
        $(lastItem).addClass("in");
        return false;
    });
});
/* Functie lijkt heel erg op getNotificationsBG() in main.js, zie die beschrijving.*/
function getNotifications(callback) {
    $.getJSON('http://student.world/notifications/default/notifications', function (json) {
        if (callback) {
            callback(json.status);
        }
        if (json.status == 1) {
            console.log("test2");
            var count = json.result.count;
            //Het error_form kan nog zichtbaar zijn, bijvoorbeeld wanneer een persoon foutief heeft ingelogd
            //, maar nu wel goed heeft ingelogd.
            $('#error_form').hide();
            //Laat zien hoeveel nieuwe notifcaties er zijn achter "notificaties"
            $("#notificationHeader").append(" (" + count + ")");
            var messages = json.result.messages;
            //Alle notificaties worden ingesteld in de plugin
            for (var i = 0; i < messages.length; i++) {

                console.log("test4");
                var image = '<div style="    width: 50px;    height: 50px;    border-radius: 50%;    border: 1px solid #999;    padding: 14px;    padding-left: 17px;"><span><i class="' + nTypesMessage[messages[i].type].iconClass + '"></i></span></div>';
                var link = 'http://student.world';
                if (messages[i].user_img != null) {
                    image = '<img src="' + messages[i].user_img + '" class="img-circle imagenotification" />';
                }
                if (messages[i].deeplink_id != undefined) {
                    console.log("test5");

                    link += "?ref=" + messages[i].deeplink_id;
                }
                console.log("test6");

                var hoofdnode = $('<div class="notification"></div>').text("");
                var img = '<div class="imagenotification">' + image + '</div>';
                var desc = '';
                if (messages[i].read != true) {
                    desc = '<div class="desc"><b><a href="' + link + '" class="linknotification"><B>' + messages[i].title + '</B><div class="descriptionNotification">' + messages[i].description + '</div></a></b></div>';
                } else {
                    desc = '<div class="desc"><a href="' + link + '" class="link"><B>' + messages[i].title + '</B><div class="descriptionNotification">' + messages[i].description + '</div></a></div>';
                }


                hoofdnode.append(img);
                hoofdnode.append(desc);
                $("#notifications").append(hoofdnode);
            }
            // Om het nummer op de badge synchroon te laten lopen met het nummer tussen de haken achter
            // "notificaties", wordt het nummer van de badge opnieuw ingesteld.
            KangoAPI.onReady(function () {
                kango.ui.browserButton.setBadgeValue(count);
            });
            /* Omdat de notificaties aan de client-kant worden ingeladen en niet aan de serverkant. Kan
             * de gebruiker dingen zien verspringen. In het kader van UX is er voor gekozen om de Notificaties
             * te tonen wanneer alles is ingeladen. (showNotifications staat in login.js)
             * */
            console.log("test3");
            showNotifications();
            //In showLogin(login.js) wordt er gekeken of het gelukt is met inloggen, wanneer de notificaties
            //niet opgehaald kunnen worden, betekent dit dat het inloggen niet is gelukt
        } else {
            //Laat het login scherm zien en verbergt de notificaties en het item toevoegen
            //, wanneer de notificaties niet opgehaald kunnen worden
            showLogin();
        }
    });
}