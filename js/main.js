import {loadGet, loadSearch} from "./get.js";
import { post } from "./post.js";
import { deleteCard } from "./delete.js";
import { saveData, updateCard } from "./put.js";

const main = async () => {
    // ---------- GET

    // Quando carregar card-container chamará a função loadGet();
    const get = document.getElementById('card-container');
    if(get) loadGet(); 

    // Quando fazer pesquisa chamará loadSearch() e quando apagar o campo chamará loadGet()
    const getSearch = document.getElementById("search");
    if(getSearch) getSearch.addEventListener('keyup', async (e) => {
        if (e.key == "Enter" && getSearch.value != NaN) await loadSearch(getSearch.value);
        if (e.key == "Backspace" && !getSearch.value) {
            await loadGet();
        }
    })

    // ---------- POST

    // Quando apertar o botão enviar na pagina de cadastro ela irá chamar a função post();
    const postButton = document.getElementById('form-button');
    if(postButton) {
        postButton.addEventListener('click', async (e) => {
            e.preventDefault();
            await post();
        });
    }

    // ---------- DELETE e UPDATE

    // Olhando os eventos de click
    window.addEventListener('click', async (e) => {
        // Se o evento de click for no elemento de delete chamará a função deleteCard();
        if(e.target.className == "delete-card" || e.target.className == "delete-img") {
            // Chama a função e guarda o retorno em uma constante
            const isDeleted = await deleteCard(e.target.id);
            // Se o retorno da função for true chamará loadGet() para atualizar a lista
            if(isDeleted) await loadGet();
        }
        if(e.target.className == "update-card" || e.target.className == "update-img") {
            saveData(e);
        }
    })

    // Se a pagina de atualizar estiver carregada chamará updateCard();
    const updatePage = document.getElementById('update-container');
    if (updatePage) updateCard();
}

main();