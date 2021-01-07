class Despesa {
  constructor(ano, mes, dia, tipo, descricao, valor) {
    this.ano = ano;
    this.mes = mes;
    this.dia = dia;
    this.tipo = tipo;
    this.descricao = descricao;
    this.valor = valor;
  }

  validarDados() {
    // i retorna os índices de um determinado array ou:
    // os atributos de um determinado objeto
    for (let i in this) {
      //acesso a todos os atributos do objeto(não  ao valor em si ainda)
      //pecorre cada atributo e vai associando a i
      //this[i] = this.ano / this.dia

      if (this[i] == undefined || this[i] == "" || this[i] == null) {
        return false;
      }
    }
    return true;
  }
}

class Bd {
  constructor() {
    let id = localStorage.getItem("id"); // pega o valor respctivo pertencente a chave

    if (id === null) {
      //garante que exista um id inicial
      localStorage.setItem("id", 0);
    }
  }

  getProximoId() {
    let proximoId = localStorage.getItem("id"); //pegar um dado dentro de local storage
    return parseInt(proximoId) + 1;
  }

  gravar(d) {
    let id = this.getProximoId();
    //inserir um dado dentro de local storage
    localStorage.setItem(id, JSON.stringify(d));
    localStorage.setItem("id", id);
  }


  recuperarTodosRegistros(){

    //array de despesas

    let despesas = Array()
    

    let id = localStorage.getItem('id')

    //recuperar todas as despesas cadastradas em localStorage
    //vai percorrer todas as chaves/itens/elementos cadastrados 
    for(let i=1; i <= id; i++ ){
      //recuperar o valor (despesa)
      //transforma  o retorno JSON em Objeto Literal
      let despesa = JSON.parse(localStorage.getItem(i))
      

      //verificar se existe a possibilidade de haver índices que foram deletados/pulados
      if(despesa === null){
        continue
      }


        despesa.id = i
        despesas.push(despesa) //joga despesa para dentro de despesas (array)
      
    }
    
    return despesas // retorna o array
    

  }

  pesquisar(despesa){

    let despesasFiltradas = Array()

    //retorna todos os registros  em formato de objeto literal
    despesasFiltradas = this.recuperarTodosRegistros() //array que possue todos os registros
    
    console.log(despesa)

    console.log(despesasFiltradas)
    
    //ano 
    if(despesa.ano != ''){
      console.log('filtro de ano')
      despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano) // att
    }

    
    //mes
    if(despesa.mes != ''){
      console.log('filtro de mes')
      despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes) // att
    }
    //dia

    if(despesa.dia != ''){
      console.log('filtro de dia')
      despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia) // att
    }

    //tipo
    if(despesa.tipo != ''){
      console.log('filtro de tipo')
      despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo) // att
    }

    //descricao
    if(despesa.descricao != ''){
      console.log('filtro de descrição')
      despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao) // att
    }

    //valor
    if(despesa.valor != ''){
      console.log('filtro de valor')
      despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor) // att
    }

    return despesasFiltradas

  }

  remover(id){

    localStorage.removeItem(id)

  }


}

//criando o objeto bd

let bd = new Bd();

function cadastrarDespesa() {
  //pegar todos os valores selecionados e armazenar
  //pegar os valores dos campos

  let ano = document.getElementById("ano");
  let mes = document.getElementById("mes");
  let dia = document.getElementById("dia");
  let tipo = document.getElementById("tipo");
  let descricao = document.getElementById("descricao");
  let valor = document.getElementById("valor");

  //criando  o objeto despesa

  let despesa = new Despesa(
    //pegando os valores selecionados e realocando nos paramêtros
    ano.value,
    mes.value,
    dia.value,
    tipo.value,
    descricao.value,
    valor.value
  );

  //antes de gravar os dados é preciso validar
  if (despesa.validarDados()) {
    // se retornar true, ele vai aplicar a gravação
    bd.gravar(despesa)
    document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso!'
    document.getElementById('modal_titulo_div').className = 'modal-header text-success'
    document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso!'
    document.getElementById('modal_btn').innerHTML = 'Voltar'
    document.getElementById('modal_btn').className = 'btn btn-success'
    
    //dialog de sucesso
    $('#modalRegistraDespesa').modal('show')


    //limpar os dados 
    ano.value = ''
    mes.value = ''
    dia.value = ''
    tipo.value = ''
    descricao.value =''
    valor.value = ''
    
  } else {
    //dialog de erro
    
    document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'
    document.getElementById('modal_titulo_div').className ='modal-header text-danger'
    document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente!'
    document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir!'
    document.getElementById('modal_btn').className = 'btn btn-danger'


    $('#modalRegistraDespesa').modal('show')
    
  }
}


function carregaListaDespesas(despesas = Array(),filtro = false){
  //recebendo as despesas 

  if(despesas.length == 0 && filtro == false ){
    //retorna o array de todos os registros 
    despesas = bd.recuperarTodosRegistros()
  }
  
   

  //inserindo na tabela da aplicação
  //selecionando o elemento tbody da tabela
  let listaDespesas = document.getElementById('listaDespesas')
  listaDespesas.innerHTML = ''

  /*
  <tr>
    <td>15/03/20018</td>
    <td>Alimentação</td>
    <td>Compras do mês</td>
    <td>444.75</td>
  </tr>

  */

  //percorrer o array despesas, listando cada despesa de forma dinâmica
  //primeiro parâmetro é o valor, depois vem o índice
  despesas.forEach(function(d){

    //console.log(d)
    
    //criando a linha (tr)
    let linha = listaDespesas.insertRow()

    //criar as coluas (td) => conteúdo da linha
    // coluna 0 (primeira coluna)
    linha.insertCell(0).innerHTML = ` ${d.dia} / ${d.mes} /  ${d.ano}  `
    

    //ajustar o tipo
    switch(parseInt(d.tipo)){
      case 1: d.tipo = 'Alimentação'
      break

      case 2: d.tipo = 'Educação'
      break

      case 3: d.tipo = 'Lazer'
      break

      case 4: d.tipo = 'Saúde'
      break

      case 5: d.tipo = 'Transporte'
      break

      
    }

    linha.insertCell(1).innerHTML = `${d.tipo}`



    linha.insertCell(2).innerHTML = `${d.descricao}`
    linha.insertCell(3).innerHTML = `${d.valor}`
    
    //criar o botao de exclusão

    let btn = document.createElement("button")
    btn.className = 'btn btn-danger'
    btn.innerHTML = '<i class="fas fa-times"></i>'
    btn.id = `id_despesa_${d.id}` //criando o atributo id do elemento html associando ao id da despesa
    btn.onclick = function(){
      //remover a despesa
      // recupera o proprio id do elemento clicado
      
      let id = this.id.replace('id_despesa_', '')

      
      
      bd.remover(id)

      //att página

      window.location.reload()
    
    }
    linha.insertCell(4).append(btn)

    console.log(d) // d => despesa recuperada






  })

} 

function pesquisarDespesa(){
  //pegar os valores dos campos 

  let ano = document.getElementById("ano").value
  let mes = document.getElementById("mes").value
  let dia = document.getElementById("dia").value
  let tipo = document.getElementById("tipo").value
  let descricao = document.getElementById("descricao").value
  let valor = document.getElementById("valor").value

  let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)


  let despesas = bd.pesquisar(despesa) // retorna todas as despesas filtradas
  

  carregaListaDespesas(despesas,true)



}