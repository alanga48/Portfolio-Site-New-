jQuery(document).ready(function($){

	$('#contact-form input').on('focus', function() {
		$('.success').addClass('hidden');
	});

	$('#idi_send').click(function(e) {
		e.preventDefault();
		$('.error').addClass('hidden');

		var valid = 1;

	    $('#contact-form input, #contact-form textarea').each(function() {
	        var $this = $(this);
	        if( !$this.val() || ( $this.hasClass('email') && validateEmail($this.val()) == 0 ) ) {
	        	$(this).prev('.error').removeClass('hidden');
	            valid = 0;
	        }
	    });

	    if(valid) {
	    	
		    $('#idi_send').val('SENDING...').attr('disabled', 'disabled');
		    var data = $('#contact-form').serializeArray().reduce(function(obj, item) {
			    obj[item.name] = item.value;
			    return obj;
			}, {});
	       $.ajax({
		        url: 'contact.php',
		        type:'POST',
		        data: data,
		        success: function(msg) {
		            $('#idi_send').next('.success').removeClass('hidden').val('SEND').removeAttr('disabled');
		            $('#idi_send').val('SEND').removeAttr('disabled');
		        },
		        error: function (xhr, ajaxOptions, thrownError) {
			       $('#idi_send').parent('.btnarea').next('.error').removeClass('hidden');
			     }          
		    });
		    $('#idi_send').val('SEND').removeAttr('disabled').next('.success').removeClass('hidden');
	    }
	});
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}