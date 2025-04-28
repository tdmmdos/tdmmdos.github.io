//----------------------------------------------------------------------------------------------------------------------------------
//Ubicacion
document.addEventListener("DOMContentLoaded", function () {
    const btnUbicacion = document.getElementById("pedirvan");
    const nlat = document.getElementById("nlat");
    const nlon = document.getElementById("nlon");
    const inputLatitud = document.getElementById("latitud");
    const inputLongitud = document.getElementById("longitud");

    btnUbicacion.addEventListener("click", function (event) {
        event.preventDefault();

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    // Mostrar en la página
                    nlat.textContent = lat;
                    nlon.textContent = lon;

                    nlat.style.color = "#4e75ba";
                    nlon.style.color = "#4e75ba";

                    // Guardar en los inputs ocultos
                    inputLatitud.value = lat;
                    inputLongitud.value = lon;

                    btnUbicacion.style.backgroundColor = "#838383"; 
                    //btnUbicacion.style.outline = "2px solid #4e75ba";
                    btnUbicacion.style.color = "#ffff";

                },
                function (error) {
                    alert("No pudimos obtener tu ubicación: " + error.message);
                    btnUbicacion.style.backgroundColor = "#e65542"
                }
            );
        } else {
            alert("Geolocalización no soportada por tu navegador.");
            btnUbicacion.style.backgroundColor = "#e65542"
        }
    });
});

function getFormattedDate() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0'); // Día con 2 dígitos
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Mes con 2 dígitos
    const year = currentDate.getFullYear();
    return `${day}/${month}/${year}`; // Formato DD/MM/YYYY
}
//----------------------------------------------------------------------------------------------------------------------------------
//Tiempo
document.addEventListener("DOMContentLoaded", function() {
    const timestampInput = document.getElementById("timestamp");
    timestampInput.value = getFormattedDate(); // Establecer la fecha en formato DD/MM/YYYY
});

//----------------------------------------------------------------------------------------------------------------------------------
// Mandar al form
const scriptURL = 'https://script.google.com/macros/s/AKfycbzT-poShzeO8Wsj1kFUv95ZwaXGQb6_grTbtbmd1aGZd4_XRggridQ5qphph3Z5Z4QK/exec'
const form = document.forms['my-google-sheet']

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        if (response.ok) {
            console.log('Success!', response);
            window.location.href = "Enviado.html"; // Redirigir si es exitoso
        } else {
            throw new Error("Error en la respuesta del servidor");
        }
    })
    .catch(error => {
        console.error('Error!', error.message);
        window.location.href = "Error.html"; // Redirigir si hay error
    });
});
//----------------------------------------------------------------------------------------------------------------------------------
// Cambiar link
        function generateUniqueLink() {
            const baseUrl = window.location.origin; // Obtenemos la URL base de la página
            const uniqueId = Date.now(); // Usamos el timestamp actual como identificador único
            return `${baseUrl}/formulario-${uniqueId}`; // Nueva URL única
        }

        function changeUrl() {
            const newLink = generateUniqueLink(); // Generamos un nuevo enlace
            window.history.pushState({}, '', newLink); // Cambiar solo la URL en la barra de direcciones
        }

        // Cambiar la URL cada 2 minutos
        setInterval(changeUrl, 600); // 2 minutos = 120,000 milisegundos
