const recipeUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast`
const detailRecipe = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772`

const form = document.forms[0]
const searchBar = document.getElementById('search-bar')
const btnSearch = document.getElementById('btn-search')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    var searchMeal = searchBar.value.trim();

    if (!searchMeal) {
        showMessage("Please enter your meal..")
    } else {
        fecthMeal(searchMeal)
        document.querySelector('.mess').style.display = "none"
    }

})

function fecthMeal(meal) {

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${meal}`)
        
        .then((res) => {
            return res.json()
        })

        .then((data) => {
            var mealCard = ''
            if (data.meals == null) {
                showMessage("Sorry! we didn't find any meal.")
            }
            data.meals.forEach((eachMeal) => {
            mealCard += `
           
           <div class="meal-card" data-id="${eachMeal.idMeal}">
           <img src="${eachMeal.strMealThumb}">
           <div class="meal-content">
                <h3>${eachMeal.strMeal}</h3>
                <button class="btn-recipe">Get Recipe</button>
           </div>
           </div>

           `
                document.querySelector('.meal-row').innerHTML = mealCard;
            })
        })
        .catch((error) => {
            showMessage(`Some went worng: ${error}`)
        })

}


function showMessage(str) {
    document.querySelector('.mess').innerHTML = str
}