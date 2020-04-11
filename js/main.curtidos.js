  
import carregarCurtidos from './module/muduleItensCurtidos/mod.carregarCurtidos.js';
let html = '<div class="row bg-light carregando col-12"><div class="spinner-grow text-primary text-center m-auto centralizar" role="status" style="height: 150px; width: 150px;"><span class="sr-only">Loading...</span></div></div>';
tela.name = "curtido";
tela.titulo = "Os que gostei";
tela.construir();
tela.voltar = true;
tela.append(html);
tela.show();
$(".fa-arrow-left").click((e)=>{history.back()});
var myHeaders = new Headers();
myHeaders.append("AppKey", APP_KEY);
myHeaders.append("AppId", APP_ID);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({ user:JSON.parse(localStorage.getItem("usuario"))});

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  //body: raw,
  redirect: 'follow'
};
let urlAlvo = URL_SERVER_BASE+"api/view/purchaseditems";
fetch("https://localhost/saory-api/teste", requestOptions)
.then(response => response.json())
.then(result => carregarCurtidos(result))
.catch(error => console.log('error', error));



    
