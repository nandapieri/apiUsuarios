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
            alert("Usuário criado com sucesso.");
            location.reload();
        })
        .catch(function(error) {
            alert("Erro"+error);
        })  
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
                var labelUsuario = "<label>Usuário: </label>"
                conteudoUsuario.innerHTML = labelUsuario+user.usuario
                divNova.appendChild(conteudoUsuario);

                var conteudoEndereco = document.createElement("P");
                var labelEndereco = "<label>Endereço: </label>"
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
                alert('Usuário apagado com sucesso.')
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
        document.getElementById("erro").innerHTML = "O email digitado é inválido."
    }
    return re.test(email)
}

function validarPreenchimento(campo,dado) {
    if(dado.length >0) return true
    else {
        document.getElementById("erro").innerHTML = "O campo "+campo+" é obrigatório."
        return false
    }
}

