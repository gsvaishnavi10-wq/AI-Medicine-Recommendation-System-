let dataset = [];

fetch("dataset.csv")
    .then(response => response.text())
    .then(data => {
        const rows = data.split("\n");
        const headers = rows[0].split(",");

        for (let i = 1; i < rows.length; i++) {
            if (rows[i].trim() === "") continue;

            const values = rows[i].split(",");
            let entry = {};

            headers.forEach((header, index) => {
                entry[header.trim()] = values[index]
                    .replace(/"/g, "")
                    .trim();
            });

            dataset.push(entry);
        }
    });

function recommendMedicine() {
    const symptom = document.getElementById("symptom").value.toLowerCase().trim();
    const resultDiv = document.getElementById("result");

    if (symptom === "") {
        resultDiv.innerHTML = "Please enter a symptom!";
        return;
    }

    const match = dataset.find(
        item => item.symptom.toLowerCase() === symptom
    );

    if (!match) {
        resultDiv.innerHTML = "No data found. Please consult a doctor.";
        return;
    }

    let output = "<h3>Recommended Medicines:</h3>";

    const medicines = match.medicines.split("|");

    medicines.forEach(med => {
        const imgName = med.toLowerCase().replace(" ", "-");
        output += `
            <div class="medicine">
                <img src="assets/images/${imgName}.png">
                <p>${med}</p>
            </div>
        `;
    });

    output += `
        <p style="color:red; font-weight:bold; margin-top:10px;">
            ${match.advice}
        </p>
    `;

    resultDiv.innerHTML = output;
}
