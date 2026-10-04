<?php
/**
 * @created 2025
 * @author Bennviddesign (https://bennviddesign.se/en)
 * @license MIT
 * @website https://ramsan.se
 * @github-repo https://github.com/Bennviddesign/ramsan
 * @github-profile https://github.com/Bennviddesign
 */

// Check if the form was submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $amne = $_POST['amne'] ?? '';
    $message = $_POST['message'] ?? '';

    // 1. Mottagare: Din privata Gmail-adress direkt!
    $to = 'bennviddesign@gmail.com'; 

    // 2. Tydligt ämne så du ser att det är ett tips från ramsan.se
    $subject = "[Tips från Ramsan.se] $amne (från $name)";

    // 3. E-postrubriker (Headers)
    $boundary = md5(uniqid(time()));
    
    // Avsändaren MÅSTE vara en domänadress på webbhotellet (t.ex. tipsa@ramsan.se eller s125536@ramsan.se)
    // annars markerar e-postservrar meddelandet som SPAM/fusk!
    $headers = "From: Ramsan.se <tipsa@ramsan.se>\r\n";
    
    // Reply-To gör att när du klickar "Svara" i Gmail så svarar du direkt till besökarens e-post!
    if (!empty($email)) {
        $headers .= "Reply-To: $email\r\n";
    }

    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

    // Email body
    $body = "--$boundary\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $body .= "Du har fått ett nytt meddelande från ramsan.se!\n\n";
    $body .= "Namn: $name\n";
    $body .= "E-post: $email\n";
    $body .= "Ämne: $amne\n\n";
    $body .= "Meddelande:\n$message\r\n";

    // Handle file upload
    if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['file']['tmp_name'];
        $fileName = $_FILES['file']['name'];
        $fileType = $_FILES['file']['type'];

        // Read file content
        $fileContent = file_get_contents($fileTmpPath);
        $fileContent = chunk_split(base64_encode($fileContent));

        // Add file to email
        $body .= "--$boundary\r\n";
        $body .= "Content-Type: $fileType; name=\"$fileName\"\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n";
        $body .= "Content-Disposition: attachment; filename=\"$fileName\"\r\n\r\n";
        $body .= "$fileContent\r\n";
    }

    $body .= "--$boundary--";

    // Send email using PHP mail()
    $mailSent = mail($to, $subject, $body, $headers);

    // Provide feedback
    if ($mailSent) {
        header('Location: /contact?success=1'); // Redirect to show success
        exit;
    } else {
        header('Location: /contact?error=1'); // Redirect to show error
        exit;
    }
}
?>