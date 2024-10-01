// CO2-beregner for produkter
const productData = {
    elektronik: { telefon: 50, tv: 100, computer: 200 },
    transport: { bil: 2000, cykel: 5, tog: 500 },
    møbler: { sofa: 100, stol: 20, bord: 50 }
};

const categorySelect = document.getElementById("categorySelect");
const productSelect = document.getElementById("productSelect");
const quantityInput = document.getElementById("quantityInput");
const output = document.getElementById("output");
const calculateBtn = document.getElementById("calculateBtn");


function populateProducts() {
    const selectedCategory = categorySelect.value;
    productSelect.innerHTML = "<option value='' disabled selected>Vælg et produkt</option>";
    if (selectedCategory && productData[selectedCategory]) {
        productSelect.disabled = false;
        const products = productData[selectedCategory];
        for (let product in products) {
            const option = document.createElement("option");
            option.value = product;
            option.textContent = product;
            productSelect.appendChild(option);
        }
    } else {
        productSelect.disabled = true;
    }
}

// Beregn CO2 for det valgte produkt
calculateBtn.addEventListener("click", function () {
    const category = categorySelect.value;
    const product = productSelect.value;
    const quantity = parseInt(quantityInput.value);

    if (category && product && quantity > 0) {
        const co2PerUnit = productData[category][product];
        const totalCO2 = co2PerUnit * quantity;
        output.textContent = `CO2-udledningen for ${quantity} ${product}(er) er ${totalCO2} kg.`;
    } else {
        output.textContent = "Vælg en gyldig kategori, produkt og antal.";
    }

});

// CO2 Quiz 
const quizAnswer = document.getElementById("quiz-answer");
const quizFeedback = document.getElementById("quiz-feedback");
const submitQuizBtn = document.getElementById("submitQuizBtn");
const correctAnswer = 50; // For eksempel, CO2-udledning for en telefon

submitQuizBtn.addEventListener("click", function () {
    const userAnswer = parseInt(quizAnswer.value);
    if (!isNaN(userAnswer)) {
        if (userAnswer === correctAnswer) {
            quizFeedback.textContent = "Korrekt! En telefon udleder 50 kg CO2.";
        } else {
            quizFeedback.textContent = `Forkert. Det korrekte svar er 50 kg CO2.`;
        }
    } else {
        quizFeedback.textContent = "Indtast venligst et tal.";
    }
});

// Personlig CO2-beregner
const carUsageInput = document.getElementById("carUsage");
const electricityUsageInput = document.getElementById("electricityUsage");
const flightsInput = document.getElementById("flights");
const personalCO2Output = document.getElementById("personalCO2Output");
const calculatePersonalCO2Btn = document.getElementById("calculatePersonalCO2Btn");

calculatePersonalCO2Btn.addEventListener("click", function () {
    const carUsage = parseFloat(carUsageInput.value) || 0;
    const electricityUsage = parseFloat(electricityUsageInput.value) || 0;
    const flights = parseFloat(flightsInput.value) || 0;


    const carCO2PerKm = 0.2; // kg CO2 pr. km for en bil
    const electricityCO2PerKwh = 0.233; // kg CO2 pr. kWh
    const flightCO2PerFlight = 500; // kg CO2 pr. flyrejse

    const carCO2 = carUsage * carCO2PerKm * 52; // Uge til år
    const electricityCO2 = electricityUsage * electricityCO2PerKwh * 12; // Måned til år
    const flightCO2 = flights * flightCO2PerFlight;

    const totalPersonalCO2 = carCO2 + electricityCO2 + flightCO2;

    personalCO2Output.textContent = `Dit årlige CO2-aftryk er ${totalPersonalCO2.toFixed(2)} kg.`;
});


function initMap() {



    for (const country in co2Data) {
        const [lat, lng, co2] = co2Data[country];
        L.marker([lat, lng]).addTo(map)
            .bindPopup(`<b>${country}</b><br>CO2-udledning: ${co2} tons`)
            .openPopup();
    }
}

window.onload = initMap;
