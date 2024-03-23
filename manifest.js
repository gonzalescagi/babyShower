var queryParams = new URLSearchParams(window.location.search);
var phoneParam = queryParams.get('phone');

var manifest = {
  "name": "Baby Shower",
  "short_name": "Baby Shower",
  "start_url": "babyShower/" + (phoneParam ? "?phone=" + phoneParam : ""),
  "display": "fullscreen",
  "background_color": "#d9efec",
  "theme_color": "#d9efec",
  "icons": [
    {
      "src": "icono.png",
      "sizes": "144x144",
      "type": "image/png"
    }
  ]
};

// Crear un elemento 'link' para el archivo de manifiesto
var link = document.createElement('link');
link.rel = 'manifest';
link.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(manifest));

// Agregar el elemento 'link' al 'head' del documento
document.head.appendChild(link);



