export default function modal(objModal = {titule:"", body:""}, target = $("body")){
    console.log("[modal] inicializando");
    
    //verificar se os metodos nessesarios existem e cria-os se nescessario
    objModal.hasOwnProperty('id')?"":objModal.id="modal";
    objModal.hasOwnProperty('title')?"":objModal.title = "Modal";
    objModal.hasOwnProperty('body')?"":objModal.body = "Modal Body";
    objModal.hasOwnProperty('functionBtnSuccess')?"":objModal.functionBtnSuccess = {};
    var $modal = 
    $("<div/>",{
        class:"modal fade show",
        id: objModal.id,
        tabindex:"-1",
        role:"dialog", 
        "aria-labelledby":"modal-title",
        "aria-hidden":"true"
    });

    var $modalDialog =
    $("<div/>",{
        class:"modal-dialog",
        role:"document"
    });
    
    var $modalContent = 
    $("<div/>",{
        class:"modal-content"
    });
    
    var $modalHeader = 
    $("<div/>",{
        class:"modal-header"
    });
    
    var $h5 = 
    $("<h5/>",{
        class:"modal-title"
    });
    
    var $btnHeaderFechaModal = 
    $("<button/>",{
        type:"button",
        class:"close",
        "data-dismiss":"modal", 
        "aria-label":"Fechar"
    });

    var $spanContentBtnFechar =
    $("<span/>", {
        "aria-hidden":"true"
    }).append("&times;");

    var $modalBody = 
    $("<div/>",{
        class:"modal-body"
    });
    
    var $modalFooter = 
    $("<div/>", {
        class:"modal-footer"
    });
    
    var $btnFooterFechar = 
    $("<div/>",{
        type:"button", 
        class:"btn btn-secondary", 
        "data-dismiss":"modal"
    });
    
    var $btnFoterSalvar = 
    $("<button/>",{
        type:"button", 
        class:"btn btn-primary"
    });
    
    $.each(
        objModal.
        functionBtnSuccess, 
        
        function(index,data ){
            
            $btnFoterSalvar[index](data)
        }
    )
    //construindo o modal

    $modal.
    append(
        $modalDialog.
        append(
            $modalContent.
            append(
                $modalHeader.
                append(
                    $h5.
                    append(objModal.title ),
                    
                    $btnHeaderFechaModal.
                    append($spanContentBtnFechar)
                ),
                $modalBody.
                append(
                    objModal.body
                ),
                $modalFooter.
                append($btnFooterFechar.append("Cancelar"),$btnFoterSalvar.append("Salvar"))
            )
        )
    );
    /**
     * exibe modal
     */
    function show(){
        console.log("[modal.show] inicializando");
        $("#"+objModal.id).modal('show')
        console.log("[modal.show] finalizado");
    }
    /**
     * fecha o modal
     */
    function hide(){
        console.log("[modal.hide] inicializando");
        $("#"+objModal.id).modal('hide');
        console.log("[modal.hide] finalizado");
    }
    /**
     * Permite a passagem de parametros adicionais conforme explicado no site so bootarap
     *  
     * 
     * @param objOptions parametros modal bootstrap
     * Ex. {
     *     keyboard: true //Fecha o modal, quando a tecla esc é pressionada.
     *     show:true //Mostra o modal, quando inicializado.
     *   });
     * mais comandos e exemplos podem ser consultado na pagina do bootstrap
     */
    function option(objOptions){
        console.log("[modal.options] inicializando");
        $("#"+objModal.id).modal(objOptions);
        console.log("[modal.options] finalizado");
    } 

    target.append($modal);
    console.log("[modal] finalizado");
    return {
        show,
        hide,
        option
    }
}