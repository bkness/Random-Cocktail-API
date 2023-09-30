var getRandomCocktail = "https://www.thecocktaildb.com/api/json/v1/1/random.php"

fetch(getRandomCocktail) 
    .then(function (response) {
        return response.json();
        console.log(response)
    })
    .then(function (data){
        console.log(data)
    })