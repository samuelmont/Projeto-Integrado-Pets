// post chama a função getDataFormm() e passa os dados para postData() que faz o POST na API
// e caso sucesso validation() irá te enviar para a pagina principal
export const post = async () => {
    const dataPost = getDataForm();
    const response = await postData(dataPost);

    validation(response)
}

// Envia o usuario para a pagina principal caso receba status_code == 201
const validation = (response) => {
    if(response == 201) {
        document.location.href = '/index.html';
    }
}

// Pega e retorna os dados dos inputs
const getDataForm = () => {
    const name = document.getElementById('name');
    const color = document.getElementById('color');
    const race = document.getElementById('race');
    const image = document.getElementById('image');
    
    const dataPost = {
        "nome": name.value,
        "cor": color.value,
        "image": image.value,
        "raca": race.value
    }

    return dataPost;
}

// Faz um POST na API e retorna o status_code
const postData = async (dataPost) => {
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataPost)
    };
    
    const response = await fetch('https://projeto-integrado-avaliacao.azurewebsites.net/projeto3/fecaf/novo/pet', options);
    const data = await response.json();
    console.log(data.status_code);
    return data.status_code;
}

// Fazer verificação dos campos e talvez validação da api