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

    const id = event.target.value;
    fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`,
    )
        .then((res) => res.json())
        .then((city) => {
            city.forEach((value, index) => {
                citySelect.innerHTML += `<option value="${value.id}">${value.nome}</option>`;
            });
        });
    citySelect.disabled = false;
}

populateUFs();
