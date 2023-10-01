document.addEventListener('DOMContentLoaded', function () {
    var generateButton = document.querySelector(".btn-primary");
    var cardBody = document.querySelector(".card-body");
    var cardFooter = document.querySelector(".card-footer");
    var cocktailInfo = document.querySelectorAll('.cocktail-info');
    var cocktailInstructions = document.getElementById('cocktailInstructions').querySelector('div');

    cocktailInfo.forEach(function (element) {
        element.style.display = 'none';
    });

    generateButton.addEventListener('click', function () {
        cocktailInstructions.style.display = 'none';
        cocktailInfo.forEach(function (element) {
            element.style.display = 'block';
        });

        var getRandomCocktail = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

        fetch(getRandomCocktail)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(function (data) {
                var cocktailName = document.getElementById('cocktailName').querySelector('div');
                var cocktailImage = document.getElementById('cocktailImage').querySelector('img');
                var cocktailCategory = document.getElementById('cocktailCategory').querySelector('div');
                var cocktailAlcoholic = document.getElementById('cocktailAlcoholic').querySelector('div');
                var cocktailGlass = document.getElementById('cocktailGlass').querySelector('div');
                var ingredientList = document.getElementById('ingredientList').querySelector('ul');
                var cocktailInstructions = document.getElementById('cocktailInstructions').querySelector('div');

                cocktailName.innerText = data.drinks[0].strDrink;
                cocktailImage.src = data.drinks[0].strDrinkThumb;
                cocktailCategory.innerText = 'Category: ' + data.drinks[0].strCategory;
                cocktailAlcoholic.innerText = 'Alcoholic: ' + data.drinks[0].strAlcoholic;
                cocktailGlass.innerText = 'Glass: ' + data.drinks[0].strGlass;

                ingredientList.innerHTML = '';
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

                cardBody.style.display = 'block';
                cardFooter.style.display = 'block';
            })
            .catch(function (error) {
                console.error('Error:', error);
            });
    });
});
