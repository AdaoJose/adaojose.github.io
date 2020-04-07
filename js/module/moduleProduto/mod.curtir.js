export default function curtirProduto(self){
    
        self  = $(self);
        // self.toggleClass("text-primary text-danger");
        var myHeaders = new Headers();
        myHeaders.append("AppKey", APP_KEY);
        myHeaders.append("AppId", APP_ID);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"user":JSON.parse(localStorage.getItem("usuario"))});

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        if(self.attr("data-favoritado")==0){
            fetch("https://localhost/saory-api/api/produto/favoritar/"+self.attr("data-id"), requestOptions)
            .then(response => response.text())
            .then(result => {self.attr("data-favoritado",1)})
            .catch(error => console.log('error', error));
        }else{
            fetch("https://localhost/saory-api/api/produto/desfavoritar/"+self.attr("data-id"), requestOptions)
            .then(response => response.text())
            .then(result => {self.attr("data-favoritado",0)})
            .catch(error => console.log('error', error));
        }
                                    

}