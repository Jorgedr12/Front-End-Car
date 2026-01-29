let autos = [
    {
        id: 1,
        nombre: "Nissan Tsuru",
        precio: "$5,000",
        imagen: "assets/Tsuru-tuning.jpg",
        favoritos: 150
    },
    {
        id: 2,
        nombre: "Bocho Volkswagen",
        precio: "$7,000",
        imagen: "assets/bocho.jpg",
        favoritos: 10
    },
    {
        id: 3,
        nombre: "Rayo McQueen",
        precio: "$12,000",
        imagen: "assets/RayoMcQueen.png",
        favoritos: 300
    },
    {
        id: 4,
        nombre: "Burro",
        precio: "$3,000",
        imagen: "assets/burro.jpg",
        favoritos: 5
    },
    {
        id: 5,
        nombre: "Carro Dababy",
        precio: "$20,000",
        imagen: "assets/dababy.jpg",
        favoritos: 250
    },
    {
        id: 6,
        nombre: "Van Oxidada",
        precio: "$4,500",
        imagen: "assets/van-oxidada.jpg",
        favoritos: 15
    }
];

const usuarios = [
    {
        id: 1,
        nombre: "admin",
        contraseña: "admin",
    },
    {
        id: 2,
        nombre: "Usuario",
        contraseña: "contraseña123",
    }
];

function init() {

    const nombreGuardado = localStorage.getItem('usuarioLogueado');
    const itemLogin = document.getElementById('item-login');
    const itemUsuario = document.getElementById('item-usuario');
    const nombreSpan = document.getElementById('nombre-usuario');

    if (nombreGuardado) {
        if (itemLogin) itemLogin.classList.add('hidden');
        if (itemUsuario) itemUsuario.classList.remove('hidden');
        if (nombreSpan) nombreSpan.textContent = `${nombreGuardado}`;

        const datosUsuarios = localStorage.getItem(`autos_${nombreGuardado}`);
        if (datosUsuarios) {
            autos = JSON.parse(datosUsuarios);
        } else {
            autos.forEach(auto => auto.liked = false);
        }
    }

    if (document.getElementById('contenedor-autos')) {
        cargarAutos();
    }

    if (document.getElementById('contenedor-favoritos')) {
        TusFavoritos();
    }
}

document.addEventListener('DOMContentLoaded', init);

function cargarAutos() {
    const contenedor = document.getElementById('contenedor-autos');
    if (!contenedor) return;
    contenedor.innerHTML = "";

    autos.forEach(auto => {
        const colorCorazon = auto.liked ? 'text-red-500' : 'text-gray-400';

        const article = `
            <article class="bg-[#1c1c1c] rounded-md border border-white/10 overflow-hidden">
                <img src="${auto.imagen}" alt="${auto.nombre}" class="w-full h-52 object-cover">
                <div class="p-4 flex justify-between items-center">
                    <div>
                        <h3 class="text-white font-bold">${auto.nombre}</h3>
                        <p class="text-gray-400">${auto.precio}</p>
                    </div>
                    <div class="text-center text-xs">
                        <button onclick="DarFavorito(${auto.id})" class="${colorCorazon} text-2xl hover:scale-110 transition-all">
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
    if (event) {
        event.preventDefault();
    }

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

function DarFavorito(id) {
    const usuarioActivo = localStorage.getItem('usuarioLogueado');
    if (!usuarioActivo) {
        alert("Debes iniciar sesión para marcar favoritos.");
        return;
    }
    const auto = autos.find(a => a.id === id);
    if (auto) {
        auto.liked = !auto.liked;
        auto.favoritos += auto.liked ? 1 : -1;
        localStorage.setItem(`autos_${usuarioActivo}`, JSON.stringify(autos));
        cargarAutos();
        TusFavoritos();
    }
}

function TusFavoritos() {
    const contenedor = document.getElementById('contenedor-favoritos'); {


        if (!contenedor) {
            console.error("Contenedor de favoritos no encontrado.");
            console.log("Contenedor de favoritos no encontrado.");

        }
        contenedor.innerHTML = "";
        const autosFavoritos = autos.filter(auto => auto.liked);

        if (autosFavoritos.length === 0) {
            contenedor.innerHTML = "<p class='text-white'>No tienes autos favoritos.</p>";
            return;
        }
        autosFavoritos.forEach(auto => {
            const colorCorazon = auto.liked ? 'text-red-500' : 'text-gray-400';

            const article = `
            <article class="bg-[#1c1c1c] rounded-md border border-white/10 overflow-hidden">
                <img src="${auto.imagen}" alt="${auto.nombre}" class="w-full h-52 object-cover">
                <div class="p-4 flex justify-between items-center">
                    <div>
                        <h3 class="text-white font-bold">${auto.nombre}</h3>
                        <p class="text-gray-400">${auto.precio}</p>
                    </div>
                    <div class="text-center text-xs">
                    <button onclick="DarFavorito(${auto.id})" class="${colorCorazon} text-2xl hover:scale-110 transition-all">
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
}

