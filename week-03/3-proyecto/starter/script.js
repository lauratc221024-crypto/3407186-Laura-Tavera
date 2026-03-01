// ============================================
// SISTEMA DE GESTIÓN DE CULTIVOS - script.js
// ============================================

// =======================
// Clases Base y Derivadas
// =======================

// Clase base abstracta
class BaseItem {
  #id;
  #name;
  #active;
  #location;
  #dateCreated;

  constructor(name, location) {
    this.#id = crypto.randomUUID();
    this.#name = name;
    this.#location = location;
    this.#active = true;
    this.#dateCreated = new Date().toISOString();
  }

  get id() { return this.#id; }
  get name() { return this.#name; }
  get location() { return this.#location; }
  get isActive() { return this.#active; }
  get dateCreated() { return this.#dateCreated; }

  set location(value) {
    if (!value || value.trim() === '') throw new Error("Ubicación no puede estar vacía");
    this.#location = value.trim();
  }

  activate() {
    if (this.#active) return { success: false, message: 'El cultivo ya está activo' };
    this.#active = true;
    return { success: true };
  }

  deactivate() {
    if (!this.#active) return { success: false, message: 'El cultivo ya está inactivo' };
    this.#active = false;
    return { success: true };
  }

  getInfo() { throw new Error('getInfo() debe implementarse'); }
  getType() { return this.constructor.name; }
}

// Clases derivadas
class ItemType1 extends BaseItem {
  #cropType;
  #quantity;

  constructor(name, location, cropType, quantity) {
    super(name, location);
    this.#cropType = cropType;
    this.#quantity = quantity;
  }

  get cropType() { return this.#cropType; }
  get quantity() { return this.#quantity; }

  getInfo() {
    return {
      id: this.id,
      name: this.name,
      type: this.getType(),
      location: this.location,
      cropType: this.#cropType,
      quantity: this.#quantity,
      active: this.isActive
    };
  }
}

class ItemType2 extends BaseItem {
  #cropType;
  #area;

  constructor(name, location, cropType, area) {
    super(name, location);
    this.#cropType = cropType;
    this.#area = area;
  }

  get cropType() { return this.#cropType; }
  get area() { return this.#area; }

  getInfo() {
    return {
      id: this.id,
      name: this.name,
      type: this.getType(),
      location: this.location,
      cropType: this.#cropType,
      area: this.#area,
      active: this.isActive
    };
  }
}

class ItemType3 extends BaseItem {
  #cropType;
  #notes;

  constructor(name, location, cropType, notes) {
    super(name, location);
    this.#cropType = cropType;
    this.#notes = notes;
  }

  get cropType() { return this.#cropType; }
  get notes() { return this.#notes; }

  getInfo() {
    return {
      id: this.id,
      name: this.name,
      type: this.getType(),
      location: this.location,
      cropType: this.#cropType,
      notes: this.#notes,
      active: this.isActive
    };
  }
}

// =======================
// Clase Person y Roles
// =======================
class Person {
  #id;
  #name;
  #email;
  #registrationDate;

  constructor(name, email) {
    this.#id = crypto.randomUUID();
    this.#name = name;
    this.#email = email;
    this.#registrationDate = new Date().toISOString();
  }

  get id() { return this.#id; }
  get name() { return this.#name; }
  get email() { return this.#email; }
  get registrationDate() { return this.#registrationDate; }

  set email(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) throw new Error('Email inválido');
    this.#email = value;
  }

  getInfo() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      registrationDate: this.registrationDate
    };
  }
}

// Roles de usuario
class UserRole1 extends Person {
  #roleName = 'Rol 1';
  get role() { return this.#roleName; }
}

class UserRole2 extends Person {
  #roleName = 'Rol 2';
  get role() { return this.#roleName; }
}

// =======================
// Sistema Principal
// =======================
class MainSystem {
  #items = [];
  #users = [];

  static {
    this.VERSION = '1.0.0';
    this.MAX_ITEMS = 1000;
    this.SYSTEM_NAME = 'Sistema de Cultivos';
  }

  addItem(item) {
    if (!(item instanceof BaseItem)) return { success: false, message: 'Debe ser un BaseItem' };
    this.#items.push(item);
    return { success: true, item };
  }

  removeItem(id) {
    const index = this.#items.findIndex(i => i.id === id);
    if (index === -1) return { success: false };
    const removed = this.#items.splice(index, 1)[0];
    return { success: true, item: removed };
  }

  findItem(id) { return this.#items.find(i => i.id === id) ?? null; }
  getAllItems() { return [...this.#items]; }

  addUser(user) {
    if (!(user instanceof Person)) return { success: false };
    this.#users.push(user);
    return { success: true, user };
  }
  getAllUsers() { return [...this.#users]; }
  findUserByEmail(email) { return this.#users.find(u => u.email === email) ?? null; }
  getStats() {
    const total = this.#items.length;
    const active = this.#items.filter(i => i.isActive).length;
    return {
      total,
      active,
      inactive: total - active,
      users: this.#users.length
    };
  }
}

// =======================
// Instancia del Sistema
// =======================
const system = new MainSystem();

// =======================
// DOM Elements
// =======================
const itemList = document.getElementById('item-list');
const addItemBtn = document.getElementById('add-item-btn');
const itemModal = document.getElementById('item-modal');
const closeModalBtn = document.getElementById('close-modal');
const itemForm = document.getElementById('item-form');

const userList = document.getElementById('user-list');
const addUserBtn = document.getElementById('add-user-btn');
const userModal = document.getElementById('user-modal');
const closeUserModalBtn = document.getElementById('close-user-modal');
const userForm = document.getElementById('user-form');

const statTotal = document.getElementById('stat-total');
const statActive = document.getElementById('stat-active');
const statInactive = document.getElementById('stat-inactive');
const statUsers = document.getElementById('stat-users');

// =======================
// Funciones Render
// =======================
function renderItems() {
  const items = system.getAllItems();
  itemList.innerHTML = items.map(item => `
    <div class="item" data-id="${item.id}">
      <strong>${item.name}</strong> | ${item.getType()} | ${item.location} |
      ${item.isActive ? 'Activo' : 'Inactivo'}
      <button class="btn-toggle">Toggle</button>
      <button class="btn-delete">Eliminar</button>
    </div>
  `).join('');
  renderStats();
}

function renderUsers() {
  const users = system.getAllUsers();
  userList.innerHTML = users.map(u => `
    <div class="user">
      <strong>${u.name}</strong> | ${u.email} | ${u.role ?? 'N/A'}
    </div>
  `).join('');
}

function renderStats() {
  const stats = system.getStats();
  statTotal.textContent = stats.total;
  statActive.textContent = stats.active;
  statInactive.textContent = stats.inactive;
  statUsers.textContent = stats.users;
}

// =======================
// Eventos Botones
// =======================

// Mostrar modales
addItemBtn.addEventListener('click', () => itemModal.style.display = 'block');
closeModalBtn.addEventListener('click', () => itemModal.style.display = 'none');

addUserBtn.addEventListener('click', () => userModal.style.display = 'block');
closeUserModalBtn.addEventListener('click', () => userModal.style.display = 'none');

// Agregar Cultivo
itemForm.addEventListener('submit', e => {
  e.preventDefault();
  const type = document.getElementById('item-type').value;
  const name = document.getElementById('item-name').value;
  const location = document.getElementById('item-location').value;
  let newItem;

  if (type === 'ItemType1') newItem = new ItemType1(name, location, 'Tipo1', 100);
  else if (type === 'ItemType2') newItem = new ItemType2(name, location, 'Tipo2', 50);
  else if (type === 'ItemType3') newItem = new ItemType3(name, location, 'Tipo3', 'Sin notas');

  if (newItem) {
    system.addItem(newItem);
    renderItems();
    itemModal.style.display = 'none';
    itemForm.reset();
  }
});

// Agregar Usuario
userForm.addEventListener('submit', e => {
  e.preventDefault();
  const role = document.getElementById('user-role').value;
  const name = document.getElementById('user-name').value;
  const email = document.getElementById('user-email').value;
  let newUser;

  if (role === 'UserRole1') newUser = new UserRole1(name, email);
  else if (role === 'UserRole2') newUser = new UserRole2(name, email);

  if (newUser) {
    system.addUser(newUser);
    renderUsers();
    renderStats();
    userModal.style.display = 'none';
    userForm.reset();
  }
});

// Toggle y Delete Items
itemList.addEventListener('click', e => {
  const id = e.target.closest('.item')?.dataset.id;
  if (!id) return;
  const item = system.findItem(id);
  if (!item) return;

  if (e.target.classList.contains('btn-toggle')) {
    item.isActive ? item.deactivate() : item.activate();
    renderItems();
  }
  if (e.target.classList.contains('btn-delete')) {
    system.removeItem(id);
    renderItems();
  }
});

// Inicializar render
renderItems();
renderUsers();