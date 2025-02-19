document.addEventListener("DOMContentLoaded", function () {
    const areaSelect = document.getElementById("area-select");
    const statusSelect = document.getElementById("type-select");
    const propertyList = document.getElementById("propertyList");

    let propertiesData = [];

    // Load properties from JSON
    fetch("properties.json")
        .then(response => response.json())
        .then(data => {
            propertiesData = data;
        })
        .catch(error => console.error("Error loading properties:", error));

    // Enable type-select when area is chosen
    areaSelect.addEventListener("change", function () {
        statusSelect.disabled = false;
        propertyList.innerHTML = "";
    });

    // Event listener for status selection
    statusSelect.addEventListener("change", function () {
        displayProperties();
    });

    // Function to display filtered properties
    function displayProperties() {
        const selectedArea = areaSelect.value;
        const selectedStatus = statusSelect.value;
        propertyList.innerHTML = "";

        const filteredProperties = propertiesData.filter(property =>
            property.area === selectedArea && property.status === selectedStatus
        );

        if (filteredProperties.length === 0) {
            propertyList.innerHTML = "<p>No properties found.</p>";
            return;
        }

        filteredProperties.forEach(property => {
            let propertyCard = document.createElement("div");
            propertyCard.classList.add("property-card");

            let imagesHTML = `<div class="image-slider">`;
            property.images.forEach((img, index) => {
                imagesHTML += `<img src="${img}" class="property-image ${index === 0 ? 'active' : ''}" alt="Property Image" onclick="openCarousel('${img}')">`;
            });
            imagesHTML += `</div>`;

            propertyCard.innerHTML = `
                <h3>${property.type} - ${property.status}</h3>
                ${imagesHTML}
                <p><strong>Price:</strong> ${property.price}</p>
                <p>${property.description}</p>
            `;
            propertyList.appendChild(propertyCard);
        });
    }
});

// Function to open and close image carousel
function openCarousel(imageSrc) {
    document.getElementById("carousel-image").src = imageSrc;
    document.getElementById("carousel").style.display = "block";
}

function closeCarousel() {
    document.getElementById("carousel").style.display = "none";
}
