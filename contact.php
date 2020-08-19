<?php

// Debug lines
// ini_set('display_startup_errors', 1);
// ini_set('display_errors', 1);
// error_reporting(-1);

require_once "vendor/autoload.php";

$mail = new PHPMailer\PHPMailer\PHPMailer();

$name = $_POST["name"];
$replyToEmail = $_POST["email"];
$message = $_POST["message"];
$captcha_response = $_POST["captcha"];

//Enable SMTP debugging.
// $mail->SMTPDebug = 3;
//Set PHPMailer to use SMTP.
$mail->isSMTP();
//Set SMTP host name
$mail->Host = "smtp.gmail.com";
//Set this to true if SMTP host requires authentication to send email
$mail->SMTPAuth = true;
//Provide username and password     
$mail->Username = "***";
$mail->Password = "***";
//If SMTP requires TLS encryption then set it
$mail->SMTPSecure = "tls";
//Set TCP port to connect to
$mail->Port = 587;

$mail->addReplyTo($replyToEmail);
$mail->From = "***";
$mail->Sender = "***";
$mail->FromName = "Kitsuba Games";

$mail->addAddress("***", "Kitsuba Games");

$mail->isHTML(true);

$mail->Subject = "Message from Website (" . $name . ")";
$mail->Body = $message;
$mail->AltBody = $message;

// Verify Captcha
$url = 'https://www.google.com/recaptcha/api/siteverify';
$data = array('secret' => '***', 'response' => $captcha_response);

// use key 'http' even if you send the request to https://...
$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data)
    )
);
$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);
if ($result === FALSE) { 
    echo '{"error": "1002", "description": "captcha_service_down"}';
    http_response_code(400);
    exit();
 }
$is_captcha_successful = json_decode($result)->success;

if ($is_captcha_successful) {
    if($mail->send()) {
        http_response_code(200);
    } else {
        http_response_code(400);    
    }
} else {
    echo '{"error": "1001", "description": "invalid_captcha"}';
    http_response_code(400);
}
