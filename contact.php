<?php

// Debug lines
ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);

require_once "vendor/autoload.php";

$mail = new PHPMailer\PHPMailer\PHPMailer();

//Enable SMTP debugging.
$mail->SMTPDebug = 3;
//Set PHPMailer to use SMTP.
$mail->isSMTP();
//Set SMTP host name
$mail->Host = "smtp.gmail.com";
//Set this to true if SMTP host requires authentication to send email
$mail->SMTPAuth = true;
//Provide username and password     
$mail->Username = "kitsubastudio@gmail.com";
$mail->Password = "cafedoble4";
//If SMTP requires TLS encryption then set it
$mail->SMTPSecure = "tls";
//Set TCP port to connect to
$mail->Port = 587;

var_dump($_POST["name"]);

$name->$_POST["name"][0];
$replyToEmail->$_POST["email"][0];
$message->$_POST["message"][0];

$mail->AddReplyTo($replyToEmail);
$mail->From = "kitsubastudio@gmail.com";
$mail->FromName = "Full Name";

$mail->addAddress("kitsubastudio@gmail.com", "Recepient Name");

$mail->isHTML(true);

$mail->Subject = "Message from Website (" . $name . ")";
$mail->Body = $message;
$mail->AltBody = $message;

if(!$mail->send())
{
    echo "Mailer Error: " . $mail->ErrorInfo;
} 
else 
{
    echo "Message has been sent successfully";
}