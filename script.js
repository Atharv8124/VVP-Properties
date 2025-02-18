document.addEventListener("DOMContentLoaded", function () {
    const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS5fCQozIgHMkzAw-FeP1QQvCi-AZQ0e9awWadvgxCL7-pYBjdXn_8E8nnsxvwwGdF615O_NAl77Uhm/pub?output=csv"; 

    fetch(sheetURL)
        .then(response => response.text())
        .then(data => {
            let rows = data.split("\n").slice(1); // Skip header row
            let propertyList = document.getElementById("property-list");

            rows.forEach(row => {
                let columns = row.split(",");
                let propertyType = columns[0];
                let area = columns[1];
                let price = columns[2];
                let imageUrl = columns[3].replace(/"/g, ''); // Remove quotes

                let propertyDiv = document.createElement("div");
                propertyDiv.classList.add("property");
                propertyDiv.innerHTML = `
                    <h3>${propertyType}</h3>
                    <p>Area: ${area}</p>
                    <p>Price: ${price}</p>
                    <img src="${imageUrl}" alt="Property Image" width="200">
                `;
                propertyList.appendChild(propertyDiv);
            });
        })
        .catch(error => console.error("Error loading data:", error));
});
