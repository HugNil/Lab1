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
                <button onclick="updateDish('${dish._id}')">Update</button>
                <button onclick="deleteDish('${dish._id}')">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Fetch all dishes when the page loads
window.onload = searchAllDishes;
