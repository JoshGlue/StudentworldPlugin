$(document).ready(function() {
    $('#login_form554be769ec78a').submit(function(event) {
    	//Zorgt ervoor dat een html-formulier niet wordt gesubmit op de normale manier.
        event.preventDefault();
        //Haalt de ingevulde data op.
        var data = $('#login_form554be769ec78a').serialize();
        //De service die wordt aangesproken om in te loggen.
        var post = $.post('https://student.world/user/login', data);
        post.done(function(data) {
        	//De notificaties worden ingesteld, wanneer dit niet kon, geeft getNotifications een boolean waarde terug.
            var success = getNotifications();
            /* Het #error_form-element wordt ook gebruikt om te laten zien dat een item is toegevoegd
             * of dat er iets mis is gegaan. De klassen alert-warning en alert-succes kunnen hier aan gekoppeld zijn
             * Er moet dus eerst voor gezorgd worden dat deze verwijderd zijn. Er wordt daarna gebruik gemaakt van
             * alert-danger en er wordt een bericht getoond. Voor bootstrap alerts, zie http://www.tutorialspoint.com/bootstrap/bootstrap_alerts.htm */
            if (!success) {
                $('#error_form').removeClass("alert-warning");
                $('#error_form').removeClass("alert-success");
                $('#error_form').addClass("alert-danger");
                $('#error_form').html('Oeps, er is iets fout gegaan met inloggen.');
                $('#error_form').show();
            }
        })
    })
})
//functie die ervoor zorgt dat nieuw item en notifications verdwijnt en login getoond wordt.
function showLogin() {
    $('.notifications').hide();
    $('.newItem').hide();
    $('.login').show(200);
}
//De contrafunctie van showLogin.
function showNotifications() {
    $('.login').hide();
    $('.notifications').show(200);
    $('.newItem').show(200);
}