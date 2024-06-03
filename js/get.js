// Get que utiliza as funçoes: search() e passa os dados por loop ao createElements()
export const loadGet = async () => {
    deleteCards();
    const dataJson = await search(`https://projeto-integrado-avaliacao.azurewebsites.net/projeto3/fecaf/listar/pets`);
    if(dataJson != undefined) {
        dataJson.pets.forEach(element => {
            createElements(element);
        });
    }
}

// Get utiliza as funçoes: search(), deleteCards() e passa os dados por loop ao createElements()
export const loadSearch = async (id) => {
    const dataJson = await search(`https://projeto-integrado-avaliacao.azurewebsites.net/projeto3/fecaf/buscar/pet/${id}`);
    if(dataJson != undefined) {
        deleteCards();
        dataJson.pet.forEach(element => {
            createElements(element);
        });
    }
}

// Função que deleta cards
const deleteCards = () => {
    const cardContainer = document.getElementById('card-container');
    if(cardContainer.innerHTML) cardContainer.innerHTML = ""
}

// Faz um fetch na API com a url que for recebida
const search = async (urlParams) => {
    let url = urlParams;
    const response = await fetch(url);
    const data = await response.json();
    if(data != undefined) return data;
}

// Função que declara e insere os elementos no HTML
const createElements = (element) => {
    const container = document.getElementById('card-container'); // Container principal

    // Criando elementos
    const cardArticle = document.createElement('article');
    const imgDiv = document.createElement('div');
    const cardImg = document.createElement('img');
    const deleteDiv = document.createElement('div');
    const deleteImg = document.createElement('img');
    const updateDiv = document.createElement('div');
    const updateImg = document.createElement('img');
    const dataDiv = document.createElement('div');
    const nameH1 = document.createElement('h1');
    const raceH2 = document.createElement('h2');
    const colorH2 = document.createElement('h2');
    const idH3 = document.createElement('h3');

    // Tags strong
    const nameStrong = document.createElement('strong');
    const raceStrong = document.createElement('strong');
    const colorStrong = document.createElement('strong');
    const idStrong = document.createElement('strong');

    // Criando os textNode
    const nameTextStrong = document.createTextNode("Nome: ");
    const raceTextStrong = document.createTextNode("Raça: ");
    const colorTextStrong = document.createTextNode("Cor: ");
    const idTextStrong = document.createTextNode("Id: ");
    const nameTextNode = document.createTextNode(element.nome);
    const raceTextNode = document.createTextNode(element.raca);
    const colorTextNode = document.createTextNode(element.cor);
    const idTextNode = document.createTextNode(element.id);
    
    // Setando as classes
    cardArticle.setAttribute('class', 'cards');
    imgDiv.setAttribute('class', 'card-buttons');
    cardImg.setAttribute('class', 'animal-image');
    deleteDiv.setAttribute('class', 'delete-card');
    updateDiv.setAttribute('class', 'update-card');
    deleteImg.setAttribute('class', 'delete-img');
    updateImg.setAttribute('class', 'update-img');
    nameH1.setAttribute('class', 'name');
    raceH2.setAttribute('class', 'race');
    colorH2.setAttribute('class', 'color');
    idH3.setAttribute('class', 'identifier');

    // Setando o identificador do card
    cardArticle.setAttribute('id', element.id);
    deleteDiv.setAttribute('id', element.id);
    updateDiv.setAttribute('id', element.id);
    deleteImg.setAttribute('id', element.id);
    updateImg.setAttribute('id', element.id);

    cardImg.setAttribute('id', `v${element.id}`);
    nameH1.setAttribute('id', `v${element.id}`);
    raceH2.setAttribute('id', `v${element.id}`);
    colorH2.setAttribute('id', `v${element.id}`);
    
    // Setando os URL's das imagens
    cardImg.setAttribute('src', element.image);
    deleteImg.setAttribute('src', "../imgs/delete.svg");
    updateImg.setAttribute('src', "../imgs/update.svg");

    // Setando os textos alternativos das imagens
    cardImg.setAttribute('alt', 'Foto de animais');
    deleteImg.setAttribute('alt', "Icone de X");
    updateImg.setAttribute('alt', "Icone de atualizar");
    
    // Inserindo os elementos no HTML
    container.appendChild(cardArticle);
    cardArticle.appendChild(imgDiv);
    imgDiv.appendChild(cardImg);
    imgDiv.appendChild(deleteDiv);
    deleteDiv.appendChild(deleteImg);
    imgDiv.appendChild(updateDiv);
    updateDiv.appendChild(updateImg);
    cardArticle.appendChild(dataDiv);
    dataDiv.appendChild(nameH1);
    dataDiv.appendChild(raceH2);
    dataDiv.appendChild(colorH2);
    dataDiv.appendChild(idH3);

    nameH1.appendChild(nameStrong)
    raceH2.appendChild(raceStrong)
    colorH2.appendChild(colorStrong)
    idH3.appendChild(idStrong)

    nameStrong.appendChild(nameTextStrong);
    raceStrong.appendChild(raceTextStrong);
    colorStrong.appendChild(colorTextStrong);
    idStrong.appendChild(idTextStrong);
    
    // Inserindo os textNode nas tag HTML
    nameH1.appendChild(nameTextNode);
    raceH2.appendChild(raceTextNode);
    colorH2.appendChild(colorTextNode);
    idH3.appendChild(idTextNode);
}