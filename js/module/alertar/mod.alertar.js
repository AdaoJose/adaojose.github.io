export default function alertar(msg = ""){
    console.
    log("[alertar] start ...");

    let timer = 
        msg.toString().
        split(' ').
        length
    ;//tempo para o fim da animação

    timer=(timer*605);//tempo aproximado que levamos para ler uma palavra
    timer=
        (timer<2000)?2000:timer
    ;
   
    let id = "alert"+(parseInt(Math.random()*100).toString());
    $("body").
    append(
            $("<div/>",{
                "id":id,
                "class":"position-fixed alert alert-primary col-12 alertar text-center",
                "style":"top:0px; z-index:2000"
            }).
                        append(msg)
    );

    setTimeout(function(){
        $(".alertar").
        animate(
            {"opacity":0},
            500,
            "linear",
            function(){
                $("#"+id).remove();
            }
        );
    },
    timer)
    ;
    
    console.log("[alertar] finish ...");
}