KangoAPI.onReady(function() {
    kango.browser.tabs.getCurrent(function(tab) {
    	//De url en titel worden opgehaald van de actieve tab en in de juiste velden geplaatst.
        $("#Categories_link").val(tab.getUrl());
        $("#Categories_name").val(tab.getTitle());
        //Er wordt gesimuleerd dat dit veld veranderd zodat Categories_link.change geactiveerd wordt.
        $('#Categories_link').trigger('change');
    });
});
$(document).ready(function() {

    $('[rel="tooltip"]').tooltip();   
	
	$(function(){
		$('#recommendationcounter').textCounter({
			target: '#Categories_recommendation', // required: string
			count: 100, // optional: integer [defaults 140]
			alertAt: 20, // optional: integer [defaults 20]
			warnAt: 10, // optional: integer [defaults 0]
			stopAtLimit: false // optional: defaults to false
		});
	});
	
		$(function(){
		$('#namecounter').textCounter({
			target: '#Categories_name', // required: string
			count: 40, // optional: integer [defaults 140]
			alertAt: 20, // optional: integer [defaults 20]
			warnAt: 10, // optional: integer [defaults 0]
			stopAtLimit: false // optional: defaults to false
		});
	});

	//Wanneer het veld verandert, dan worden de titel en link ingevuld die door de student.world-service
	//getTitle wordt meegegeven.
    $('#Categories_link').change(function(event) {
        var request = $.ajax({
            url: 'http://student.world/categories/getTitle?url=' + $(this).val(),
            type: 'GET',
            dataType: 'json',
            cache: false,
            timeout: '2000',
            success: function(data) {
                if (data.title) {
                    $('#Categories_name').val(data.title);
                    $('input#Categories_name').click();
$('input#Categories_name').keyup();					
                }
                if (data.url) {
                    $('#Categories_link').val(data.url);
					$('#Categories_link').click();
                }
            }
        });
    });
    //Het item wordt toegevoegd op student.world. Er wordt feedback teruggegeven of het is toegevoegd.
    //Als het is toegevoegd, dan wordt ook direct de locatie meegegeven waar het staat op student.world.
    $("#btn_create").click(function(event) {
        event.preventDefault();
        var $form = $("#create-form");
        var request = $.ajax({
            url: 'http://student.world/categories/profileCreate',
            type: 'POST',
            cache: false,
            data: $form.serialize(),
            dataType: 'json',
            success: function(data) {
                if (data.errors) { 
                	 $('#error_form').removeClass("alert-danger");
                    $('#error_form').removeClass("alert-success");
                    $('#error_form').addClass("alert-warning");
                    $('#error_form').html(data.errors);
                    $('#error_form').show();
                } else if (data.success) {
                	 $('#error_form').removeClass("alert-danger");
                    $('#error_form').removeClass("alert-warning");
                    $('#error_form').addClass("alert-success");
                    var link = "http://student.world/?ref=" + data.node_id;
                    $('#error_form').html('Toegevoegd!. Bekijk het <a class="link alert-link" href="' + link + '">hier</a> op Student.world');
                    $('#error_form').show();
                }
            }
        });
    });
})