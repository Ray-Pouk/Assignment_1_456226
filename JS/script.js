document.addEventListener("DOMContentLoaded", function () {

    const dateSpan = document.getElementById("currentDate");

    if (dateSpan) {
        // Gets the current year (e.g., 2026)
        dateSpan.textContent = new Date().getFullYear();
    }

    const img = document.getElementById("profileImage");

    if (img) {
        // Hide image first
        img.style.display = "none";

        // Show image after 10,000 milliseconds (10 seconds)
        setTimeout(() => {
            img.style.display = "block";
        }, 10000);
    }

    if (document.getElementById("staffList")) {
        displayStaff();
    }
});

function markToGrade() {

    // Get user input
    const input = document.getElementById("mark-input-box").value;

    const validation = document.getElementById("validationmessage");
    const result = document.getElementById("gradeResult");

    // Clear previous messages
    validation.textContent = "";
    result.textContent = "";

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

var dataSet = [
    [ "Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000" ],
    [ "Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500" ],
    [ "Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900" ],
    [ "Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500" ],
    [ "Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600" ],
    [ "Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560" ],
    [ "Quinn Flynn", "Support Lead", "Edinburgh", "9497", "2013/03/03", "$342,000" ],
    [ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ],
    [ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750" ],
    [ "Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000" ],
    [ "Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060" ],
    [ "Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700" ],
    [ "Charde Marshall", "Regional Director", "San Francisco", "6741", "2008/10/16", "$470,600" ],
    [ "Haley Kennedy", "Senior Marketing Designer", "London", "3597", "2012/12/18", "$313,500" ],
    [ "Tatyana Fitzpatrick", "Regional Director", "London", "1965", "2010/03/17", "$385,750" ],
    [ "Michael Silva", "Marketing Designer", "London", "1581", "2012/11/27", "$198,500" ],
    [ "Paul Byrd", "Chief Financial Officer (CFO)", "New York", "3059", "2010/06/09", "$725,000" ],
    [ "Gloria Little", "Systems Administrator", "New York", "1721", "2009/04/10", "$237,500" ],
    [ "Bradley Greer", "Software Engineer", "London", "2558", "2012/10/13", "$132,000" ],
    [ "Dai Rios", "Personnel Lead", "Edinburgh", "2290", "2012/09/26", "$217,500" ],
    [ "Jenette Caldwell", "Development Lead", "New York", "1937", "2011/09/03", "$345,000" ],
    [ "Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "6154", "2009/06/25", "$675,000" ],
    [ "Caesar Vance", "Pre-Sales Support", "New York", "8330", "2011/12/12", "$106,450" ],
    [ "Doris Wilder", "Sales Assistant", "Sidney", "3023", "2010/09/20", "$85,600" ],
    [ "Angelica Ramos", "Chief Executive Officer (CEO)", "London", "5797", "2009/10/09", "$1,200,000" ],
    [ "Gavin Joyce", "Developer", "Edinburgh", "8822", "2010/12/22", "$92,575" ],
    [ "Jennifer Chang", "Regional Director", "Singapore", "9239", "2010/11/14", "$357,650" ],
    [ "Brenden Wagner", "Software Engineer", "San Francisco", "1314", "2011/06/07", "$206,850" ],
    [ "Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "2947", "2010/03/11", "$850,000" ],
    [ "Shou Itou", "Regional Marketing", "Tokyo", "8899", "2011/08/14", "$163,000" ],
    [ "Michelle House", "Integration Specialist", "Sidney", "2769", "2011/06/02", "$95,400" ],
    [ "Suki Burks", "Developer", "London", "6832", "2009/10/22", "$114,500" ],
    [ "Prescott Bartlett", "Technical Author", "London", "3606", "2011/05/07", "$145,000" ],
    [ "Gavin Cortez", "Team Leader", "San Francisco", "2860", "2008/10/26", "$235,500" ],
    [ "Martena Mccray", "Post-Sales support", "Edinburgh", "8240", "2011/03/09", "$324,050" ],
    [ "Unity Butler", "Marketing Designer", "San Francisco", "5384", "2009/12/09", "$85,675" ]
];

let nameAsc = true;
let salaryAsc = true;

function displayStaff() {

    const container = document.getElementById("staffList");
    if (!container) return;

    container.innerHTML = ""; // Clear previous display

    dataSet.forEach(staff => {

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

function sortByName() {

    dataSet.sort((a, b) =>

        // If nameAsc is true → sort A-Z
        // If false → sort Z-A
        nameAsc
            ? a[0].localeCompare(b[0])
            : b[0].localeCompare(a[0])
    );

    nameAsc = !nameAsc;

    // Refresh display
    displayStaff();
}

function sortBySalary() {

    dataSet.sort((a, b) => {

        // Remove "$" and "," from salary string
        let salaryA = parseInt(a[5].replace(/[$,]/g, ""));
        let salaryB = parseInt(b[5].replace(/[$,]/g, ""));

        // Compare numbers
        return salaryAsc
            ? salaryA - salaryB      // Low → High
            : salaryB - salaryA;     // High → Low
    });

    salaryAsc = !salaryAsc;

    displayStaff();
}

function convertTemperature() {

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
