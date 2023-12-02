let dataList = JSON.parse(localStorage.getItem("dataList")) || [];
let count = dataList.length > 0 ? dataList[dataList.length - 1].id + 1 : 1;

function addMensage() {
  const nome = document.getElementById("name").value;
  const cpf = document.getElementById("cpf").value;
  const phone = document.getElementById("telephone").value;
  const selectService = document.querySelector('input[name="service"]:checked');
  const service = selectService ? selectService.value : null;
  const sendform = new Date().toLocaleString();

  const newdata = {
    id: count++,
    nome: nome,
    cpf: cpf,
    Telefone: phone,
    service: service,
    DataEnvio: sendform,
  };

  dataList.push(newdata);

  localStorage.setItem("dataList", JSON.stringify(dataList));
}

function deleteItens(id) {
  const index = dataList.findIndex((item) => item.id === id);
  if (index !== -1) {
    dataList.splice(index, 1);
    localStorage.setItem("dataList", JSON.stringify(dataList));

    displayData();
  }
}

function deleteAll() {
  dataList.splice(0, dataList.length);
  localStorage.clear();
  displayData();
}

function displayData(filteredData = null) {
  const dataTable = document.getElementById("tabela");
  const tbody = dataTable.querySelector("tbody");

  tbody.innerHTML = "";

  const dataToDisplay = filteredData || dataList;

  dataToDisplay.forEach((data) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${data.nome}</td>
      <td>${data.cpf}</td>
      <td>${data.Telefone}</td>
      <td>${data.service}</td>
      <td>${data.DataEnvio}</td>
      <td><button class="buttondel" onclick="deleteItens(${data.id})"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg></button></td>
    `;
    tbody.appendChild(row);
  });
}

function searchByName() {
  const searchInput = document.getElementById("searchinput");
  const searchTerm = searchInput.value.toLowerCase();

  const filteredData = dataList.filter((data) =>
    data.nome.toLowerCase().includes(searchTerm)
  );

  displayData(filteredData);
}

document.getElementById("searchinput").addEventListener("input", searchByName);

displayData();
