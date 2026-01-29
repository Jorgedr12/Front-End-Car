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

let usuarios = [
    {
        id: 1,
        nombre: "admin",
        contraseña: "admin",
    }
];

function init() {
    localStorage.clear();

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
    if (document.getElementById('filtro-favoritos')) {
        document.getElementById('filtro-favoritos').addEventListener('change', function (event) {
            const valor = event.target.value;
            
            let ListaAutosFavoritos = autos.filter(auto => auto.liked);

            if (valor === "favoritos") {
                ListaAutosFavoritos.sort((auto1, auto2) => auto2.favoritos - auto1.favoritos);
            } else if (valor === "inpopulares") {
                ListaAutosFavoritos.sort((auto1, auto2) => auto1.favoritos - auto2.favoritos);
            }
            TusFavoritos(ListaAutosFavoritos);
        }
        );
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

    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios_db')) || usuarios;
    let usuarioEncontrado = null;
    
    for (const user of usuariosRegistrados) {
        if (user.nombre === nombreInput && user.contraseña === passInput) {
            usuarioEncontrado = user;
            break;
        }
    }

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
    const nombreInput = document.getElementById('Usuario').value;
    const passInput = document.getElementById('contraseña').value;
    if (nombreInput === "" || passInput === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios_db')) || [];
    let usuarioExistente = null;
    
    for (const user of usuariosRegistrados) {
        if (user.nombre === nombreInput) {
            usuarioExistente = user;
            break;
        }
    }

    if (usuarioExistente) {
        alert("El nombre de usuario ya está en uso. Por favor, elige otro.");
        return;
    }

    const nuevoUsuario = {
        id: usuariosRegistrados.length + 1,
        nombre: nombreInput,
        contraseña: passInput
    };

    usuariosRegistrados.push(nuevoUsuario);
    
    localStorage.setItem('usuarios_db', JSON.stringify(usuariosRegistrados));
    
    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    
    window.location.href = "login.html";

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

function TusFavoritos(ListaAutosFavoritos ) {
    const contenedor = document.getElementById('contenedor-favoritos'); {


        if (!contenedor) {
            console.error("Contenedor de favoritos no encontrado.");
            console.log("Contenedor de favoritos no encontrado.");

        }
        contenedor.innerHTML = "";
        const autosFavoritos = ListaAutosFavoritos || autos.filter(auto => auto.liked);

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



