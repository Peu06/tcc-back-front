window.onload=initDate
src = "https://cdnjs.cloudflare.com/ajax/libs/libphonenumber-js/1.9.27/libphonenumber-js.min.js"
integrity = "sha512-vtUwo6oyxRLTy6V1nNKoOHdFY9LX6AnrGbG0KfiGZ8WTZC0eT2v8fJKjBGGxYySBZc4DLb84u7Euq6uqCnacLg=="
crossorigin = "anonymous"

document.addEventListener("DOMContentLoaded", function () {
    const phoneInput = document.getElementById('telefone');

    phoneInput.addEventListener('input', function () {
        const value = phoneInput.value.replace(/\D/g, '');
        if (value.length <= 10) {
            phoneInput.value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        } else if (value.length <= 11) {
            phoneInput.value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('navbar-toggle');
    const menu = document.getElementById('navbar-sticky');

    toggleButton.addEventListener('click', function () {
        // Alterna a visibilidade do menu
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
            menu.classList.add('block');
            toggleButton.setAttribute('aria-expanded', 'true');
        } else {
            menu.classList.remove('block');
            menu.classList.add('hidden');
            toggleButton.setAttribute('aria-expanded', 'false');
        }
    });
});

document.getElementById('formulario').addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const descricao = document.getElementById('service').value;
    const telefone = document.getElementById('telefone').value;
    const date = document.getElementById('date').value;
    const hora = document.getElementById('hora').value;
    const mensagem = document.getElementById('message').value;
    

    console.log({ nome, email, descricao, date, hora, telefone }); // Verifique se todos os valores estão corretos

    const data = { nome, descricao, telefone, email, date, hora, mensagem };

    fetch('http://localhost:3000/agendamentos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert('Agendamento realizado com sucesso!');
            console.log('Success:', data);
        })
        .catch(error => {
            alert('Erro ao realizar o agendamento');
            console.error('Error:', error);
        });
});

function initDate (){
    const today = new Date().toISOString().split('T')[0]
    document.getElementById("date").setAttribute("min",today)
}

const API_KEY = 'AIzaSyBROP6JRKEmugX0lOZxd7Z59-nz1i8v98Q';
    
// ID da sua planilha (obtenha do link da planilha)
const SPREADSHEET_ID = '1lnOIfVtk9qmtmKPHjufTHFrf4LafBrQj7eBFR4h-7xA';

// Nome da aba que você quer acessar (pode ser o nome da aba ou o ID dela)
const RANGE = 'Sheet1!A2:G100'; // exemplo de intervalo de células

function initApi() {
    gapi.client.init({
      apiKey: API_KEY,
    }).then(() => {
      loadSheetData();
    });
  }

  

  // Função para carregar os dados da planilha
  function loadSheetData() {
    const request = gapi.client.request({
      path: `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}`,
    });

    request.then((response) => {
      // Verificando a resposta da API
      console.log(response); // Verifique a estrutura da resposta

      if (response.result && response.result.values) {
        const data = response.result.values;

        // Vamos agora criar variáveis com os dados da tabela
        // Exemplo para pegar os valores da primeira linha (A2 até G2)
        for (let i = 0; i < data.length; i++) {
          let Id_ver = data[i][0];          // Id (coluna A)
          let Servico_ver = data[i][1];     // Serviço (coluna B)
          let Telefone_ver = data[i][2];    // Telefone (coluna C)
          let Email_ver = data[i][3];       // E-mail (coluna D)
          let Hora_ver = data[i][4];        // Hora (coluna E)
          let Data_ver = data[i][5];        // Data (coluna F)
          let Cliente_ver = data[i][6];     // Cliente (coluna G)

          

          // Exibir as variáveis no console para verificar
          console.log(`Linha ${i + 1}:`);
          console.log(`Id: ${Id_ver}`);
          console.log(`Serviço: ${Servico_ver}`);
          console.log(`Telefone: ${Telefone_ver}`);
          console.log(`E-mail: ${Email_ver}`);
          console.log(`Hora: ${Hora_ver}`);
          console.log(`Data: ${Data_ver}`);
          console.log(`Cliente: ${Cliente_ver}`);
          console.log('---------------------------------');
        }
        

      } else {
        console.error("Nenhum dado encontrado.");
      }
    }, (error) => {
      console.error('Erro ao acessar a planilha:', error);
    });
  }

  // Carregar a API do Google
  gapi.load('client', initApi);