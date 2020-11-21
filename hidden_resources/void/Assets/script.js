//DECLARE DOM ELEMENTS

var cityInputEl = $("#cityName")
    console.log(cityInputEl);
var breweryInfoHeaderEl = $("#breweryInfo");
    console.log(breweryInfoHeaderEl);

//Elements of the main card
var mainCardEl = $(".mainCard");
    // console.log(mainCardEl);
var mainCardNameEl = $(".mainCardName");
    // console.log(mainCardNameEl);
var mainCardTypeEl = $(".mainCardType");
    // console.log(mainCardTypeEl);
var mainCardAddressEl = $(".mainCardAddress");
    // console.log(mainCardAddressEl);
var mainCardPhoneEl = $(".mainCardPhone");
    // console.log(mainCardPhoneEl);
var mainCardWebsiteEl = $(".mainCardWebsite")

var searchButtonEl = $(".searchButton");
    // console.log(searchButtonEl);
// var breweryCollectionEl = $(".collection");
//     console.log(breweryCollectionEl)  ;
var breweryCollectionEl = $("#resultsList");
    // console.log(breweryCollectionEl);

//DECLARE global variables
var breweriesArray=[];
var breweryObj;
var currentBrewery="";
var currentSearch=[]

//START
init();

function init(){
//CHECK if there are items already a `currentSearchStored` in local storage; render it if its there.    
    var storedSearchArray = localStorage.getItem("currentSearchStored");
//IF storedSearchArray exists in local storage and isn't blank...
    if (storedSearchArray && storedSearchArray !== ""){
    //GET the data out and parse it to `currentSearch`
        currentSearch=JSON.parse(storedSearchArray);
    }
    //render the `currentSearch` to the `breweryCollectionEl`
    renderBreweryCollection()

//CHECK if there are any items already in `storedBreweriesArray` and parse it to `breweriesArray` if there are
    var retrievedBreweriesArray = localStorage.getItem("storedBreweriesArray");
//IF retrievedBreweriesArray exists in local storage and isn't blank...
    if (retrievedBreweriesArray && retrievedBreweriesArray !== ""){
    //GET the data out and parse it to `breweriesArray`
        breweriesArray=JSON.parse(retrievedBreweriesArray);
    }

//CHECK if there are any items already in `stored` and parse it to `breweriesArray` if there are
var retrievedCurrentBrewery = localStorage.getItem("storedCurrentBrewery");
//IF retrievedCurrentBrewery exists in local storage and isn't blank...
    if (retrievedCurrentBrewery && retrievedCurrentBrewery !== ""){
    //GET the data out and parse it to `breweriesArray`
    currentBrewery=JSON.parse(retrievedCurrentBrewery);
        // console.log(currentBrewery)
    }
    initiateMainCard(currentBrewery);

}



//CLICK FUNCTIONALITY of the Search Button
searchButtonEl.on("click", function(event) {
    event.preventDefault();
        console.log(this);
        console.log(breweryCollectionEl);
    
    var cityInputValue = cityInputEl.val().trim();
        console.log(cityInputValue)

getBreweries(cityInputValue)

});

//GET Brewery information from an AJAX call
function getBreweries(boop) {
    //Clear the currentSearch of the previous search
    currentSearch=[]
        console.log(currentSearch)
    console.log(breweriesArray)
    
    var queryURL="https://api.openbrewerydb.org/breweries?by_city="+boop
        console.log(queryURL)
    //AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        console.log(response)
        // ...and how many results are returned?
        console.log(response.length)
//Clear the breweriesArray of previous searches
    breweriesArray=[]
        console.log(breweriesArray)
// LOOP through the results to store each brewery as an object in our `breweriesArray`
    for (let i = 0; i < response.length; i++) {
        breweryObj={
            breweryName: response[i].name,
            breweryStreet: response[i].street,
            breweryPhone:response[i].phone,
            breweryWebsite:response[i].website_url,
            breweryType:response[i].brewery_type,
            breweryLat:response[i].latitude,
            breweryLon:response[i].longitude,
            breweryCity:response[i].city,   
        }
        breweriesArray.push(breweryObj)
        currentSearch.push(response[i].name)
    };
    console.log(currentSearch)
    console.log(currentSearch)
// Store both of the currentSearch and currentSearch to local by invoking the functions below 
    storeCurrentSearch(currentSearch)
    storeBreweriesArray(breweriesArray)

//PICK OPTION 1 OR OPTION 2 BELOW to render the `breweryCollectionEl`
//OPTION 1 RENDER the `breweriesArray` to the `breweryCollectionEl` element
    // for (let i = 0; i < breweriesArray.length; i++) {
    //     var brewery = breweriesArray[i].breweryName;
    //         // console.log(breweriesArray)
    // $(breweryCollectionEl).append($("<p>").text(brewery).addClass("collection-item"));
    // }

//OPTION 2 RENDER the `currentSearch` to the `breweryCollectionEl` element
    breweryCollectionEl.empty()

//THE CODE BELOW WAS REPLACED BY STORING AS renderBreweryCollection()

    // for (let i = 0; i < currentSearch.length; i++) {
    //     var brewery = currentSearch[i];
    //         // console.log(breweriesArray)
    // $(breweryCollectionEl).append($("<p>").text(brewery).addClass("collection-item"));
    // }
//THE CODE ABOVE WAS REPLACED BY STORING AS renderBreweryCollection()

    renderBreweryCollection()
    console.log(currentSearch)
    });
}

