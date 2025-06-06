// Crear el mapa centrado en Lima
var map = L.map('map').setView([-12.0464, -77.0428], 12);

// Cargar mapa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Leer archivo CSV y mostrar los puntos
Papa.parse("estaciones.csv.csv", {
  download: true,
  header: true,
  complete: function(results) {
    let data = results.data;

    data.forEach(function(estacion) {
      if (estacion.lat && estacion.lon) {
        L.marker([parseFloat(estacion.lat), parseFloat(estacion.lon)])
          .addTo(map)
          .bindPopup(
            `<b>${estacion.nombre}</b><br>Volumen: ${estacion.volumen}<br>Fecha: ${estacion.fecha}`
          );
      }
    });

    // Si quieres agregar un gráfico:
    // generarGrafico(data);
  }
});
