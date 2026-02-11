/* =====================================================
   PAGE INITIALIZATION
   This runs once the HTML document is fully loaded.
===================================================== */
document.addEventListener("DOMContentLoaded", function () {

    // ---------------------------------------------
    // Set current year in footer automatically
    // ---------------------------------------------
    const dateSpan = document.getElementById("currentDate");

    if (dateSpan) {
        // Gets the current year (e.g., 2026)
        dateSpan.textContent = new Date().getFullYear();
    }

    // ---------------------------------------------
    // Profile Page: Show image after 10 seconds
    // ---------------------------------------------
    const img = document.getElementById("profileImage");

    if (img) {
        // Hide image first
        img.style.display = "none";

        // Show image after 10,000 milliseconds (10 seconds)
        setTimeout(() => {
            img.style.display = "block";
        }, 10000);
    }

    // ---------------------------------------------
    // If staff page exists, display staff data
    // ---------------------------------------------
    if (document.getElementById("staffList")) {
        displayStaff();
    }
});


/* =====================================================
   MARK TO GRADE CONVERTER
===================================================== */

function markToGrade() {

    // Get user input
    const input = document.getElementById("mark-input-box").value;

    // Elements for messages
    const validation = document.getElementById("validationmessage");
    const result = document.getElementById("gradeResult");

    // Clear previous messages
    validation.textContent = "";
    result.textContent = "";

    // ---------------- VALIDATION SECTION ----------------

    // Check if input is empty
    if (input.trim() === "") {
        validation.textContent = "You must enter a mark.";
        return;
    }

    // Check if input is NOT a number
    if (isNaN(input)) {
        validation.textContent = "Invalid input: Mark must be a number.";
        return;
    }

    // Convert input to a number
    const mark = parseFloat(input);

    // Check if mark is negative
    if (mark < 0) {
        validation.textContent = "Invalid input: Mark cannot be negative.";
        return;
    }

    // Check if mark exceeds 100
    if (mark > 100) {
        validation.textContent = "Invalid input: Mark cannot be greater than 100.";
        return;
    }

    // ---------------- GRADE CONVERSION ----------------

    let grade;

    if (mark >= 90) grade = "A";
    else if (mark >= 80) grade = "B";
    else if (mark >= 70) grade = "C";
    else if (mark >= 60) grade = "D";
    else if (mark >= 50) grade = "E";
    else grade = "F";

    // Display final grade
    result.textContent = "Final Grade: " + grade;
}


/* =====================================================
   STAFF PAGE
   Data must not be modified
===================================================== */

// Provided dataset
var dataSet = [
    [ "Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000" ],
    [ "Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500" ],
    [ "Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900" ],
    [ "Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500" ],
    [ "Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600" ],
    // ... rest of data unchanged
];

// Variables used to toggle sorting direction
let nameAsc = true;
let salaryAsc = true;


/* -----------------------------------------------------
   Display Staff Information
----------------------------------------------------- */
function displayStaff() {

    const container = document.getElementById("staffList");
    if (!container) return;

    container.innerHTML = ""; // Clear previous display

    // Loop through dataset
    dataSet.forEach(staff => {

        // staff[0] = Name
        // staff[1] = Position
        // staff[2] = City
        // staff[5] = Salary

        container.innerHTML += `
            <div class="staffCard">
                <p><strong>Name:</strong> ${staff[0]}</p>
                <p><strong>Position:</strong> ${staff[1]}</p>
                <p><strong>City:</strong> ${staff[2]}</p>
                <p><strong>Salary:</strong> ${staff[5]}</p>
            </div>
        `;
    });
}


/* -----------------------------------------------------
   Sort by Name (Ascending / Descending Toggle)
----------------------------------------------------- */
function sortByName() {

    dataSet.sort((a, b) =>

        // If nameAsc is true → sort A-Z
        // If false → sort Z-A
        nameAsc
            ? a[0].localeCompare(b[0])
            : b[0].localeCompare(a[0])
    );

    // Toggle direction for next click
    nameAsc = !nameAsc;

    // Refresh display
    displayStaff();
}


/* -----------------------------------------------------
   Sort by Salary (Ascending / Descending Toggle)
----------------------------------------------------- */
function sortBySalary() {

    dataSet.sort((a, b) => {

        // Remove "$" and "," from salary string
        // Example: "$372,000" → "372000"
        let salaryA = parseInt(a[5].replace(/[$,]/g, ""));
        let salaryB = parseInt(b[5].replace(/[$,]/g, ""));

        // Compare numbers
        return salaryAsc
            ? salaryA - salaryB      // Low → High
            : salaryB - salaryA;     // High → Low
    });

    // Toggle direction for next click
    salaryAsc = !salaryAsc;

    displayStaff();
}


/* =====================================================
   TEMPERATURE CONVERTER
===================================================== */

function convertTemperature() {

    // Get numeric value entered
    const value = parseFloat(document.getElementById("temperatureInput").value);

    // Get selected temperature type (C, F, K)
    const type = document.getElementById("temperatureType").value;

    const result = document.getElementById("tempResult");

    // Validate input
    if (isNaN(value)) {
        result.textContent = "Please enter a valid temperature.";
        return;
    }

    let c, f, k;

    // ---------------- Conversion Logic ----------------

    if (type === "C") {
        // Celsius input
        c = value;
        f = (c * 9/5) + 32;
        k = c + 273.15;
    }
    else if (type === "F") {
        // Fahrenheit input
        f = value;
        c = (f - 32) * 5/9;
        k = c + 273.15;
    }
    else {
        // Kelvin input
        k = value;
        c = k - 273.15;
        f = (c * 9/5) + 32;
    }

    // Display results rounded to 2 decimals
    result.textContent =
        `Celsius: ${c.toFixed(2)}°C | 
         Fahrenheit: ${f.toFixed(2)}°F | 
         Kelvin: ${k.toFixed(2)}K`;
}
