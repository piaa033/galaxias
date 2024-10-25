let btn = document.getElementById("btnBuscar");
let contenedor = document.getElementById("contenedor");

btn.addEventListener("click", function() {
    let busqueda = document.getElementById("inputBuscar").value;
    if (busqueda === "") {
        alert("¡Realice su búsqueda!");
    } else {
        fetch(`https://images-api.nasa.gov/search?q=${busqueda}`)
            .then(response => response.json())
            .then(data => {
                contenedor.innerHTML = ""; // Limpia el contenedor antes de mostrar nuevos resultados

                if (data.collection.items.length > 0) { // Verifica que haya resultados
                    let info = data.collection.items;
                    for (let i = 0; i < info.length; i++) {
                        const info_part = info[i].data[0];
                        console.log(info_part.title); // Accede al título correctamente

                        // Crea la tarjeta
                        const div = document.createElement("div"); // Div de cada tarjeta
                        div.className = "card col-md-4"; // Usa col-md-4 para tres tarjetas en una fila

                        // Crea los elementos para mostrar la información
                        const img = document.createElement("img");
                        img.src = info[i].links[0].href; // Asegúrate de que la URL de la imagen esté en info[i].links
                        img.alt = info_part.title; // Texto alternativo para la imagen
                        img.className = "card-img-top"; // Asigna la clase correctamente

                        const div2 = document.createElement("div");
                        div2.className = "card-body"; // Div para el cuerpo de la tarjeta

                        const title = document.createElement("h5");
                        title.textContent = info_part.title;
                        title.className = "card-title"; // Asigna la clase correctamente

                        const description = document.createElement("p");
                        description.textContent = info_part.description || "Descripción no disponible"; // Maneja el caso si no hay descripción
                        description.className = "card-text"; // Asigna la clase correctamente

                        const dateCreated = document.createElement("p");
                        dateCreated.textContent = info_part.date_created || "Fecha no disponible"; // Maneja el caso si no hay fecha
                        dateCreated.className = "card-text"; // Asigna la clase correctamente

                        // Añade todos los elementos a la tarjeta
                        contenedor.appendChild(div);
                        div.appendChild(img);
                        div.appendChild(div2);
                        div2.appendChild(title);
                        div2.appendChild(description);
                        div2.appendChild(dateCreated);
                    }
                } else {
                    console.log("No se encontraron resultados.");
                }
            })
            .catch(error => console.error('Error:', error)); // Manejo de errores
    }
});
