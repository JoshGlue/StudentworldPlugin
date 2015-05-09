/**
 * 
 */
KangoAPI.onReady(function() {
	// output current tab url to console
	kango.browser.tabs.getCurrent(function(tab) {
		// tab is KangoBrowserTab object
		$("#Categories_link").val(tab.getUrl());
		$("#Categories_name").val(tab.getTitle());
		$('#Categories_link').trigger('change');
	});
});

$(document).ready(function(){
	// ajax call to get title on change of link
	$('#Categories_link').change(function(event) {

		var request = $.ajax({
			url : 'http://student.world/categories/getTitle?url=' + $(this).val(),
			type : 'GET',
			dataType : 'json',
			cache : false,
			timeout : '2000',
			success : function(data) {
				if (data.title) {
					$('#Categories_name').val(data.title);
					$('input#Categories_name').click();
				}

				if (data.url) {
					$('#Categories_link').val(data.url);
				}

			}
		});
	});
	
	
	//create action
	$("#btn_create").click(function(event) {
	 
			// Post login form and replace frmLogin with response
            event.preventDefault();
            var $form = $("#create-form");
            var request = $.ajax({
                url: 'http://student.world/categories/profileCreate',
                type: 'POST',
                cache:false, 
                data : $form.serialize(),
                dataType: 'json',
                beforeSend: function() { 
                               	(this).innerHTML = '<i class="fa fa-spinner fa-spin fa-lgx"></i>';
                                 }, 
                success: function(data){

						if(data.errors){ 
							$('#error_form').show();
							$('#error_form').removeClass("alert-success");
															$('#error_form')
																	.addClass("alert-warning");
							
       						 $('#error_form').html(data.errors);
						//	 $("#error_form").fadeOut(5000);
							 $(this).innerHTML = 'Voeg hier toe';

							 //refresh iscroll
							 if($( "#backend-content" ).data( "IScroll" ) !== undefined){
									$( "#backend-content" ).data( "IScroll" ).refresh();
							 }
							 
						}else if(data.success){

							//postmessage
							window.top.postMessage('{"message":"' + data.message + '"}', '*');	
							$('#error_form').removeClass("alert-warning");
							$('#error_form').addClass("alert-success");
							$('#error_form').text('Toegevoegd!');

						}
                	}   
        	});
        
		
	});
	
	
	
})

