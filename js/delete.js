// Função que deleta o elemento na API e se tiver exito retornará true ou false
export const deleteCard = async (id) => {
    const options = {
        method: 'DELETE',
    };
    
    const response = await fetch(`https://projeto-integrado-avaliacao.azurewebsites.net/projeto3/fecaf/excluir/pet/${id}`, options);
    const data = await response.json();
    if (data.status_code == 200) {
        return true;
    } else {
        return false;
    }
}