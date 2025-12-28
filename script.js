let searchInput=document.querySelector(".search-input");
let searchBtn=document.querySelector(".search-btn");
let nameRadio=document.querySelector(".name-radio");
let mainArea=document.querySelector(".main-area");
let ingredientRadio=document.querySelector(".ingredient-radio");


/*-----------------------------------------------search----------------------------------------------------*/
nameRadio.checked=true;
searchInput.value=""
searchBtn.addEventListener("click",()=>{
    if(searchInput.value==""){
        alert("Please enter something!")
        return;
    }
    let apiUrl=""
    if(nameRadio.checked){
        apiUrl=`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput.value}`;
    }
    else{
        apiUrl=`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput.value}`;
    }
    fetch(apiUrl)
    .then(response=>response.json())
    .then(data=>cards(data))
    .catch(error=>{                   
        cards({drinks:null});
    });
})
/* ingr radiosu secili ola ola inputa salmon yazdim ve main area bos qaldi.
name ile axtaranda ve nese tapilmayanda hec ne tapilmadi cixir amma erzaq ile axtaranda bos qalir
----catch elave etdim-----*/
/*-----------------------------------------------------------------------------------*/

function cards(data){
    mainArea.innerHTML="";
    if(data.drinks==null){
        mainArea.innerHTML=`
        <div class="not-found">
            <img src="https://media.giphy.com/media/26n6WywJyh39n1pBu/giphy.gif" alt="Travolta">
            <h4>It's a little dry in here...🌵</h4>
            <p>We couldn't find any drinks matching your search.</p>
        </div>`
        return;
    }

    let sixDrinks=data.drinks.slice(0,6);
    sixDrinks.forEach(drink=>{
        let drinkCard=document.createElement("div")
        drinkCard.className="drink-card"
        drinkCard.innerHTML=`
        <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
        <h3>${drink.strDrink}</h3>
        `
        mainArea.append(drinkCard)
    })
    
}
/*radiolari deyisende inputun ici silinsin*/
function clearForRadio(){
    searchInput.value=""; 
    mainArea.innerHTML="";
    defaultCard()
}
nameRadio.addEventListener("change",clearForRadio);
ingredientRadio.addEventListener("change",clearForRadio);












/*Default olaraq sehifede gorunen icki hissesi*/
function defaultCard(){
fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=w")
.then(response=>response.json())
.then(data=>{
    cards(data);
})
}
defaultCard()