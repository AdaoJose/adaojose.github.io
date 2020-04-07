<?php
//como faço!
class primaria{
    static function ola(){return "ola";} 
}

class secundaria{
    function acessarPrimaria(){
        echo call_user_func("primaria::ola");
    }
}
$secundaria = new secundaria;
$secundaria->acessarPrimaria();//Saida->Ola
echo ucfirst(strtolower("OlaMundo"));