<?php 

require ('../../phpmailer/PHPMailerAutoload.php');
require_once ('../../phpmailer/class.phpmailer.php');
include ('../../phpmailer/class.smtp.php');

$mail = new PHPMailer();

$name = trim(strip_tags($_POST['name']));
$companyName = trim(strip_tags($_POST['company-name']));
$phone = $_POST['phone'];
$email = $_POST['email'];
$comments = nl2br(trim(strip_tags($_POST['comments'])));
$referer = $_SERVER['HTTP_REFERER'];

$mail->isSMTP();

$mail->Host = 'smtp.timeweb.ru';
//$mail->SMTPDebug  = 2;
$mail->SMTPAuth = true;   
$mail->Username = 'request@mirrorcx.com';  // Свой логин для почты
$mail->Password = 'gprVfgex'; // Пароль от почтового ящика
$mail->SMTPSecure = 'ssl';
$mail->Port = '465';

$mail->CharSet = 'UTF-8';
$mail->From = 'request@mirrorcx.com';
$mail->FromName = 'Request-Robot';
$mail->addAddress('info@mirrorcx.com');
$mail->isHTML(true);

$mail->Subject = 'Запрос с сайта';
$mail->Body = "<p>Пользователь - <b>$name</b>, прислал сообщение:<br>
               <b>$comments</b></p>
               <p>Вот его телефон - <b>$phone</b>.</p>
               <p>Название его компании - <b>$companyName</b>.</p>
               <p>Его почта - <b>$email</b>.</p>";



if( $name && $companyName && $phone && $email && $comments ) {
   if( $mail->send() ) {
    header ("location: $referer");
  } else {
    echo 'Письмо не может быть отправлено. ';
    echo 'Ошибка: ' . $mail->ErrorInfo;
  }
} else {
  echo 'Заполните пожалуйста все поля. / Please, fill all the fields.';
}



?>