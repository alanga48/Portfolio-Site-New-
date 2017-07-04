<?php

	if(!empty($_POST)) {

	    $name = htmlspecialchars($_POST['idi_name']);
		$email = htmlspecialchars($_POST['idi_mail']);
		$message_text = htmlspecialchars($_POST['idi_text']);
	    
	    $min_len = 2;
	    $max_len = 255;
	    $min_email = 3;
	    $error = false;

	    if(!$error && (strlen($name) < $min_len) || (strlen($name) > $max_len) ) $error = true;
	    if(!$error &&  (strlen($email) < $min_email) || !filter_var($email, FILTER_VALIDATE_EMAIL) ) $error = true;
	    if(!$error &&  (strlen($message_text) < $min_len ) ) $error = true;

	    if(!$error) {
	    	$mailTo = 'hello@amylanga.com';
			$subject = 'Message from Hello';
			$message =  'From: '.$name.'; Email: '.$email.' ; Message: '.$message_text;
			$headers .= 'From:' . $mailFrom . '\r\n';
			mail($mailTo, $subject, $message, $headers);
	    }
	   
		echo json_encode($error);
	}

?>