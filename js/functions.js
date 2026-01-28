const autos = [
    {
        nombre: "Nissan Tsuru",
        precio: "$5,000",
        imagen: "assets/Tsuru-tuning.jpg",
        favoritos: 150
    },
    {
        nombre: "Bocho Volkswagen",
        precio: "$7,000",
        imagen: "assets/bocho.jpg",
        favoritos: 10
    },
    {
        nombre: "Rayo McQueen",
        precio: "$12,000",
        imagen: "assets/RayoMcQueen.png",
        favoritos: 300
    }
];

const usuarios = [
    {
        nombre: "Jorgedr",
        contraseña: "contraseña123"

    },
    {
        nombre: "Usuario",
        contraseña: "contraseña123"
    }
];

function init() {
    
    const nombreGuardado = localStorage.getItem('usuarioLogueado');
    const itemLogin = document.getElementById('item-login');
    const itemUsuario = document.getElementById('item-usuario');
    const nombreSpan = document.getElementById('nombre-usuario');

    if (nombreGuardado) {
        if(itemLogin) itemLogin.classList.add('hidden');
        if(itemUsuario) itemUsuario.classList.remove('hidden');
        if(nombreSpan) nombreSpan.textContent = `${nombreGuardado}`;
    }

    if(document.getElementById('contenedor-autos')) {
        cargarAutos();
    }
}

document.addEventListener('DOMContentLoaded', init);

function cargarAutos() {
    const contenedor = document.getElementById('contenedor-autos');

    contenedor.innerHTML = ""; 

    autos.forEach(auto => {
        const article = `
            <article class="bg-[#1c1c1c] rounded-md border border-white/10 overflow-hidden">
                <img src="${auto.imagen}" alt="${auto.nombre}" class="w-full h-52 object-cover">
                <div class="p-4 flex justify-between items-center">
                    <div>
                        <h3 class="text-white font-bold">${auto.nombre}</h3>
                        <p class="text-gray-400">${auto.precio}</p>
                    </div>
                    <div class="text-center text-xs">
                        <button class="text-gray-400 text-2xl hover:text-red-500 transition-colors">
                            ♥
                        </button>
                        <p class="text-gray-400 font-bold">${auto.favoritos}</p>
                    </div>
                </div>
            </article>
        `;
        contenedor.innerHTML += article;
    });
}

function HacerLogin(event) {
    if(event) event.preventDefault();

    const nombreInput = document.getElementById('Usuario').value;
    const passInput = document.getElementById('contraseña').value;

    const usuarioEncontrado = usuarios.find(user => 
        user.nombre === nombreInput && user.contraseña === passInput
    );

    if (usuarioEncontrado) {
        localStorage.setItem('usuarioLogueado', usuarioEncontrado.nombre);
        
        alert(`Bienvenido, ${usuarioEncontrado.nombre}!`);
        window.location.href = "index.html"; 
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
}

function cerrarSesion() {
    localStorage.removeItem('usuarioLogueado');
    alert("Sesión cerrada.");
    window.location.href = "index.html"; 
}

function RegistrarUsuario() {
    alert("Funcionalidad de registro no implementada.");
}
