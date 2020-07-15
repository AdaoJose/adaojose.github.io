# jan
uma biblioteca javascript para gerenciar janelas/container html
onde cada janela represente uma parte de sua aplicação
exemplo. Numa aplicação poderemos ter varias areas de usuarios como home, contacts e about
poderiamos representar isto da seguinte forma

<code>
<pre>
  import $jan from "/caminho/jan.js" //caminho é o caminho até o arquivo 
  var $home = $jan();
  var $contacts = $jan();
  var $about = $jan();
</pre>
</code>

digamos que seja nescessario iniciar a home primeiro

<pre>
  <code>
      import $jan from "/caminho/jan.js" //caminho é o caminho até o arquivo 
      var $home = $jan();
      var $contacts = $jan();
      var $about = $jan();
      
      $home.show();
      $home.append("Ola mundo")//inserindo conteudo em $home
  </code>
</pre>

Abrir contato apos o botão de contatos ser clicado
<pre>
  <code>
      import $jan from "/caminho/jan.js" //caminho é o caminho até o arquivo 
      var $home = $jan();
      var $contacts = $jan();
      var $about = $jan();
      
      $home.show();
      $home.append("Ola mundo")//inserindo conteudo em $home
      
      $(".btnContact").click($contacts.show());
  </code>
</pre>
se precisar fechar uma janela aberta apos outra ser aberta
<pre>
  <code>
      import $jan from "/caminho/jan.js" //caminho é o caminho até o arquivo 
      var $home = $jan();
      var $contacts = $jan();
      var $about = $jan();
      
      $home.show();
      $home.append("Ola mundo")//inserindo conteudo em $home
      
      $(".btnContact").click(function(){
          $contacts.show();
          $home.hide();
      });
  </code>
</pre>

<h2>Usando</h2>
incluir em seu projeto é so baixa-lo e incluir em seu projeto como um modulo js
exemplo 
<code>
<pre>
    <script> 
      importt $jan from "/js/janelas.js";
      var home_janela = $window();
      home_janela.name = "home_janela";
      home_janela.show();
    </script>
</pre>
</code>

asim estará criando uma janela para sua aprlicação chamada home_janela que é uma variavel 
que contem todos os parametros necessarios para fazer as modificações nescessarias
