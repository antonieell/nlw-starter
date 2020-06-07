document.querySelector("select[name=uf]").addEventListener("change", getCity);

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]");
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((res) => res.json())
        .then((states) => {
            states.forEach((value, index) => {
                ufSelect.innerHTML += `<option value="${value.id}">${value.nome}</option>`;
            });
        });
    console.warn("Aplicação finalizada");
}

function getCity(event) {
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;
    citySelect.innerHTML = `Selecione a cidade`;
    citySelect.disabled = true;

    const id = event.target.value;
    fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`,
    )
        .then((res) => res.json())
        .then((city) => {
            city.forEach((value, index) => {
                citySelect.innerHTML += `<option value="${value.nome}">${value.nome}</option>`;
            });
        });
    citySelect.disabled = false;
}
populateUFs();

//Ítens de coleta

const itemsToColect = document.querySelectorAll(".items-grid li");

itemsToColect.forEach((value) =>
    value.addEventListener("click", handleSelectedItem),
);

const collectedItems = document.querySelector("input[name=items]");
let selectedItems = [];
function handleSelectedItem(event) {
    const itemLi = event.target;
    //Add or remove a class with JavaScript
    itemLi.classList.toggle("selected");

    const itemId = itemLi.dataset.id;

    //Verificar se existem itens selecionados ?
    const alreadySelected = selectedItems.findIndex((item) => {
        const itemFound = item == itemId;
        return itemFound;
    });
    //Se já está selecionado tirar da seleção
    console.log(alreadySelected);
    if (alreadySelected >= 0) {
        const filtredItems = selectedItems.filter((item) => {
            return item != itemId;
        });
        selectedItems = filtredItems;
    } else {
        //Adiciona à seleção
        selectedItems.push(itemId);
    }
    console.log(selectedItems);
    collectedItems.value = selectedItems;
    //Adicioanr ao campo escondido
}
