// ============================================
// SISTEMA DE TRAZABILIDAD AGRÍCOLA
// ============================================

// --------------------------------------------
// REFERENCIAS AL DOM
// --------------------------------------------
const tabs = document.querySelectorAll(".tab-btn");
const panels = document.querySelectorAll(".tab-panel");

const addItemBtn = document.getElementById("add-item-btn");
const addUserBtn = document.getElementById("add-user-btn");

const itemModal = document.getElementById("item-modal");
const closeItemModalBtn = document.getElementById("close-modal");
const cancelItemBtn = document.getElementById("cancel-btn");
const itemForm = document.getElementById("item-form");

const userModal = document.getElementById("user-modal");
const closeUserModalBtn = document.getElementById("close-user-modal");
const cancelUserBtn = document.getElementById("cancel-user-btn");
const userForm = document.getElementById("user-form");

const itemList = document.getElementById("item-list");
const userList = document.getElementById("user-list");
const searchInput = document.getElementById("search-input");
const filterType = document.getElementById("filter-type");
const filterStatus = document.getElementById("filter-status");

const searchUsers = document.getElementById("search-users");
const filterRole = document.getElementById("filter-role");

const statTotal = document.getElementById("stat-total");
const statActive = document.getElementById("stat-active");
const statInactive = document.getElementById("stat-inactive");
const statUsers = document.getElementById("stat-users");

// --------------------------------------------
// PESTAÑAS
// --------------------------------------------
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    const target = tab.dataset.tab;
    panels.forEach(p => p.classList.remove("active"));
    document.getElementById(target).classList.add("active");
  });
});

// --------------------------------------------
// MODALES
// --------------------------------------------
const openModal = modal => modal.style.display = "block";
const closeModal = modal => modal.style.display = "none";

addItemBtn.addEventListener("click", () => openModal(itemModal));
closeItemModalBtn.addEventListener("click", () => closeModal(itemModal));
cancelItemBtn.addEventListener("click", () => closeModal(itemModal));

addUserBtn.addEventListener("click", () => openModal(userModal));
closeUserModalBtn.addEventListener("click", () => closeModal(userModal));
cancelUserBtn.addEventListener("click", () => closeModal(userModal));

