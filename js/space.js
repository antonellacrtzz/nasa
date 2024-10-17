document.getElementById("btnBuscar").addEventListener("click", () => {
    const query = document.getElementById("inputBuscar").value.trim();
  
    if (query) {
      fetch(`https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
          const results = data.collection.items;
          const contenedor = document.getElementById("contenedor");
  
          // Limpiar resultados anteriores
          contenedor.innerHTML = "";
  
          // Comprobar si hay resultados
          if (results.length > 0) {
            results.forEach(item => {
              const title = item.data[0].title;
              const description = item.data[0].description || "No hay descripción disponible.";
              const date = item.data[0].date_created ? new Date(item.data[0].date_created).toLocaleDateString() : "Fecha no disponible";
              const imageUrl = item.links ? item.links[0].href : "";
  
              // Crear un elemento para cada imagen
              const imageElement = document.createElement("div");
              imageElement.classList.add("col-md-4", "mb-4");
              imageElement.innerHTML = `
                <div class="card">
                  <img src="${imageUrl}" class="card-img-top" alt="${title}">
                  <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${description}</p>
                    <p class="card-text"><small class="text-muted">Fecha: ${date}</small></p>
                  </div>
                </div>
              `;
              contenedor.appendChild(imageElement);
            });
          } else {
            contenedor.innerHTML = "<p class='text-center'>No se encontraron resultados.</p>";
          }
        })
        .catch(error => {
          console.error("Error fetching data from NASA API:", error);
          contenedor.innerHTML = "<p class='text-center text-danger'>Error al cargar las imágenes. Intente nuevamente más tarde.</p>";
        });
    } else {
      alert("Por favor, ingresa un término de búsqueda.");
    }
  });
  