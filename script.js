document.addEventListener("DOMContentLoaded", function () {
    const areaSelect = document.getElementById("areaSelect");
    const saleRentSelect = document.getElementById("saleRentSelect");
    const propertyList = document.getElementById("propertyList");

    let properties = [];

    // Fetch property data from JSON file
    fetch("properties.json")
        .then(response => response.json())
        .then(data => {
            properties = data;
            populateAreaDropdown();
        })
        .catch(error => console.error("Error loading properties:", error));

    function populateAreaDropdown() {
        const areas = [...new Set(properties.map(p => p.area))];
        areas.forEach(area => {
            const option = document.createElement("option");
            option.value = area;
            option.textContent = area;
            areaSelect.appendChild(option);
        });
    }

    // Enable Sale/Rent dropdown when an area is selected
    areaSelect.addEventListener("change", function () {
        saleRentSelect.disabled = !areaSelect.value;
        propertyList.innerHTML = "";
    });

    // Display properties based on selected Area & Sale/Rent status
    saleRentSelect.addEventListener("change", function () {
        propertyList.innerHTML = "";
        if (areaSelect.value && saleRentSelect.value) {
            const filteredProperties = properties.filter(p =>
                p.area === areaSelect.value && p.status === saleRentSelect.value
            );

            filteredProperties.forEach(property => {
                const propertyCard = document.createElement("div");
                propertyCard.classList.add("property-card");
                propertyCard.innerHTML = `
                    <h3>${property.type} - ${property.status}</h3>
                    <p>Area: ${property.area}</p>
                    <p>Price: ${property.price}</p>
                    <img src="${property.image}" alt="Property Image" width="300">
                `;
                propertyList.appendChild(propertyCard);
            });
        }
    });
});