// --------------------------------------------
// CLASES DEL SISTEMA
// --------------------------------------------
class BaseItem {
  #id; #name; #type; #location; #active; #dateCreated;
  constructor(name, type, location){
    this.#id = crypto.randomUUID();
    this.#name = name;
    this.#type = type;
    this.#location = location;
    this.#active = true;
    this.#dateCreated = new Date().toISOString();
  }
  get id(){ return this.#id; }
  get name(){ return this.#name; }
  get type(){ return this.#type; }
  get location(){ return this.#location; }
  get isActive(){ return this.#active; }
  get dateCreated(){ return this.#dateCreated; }
  activate(){ this.#active = true; }
  deactivate(){ this.#active = false; }
  getInfo(){ 
    return {
      id:this.id, name:this.name, type:this.type, location:this.location, active:this.isActive
    };
  }
}

class Person {
  #id; #name; #email; #role; #dateRegistered;
  constructor(name,email,role){
    this.#id = crypto.randomUUID();
    this.#name = name;
    this.#email = email;
    this.#role = role;
    this.#dateRegistered = new Date().toISOString();
  }
  get id(){ return this.#id; }
  get name(){ return this.#name; }
  get email(){ return this.#email; }
  get role(){ return this.#role; }
  get dateRegistered(){ return this.#dateRegistered; }
  getInfo(){ return {id:this.id,name:this.name,email:this.email,role:this.role,dateRegistered:this.dateRegistered}; }
}

// --------------------------------------------
// SISTEMA
// --------------------------------------------
const system = {
  items: [],
  users: []
};

// --------------------------------------------
// RENDER ITEMS
// --------------------------------------------
function renderItems(items = system.items){
  if(items.length===0){
    itemList.innerHTML = '<p>No hay cultivos agregados</p>';
    return;
  }
  itemList.innerHTML = items.map(item => `
    <div class="item ${item.isActive?'':'inactive'}" data-id="${item.id}">
      <h4>${item.name}</h4>
      <p>Tipo: ${item.type}</p>
      <p>Ubicación: ${item.location}</p>
      <p>Estado: ${item.isActive?'Activo':'Inactivo'}</p>
      <button class="btn-toggle" data-id="${item.id}">${item.isActive?'Desactivar':'Activar'}</button>
      <button class="btn-delete" data-id="${item.id}">Eliminar</button>
    </div>
  `).join('');
}

// --------------------------------------------
// RENDER USERS
// --------------------------------------------
function renderUsers(usersArr = system.users){
  if(usersArr.length===0){
    userList.innerHTML = '<p>No hay usuarios registrados</p>';
    return;
  }
  userList.innerHTML = usersArr.map(user => `
    <div class="user" data-id="${user.id}">
      <h4>${user.name}</h4>
      <p>Rol: ${user.role}</p>
      <p>Email: ${user.email}</p>
    </div>
  `).join('');
}

// --------------------------------------------
// ESTADÍSTICAS
// --------------------------------------------
function renderStats(){
  statTotal.textContent = system.items.length;
  statActive.textContent = system.items.filter(i=>i.isActive).length;
  statInactive.textContent = system.items.filter(i=>!i.isActive).length;
  statUsers.textContent = system.users.length;
}

// --------------------------------------------
// FORMULARIOS
// --------------------------------------------
itemForm.addEventListener("submit", e=>{
  e.preventDefault();
  const name = document.getElementById("item-name").value;
  const type = document.getElementById("item-type").value;
  const location = document.getElementById("item-location").value;
  const newItem = new BaseItem(name,type,location);
  system.items.push(newItem);
  renderItems();
  renderStats();
  itemForm.reset();
  closeModal(itemModal);
});

userForm.addEventListener("submit", e=>{
  e.preventDefault();
  const name = document.getElementById("user-name").value;
  const email = document.getElementById("user-email").value;
  const role = document.getElementById("user-role").value;
  const newUser = new Person(name,email,role);
  system.users.push(newUser);
  renderUsers();
  renderStats();
  userForm.reset();
  closeModal(userModal);
});

// --------------------------------------------
// FILTROS Y BÚSQUEDA
// --------------------------------------------
searchInput.addEventListener("input", ()=>{
  const q = searchInput.value.toLowerCase();
  renderItems(system.items.filter(i=>i.name.toLowerCase().includes(q)));
});

filterType.addEventListener("change", ()=>{
  const type = filterType.value;
  renderItems(type==='all'?system.items:system.items.filter(i=>i.type===type));
});

filterStatus.addEventListener("change", ()=>{
  const status = filterStatus.value;
  if(status==='all'){ renderItems(); return; }
  renderItems(system.items.filter(i=>status==='active'?i.isActive:!i.isActive));
});

searchUsers.addEventListener("input", ()=>{
  const q = searchUsers.value.toLowerCase();
  renderUsers(system.users.filter(u=>u.name.toLowerCase().includes(q)));
});

filterRole.addEventListener("change", ()=>{
  const role = filterRole.value;
  renderUsers(role==='all'?system.users:system.users.filter(u=>u.role===role));
});

// --------------------------------------------
// BOTONES DINÁMICOS ITEMS
// --------------------------------------------
itemList.addEventListener("click", e=>{
  const id = e.target.dataset.id;
  if(!id) return;
  const item = system.items.find(i=>i.id===id);
  if(e.target.classList.contains("btn-toggle")){
    item.isActive?item.deactivate():item.activate();
  }
  if(e.target.classList.contains("btn-delete")){
    system.items = system.items.filter(i=>i.id!==id);
  }
  renderItems();
  renderStats();
});

// --------------------------------------------
// INICIALIZAR
// --------------------------------------------
renderItems();
renderUsers();
renderStats();