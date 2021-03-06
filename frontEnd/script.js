function buscarDados() {

    email = document.getElementById("email").value;
    document.getElementById("erro").innerHTML = "";

    const validar = (
        validarPreenchimento("email",email) &&
        validarEmail(email)
    )
    if (!validar) return false

    var c = document.getElementById("divInput").childNodes;
    c.forEach(child => {
        if(child.className === "campo-txt")
            child.disabled = false;
    })

    try {

        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then((json) => {
            
            const usuarioApi = json.find(user => user.email.toLowerCase() === email.toLowerCase());
            if (usuarioApi) {

                
                document.getElementById("nome").value = usuarioApi.name
                document.getElementById("usuario").value = usuarioApi.username
                document.getElementById("logradouro").value = usuarioApi.address.street
                document.getElementById("complemento").value = usuarioApi.address.suite
                document.getElementById("cidade").value = usuarioApi.address.city   
                document.getElementById("cep").value = usuarioApi.address.zipcode
                document.getElementById("lat").value = usuarioApi.address.geo.lat
                document.getElementById("lng").value = usuarioApi.address.geo.lng
                document.getElementById("telefone").value = usuarioApi.phone
                document.getElementById("website").value = usuarioApi.website
                document.getElementById("nomeEmpresa").value = usuarioApi.company.name
                document.getElementById("frase").value = usuarioApi.company.catchPhrase
                document.getElementById("ramo").value = usuarioApi.company.bs
                
            }
            //document.getElementById("p").innerHTML = JSON.stringify(usuarioApi);
            
        })
          
    } catch (e) {
        console.log(e);
    }
  
    return false
  
  }

  function salvar() {

    document.getElementById("erro").innerHTML = "";

    const email = document.getElementById("email").value
    const nome = document.getElementById("nome").value
    const usuario = document.getElementById("usuario").value

    const validar = (
        validarPreenchimento("nome",nome) &&
        validarPreenchimento("usuario",usuario)
    )

    if(!validar) return false;

    const user = {
        email: document.getElementById("email").value,
        nome: document.getElementById("nome").value,
        usuario: document.getElementById("usuario").value,
        endereco: {
            logradouro: document.getElementById("logradouro").value || " ",
            complemento: document.getElementById("complemento").value || " ",
            cidade: document.getElementById("cidade").value || " ",
            cep: document.getElementById("cep").value || " ",
            geo: {
              lat: document.getElementById("lat").value || " ",
              lng: document.getElementById("lng").value || " "
            }
          },
          telefone: document.getElementById("telefone").value || " ",
          website: document.getElementById("website").value || " ",
          empresa: {
            nome: document.getElementById("nomeEmpresa").value || " ",
            frase: document.getElementById("frase").value || " ",
            ramo: document.getElementById("ramo").value || " "
          }
    }

    //alert(JSON.stringify(user))

    let fetchData = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(user)
      }
    
      fetch("http://localhost:9000/api/usuarios/novo",fetchData)
        .then(response => response.json())
        .then(function(res){
            alert("Usu??rio criado com sucesso.");
            location.reload();
        })
        .catch(function(error) {
            alert("Erro"+error);
        })  
  }

  function decrementaPag() {
    pag = parseInt(document.getElementById("pageNum").value)
    pag--;
    document.getElementById("pageNum").value = pag.toString()
    paginar();
  }

  function incrementaPag() {
    pag = parseInt(document.getElementById("pageNum").value)
    pag++;
    document.getElementById("pageNum").value = pag.toString()
    paginar();
  }

  function limparLi() {
    var ul = document.getElementById("lista");
    var c = Array.prototype.slice.call(ul.getElementsByClassName("user"));
    c.forEach(child => {
            console.log(child.className)
            ul.removeChild(child);
    })
  }

  async function paginar() {
    
    var pag = parseInt(document.getElementById("pageNum").value)
    if(pag > 1) limparLi();

    const lista = await carregarListaNovo().then((l) => {
        try {
            return l;
        } catch(e) {
            console.log(e)
        }
    })
    
    var exibirProximo = (lista.length > 4*pag)
    var exibirAnterior = (pag > 1);

    console.log(pag)

    exibir = lista.slice(4*(pag-1),4*pag);
    console.log("Prox"+exibirProximo)
    console.log("Anterior"+exibirAnterior)

    console.log(exibir)

    exibir.forEach((user) => {
        var divNova = document.createElement("li");
        divNova.className = "user";
        divNova.setAttribute('id', user._id);
        
        var conteudoNome = document.createElement("P");
        var labelNome = "<label>Nome: </label>"
        conteudoNome.innerHTML = labelNome+user.nome
        conteudoNome.setAttribute('class', "porNome");
        divNova.appendChild(conteudoNome); 


        var conteudoEmail = document.createElement("P");
        var labelEmail = "<label>E-mail: </label>"
        conteudoEmail.innerHTML = labelEmail+user.email
        conteudoEmail.setAttribute('class', "porEmail");
        divNova.appendChild(conteudoEmail);
        
        var conteudoUsuario = document.createElement("P");
        var labelUsuario = "<label>Usu??rio: </label>"
        conteudoUsuario.innerHTML = labelUsuario+user.usuario
        divNova.appendChild(conteudoUsuario);

        var conteudoEndereco = document.createElement("P");
        var labelEndereco = "<label>Endere??o: </label>"
        conteudoEndereco.innerHTML = labelEndereco+user.endereco.logradouro
            +", "+user.endereco.complemento
            +" - "+user.endereco.cidade
            +", "+user.endereco.cep
        divNova.appendChild(conteudoEndereco);

        var conteudoTelefone = document.createElement("P");
        var labelTelefone = "<label>Telefone: </label>"
        conteudoTelefone.innerHTML = labelTelefone+user.telefone
        divNova.appendChild(conteudoTelefone);

        var conteudoSite = document.createElement("P");
        var labelSite = "<label>Site: </label>"
        conteudoSite.innerHTML = labelSite+user.website
        divNova.appendChild(conteudoSite);

        var conteudoEmpresa = document.createElement("P");
        var labelEmpresa = "<label>Empresa: </label>"
        conteudoEmpresa.innerHTML = labelEmpresa+user.empresa.nome
        divNova.appendChild(conteudoEmpresa);

        var btnNovo = document.createElement("BUTTON");
        btnNovo.innerHTML = "Apagar"
        btnNovo.setAttribute('id', user._id);
        btnNovo.setAttribute('type', "submit");
        btnNovo.setAttribute('class', "btn");
        btnNovo.setAttribute('onclick', "apagar(this.id)");
        divNova.appendChild(btnNovo); 

        var divAtual = document.getElementById("div0");
        divAtual.parentNode.insertBefore(divNova, divAtual);   
    })

    if(exibirProximo) document.getElementById("proximo").style.display = "inline-block";
    else document.getElementById("proximo").style.display = "none";
    if(exibirAnterior) document.getElementById("anterior").style.display = "inline-block";
    else document.getElementById("anterior").style.display = "none";

  }

  function carregarListaNovo() {
    try {

        return new Promise((resolve, reject) => {
            fetch('http://localhost:9000/api/usuarios/')
                .then(response => response.json())
                .then((usuarios) => {
                    
                    if(usuarios) {
                        resolve(usuarios);  
                    } else {
                        reject("Lista n??o encontrada")
                    }
                })
                .catch(error => {
                    reject(error);
                })
        })

        
    } catch(e) {
        console.log(e);
    }
  }

  function carregarLista() {
    try {

        fetch('http://localhost:9000/api/usuarios/')
        .then(response => response.json())
        .then((usuarios) => {
            
            usuarios.forEach((user)=>{
                var divNova = document.createElement("li");
                divNova.className = "user";
                divNova.setAttribute('id', user._id);
                
                var conteudoNome = document.createElement("P");
                var labelNome = "<label>Nome: </label>"
                conteudoNome.innerHTML = labelNome+user.nome
                conteudoNome.setAttribute('class', "porNome");
                divNova.appendChild(conteudoNome); 


                var conteudoEmail = document.createElement("P");
                var labelEmail = "<label>E-mail: </label>"
                conteudoEmail.innerHTML = labelEmail+user.email
                conteudoEmail.setAttribute('class', "porEmail");
                divNova.appendChild(conteudoEmail);
                
                var conteudoUsuario = document.createElement("P");
                var labelUsuario = "<label>Usu??rio: </label>"
                conteudoUsuario.innerHTML = labelUsuario+user.usuario
                divNova.appendChild(conteudoUsuario);

                var conteudoEndereco = document.createElement("P");
                var labelEndereco = "<label>Endere??o: </label>"
                conteudoEndereco.innerHTML = labelEndereco+user.endereco.logradouro
                    +", "+user.endereco.complemento
                    +" - "+user.endereco.cidade
                    +", "+user.endereco.cep
                divNova.appendChild(conteudoEndereco);

                var conteudoTelefone = document.createElement("P");
                var labelTelefone = "<label>Telefone: </label>"
                conteudoTelefone.innerHTML = labelTelefone+user.telefone
                divNova.appendChild(conteudoTelefone);

                var conteudoSite = document.createElement("P");
                var labelSite = "<label>Site: </label>"
                conteudoSite.innerHTML = labelSite+user.website
                divNova.appendChild(conteudoSite);

                var conteudoEmpresa = document.createElement("P");
                var labelEmpresa = "<label>Empresa: </label>"
                conteudoEmpresa.innerHTML = labelEmpresa+user.empresa.nome
                divNova.appendChild(conteudoEmpresa);

                var btnNovo = document.createElement("BUTTON");
                btnNovo.innerHTML = "Apagar"
                btnNovo.setAttribute('id', user._id);
                btnNovo.setAttribute('type', "submit");
                btnNovo.setAttribute('class', "btn");
                btnNovo.setAttribute('onclick', "apagar(this.id)");
                divNova.appendChild(btnNovo); 

                var divAtual = document.getElementById("div0");
                divAtual.parentNode.insertBefore(divNova, divAtual);   
                
            })
        })
          
    } catch (e) {
        console.log(e);
    }
  }

  function apagar(idBtn) {
    try {
        let fetchData = {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            method: 'DELETE'
          }
        const url = 'http://localhost:9000/api/usuarios/delete/'+idBtn
        fetch(url,fetchData)
        .then((response) => {
            if(response.status === 200) {
                alert('Usu??rio apagado com sucesso.')
            }
            else
                alert('Erro ao apagar, tente novamente.'+response.status)
        })
            //document.getElementById("p").innerHTML = JSON.stringify(str);
             
    } catch (e) {
        console.log(e);
    }
    location.reload();
    return false;
  }

function filtrar () {
    document.getElementById("erro").innerHTML = "";
    texto = document.getElementById("textoFiltro").value;
    campo = document.getElementById("campoFiltro").value;

    const validar = (texto.length > 0)
    if(! validar) {
        document.getElementById("erroFiltro").innerHTML = "O campo filtro deve ser preenchido."
        return false
    }
    
    lista = [...document.getElementsByClassName(campo)];
    
    lista.forEach((li) => {
      if(!li.textContent.toLowerCase().includes(texto.toLowerCase())) {
          var parent = li.parentNode;
          parent.style.display = "none";
      }
    })

    //document.getElementById("p").innerHTML = parent.textContent;

}

function limparFiltro() {
    location.reload();
}

function validarEmail(email) {
    var re = /^[^\s@]+@[^\s@]+$/;
    if(!(re.test(email))) {
        document.getElementById("erro").innerHTML = "O email digitado ?? inv??lido."
    }
    return re.test(email)
}

function validarPreenchimento(campo,dado) {
    if(dado.length >0) return true
    else {
        document.getElementById("erro").innerHTML = "O campo "+campo+" ?? obrigat??rio."
        return false
    }
}

