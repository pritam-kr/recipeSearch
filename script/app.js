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
    }

})

function fecthMeal(meal) {

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${meal}`)

        .then((res) => {
            return res.json()
        })

        .then((data) => {
            var mealCard = ''
            if (data.meals) {
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
                    document.querySelector('.mess').style.display = 'none';
                })
            } else if (data.meals == null) {
                showMessage("Sorry! we didn't find any meal.")
            }
        })
        .catch((error) => {
            showMessage(`Some went worng: ${error}`)
        })

}


function showMessage(str) {
    // console.log(str)
    document.querySelector('.mess').innerHTML = str
}


document.querySelector('.meal-row').addEventListener('click', (e) => {
    e.preventDefault()

    if (e.target.classList.contains('btn-recipe')) {
        var mealCard = e.target.parentElement.parentElement;

        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealCard.dataset.id}`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                var details = ''
                data.meals.forEach((eachData) => {
                    console.log(eachData)
                    if (eachData) {
                        details += `
                            <div class="recipe-details-container">
                            <h1>${eachData.strMeal}</h1>
                            <h5>${eachData.strCategory}</h5>
                            <p>${eachData.strInstructions}</p>
                            <img src="${eachData.strMealThumb}">
                            <a href="${eachData.strYoutube}" target="_blank"><button>Watch Video</button></a>
                            <i class="fas fa-times"  id="btn-cut" onclick="removeDetails()"></i>
                            </div>
                   
                   `
                   document.querySelector('.meal-row').style.display = 'none'
                   document.querySelector('.recipe-details').style.display = 'flex'
                   document.querySelector('.recipe-details').innerHTML = details;
                   document.querySelector('.hints').style.display = 'none'
                    }
                })
            })
    }
})


function removeDetails(){
    document.querySelector('.meal-row').style.display = 'flex'
    document.querySelector('.recipe-details').style.display = 'none'
    document.querySelector('.hints').style.display = 'block'
}