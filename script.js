// Crear el mapa centrado en Lima
var map = L.map('map').setView([-12.0464, -77.0428], 12);

// Cargar mapa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Agregar marcador de ejemplo
L.marker([-12.1, -77.03]).addTo(map)
  .bindPopup("Estación: Av. Arequipa<br>Volumen: 450 vehículos");
var map = L.map('map').setView([-12.0464, -77.0428], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

// Leer archivo CSV y mostrar los puntos
Papa.parse("estaciones.csv", {
  download: true,
  header: true,
  complete: function(results) {
    results.data.forEach(function(estacion) {
      if (estacion.lat && estacion.lon) {
        L.marker([parseFloat(estacion.lat), parseFloat(estacion.lon)])
          .addTo(map)
          .bindPopup(
            `<b>${estacion.nombre}</b><br>Volumen: ${estacion.volumen}<br>Fecha: ${estacion.fecha}`
          );
      }
    });
  }
});
let todasLasEstaciones = []; // Aquí se guarda todo

fetch("estaciones.json")
  .then(res => res.json())
  .then(data => {
    todasLasEstaciones = data;
    mostrarEstaciones(data);
  });

function mostrarEstaciones(estaciones) {
  map.eachLayer(layer => {
    if (layer instanceof L.Marker) map.removeLayer(layer);
  });

  estaciones.forEach(est => {
    L.marker([est.lat, est.lon])
      .addTo(map)
      .bindPopup(`<b>${est.nombre}</b><br>Volumen: ${est.volumen}<br>Fecha: ${est.fecha}`);
  });
}

function filtrarPorFecha() {
  const fechaSeleccionada = document.getElementById("filtroFecha").value;
  const filtradas = todasLasEstaciones.filter(e => e.fecha === fechaSeleccionada);
  mostrarEstaciones(filtradas);
}
function generarGrafico(estaciones) {
  const nombres = estaciones.map(e => e.nombre);
  const volumenes = estaciones.map(e => Number(e.volumen));

  const ctx = document.getElementById("graficoVolumen").getContext("2d");

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: nombres,
      datasets: [{
        label: 'Volumen Vehicular',
        data: volumenes,
        backgroundColor: 'rgba(0,123,255,0.5)'
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
fetch()
.then(data => {
  todasLasEstaciones = data;
  mostrarEstaciones(data);
  generarGrafico(data);
});
