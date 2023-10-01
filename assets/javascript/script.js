document.addEventListener('DOMContentLoaded', function () {
    var generateButton = document.querySelector(".btn-primary");

    generateButton.addEventListener('click', function () {
        var cardBody = document.querySelector(".card-body");
        var cardFooter = document.querySelector(".card-footer");

        // function to fetch my data 
        var getRandomCocktail = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

        fetch(getRandomCocktail)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(function (data) {
                var cocktailName = document.getElementById('cocktailName');
                var cocktailImage = document.getElementById('cocktailImage');
                var cocktailCategory = document.getElementById('cocktailCategory');
                var cocktailAlcoholic = document.getElementById('cocktailAlcoholic');
                var cocktailGlass = document.getElementById('cocktailGlass');
                var ingredientList = document.getElementById('ingredientList');
                var cocktailInstructions = document.getElementById('cocktailInstructions');

                // Set values
                cocktailName.innerText = data.drinks[0].strDrink;
                cocktailImage.src = data.drinks[0].strDrinkThumb;
                cocktailCategory.innerText = 'Category: ' + data.drinks[0].strCategory;
                cocktailAlcoholic.innerText = 'Alcoholic: ' + data.drinks[0].strAlcoholic;
                cocktailGlass.innerText = 'Glass: ' + data.drinks[0].strGlass;

                // Clear ingredient list
                ingredientList.innerHTML = '';

                // Populate ingredient list
                for (var i = 1; i <= 15; i++) {
                    var ingredient = data.drinks[0]['strIngredient' + i];
                    var measure = data.drinks[0]['strMeasure' + i];

                    if (ingredient !== null && ingredient !== "" && measure !== null && measure !== "") {
                        var li = document.createElement('li');
                        li.innerText = ingredient + ': ' + measure;
                        ingredientList.appendChild(li);
                    }
                }

                cocktailInstructions.innerText = data.drinks[0].strInstructions;

                // Show card
                cardBody.style.display = 'block';
                cardFooter.style.display = 'block';
            })
            .catch(function (error) {
                console.error('Error:', error);
            });
    });
});
