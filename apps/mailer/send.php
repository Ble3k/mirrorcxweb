<?php 

require ('../../phpmailer/PHPMailerAutoload.php');
require_once ('../../phpmailer/class.phpmailer.php');
include ('../../phpmailer/class.smtp.php');


function getCurlData($url) {
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_TIMEOUT, 10);
    curl_setopt($curl, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.2.16) Gecko/20110319 Firefox/3.6.16");
    $curlData = curl_exec($curl);
    curl_close($curl);
    return $curlData;
}

if($_SERVER["REQUEST_METHOD"] == "POST") {
    $recaptcha=$_POST['gCaptchaResponse'];
    $name = trim(strip_tags($_POST['name']));
	$companyName = trim(strip_tags($_POST['company']));
	$phone = $_POST['phone'];
	$email = $_POST['email'];
	$comments = nl2br(trim(strip_tags($_POST['comments'])));
	$contact = $_POST['contact'];
	$referer = $_SERVER['HTTP_REFERER'];
    if(!empty($recaptcha)) {
        include("getCurlData.php");
        $google_url="https://www.google.com/recaptcha/api/siteverify";
        $secret='6Lf81w4UAAAAAMX7ou-g3RKySUkMBuw-aAzfP6zG';
        $ip=$_SERVER['REMOTE_ADDR'];
        $url=$google_url."?secret=".$secret."&response=".$recaptcha."&remoteip=".$ip;
        $res=getCurlData($url);
        $res= json_decode($res, true);
        //reCaptcha введена
        if($res['success']) {
        	$mail = new PHPMailer();
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
			$mail->addAddress('Info@mirrorcx.com');
			$mail->isHTML(true);
			$mail->Subject = 'Запрос с сайта';

			if ($contact) {
			  $bodyMsg = "<p>Пользователь - <b>$name</b>, прислал сообщение:<br>
			               <b>$comments</b></p>
			               <p>Он оставил контакт - <b>$contact</b>.</p>
			               <p>Название его компании - <b>$companyName</b>.</p>";
			} else {
			  $bodyMsg = "<p>Пользователь - <b>$name</b>, прислал сообщение:<br>
			               <b>$comments</b></p>
			               <p>Вот его телефон - <b>$phone</b>.</p>
			               <p>Название его компании - <b>$companyName</b>.</p>
			               <p>Его почта - <b>$email</b>.</p>";
			}
			$mail->Body = $bodyMsg;
			$mail->send();
        } else {
            echo 'error';
        }
    } else {
        echo 'error';
    }
}

?>