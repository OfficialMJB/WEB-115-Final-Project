// Validate Email Function
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log("Validating email:", email);  // Debugging output
    return emailPattern.test(email);
}

// Function to dynamically generate meal inputs
function generateMealInputs() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const mealTypes = ['Breakfast', 'Snack 1', 'Lunch', 'Snack 2', 'Dinner'];
    const mealsDiv = document.getElementById('meals');
    mealsDiv.innerHTML = '';  // Clear previous inputs if any

    days.forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.innerHTML = `<h3>${day}</h3>`;
        mealTypes.forEach(meal => {
            const inputId = `${day.toLowerCase()}-${meal.replace(/\s/g, '').toLowerCase()}`;
            dayDiv.innerHTML += `<label for="${inputId}">${meal}: </label><input type="text" id="${inputId}" name="${inputId}"><br>`;
        });
        mealsDiv.appendChild(dayDiv);
    });
}


// Function to validate inputs and generate the meal plan in a new page using document.write()
function validateAndGeneratePlan() {
    const email = document.getElementById('email').value;
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;  // Stop the function if email is invalid
    }

    const name = document.getElementById('name').value;
    const goal = document.getElementById('goal').value;

    // Open a new window
    const newWindow = window.open("", "_blank");
    newWindow.document.open();
    newWindow.document.write('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Your Meal Plan</title>');
    newWindow.document.write('<style>');
    // Include CSS directly for consistency
    newWindow.document.write(`
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4; color: #333; }
        h1, h2, h3 { color: #0073e6; }
        ul { list-style-type: none; padding: 0; }
        li { padding: 8px; margin-left: 20px; border-bottom: 1px solid #ccc; }
        button { background-color: #28a745; color: #ffffff; border: none; padding: 10px 20px; font-size: 16px; cursor: pointer; }
        button:hover { background-color: #218838; }
    `);
    newWindow.document.write('</style>');
    newWindow.document.write('</head><body>');
    newWindow.document.write(`<h1>Meal Plan for ${name}</h1><p>Weekly Goal: ${goal}</p><h2>Your Meals:</h2>`);
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const mealTypes = ['Breakfast', 'Snack 1', 'Lunch', 'Snack 2', 'Dinner'];
    days.forEach(day => {
        newWindow.document.write(`<h3>${day}</h3><ul>`);
        mealTypes.forEach(meal => {
            const mealId = `${day.toLowerCase()}-${meal.replace(/\s/g, '').toLowerCase()}`;
            const mealValue = document.getElementById(mealId).value;
            newWindow.document.write(`<li>${meal}: ${mealValue}</li>`);
        });
        newWindow.document.write('</ul>');
    });
    newWindow.document.write('<button onclick="window.print()">Print this page</button>');
    newWindow.document.write('</body></html>');
    newWindow.document.close();
}


// Add this function to your HTML to link the clear functionality if not yet implemented
function clearForm() {
    document.getElementById('mealPlannerForm').reset();
    console.log("Form cleared");  // Debugging output
}
