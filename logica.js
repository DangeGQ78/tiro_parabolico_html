var Vix;
var Viy;
var tiempoSubida;
var tiempoTotal;
var posicionHorizontal;
var posicionVertical;
var tiempoTranscurrido;
var intervaloMovimiento;
var gravedad = 9.8;
var distanciaHorizontalMaxima;
var alturaMaxima;


function trayectoria() {
    var velocidadInicial = parseFloat(document.getElementById("vi").value);
    var anguloLanzamiento = parseFloat(document.getElementById("angulo").value);
    const hr = document.getElementsByTagName('hr'); 
    const area = document.getElementById("area");
    gravedad = parseFloat(9.8);
    var anguloRadianes = anguloLanzamiento * (Math.PI / 180);

    var imgs = area.querySelectorAll("img");

    for (var i = 0; i < imgs.length; i++) {
        area.removeChild(imgs[i]);
    }

    // Cálcula la velocidad inicial tanto en el eje x como y
    Vix = velocidadInicial * Math.cos(anguloRadianes).toFixed(2);
    Viy = velocidadInicial * Math.sin(anguloRadianes).toFixed(2);

    // calculo de tiempo
    tiempoSubida = (Viy / gravedad).toFixed(2);
    tiempoTotal = (tiempoSubida * 2).toFixed(2);

    // Cálcula la distancia y altura maxima
    distanciaHorizontalMaxima = ((Math.pow(velocidadInicial, 2) * Math.sin(2 * anguloRadianes)) / gravedad).toFixed(2);
    alturaMaxima = ((Math.pow(velocidadInicial, 2) * Math.pow(Math.sin(anguloRadianes), 2)) / (2 * gravedad)).toFixed(2);
    
    // Generar las imágenes de la trayectoria
    for (tiempoTranscurrido = 0; tiempoTranscurrido <= tiempoTotal; tiempoTranscurrido += 0.5) {
        posicionHorizontal = Vix * tiempoTranscurrido;
        posicionVertical = 400 - (Viy * tiempoTranscurrido - (gravedad * Math.pow(tiempoTranscurrido, 2)) / 2);
        var guia = document.createElement("img");
        var velocidadY = Math.abs(Viy - gravedad * tiempoTranscurrido);
        var velocidad = Math.sqrt(Math.pow(Vix, 2) + Math.pow(velocidadY, 2));
        guia.src = 'https://www.pngplay.com/wp-content/uploads/8/Gold-Vector-Star-Transparent-File.png';
        guia.style.width = 30 + "px";
        guia.style.position = "absolute";
        let posicionHuecoHTML = hr[0].offsetTop - 447 + posicionVertical;
        guia.style.top = posicionHuecoHTML + "px";
        guia.style.left = posicionHorizontal + "px";
        guia.title = `velx:${Vix},vely:${velocidadY},vel:${velocidad}`;

        area.appendChild(guia);
    }    
    animacionPelota();
    
}

function animacionPelota() {  
    if (intervaloMovimiento) {
        clearInterval(intervaloMovimiento);
      }

    // Obtiene los valores de entrada del usuario
    var velocidadInicial = parseFloat(document.getElementById("vi").value);
    var anguloLanzamiento = parseFloat(document.getElementById("angulo").value);
    gravedad = parseFloat(9.8);
    

    // Convierte el ángulo de lanzamiento de grados a radianes
    var anguloRadianes = anguloLanzamiento * (Math.PI / 180);

    // Calcula las componentes de la velocidad inicial en X y Y
    Vix = (velocidadInicial * Math.cos(anguloRadianes)).toFixed(2);
    Viy = (velocidadInicial * Math.sin(anguloRadianes)).toFixed(2);

    // Calcula el tiempo de subida y el tiempo total de vuelo
    tiempoSubida = (Viy / gravedad).toFixed(2);
    tiempoTotal = (tiempoSubida * 2).toFixed(2);

    // Calcula la altura máxima alcanzada y la distancia horizontal máxima
    distanciaHorizontalMaxima = ((Math.pow(velocidadInicial, 2) * Math.sin(2 * anguloRadianes)) / gravedad).toFixed(2);
    alturaMaxima = ((Math.pow(velocidadInicial, 2) * Math.pow(Math.sin(anguloRadianes), 2)) / (2 * gravedad)).toFixed(2);

    // Reinicia el tiempo transcurrido a cero
    tiempoTranscurrido = 0;

    // Crea el intervalo de tiempo para actualizar la posición de la pelota
    intervaloMovimiento = setInterval(desplazar, 10);

    // crea la animacion
    var area = document.getElementById("area");
    var imagenes = area.querySelectorAll("bola");
    for (var i = 0; i < imagenes.length; i++) {
        area.removeChild(imagenes[i]);
    }

     // todas los resultados
     var info = document.getElementById("info");
     info.className = "card1";
     info.innerHTML = `
         Vi = ${velocidadInicial} m/s<br>
         Theta = ${anguloLanzamiento.toFixed(2)}°<br>
         Theta en Radianes = ${anguloRadianes.toFixed(2)} rad<br>
         Vix = ${Vix} m/s<br>
         Viy = ${Viy} m/s<br>
         Ts = ${tiempoSubida} s<br>
         Tt = ${tiempoTotal} s<br>
         Xmax = ${distanciaHorizontalMaxima} m<br>
         Ymax = ${alturaMaxima} m<br>
     `;
 

}

   
function desplazar() {
   
    // Obtiene los elementos relevantes de la página
    var hr = document.getElementsByTagName("hr");
    var pelota = document.getElementById("bola");

    // Si todavía no se ha alcanzado el tiempo total de vuelo
    if (tiempoTranscurrido <= tiempoTotal) {
        // Calcula la posición de la pelota en el tiempo actual
        posicionHorizontal = Vix * tiempoTranscurrido;
        posicionVertical = 400 - (Viy * tiempoTranscurrido - (gravedad * Math.pow(tiempoTranscurrido, 2)) / 2);

        // Actualiza la posición de la pelota en la página
        pelota.style.left = posicionHorizontal + "px";
        pelota.style.top = (hr[0].offsetTop - 447 + posicionVertical) + "px";       
        
    }

    // Incrementa el tiempo transcurrido
    tiempoTranscurrido += 0.1;
}
