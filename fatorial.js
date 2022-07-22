function fatorial(num){
    if(num<=1){
        return 1;
    }
    var i = 1;
    var resultado = 1;
    while (i<=num){
        resultado = resultado * i;
        i++;
    }
    return resultado;
    
}

