const firebaseConfig = {
  apiKey: "AIzaSyDYuSvRYb4oi9kRhofUsI57Y0skgtDS90U",
  authDomain: "lista-presente-veronica.firebaseapp.com",
  databaseURL: "https://lista-presente-veronica-default-rtdb.firebaseio.com",
  projectId: "lista-presente-veronica",
  storageBucket: "lista-presente-veronica.firebasestorage.app",
  messagingSenderId: "812872969958",
  appId: "1:812872969958:web:354b48ded6e65f56035527",
  measurementId: "G-D2M3X2DJKS"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const listaRef = db.ref("presentes");

const itens = [
     "Pomada para assaduras",
     "Sabonete líquido neutro (próprio para RN)",
     "Toalhas com capuz - 2", 
     "Lixa de unha eletrica - 1",
     "Paninhos de boca - 6 a 10",
     "Fralda de ombro - 5",
     "Cueiro - 2",
     "Sling - 1",
     "Termômetro digital - 1",
     "Babadores",
     "Trocador portátil - 1",
     "Almofada de amamentação - 1",
     "Rosquinhas para seios",
     "Lixeira - 1",
     "Tapete Tummy Time - 1",
     "Seringa para lavagem nasal - 1",
     "Naninha",
     "Mantinha"
];

const loginContainer = document.getElementById("login-container");
const appContainer = document.getElementById("app");
const nomeInput = document.getElementById("nomeInput");
const btnEntrar = document.getElementById("btnEntrar");
const listaUl = document.getElementById("lista");
const userInfo = document.getElementById("userInfo");

let nomeUsuario = localStorage.getItem("nomeUsuario");

function montarLista() {
  listaUl.innerHTML = "";

  itens.forEach((nome, index) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `item-${index}`;

    const spanNome = document.createElement("span");
    spanNome.textContent = nome;

    li.appendChild(checkbox);
    li.appendChild(spanNome);
    listaUl.appendChild(li);

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        listaRef.child(index).set({
          marcado: true,
          usuario: nomeUsuario
        });
      } else {
        listaRef.child(index).remove();
      }
    });

    listaRef.child(index).on("value", (snapshot) => {
      const val = snapshot.val();
      checkbox.checked = val?.marcado === true;
      li.classList.toggle("selecionado", val?.marcado === true);
    });
  });
}

function entrar(nome) {
  nomeUsuario = nome.trim();
  if (!nomeUsuario) return alert("Por favor, digite seu nome.");

  localStorage.setItem("nomeUsuario", nomeUsuario);
  userInfo.textContent = `Olá, ${nomeUsuario}!`;
  loginContainer.style.display = "none";
  appContainer.style.display = "block";

  montarLista();
}

btnEntrar.onclick = () => entrar(nomeInput.value);

// Se já tiver nome salvo, entra direto
if (nomeUsuario) {
  entrar(nomeUsuario);
}
