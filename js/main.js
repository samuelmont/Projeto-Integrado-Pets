const main = async() => {
    const container = document.getElementById('card-container');
    container.onload = load(); // Chama a função load quando carregar o container

    document.getElementById('add-pet').addEventListener('click', () => {

    })
}

// Função que utiliza as funçoes: search() e passa os dados por loop ao createElements()
const load = async () => {
    const dataJson = await search();
    if(dataJson != undefined) {
        dataJson.forEach(element => {
            createElements(element);
        });
    }
}

// Função que busca dados na API
const search = async () => {
    let url = `https://projeto-integrado-avaliacao.azurewebsites.net/projeto3/fecaf/listar/pets`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if(data.pets != undefined) {
        return data.pets;
    }
}

// Função que declara e insere os elementos no HTML
const createElements = (element) => {
    const container = document.getElementById('card-container'); // Container principal

    // Criando elementos
    const cardArticle = document.createElement('article');
    const cardImg = document.createElement('img');
    const dataDiv = document.createElement('div');
    const nameH1 = document.createElement('h1');
    const raceH2 = document.createElement('h2');
    const colorH2 = document.createElement('h2');
    const idH3 = document.createElement('h3');

    // Criando os textNode
    const nameTextNode = document.createTextNode(element.nome);
    const raceTextNode = document.createTextNode(element.raca);
    const colorTextNode = document.createTextNode(element.cor);
    const idTextNode = document.createTextNode(element.id);
    
    // Setando as classes
    cardArticle.setAttribute('class', 'cards');
    cardImg.setAttribute('class', 'animal-image');
    nameH1.setAttribute('class', 'name');
    raceH2.setAttribute('class', 'race');
    colorH2.setAttribute('class', 'color');
    idH3.setAttribute('class', 'identifier');
    
    // Setando os URL's das imagens
    cardImg.setAttribute('src', element.image);

    // Setando os textos alternativos das imagens
    cardImg.setAttribute('alt', 'Foto de animais');

    // Inserindo os textNode nas tag HTML
    nameH1.appendChild(nameTextNode);
    raceH2.appendChild(raceTextNode);
    colorH2.appendChild(colorTextNode);
    idH3.appendChild(idTextNode);

    // Inserindo os elementos no HTML
    container.appendChild(cardArticle);
    cardArticle.appendChild(cardImg);
    cardArticle.appendChild(dataDiv);
    dataDiv.appendChild(nameH1);
    dataDiv.appendChild(raceH2);
    dataDiv.appendChild(colorH2);
    dataDiv.appendChild(idH3);
}

main();