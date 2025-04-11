// Function to fetch all dishes or search based on name
async function searchAllDishes() {
    const name = document.getElementById('search').value;
    const url = "http://localhost:5000/api/dishes";
    try {
        const response = await fetch(url);
        const dishes = await response.json();
        displayDishes(dishes);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}