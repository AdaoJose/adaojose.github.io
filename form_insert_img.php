<DOCTYPE HTML>
<html>
    <head>
        <title>Form insert imagens</title>
    </head>
    <body>
        <form enctype="multipart/form-data" method="post" action="http://localhost/loja_fer/html/template/default/form_insert_img.php">
                
            <input type="hidden" name="MAX_FILE_SIZE" value="99999999"/>
                <div><input name="imagem" type="file"/></div>
                <div><input type="submit" value="Salvar"/></div>
        </form>
        
        <?php
        echo base64_encode(8);
if($_SERVER['REQUEST_METHOD']=='POST'){
$imagem = $_FILES['imagem']['tmp_name'];
$tamanho = $_FILES['imagem']['size'];
$tipo = $_FILES['imagem']['type'];
$nome = $_FILES['imagem']['name'];
  
if ( $imagem != "none" )
{
    $fp = fopen($imagem, "rb");
    $conteudo = fread($fp, $tamanho);
    $conteudo = addslashes($conteudo);
    fclose($fp);
  echo $conteudo;
$queryInsercao = "INSERT INTO l_produto.imagem_prod (`id_prod`, `imagem`, `tipo`, `tamanho`) VALUES ('1','$conteudo', '$tipo','$tamanho')";

try {
    $con  =  new PDO("mysql:host=localhost;dbName=l_produto","root","");
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $con->prepare($queryInsercao);
    $stmt->execute();
    //$stmt->fetchAll(PDO::FETCH_NAMED);
} catch (PDOException $err) {
                        echo $err->getFile()." ".$err->getMessage()." ".$err->getLine()." ".$err->getTraceAsString();
                        //return(false);//se der um erro ao conectar ao banco o retorno será false
                    }
  
 
 }
else
    print "Não foi possível carregar a imagem.";
}
?>
    </body>
</HTML>
