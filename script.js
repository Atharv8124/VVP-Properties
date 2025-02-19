document.addEventListener("DOMContentLoaded", function () {
    const sheetURL = "https://docs.google.com/spreadsheets/d/1iiboOVp4fSGwxIeZ9hTUPlcVZ2ZeYH5JzHGkygtLQwA/gviz/tq?tqx=out:json";
    const areaSelect = document.getElementById("areaSelect");
    const saleRentSelect = document.getElementById("saleRentSelect");
    const propertyList = document.getElementById("propertyList");

    fetch(sheetURL)
        .then(response => response.text())
        .then(data => {
            // Clean up Google Sheets response
            const jsonData = JSON.parse(data.substring(47, data.length - 2));
            const rows = jsonData.table.rows;

            // Convert rows to structured data
            let properties = rows.map(row => ({
                area: row.c[0]?.v || "",
                type: row.c[1]?.v || "",
                saleRent: row.c[2]?.v || "",
                price: row.c[3]?.v || "",
                image: row.c[4]?.v || ""
            }));

            // Populate "Area" dropdown with unique values
            let areas = [...new Set(properties.map(p => p.area))];
            areas.forEach(area => {
                let option = document.createElement("option");
                option.value = area;
                option.textContent = area;
                areaSelect.appendChild(option);
            });

            // When an area is selected
            areaSelect.addEventListener("change", function () {
                saleRentSelect.disabled = false; // Enable Sale/Rent dropdown
                saleRentSelect.value = ""; // Reset Sale/Rent dropdown
                propertyList.innerHTML = ""; // Clear previous listings
            });

            // When Sale/Rent is selected
            saleRentSelect.addEventListener("change", function () {
                let selectedArea = areaSelect.value;
                let selectedSaleRent = saleRentSelect.value;
                let filteredProperties = properties.filter(p => p.area === selectedArea && p.saleRent === selectedSaleRent);

                // Display properties
                propertyList.innerHTML = filteredProperties.map(property => `
                    <div style="border: 1px solid #ccc; padding: 10px; margin: 10px;">
                        <h3>${property.type} - ₹${property.price}</h3>
                        <p><strong>Location:</strong> ${property.area}</p>
                        <p><strong>Category:</strong> ${property.saleRent}</p>
                        <img src="${property.image}" alt="Property Image" style="width: 300px; height: 200px;">
                    </div>
                `).join("");
            });
        })
        .catch(error => console.error("Error fetching data:", error));
});
