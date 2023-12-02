console.log()

const urlParams = new URLSearchParams(window.location.search);
const selecaoDesejada = urlParams.get('id');


fetch(`https://json-server-web-api--astlar.repl.co/albuns?id=${selecaoDesejada}`,{
    method: 'GET',
})
.then(response => response.json())
.then(albums => { 
    console.log(albums)
    let container = document.querySelector('.row');

    // Limpa o container
    container.innerHTML = '';
        album = albums[0]
    // Cria uma div cards para cada objeto de arranjo
        let card = document.createElement('div');
        card.className = 'row mx-4';
        card.innerHTML = `
        <div class="col-sm-3 p-3">
        <a href="http://">
          <div class="card">
            <img class="card-img-top" src="${album.ImageUrl}" alt="${album.Titulo}">
            <div class="card-body text-center">
              <p class="card-text">${album.Titulo}</p>
            </div>
          </div>
        </a>
      </div>
        <div class="col-sm-8 p-3">
            <h4>Descrição</h4>
            <p>${album.descricao_d}</p>
            <h4>Localização</h4>
            <p>${album.latidute} <br>${album.longitude}</p>
            <h4>Data</h4>
            <p>${album.data}</p>
        </div>
        `;
        container.appendChild(card);
        }
);


fetch(`https://json-server-web-api--astlar.repl.co/itens?id=${selecaoDesejada}`,{
    method: 'GET',
})
.then(response => response.json())
.then(itens => { //
    let container = document.querySelector('.container .row');
    let carousel = document.querySelector('.carousel-inner');


    // Limpa o container
    container.innerHTML = '';
    carousel.innerHTML = '';
    
    // Pega o item do array
    item = itens[0]

    // Cria uma div cards para imagem do item
    item.ImageUrls.forEach((url, index) => {
        let card = document.createElement('div');
        let c_item = document.createElement('div');

        card.className = 'col-sm-4 p-3';

        if (index == 0)
            c_item.className = 'carousel-item active';
        else
            c_item.className = 'carousel-item';

        c_item.innerHTML = `
            <img src="${url}"/>
            <p>${item.Descricao}</p>
        `;
        carousel.appendChild(c_item);

        card.innerHTML = `
            <button type="button" data-toggle="modal" data-target="#myModal" class="btn">
                <div class="card">
                    <img class="card-img-top" src="${url}">
                    <div class="card-body text-center">
                        <p class="card-text">${item.Titulo}</p>
                    </div>
                </div>
            </a>
        `;
        container.appendChild(card);
    });
})
.catch(error => console.error('Error:', error));