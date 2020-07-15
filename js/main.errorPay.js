import $janelas from "./module/moduleJanelas/mod.janelas.js";
import $jan from "./module/moduleJanelas/mod.janelas.js";
import config from "./config.js";

const $conf = config();

var $janelaPaySuccess = $jan();

$janelaPaySuccess.show();

$janelaPaySuccess.setTitle("Pagamento Rejeitado!");

var $divMsgFinal = 
$("<div/>",{
    class:"container text-center text-primary p-4 h4"
}).
append(
    "Seu pagamento não foi aprovado! <br>",
    $("<small/>",{
        class:"text-muted mt-2"
    }).append("Você poderá tentar novamente ou usar outros meios de pagamento!<br><br> O que deseja fazer agora?")
);

var $divBtn = 
$("<div/>",{
    class:"mt-4"
});

var $btnInicio = 
$("<button/>",{
    class:"btn btn-primary col-8 mt-2 col-md-4",
    click:()=>{
        window.location.href = "./pagamento.html";
    }
}).append("Tentar novamente");

var btnPedidos = 
$("<button/>",{
    class:"btn btn-secondary ml-md-2 mt-2 col-8 col-md-4",
    click:()=>{
        window.location.href = $conf.indexPage();
    }
}).append("Ir para o Inicio");

$divBtn.append($btnInicio, btnPedidos);

$divMsgFinal.append($divBtn);

$janelaPaySuccess.append($divMsgFinal);