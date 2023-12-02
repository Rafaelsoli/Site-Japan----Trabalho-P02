fetch('https://json-server-web-api--astlar.repl.co/destaques',{
    method: 'GET',
})
.then(response => response.json())
.then(data => { //
    const indicatorsContainer = document.getElementById('carousel-indicators');
        const carouselInner = document.getElementById('carousel-inner');

        
        data.forEach((item, index) => {
            const indicator = document.createElement('button');
            indicator.type = 'button';
            indicator.dataset.bsTarget = '#carouselExample';
            indicator.dataset.bsSlideTo = index;
            if (index === 0) {
                indicator.className = 'active';
            }
            indicatorsContainer.appendChild(indicator);

            // Create carousel items
            const carouselItem = document.createElement('div');
            carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
            carouselItem.dataset.bsInterval = '2500';
            carouselItem.innerHTML = `
                <img src="${item.ImageUrl}" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block text-shadow">
                    <h5>${item.Titulo}</h5>
                    <p>"${item.Descricao}"</p>
                </div>
            `;
            carouselInner.appendChild(carouselItem);
        });
    })
    .catch(error => console.error('Error:', error));



fetch('https://json-server-web-api--astlar.repl.co/albuns',{
    method: 'GET',
})
.then(response => response.json())
.then(albums => { 
    let container = document.querySelector('.container .row');

    // Limpa o container
    container.innerHTML = '';

    // Cria uma div cards para cada objeto de arranjo
    albums.forEach(album => {
        let card = document.createElement('div');
        card.className = 'col-sm-4 p-3';
        card.innerHTML = `
            <a href="album.html?id=${album.id}">
                <div class="card">
                    <img class="card-img-top" src="${album.ImageUrl}">
                    <div class="card-body text-center">
                        <p class="card-text">${album.Titulo}</p>
                        <p class="card-description">${album.Descricao}</p>
                        <button class="btn btn-primary go-to-location">Mapa</button>
                    </div>
                </div>
            </a>
        `;
        container.appendChild(card);
    // Convert DMS to decimal
    var lat = dmsToDecimal(album.latidute);
    var lng = dmsToDecimal(album.longitude);

    
    // HOVER TESTE card.addEventListener('mouseover', function() 
    
    card.querySelector('.go-to-location').addEventListener('click', function(){
        event.preventDefault();
        mapbox.flyTo({ center: [lng, lat], zoom: 15 });
        document.getElementById('mapbox').scrollIntoView({behavior: "smooth"});
    });

    // Add a marker for the album location
    new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(mapbox);
});
})
.catch(error => console.error('Error:', error));

mapboxgl.accessToken = 'pk.eyJ1IjoiYXN0bGFyIiwiYSI6ImNscGxxNTZuNzAyNWQybHA4ZGl6Ym14dXQifQ.mP_5CuDOZWCKymKzSrqubw';
var mapbox = new mapboxgl.Map({
    container: 'mapbox',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [139.6917, 35.6895], // Coordinates of Tokyo, Japan
    zoom: 5

});

function dmsToDecimal(dms) {
    var parts = dms.split('° ');
    var degrees = parseFloat(parts[0]);
    var minutes = parseFloat(parts[1].split("' ")[0]) / 60;
    var seconds = parseFloat(parts[1].split("' ")[1]) / 3600;
    return degrees + minutes + seconds;
}

// pega dados do json server
fetch('https://json-server-web-api--astlar.repl.co/albuns')
    .then(response => response.json())
    .then(albums => {

        albums.forEach(function(album) {
            var lat = dmsToDecimal(album.latidute);
            var lng = dmsToDecimal(album.longitude);
            new mapboxgl.Marker()
                .setLngLat([lng, lat])
                .addTo(mapbox);
        });
    })
    .catch(error => console.error('Error:', error));



