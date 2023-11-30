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
