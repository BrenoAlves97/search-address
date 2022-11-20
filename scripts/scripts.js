const cep = document.querySelector('#cep');
const btnSearch = document.querySelector('#btn');
const gitHub = document.querySelector('#github-icon i');
const footerInfos = document.querySelector('#footer');
//Funções

// Validando o CEP
const isCepValid = (cep) => cep.length == 8 && /^[0-9]+$/.test(cep);

const searchCep = async () => {
    //Limpar os campo e realizar nova busca
    clearForm();

    const cepValue = cep.value;
    // Url server API
    const url = `http://viacep.com.br/ws/${cepValue}/json/`;

    if (isCepValid(cepValue)) {
        //Aguarde eu resolver. Já retorna com as informações, sem promessas.
        const datas = await fetch(url);
        const datasJson = await datas.json();
        if (datasJson.hasOwnProperty('erro')) {
            document.querySelector('#adress').value = 'Cep não encontrado!';
        } else {
            fillOutForm(datasJson);
        }
    } else {
        document.querySelector('#adress').value = 'CEP incorreto!';    
    } 
}

const clearForm = () => {

    const adress = document.querySelector('#adress');
    const ddd = document.querySelector('#number');
    const neighborhood = document.querySelector('#neighborhood');
    const city = document.querySelector('#city');
    const uf = document.querySelector('#state');

    //Aplicando os valores do objeto no formato json
    adress.value = '';
    neighborhood.value = '';
    city.value = '';
    uf.value = '';
    ddd.value = '';
}

const fillOutForm = (datasJson) => {
    //Selecionando elementos
    const adress = document.querySelector('#adress');
    const ddd = document.querySelector('#number');
    const neighborhood = document.querySelector('#neighborhood');
    const city = document.querySelector('#city');
    const uf = document.querySelector('#state');

    //Aplicando os valores do objeto no formato json
    adress.value = datasJson.logradouro;
    neighborhood.value = datasJson.bairro;
    city.value = datasJson.localidade;
    uf.value = datasJson.uf;
    ddd.value = datasJson.ddd;
}

// Eventos
cep.addEventListener('focusout', searchCep);

btnSearch.addEventListener('click', searchCep);

btnSearch.addEventListener('click', (event) => {
    event.preventDefault();
})

gitHub.addEventListener('click', () => {
    footerInfos.classList.toggle('hide');
})



