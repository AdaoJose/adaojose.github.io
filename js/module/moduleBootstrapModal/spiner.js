/**
 * Retorna um objeto html de carregamento padrão que é o spiner que vem do bootstrap 
 * @dependece bootstrap
 * @returns Html_Object loader
 */
function $spiner(){
    return $("<div/>",{
        "class":"loaderHtml spinner-border text-primary",
        "role":"status"
    })
    .append($("<span/>",{
            "class":"sr-only"
        })
        .append("Loading..."))
}

export default $spiner;