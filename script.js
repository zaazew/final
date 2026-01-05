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
let closeModalBtn=document.querySelector(".close-modal-btn");
let drinkModal=document.querySelector(".drink-modal");
let modalImg=document.querySelector(".modal-img");
let cardModalTitle=document.querySelector(".card-modal-title");
let cardModalCategory=document.querySelector(".card-modal-category");
let cardModalInstructions=document.querySelector(".card-modal-instructions");
let cardModalIngredients=document.querySelector(".card-modal-ingredients");
let alcoholicOrNonalcoholic=document.querySelector(".alcoholic-or-nonalcoholic");
let inputXBtn=document.querySelector(".input-x-btn");
let modalRight=document.querySelector(".modal-right");

/*-----------------------------------------------search----------------------------------------------------*/
nameRadio.checked=true;/*diger secim secili ola ola sehife yenilenende name secimine qayitmirdi deye elave etdim*/
searchInput.value=""
inputXBtn.addEventListener("click",()=>{
    searchInput.value=""
    searchInput.focus()
})
searchBtn.addEventListener("click",()=>{
    if(searchInput.value.trim()==""){
        var myModal = new bootstrap.Modal(document.getElementById('emptySearchModal'));
        myModal.show();
        return;
    }

    let apiUrl=""
    if(nameRadio.checked){
        apiUrl=`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchInput.value.trim())}`;
        /*Metodu yazmasam da "50/50" axtaranda hemin icki gelir cunki ilkine baxir ve o adda tesadufen bir icki oldugu ucun problem cixmirmis kimi gorunur.
        amma ve lakin bu metod olmasa axtaris yerine "gin & tonic" yazanda sadece birincini axtarir ve gin olanlari getirir,
        halbuki istifadeci konkret olaraq hemin adli ickini tapmaq istemisdi. Metod sayesinde & isaresi kodlanir ve artiq ad butun goturulur.
        Neticede istifadeci ne axtarmisdisa ona uygun cavab cixir*/
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
        drinkCard.addEventListener("click",()=>{
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`)
            .then(res=>res.json())
            .then(data=>cardModalOpen(data.drinks[0]))
        })
        
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
    .catch(()=>{     
        cards({drinks:null});
    });
}
/*--------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------shake---------------------------------------------------------*/
shakeBtn.addEventListener("click",()=>{
    fetchUrl("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    searchInput.value=""
})
/*--------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------card-information-------------------------------------------------*/
closeModalBtn.addEventListener("click",()=>{
     drinkModal.style.display="none"
})

function cardModalOpen(drink){
    modalImg.src=drink.strDrinkThumb
    cardModalTitle.innerText=drink.strDrink
    cardModalCategory.innerText=drink.strCategory
    cardModalInstructions.innerText=drink.strInstructions
    alcoholicOrNonalcoholic.innerText=drink.strAlcoholic
    cardModalIngredients.innerHTML=""
    for(let i=1;i<=15;i++){
        let ingredient=drink[`strIngredient${i}`]
        let measure=drink[`strMeasure${i}`] ? drink[`strMeasure${i}`].trim() : "";
        /*bezi erzaqlar ve olculeri yan yana yox alt alta gelir. hemin olcunun sonunda \r\n var. bu bosluq yaradir*/
        if(ingredient){
            let li=document.createElement("li")
            li.innerText=measure ? `${measure} ${ingredient}` : `${ingredient}`
            cardModalIngredients.append(li)
        }
        else{
            break;
        }
    }
    
    drinkModal.style.display="flex"
    modalRight.scrollTop=0;/*modali baglayanda scrollu harada qoymusdumsa yeni modal acanda scroll hemin yerde gelirdi*/
}

/*--------------------------------------------------------------------------------------------------------------*/


/*Default olaraq sehifede gorunen icki hissesi*/
function defaultCard(){
    fetchUrl("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=w")
}
defaultCard()


