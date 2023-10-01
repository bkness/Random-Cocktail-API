document.addEventListener('DOMContentLoaded', function () {
    var generateButton = document.getElementById("generateButton");
    var backButton = document.getElementById("backButton");
    var refreshButton = document.getElementById("refreshButton");
    var cardBody = document.querySelector(".card-body");
    var cardFooter = document.querySelector(".card-footer");
    var cocktailInfo = document.querySelectorAll('.cocktail-info');
    var cocktailInstructions = document.getElementById('cocktailInstructions').querySelector('div');
    var initialInstructions = document.querySelector('.initialInstructions'); // Updated class name

    backButton.style.display = 'none';
    refreshButton.style.display = 'none';

    cocktailInfo.forEach(function (element) {
        element.style.display = 'none';
    });

    var savedCocktails = JSON.parse(localStorage.getItem('cocktails')) || [];
    var currentCocktailIndex = -1;

    generateButton.addEventListener('click', function () {
        backButton.style.display = 'block';
        refreshButton.style.display = 'block';
        initialInstructions.style.display = 'none';
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

                var savedCocktail = {
                    strDrink: data.drinks[0].strDrink,
                    strDrinkThumb: data.drinks[0].strDrinkThumb,
                    strCategory: data.drinks[0].strCategory,
                    strAlcoholic: data.drinks[0].strAlcoholic,
                    strGlass: data.drinks[0].strGlass,
                    ingredients: [],
                    strInstructions: data.drinks[0].strInstructions
                };

                for (var i = 1; i <= 15; i++) {
                    var ingredient = data.drinks[0]['strIngredient' + i];
                    var measure = data.drinks[0]['strMeasure' + i];

                    if (ingredient && measure) {
                        savedCocktail.ingredients.push(ingredient + ': ' + measure);
                    } else {
                        break;
                    }
                }

                savedCocktails.push(savedCocktail);
                localStorage.setItem('cocktails', JSON.stringify(savedCocktails));
                currentCocktailIndex = savedCocktails.length - 1;

            })
            .catch(function (error) {
                console.error('Error:', error);
            });
    });

    refreshButton.addEventListener('click', function () {
        currentCocktailIndex - 1;
        if (currentCocktailIndex < 0) {
            cocktailInfo.forEach(function (element) {
                element.style.display = 'none';
            });
            cocktailInstructions.style.display = 'block';
            backButton.style.display = 'none';
            refreshButton.style.display = 'none';
            localStorage.removeItem('cocktails');
        } else {
            var cocktail = savedCocktails[currentCocktailIndex];
            var cocktailName = document.getElementById('cocktailName').querySelector('div');
            var cocktailImage = document.getElementById('cocktailImage').querySelector('img');
            var cocktailCategory = document.getElementById('cocktailCategory').querySelector('div');
            var cocktailAlcoholic = document.getElementById('cocktailAlcoholic').querySelector('div');
            var cocktailGlass = document.getElementById('cocktailGlass').querySelector('div');
            var ingredientList = document.getElementById('ingredientList').querySelector('ul');
            var cocktailInstructions = document.getElementById('cocktailInstructions').querySelector('div');

            cocktailName.innerText = cocktail.strDrink;
            cocktailImage.src = cocktail.strDrinkThumb;
            cocktailCategory.innerText = 'Category: ' + cocktail.strCategory;
            cocktailAlcoholic.innerText = 'Alcoholic: ' + cocktail.strAlcoholic;
            cocktailGlass.innerText = 'Glass: ' + cocktail.strGlass;

            ingredientList.innerHTML = '';
            cocktail.ingredients.forEach(function (ingredient) {
                var li = document.createElement('li');
                li.innerText = ingredient;
                ingredientList.appendChild(li);
            });

            cocktailInstructions.innerText = cocktail.strInstructions;

            cardBody.style.display = 'block';
            cardFooter.style.display = 'block';
        }

    });

    backButton.addEventListener('click', function () {
        if (currentCocktailIndex  > 0) {
            currentCocktailIndex = -1;
            cocktailInfo.forEach(function (element) {
            });
            initialInstructions.style.display = 'block';
            localStorage.removeItem('cocktails');
        } else {
            generateButton.click();
        }
    });
});

