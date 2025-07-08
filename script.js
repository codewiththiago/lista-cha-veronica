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
  "Fraldas RN",
  "Fraldas P",
  "Lenços Umedecidos",
  "Pomada para Assaduras",
  "Sabonete Líquido Infantil",
  "Body de algodão (RN ou P)",
  "Toalha com capuz",
  "Manta ou Cobertor",
  "Meias de bebê",
  "Brinquedinho de pelúcia"
];

const listaUl = document.getElementById("lista");

itens.forEach((nome, index) => {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `item-${index}`;

  const span = document.createElement("span");
  span.textContent = nome;

  li.appendChild(checkbox);
  li.appendChild(span);
  listaUl.appendChild(li);

  checkbox.addEventListener("change", () => {
    listaRef.child(index).set(checkbox.checked);
  });

  listaRef.child(index).on("value", (snapshot) => {
    const marcado = snapshot.val();
    checkbox.checked = marcado;
    li.classList.toggle("selecionado", marcado);
  });
});
