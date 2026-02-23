/* ============================================
   INTERACTIVE BUSINESS CARD
   Dominio: Sistema de Trazabilidad Agrícola
   ============================================ */

// ============================================
// 1️⃣ Datos del Sistema
// ============================================

const profileData = {
  name: "Sistema de Trazabilidad Agrícola",
  title: "Plataforma de Monitoreo y Control de Producción",
  location: "Colombia - Sector Agroindustrial",
  bio: "Sistema digital diseñado para rastrear productos agrícolas desde la siembra hasta la distribución final. Permite garantizar calidad, seguridad alimentaria y transparencia en la cadena de suministro.",

  contact: {
    email: "soporte@trazabilidadagricola.com",
    phone: "+57 310 456 7890"
  },

  skills: [
    { name: "Registro de Siembra", level: 95 },
    { name: "Control de Calidad", level: 90 },
    { name: "Seguimiento por Lotes", level: 92 },
    { name: "Monitoreo de Transporte", level: 85 },
    { name: "Certificación Orgánica", level: 80 }
  ],

  
   social: [
  { name: "Portal Web", url: "https://www.fao.org", icon: "🌐" },
  { name: "Soporte Técnico", url: "https://wa.me/573104567890", icon: "🛠" }
],

  stats: {
    projects: 120,           // Total lotes registrados
    certifications: 45,      // Certificaciones emitidas
    experience: "5 Years",   // Años de implementación
    rating: 4.9              // Nivel de satisfacción
  }
};

// ============================================
// 2️⃣ Referencias al DOM (IDs del HTML)
// ============================================

const userName = document.getElementById("userName");
const userTitle = document.getElementById("userTitle");
const userLocation = document.getElementById("userLocation");
const userBio = document.getElementById("userBio");
const userEmail = document.getElementById("userEmail");
const userPhone = document.getElementById("userPhone");
const skillsList = document.getElementById("skillsList");
const socialLinks = document.getElementById("socialLinks");
const statsContainer = document.getElementById("stats");

const themeToggle = document.getElementById("themeToggle");
const copyEmailBtn = document.getElementById("copyEmailBtn");
const toggleSkillsBtn = document.getElementById("toggleSkills");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

// ============================================
// 3️⃣ Renderizar Información Principal
// ============================================

const renderProfile = () => {
  const {
    name,
    title,
    location,
    bio,
    contact: { email, phone }
  } = profileData;

  userName.textContent = name;
  userTitle.textContent = title;
  userLocation.textContent = `📍 ${location}`;
  userBio.textContent = bio;

  userEmail.innerHTML = `
    <a href="mailto:${email}">
      ${email}
    </a>
  `;

  userPhone.innerHTML = `
    <a href="tel:${phone.replace(/\s+/g, '')}">
      ${phone}
    </a>
  `;
};


// ============================================
// 4️⃣ Renderizar Módulos del Sistema (Skills)
// ============================================

let showAllSkills = false;

const renderSkills = () => {
  const skillsToShow = showAllSkills
    ? profileData.skills
    : profileData.skills.slice(0, 3);

  skillsList.innerHTML = skillsToShow
    .map(
      ({ name, level }) => `
      <div class="skill-item">
        <span>${name}</span>
        <div class="skill-bar">
          <div class="skill-fill" style="width:${level}%"></div>
        </div>
      </div>
    `
    )
    .join("");

  toggleSkillsBtn.textContent = showAllSkills
    ? "Mostrar menos"
    : "Mostrar más";
};

const toggleSkills = () => {
  showAllSkills = !showAllSkills;
  renderSkills();
};

// ============================================
// 5️⃣ Renderizar Enlaces
// ============================================

const renderSocial = () => {
  socialLinks.innerHTML = profileData.social
    .map(
      ({ name, url, icon }) => `
      <a href="${url}" target="_blank" class="social-item">
        ${icon} ${name}
      </a>
    `
    )
    .join("");
};

// ============================================
// 6️⃣ Renderizar Estadísticas
// ============================================

const renderStats = () => {
  const { projects, certifications, experience, rating } =
    profileData.stats;

  const statsArray = [
    { label: "Lotes Registrados", value: projects },
    { label: "Certificaciones", value: certifications },
    { label: "Años Operando", value: experience },
    { label: "Nivel de Satisfacción", value: rating }
  ];

  statsContainer.innerHTML = statsArray
    .map(
      ({ label, value }) => `
      <div class="stat-item">
        <span class="stat-value">${value}</span>
        <span class="stat-label">${label}</span>
      </div>
    `
    )
    .join("");
};

// ============================================
// 7️⃣ Tema Claro / Oscuro
// ============================================

const toggleTheme = () => {
  document.body.classList.toggle("dark");
};

// ============================================
// 8️⃣ Copiar Email
// ============================================

const copyEmail = () => {
  navigator.clipboard.writeText(profileData.contact.email);
  showToast("Correo copiado correctamente");
};

const showToast = message => {
  toastMessage.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
};

// ============================================
// 9️⃣ Eventos
// ============================================

themeToggle.addEventListener("click", toggleTheme);
copyEmailBtn.addEventListener("click", copyEmail);
toggleSkillsBtn.addEventListener("click", toggleSkills);

// ============================================
// 🔟 Inicialización
// ============================================

const init = () => {
  renderProfile();
  renderSkills();
  renderSocial();
  renderStats();
};

init();