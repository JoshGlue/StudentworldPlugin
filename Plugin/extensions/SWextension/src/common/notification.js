/* Dit bestand is verantwoordelijk voor het laten zien van de notififcaties in het scherm van de plugin.
 * 
 *  */

$(document).ready(function() {
	//Als er een kango-commando wordt aangesproken, moet er dat binnen KangoAPI.Ready vallen.
    KangoAPI.onReady(function() {
    	//Zorgt voor de initialisatie dat de notificaties getoond worden in het scherm.
        getNotifications();
        /*Normale a href's werken niet in het plugin-scherm. Deze moeten daarom omgezet worden naar
        *Kango-commando's die ervoor zorgen dat er een nieuw tabblad wordt geopend. Omdat a href's
        *ook gebruikt worden voor andere doelen, moet er worden aangegeven welke links geopend moeten
        *worden in de browser. Hierbij wordt er een klasse aan de a-tag toegevoegd met respectievelijk 
        *linknotification of link. Link opent alleen een tabblad (wordt gebruikt om op het logo te kunnen klikken)
        *. linknotification zorgt ervoor dat ook de teller van nieuwe notificaties op 0 wordt gezet.
        *Beide functies staan hier beneden. */
        $('body').on('click', '.linknotification', function() {
        	//service van student world waarbij aan wordt gegeven dat de notificaties gelezen zijn.
            $.get("http://student.world/notifications/default/notified", function(data) {});
            kango.ui.browserButton.setBadgeValue(0);
            var urlhref = $(this).attr('href');
            kango.browser.tabs.create({
                url: urlhref
            });
            return false;
        });
        $('body').on('click', '.link', function() {
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
        $('body').on('click', '.sub', function() {
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
    $.getJSON('http://student.world/notifications/default/notifications', function(json) {
    	if(callback){
    		callback(json.status);
    	}
        if (json.status == 1) {
        	
            var count = json.result.count;
            //Het error_form kan nog zichtbaar zijn, bijvoorbeeld wanneer een persoon foutief heeft ingelogd
            //, maar nu wel goed heeft ingelogd.
            $('#error_form').hide();
            //Laat zien hoeveel nieuwe notifcaties er zijn achter "notificaties"
            $("#notificationHeader").append(" (" + count + ")");
            var messages = json.result.messages;
            //Alle notificaties worden ingesteld in de plugin
            for (var i = 0; i < messages.length; i++) {
                var image = 'http://student.world/images/start/logo_root_node.svg';
                var link = 'http://student.world';
                if (messages[i].user_img != null) {
                    image = messages[i].user_img;
                }
                if (messages[i].deeplink_id != null) {
                    link += "?ref=" + messages[i].deeplink_id;
                }
                var hoofdnode = $('<div class="notification"></div>').text("");
                var img = '<div class="imagenotification"><img src="' + image + '" class="img-circle imagenotification" /></div>';
                var desc = '';
                if (messages[i].read != true) {
                    desc = '<div class="desc"><b><a href="' + link + '" class="linknotification">' + messages[i].description + '</a></b></div>';
                } else {
                    desc = '<div class="desc"><a href="' + link + '" class="link">' + messages[i].description + '</a></div>';
                }
                
             
                hoofdnode.append(img);
                hoofdnode.append(desc);
                $("#notifications").append(hoofdnode);
            }
            // Om het nummer op de badge synchroon te laten lopen met het nummer tussen de haken achter
            // "notificaties", wordt het nummer van de badge opnieuw ingesteld.
            KangoAPI.onReady(function() {
                kango.ui.browserButton.setBadgeValue(count);
            });
            /* Omdat de notificaties aan de client-kant worden ingeladen en niet aan de serverkant. Kan
             * de gebruiker dingen zien verspringen. In het kader van UX is er voor gekozen om de Notificaties
             * te tonen wanneer alles is ingeladen. (showNotifications staat in login.js)
             * */
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