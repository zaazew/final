let searchInput=document.querySelector(".search-input");
let searchBtn=document.querySelector(".search-btn");
let nameRadio=document.querySelector(".name-radio");
let mainArea=document.querySelector(".main-area");
let ingredientRadio=document.querySelector(".ingredient-radio");
let burgerIcon=document.querySelector(".burger-icon");
let mobileLinksContainer=document.querySelector(".mobile-links-container");
let x=document.querySelector(".x");
let moodBtns=document.querySelectorAll(".mood-list li");
let shakeBtn=document.querySelector(".shake");


/*-----------------------------------------------search----------------------------------------------------*/
nameRadio.checked=true;
searchInput.value=""
searchBtn.addEventListener("click",()=>{
    if(searchInput.value.trim()==""){
        var myModal = new bootstrap.Modal(document.getElementById('emptySearchModal'));
        myModal.show();
        return;
    }

    let apiUrl=""
    if(nameRadio.checked){
        apiUrl=`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchInput.value.trim())}`;
    }
    else{
        apiUrl=`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(searchInput.value.trim())}`;
    }
    fetchUrl(apiUrl)
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
    data.drinks.sort(() => 0.5 - Math.random());// Sort funksiyasına random (+/-) dəyər verib siyahını təsadüfi qarışdırırıq (Shuffle)
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

/*-----------------------------------------------mobile-links----------------------------------------------------*/
burgerIcon.addEventListener("click",()=>{
    mobileLinksContainer.style.display="block"
})
x.addEventListener("click",()=>{
    mobileLinksContainer.style.display="none"
})

/*--------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------vibe----------------------------------------------------------*/
/*https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list*/
moodBtns.forEach(btn=>{
    btn.addEventListener("click",(e)=>{
        searchInput.value=""
        let text=e.target.innerText
        switch(text){
            case 'Party':
            fetchUrl("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Punch / Party Drink")
            break;
            case 'Chill':
            fetchUrl("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink")
            break;
            case 'Fancy':
            fetchUrl("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail")
            break;
            case 'No Alcohol':
            fetchUrl("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic")
            break;
        }
    })

})
/*--------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------fetch---------------------------------------------------------*/
function fetchUrl(url){
    fetch(url)
    .then(res=>res.json())
    .then(data=>cards(data))
    .catch(error=>{                   
        cards({drinks:null});
    });
}
/*--------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------shake---------------------------------------------------------*/
shakeBtn.addEventListener("click",()=>{
    fetchUrl("https://www.thecocktaildb.com/api/json/v1/1/random.php")
})
/*--------------------------------------------------------------------------------------------------------------*/









/*Default olaraq sehifede gorunen icki hissesi*/
function defaultCard(){
    fetchUrl("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=w")
}
defaultCard()


