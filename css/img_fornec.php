<?php
Header( "Content-type: image/gif");
$id_imagem = $_GET["img"]??false;
$queryInsercao = "SELECT * FROM l_produto.imagem_prod where id={$id_imagem}";
try {
    $con  =  new PDO("mysql:host=localhost;dbName=l_produto","root","");
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $con->prepare($queryInsercao);
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_NAMED);
    echo $res[0]["imagem"];
    
    print_r($res);
} catch (PDOException $err) {
                        echo $err->getFile()." ".$err->getMessage()." ".$err->getLine()." ".$err->getTraceAsString();
                        //return(false);//se der um erro ao conectar ao banco o retorno será false
                    }
  
 
 