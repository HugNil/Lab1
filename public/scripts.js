// Function to fetch all dishes or search based on name
async function searchAllDishes() {
    const url = "http://localhost:5000/api/dishes";
    try {
        const response = await fetch(url);
        const dishes = await response.json();
        displayDishes(dishes);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}




// Function to display dishes in the table
function displayDishes(dishes) {
    const tableBody = document.querySelector('#dishesTable tbody');
    tableBody.innerHTML = '';
  
    dishes.forEach(dish => {
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
        tableBody.appendChild(row);
    });
}




// Function to add a new dish via POST
async function addDish(event) {
    event.preventDefault(); // Prevent form submission
  
    const name = document.getElementById('dishName').value;
    const ingredients = document.getElementById('dishIngredients').value.split(',');
    const cookingTime = document.getElementById('dishCookingTime').value;
    const origin = document.getElementById('dishOrigin').value;
    const spiceLevel = document.getElementById('dishSpiceLevel').value;
    const preparationSteps = document.getElementById('dishPreparationSteps').value.split(',');
  
    const dishData = { name, ingredients, cookingTime, origin, spiceLevel, preparationSteps };
  
    try {
        const response = await fetch('http://localhost:5000/api/dish', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dishData),
        });
  
        if (response.ok) {
            alert('Dish added successfully!');
            searchAllDishes();  // Refresh the list after adding
      } else {
            alert('Failed to add dish');
        }
    } catch (error) {
        console.error('Error adding dish:', error);
    }
}

// Fetch all dishes when the page loads
window.onload = searchAllDishes;
