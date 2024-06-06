// Chama setData() e se o botão de atualizar carregar irá aplicar um evento de click,
// dentro do evento chamará checkAlterations() e updateData() e se status_code for igual a 200
// limpará localStorage e redirecionará para index.html
export const updateCard = () => {
    setData();
    
    const updateButton = document.getElementById('update-button');
    if(updateButton) {
        updateButton.addEventListener('click', async (e) => {
            e.preventDefault();
            checkAlterations();
            const statusCode = await updateData();
            if(statusCode == 200) {
                localStorage.removeItem("attData");
                document.location.href = '/pages/home.html';
            } else {
                console.log("Erro")
            }
        });
    }
}

// Salva os dados do elemento no localStorage quando clickamos para atualizar e depois redireciona a pagina de update
export const saveData = (e) => {
    let arr = [];
    document.querySelectorAll(`#v${e.target.id}`).forEach((e) => {
        if(e.src) arr.push(e.src);
        if(e.innerHTML) arr.push(e.innerText.substring(e.innerText.indexOf(' ') + 1));
    })
    arr.push(e.target.id);
    const data = {
        image: arr[0],
        name: arr[1],
        race: arr[2],
        color: arr[3],
        id: arr[4]
    }
    localStorage.setItem("attData", JSON.stringify(data));
    document.location.href = '/pages/updatePet.html';
}

// Compara os valores que mudaram e coloca eles atulizados no localStorage
const checkAlterations = () => {
    const data = JSON.parse(localStorage.getItem("attData"));
    const image = document.getElementById('image');
    const name = document.getElementById('name');
    const race = document.getElementById('race');
    const color = document.getElementById('color');

    if (image.value != data.image) data.image = image.value;
    if (name.value != data.name) data.name = name.value;
    if (race.value != data.race) data.race = race.value;
    if (color.value != data.color) data.color = color.value;

    localStorage.setItem("attData", JSON.stringify(data));
}

// PUT com os dados do localStorage e retorna o status_code
const updateData = async () => {
    const data = JSON.parse(localStorage.getItem("attData"));
    const options = {
        method: 'PUT',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            image: data.image,
            nome: data.name,
            raca: data.race,
            cor: data.color
        })
    };
    
    const response = await fetch(`https://projeto-integrado-avaliacao.azurewebsites.net/projeto3/fecaf/atualizar/pet/${data.id}`, options);
    const dataResponse = await response.json();
    return dataResponse.status_code;
}

// Coloca os dados do elementos no input de atualizar
const setData = () => {
    const data = JSON.parse(localStorage.getItem("attData"));
    if (data) {
        document.getElementById('image').value = `${data.image}`;
        document.getElementById('name').value = `${data.name}`;
        document.getElementById('race').value = `${data.race}`;
        document.getElementById('color').value = `${data.color}`;
    } else {
        document.location.href = '/index.html';
    }
}