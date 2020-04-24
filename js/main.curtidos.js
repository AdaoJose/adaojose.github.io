  
import carregarCurtidos from './module/muduleItensCurtidos/mod.carregarCurtidos.js';
import menu from './module/moduleMenu/mod.menu.js';
let html = '<div class="row bg-light carregando col-12"><div class="spinner-grow text-primary text-center m-auto centralizar" role="status" style="height: 150px; width: 150px;"><span class="sr-only">Loading...</span></div></div>';
tela.name = "curtido";
tela.titulo = "Os que gostei";
tela.construir();
tela.voltar = true;
tela.append(html);
tela.show();
tela.editeHead('<nav class=" z-index-5 position-fixed navbar navbar-principal navbar-lg-expand navbar-light col-12 border" style="height: 60px;"><i class="text-x-large fa fa-bars notificacao  text-light btn-nav"></i><i class="text-x-large fa fa-home notificacao  text-light inicio"></i><i class="text-x-large fa fa-search text-light notificacao ml-5 mr-n-5 pesquisar"></i><i class="text-x-large fa fa-bell btn-notificacao notificacao text-light"><span class="badge badge-primary text-xx-small notificacao-numero"></span></i><i class="text-x-large fa fa-shopping-cart text-light notificacao btn-show-shoppingcart mr-2" onclick="abrirCesta()"></i></nav>');
$(".fa-arrow-left").
click((e)=>{
  history.back()
});
$(".expo-lista-compra").
hide();
$(".btn-nav").click( ()=>{menu.abrir()});
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



    