// STORE the last search to local
function storeCurrentSearch(boop){
    localStorage.setItem("currentSearchStored", JSON.stringify(boop));
}
// STORE the last `breweriesArray` to local 
function storeBreweriesArray(boop){
    localStorage.setItem("storedBreweriesArray", JSON.stringify(boop));
}
// STORE the last `currentBrewery` to local 
function storeCurrentBrewery(boop){
    localStorage.setItem("storedCurrentBrewery", JSON.stringify(boop));
}

function renderBreweryCollection(){
    for (let i = 0; i < currentSearch.length; i++) {
        var brewery = currentSearch[i];
            // console.log(breweriesArray)
    $(breweryCollectionEl).append($("<p>").text(brewery).addClass("collection-item"));
    }
}


//DECLARE the function to RENDER the main card
function renderMainCard(boop){
//EMPTY the mainCardEl of any previously generated elements
    mainCardEl.empty()

//APPEND the name to the `mainCardEl`
    // mainCardEl.append(($("<p>")).text("Name: " + boop.breweryName).addClass("mainCardName"))
    $(breweryInfoHeaderEl).removeData();
    $(breweryInfoHeaderEl).text(boop.breweryName)

//APPEND the type to the `mainCardEl`
    mainCardEl.append(($("<p>")).text("Brewery Type: " + boop.breweryType).addClass("mainCardType"))    

//APPEND the address to the `mainCardEl` IF there is an address available
    if(boop.breweryStreet == ""){
        mainCardEl.append(($("<p>")).text("Address: Unavailable").addClass("mainCardAddress"))
    }else{
        mainCardEl.append(($("<p>")).text("Address: " + boop.breweryStreet+ ", " + boop.breweryCity).addClass("mainCardAddress"))
    }
//APPEND the phone to the `mainCardEl` IF there is a phone available
    if(boop.breweryPhone == ""){
        mainCardEl.append(($("<p>")).text("Phone: Unavailable").addClass("mainCardPhone"));
    }else{
        mainCardEl.append(($("<p>")).text("Phone: " + boop.breweryPhone).addClass("mainCardPhone"));
    }

//APPEND the website to the `mainCardEl` IF there is a website available 
    if(boop.breweryWebsite == ""){
        mainCardEl.append(($("<a>")).text("Website: Unavailable").addClass("mainCardWebsite"));
    }else{
        mainCardEl.append(($("<a>")).text("Website: " + boop.breweryWebsite).addClass("mainCardWebsite m5"));
    }



    var APIkey = "AIzaSyCNMT79cyhTQf0GVQoNdOpOKcYsTL2jqdQ";
    var latitude = boop.breweryLat;
    var longitude = boop.breweryLon;

    getMap();

    function getMap() {
        // var queryURL="https://www.google.com/maps/embed/v1/view?key=AIzaSyCNMT79cyhTQf0GVQoNdOpOKcYsTL2jqdQ&center=47.669159,-122.299126&zoom=18&maptype=satellite";
        // var queryURL="https://www.google.com/maps/embed/v1/view?key=" + APIkey + "&center=" + latitude + "," + longitude + "&zoom=18&maptype=satellite";
            console.log(queryURL);
            var queryURL="https://www.google.com/maps/embed/v1/view?key=AIzaSyCNMT79cyhTQf0GVQoNdOpOKcYsTL2jqdQ&center=null,null&zoom=18&maptype=satellite";
        $.ajax({
            url: queryURL,
            method: "GET",
            dataType:"jsonp",
            cache: false,
            // success: function(response){
            //     alert(response);
            // }
        })
        .then(function(response) {
            console.log(response);
            $("iframe").attr("src", queryURL);

        })
    }

//     breweryLogo(boop.breweryWebsite);

//     function breweryLogo(url) {
//         console.log(url);
//         var queryURL="https://logo.clearbit.com/" + url;
//             console.log(queryURL);

//         $.ajax({
//             url: queryURL,
//             method: "GET"
//         })
//         .then(function(response) {
//             console.log(response);
//             $("image").attr("src", queryURL);
//             $("image").attr("alt", "Brewery logo");

//         })

// }

}

// renderMainCard()

//RENDER the main card with the brewery selected from the `breweryCollectionEl`
breweryCollectionEl.on("click", function(event){

    event.preventDefault();
    event.stopPropagation();
// RESET `currentBrewery`
    var breweryToBeRenderedName = $(event.target).text();
        console.log(breweryToBeRenderedName);
    var renderedBreweryObj;
        console.log(renderedBreweryObj);
        

    for (let i = 0; i < breweriesArray.length; i++) {
        var element = breweriesArray[i].breweryName;
            // console.log(element)
            // console.log(breweriesArray)
            // console.log(breweriesArray[i].breweryName)
            if(element==breweryToBeRenderedName){
                // console.log(element)
                renderedBreweryObj =  breweriesArray[i] ;
                    // console.log(renderedBreweryObj)
            //SET `currentBrewery` to the last item clicked
                currentBrewery=breweryToBeRenderedName;
            //Store the last item clicked to the `currentBrewery`
                storeCurrentBrewery(currentBrewery);
                renderMainCard(renderedBreweryObj);
                
            
    }
    
}
});

//COPY the portion of the `RENDER the main card` functionality above to get the main card to render with the stored last saved brewery.
function initiateMainCard(boop){
    var breweryToBeRenderedName = boop;
        console.log(breweryToBeRenderedName);
    var renderedBreweryObj;
        console.log(renderedBreweryObj);

    for (let i = 0; i < breweriesArray.length; i++) {
        var element = breweriesArray[i].breweryName;
            if(element==breweryToBeRenderedName){
                renderedBreweryObj =  breweriesArray[i];
                currentBrewery=breweryToBeRenderedName;
            //Store the last item clicked to the `currentBrewery`
                storeCurrentBrewery(currentBrewery);
                renderMainCard(renderedBreweryObj);
        }
    }
}