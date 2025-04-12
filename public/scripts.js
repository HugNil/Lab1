// Function to fetch all dishes or search based on name
async function searchAllDishes() {
    const uri = "http://localhost:5000/api/dishes"; // URI to fetch all dishes
    try {
        const response = await fetch(uri); // Fetch all dishes from the server
        const dishes = await response.json(); // Parse the response to JSON
        displayDishes(dishes);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}




// Function to display dishes in the table
function displayDishes(dishes) {
    const tableBody = document.querySelector('#dishesTable tbody');
    tableBody.innerHTML = ''; // Clear the table before adding new rows

    // Add rows for each dish
    dishes.forEach(dish => { // Create a new row for each dish
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${dish.name}</td>
            <td>${dish.ingredients.join(', ')}</td>
            <td>${dish.cookingTime} minutes</td>
            <td>${dish.origin}</td>
            <td>${dish.spiceLevel}</td>
            <td>${dish.preparationSteps.join(', ')}</td>
            <td>
                <div class="action_button">
                    <button onclick="updateDish('${dish._id}')">Update</button>
                    <button onclick="deleteDish('${dish._id}')">Delete</button>
                </div>
            </td>
        `;
        tableBody.appendChild(row); // Append the new row to the table body
    });
}




// Function to add a new dish via POST
async function addDish(event) {
    event.preventDefault(); // Prevent form submission

    // Get values from the form fields
    const name = document.getElementById('dishName').value;
    const ingredients = document.getElementById('dishIngredients').value.split(',');
    const cookingTime = document.getElementById('dishCookingTime').value;
    const origin = document.getElementById('dishOrigin').value;
    const spiceLevel = document.getElementById('dishSpiceLevel').value;
    const preparationSteps = document.getElementById('dishPreparationSteps').value.split(',');
  
    const dishData = { name, ingredients, cookingTime, origin, spiceLevel, preparationSteps }; // Object to hold the data to be sent in the request body
  
    try {
        const response = await fetch('http://localhost:5000/api/dish', { // URI to add a new dish
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dishData), // Convert the object to a JSON string
        });
  
        if (response.ok) {
            alert('Dish added successfully!');
            searchAllDishes(); // Refresh the list after adding
      } else {
            alert('Failed to add dish');
        }
        resetForm(); // Reset the form fields
    } catch (error) {
        console.error('Error adding dish:', error);
    }
}

function resetForm() {
    const form = document.getElementById('addDishForm');
    form.reset();
}





// Function to update a dish via PUT
async function updateDish(dishId) {
    const name = prompt('Enter new name for the dish:');
    if (name === null || name.trim() === "") return;

    const ingredients = prompt('Enter new ingredients for the dish (comma separated):').split(',');
    if (ingredients === null) return; 

    const cookingTime = prompt('Enter new cooking time for the dish (in minutes):');
    if (cookingTime === null || cookingTime.trim() === "") return;
    if (isNaN(cookingTime) || !Number.isInteger(Number(cookingTime))) { // Check if cooking time is a number and a whole number
        alert('Cooking time must be a whole number.');
        return;
    }
    const origin = prompt('Enter new origin for the dish:');
    if (origin === null || origin.trim() === "") return;

    const spiceLevel = prompt('Enter new spice level for the dish:');
    if (spiceLevel === null || spiceLevel.trim() === "") return;

    const preparationSteps = prompt('Enter new preparation steps for the dish (comma separated):').split(',');

    // Object to hold the data to be sent in the request body
    let jsonBody = {
        name,
        ingredients,
        cookingTime,
        origin,
        spiceLevel
    };

    // Add preparation steps only if they are provided
    if (preparationSteps.length > 0 && preparationSteps[0].trim() !== "") {
        jsonBody.preparationSteps = preparationSteps;
    }

    // Control if all required fields are filled
    if (name && ingredients && spiceLevel && cookingTime && origin) {
        try {
            // Request to update the dish
            const response = await fetch(`http://localhost:5000/api/dish/${dishId}`, { // URI to update the dish
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonBody)
            });

            if (response.ok) {
                alert('Dish updated successfully!');
                searchAllDishes(); // Update with correct data
            } else {
                alert('Failed to update dish');
            }
        } catch (error) {
            console.error('Error updating dish:', error);
        }
    } else {
        alert('All fields except preparation steps are required.');
    }
}




// Function to delete a dish via DELETE
async function deleteDish(dishId) {
    if (confirm('Are you sure you want to delete this dish?')) {
        try {
            const response = await fetch(`http://localhost:5000/api/dish/${dishId}`, { // URL to delete the dish
                method: 'DELETE',
            });
  
        if (response.ok) {
            alert('Dish deleted successfully!');
            searchAllDishes();  // Update with correct data
        }
      } catch (error) {
            console.error('Error deleting dish:', error);
        }
    }
}

// Fetch all dishes when the page loads
window.onload = searchAllDishes;
