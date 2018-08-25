<?php
if($_POST){
	header('Content-Type: text/html; charset=utf-8');
    //Connection à la base de données
		try
    {
          $bdd = new PDO('mysql:host=db751094705.db.1and1.com;port=3306;dbname=db751094705;charset=utf8', 'dbo751094705', 'Pathmuslim4db+');
          //$bdd = new PDO('mysql:host=localhost;dbname=pathmuslim_db;charset=utf8', 'root', '');
    }
    catch (Exception $e)
    {
        die('Erreur : ' . $e->getMessage());
    }
    $email = $_POST['email'];
    date_default_timezone_set('Europe/Paris');
 	$date = date("Y-m-d H:i:s");

	try
    {
        $statement = $bdd->prepare("select * from p01_newsletter WHERE P01_email ='$email'");
        $statement->execute();
        $results=$statement->fetchAll(PDO::FETCH_ASSOC);
        if($results==null){
              $statement = $bdd->prepare("INSERT INTO p01_newsletter(P01_email, P01_date) VALUES ('$email','$date')");
              $statement->execute();
              echo true;
        }
        else {
              echo false;
        }
	}
    catch (Exception $e)
    {
        die('Erreur : ' . $e->getMessage());
    }
}
else {
    echo "erreur";
}

?>