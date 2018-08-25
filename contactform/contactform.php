<?php
if($_POST){
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
 	
 	$to = 'contact@pathmuslim.com';
 	$headers = array(
	    'From' => $email,
	    'Reply-To' => 'contact@pathmuslim.com',
	    'X-Mailer' => 'PHP/' . phpversion()
	);
	//send email
	mail($to, $subject." - (".$name.")", $message, $headers);
	echo true;
}
else {
	echo false;
}

?>