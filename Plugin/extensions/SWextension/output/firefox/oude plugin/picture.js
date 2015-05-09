
    //hide errors on init
    $('#error_form').hide();


    //tooltips 
	//$("[rel=hover]").tooltip({ placement: 'bottom', trigger: 'click | hover', 'container':'body', delay: 1200, template: '<div class="tooltip" role="tooltip"><div class="tooltip-inner"></div></div>'});	
	//$("[rel=tooltip]").tooltip({'show':true, placement: 'left', trigger: 'click | hover', 'container':'body'});	
 
    $( '#share_on_profile' ).hammer().on( 'tap', '#radioBtn a', function(ev){
    	var sel = $(this).data('title');
	    var tog = $(this).data('toggle'); 
	    $('#'+tog).prop('value', sel);	    
	    $('a[data-toggle="'+tog+'"]').not('[data-title="'+sel+'"]').removeClass('active').addClass('notActive');
	    $('a[data-toggle="'+tog+'"][data-title="'+sel+'"]').removeClass('notActive').addClass('active');
    });
    
	$("#radio, #normal, #num").prop("disabled", true);
    //js for radio buttons -> hammer as click does't work
   // $('#radioBtn a').on('click', function(){	    
	//});

    //ajax call to get title on change of link    
    $('#Categories_link').change(function(event) {
    	
		if($('#Categories_name').val() == ""){
			$('#name_tool').attr('class','fa fa-spinner fa-spin');
		}
		var imgThumbnail = $('.img-thumbnail');
		parent = imgThumbnail.parent();
		parent.html('<div style="width: 156px; height: 156px; padding-top: 56px;" class="img-thumbnail"><i class="fa fa-spinner fa-spin" style="font-size: 40px;"></i></div>');
        
    	  var request = $.ajax({
              url: 'http://student.world/categories/getTitle?url=' + $(this).val(),
              type: 'GET',
              dataType: 'json', 
              cache:false,
              timeout:'2000',
              success: function(data){ 


					
					if(data.title &&  $('#Categories_name').val() == ""){
		                $('#Categories_name').val(data.title);
		          	     $('input#Categories_name').click();	 	 		          	     		
		            }						          	     	
						
		            if(data.url){
		         	      $('#Categories_link').val(data.url);
                     }    

		            var screenshot = $('#is_screenshot');
		            var image = new Image();
					image.onload = function () {
					   var imgThumbnail = $('.img-thumbnail');
						parent = imgThumbnail.parent();
						parent.html('<img width="156" height="156px" class="img-thumbnail" src="' + data.screenshot + '" />');
					}
					image.src = data.screenshot;

	                
	    		},
				    error: function(xhr, textStatus, errorThrown){
$('body').html('<h3 class="text-center text-uppercase" style="font-weight: bold;">U bent niet ingelogd of er is iets misgegaan. <BR /> <a href="https://student.world/site/start#login_form">Klik hier</a> om in te loggen</h3>');
    }
       });
    });


    //manage character counters
    var text_max_title = 40;
	var text_max = 100;

    $('input#Categories_name').keyup(function() {
        var text_length = $(this).val().length;
        var text_remaining = text_max_title  - text_length;
    	$('#input_title').html(text_remaining + '/' + text_max_title);
	});
	$('textarea#Categories_recommendation').keyup(function() {
        var text_length = $(this).val().length;
        var text_remaining = text_max  - text_length;
        if(text_remaining < 0){
        	document.getElementById("textarea_recommendation").style.color = 'red';
        }else{
        	document.getElementById("textarea_recommendation").style.color = '#959595';
        }
    	$('#textarea_recommendation').html(text_remaining + '/' + text_max);
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
							$('body').html('<h3 class="text-center text-uppercase" style="font-weight: bold;">Toegevoegd!</h3>');

						}
                	}   
        	});
        
		
	});