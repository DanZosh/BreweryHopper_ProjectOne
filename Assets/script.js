// Declare DOM elements
var cityInputEl = $("#cityName")
var breweryInfoHeaderEl = $("#breweryInfo");
var resultsHeaderEl = $(".resultsHeader");
    console.log(resultsHeaderEl);

// Elements of the main card
var mainCardEl = $(".mainCard");
var mainCardNameEl = $(".mainCardName");
var mainCardTypeEl = $(".mainCardType");
var mainCardImg = $(".card-image");
var mainCardAddressEl = $(".mainCardAddress");
var mainCardPhoneEl = $(".mainCardPhone");
var mainCardWebsiteEl = $(".mainCardWebsite");

// Elements of the joke card
var jokeEl = $("#joke");

var searchButtonEl = $(".searchButton");
var breweryCollectionEl = $("#resultsList");

// Declare global variables
var breweriesArray = [];
var breweryObj;
    console.log(breweryObj)
var currentBrewery = "";
console.log(currentBrewery)
var currentSearch = [];
var currentCity="";

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

    //CHECK if there is a storedCity any items already in `stored` and parse it to `currentCity` if there are
    var retrievedStoredCity = localStorage.getItem("storedCurrentCity");
        console.log(retrievedStoredCity)
    //IF retrievedStoredCity exists in local storage and isn't blank...
    if (retrievedStoredCity && retrievedStoredCity !== ""){
    //GET the data out and parse it to `currentCity`
    currentCity=JSON.parse(retrievedStoredCity);
        console.log(currentCity)
        renderCity(currentCity)
    }
    

}

//CLICK FUNCTIONALITY of the Search Button
searchButtonEl.on("click", function(event) {
    
    event.preventDefault();

    var cityInputValue = cityInputEl.val().trim();
        console.log(cityInputValue)
    
    getBreweries(cityInputValue)
//CLEAR the currentCity variable of previous input
    currentCity = ""
//ASSIGN the `currentCity` top the new selection `cityInputValue`
    currentCity = cityInputValue;
        console.log(currentCity);
    storeCurrentCity(cityInputValue);
    renderCity(cityInputValue);
        console.log(cityInputValue);
});
//DISPLAY the city searched

//DISPLAY the city name to the search panel
function renderCity(boop){
    console.log(resultsHeaderEl.text())
    resultsHeaderEl.text("Results for: " +boop.toUpperCase())
}

//GET Brewery information from an AJAX call
function getBreweries(boop) {
    console.log(currentSearch)
    //Clear the currentSearch of the previous search
    currentSearch = []
        console.log(currentSearch)
    var queryURL="https://api.openbrewerydb.org/breweries?by_city="+boop
        console.log(queryURL)
    //AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        breweriesArray = []
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
        // console.log(breweryObj)
        breweriesArray.push(breweryObj)
        currentSearch.push(response[i].name)
        console.log(breweriesArray)
    };

    // Store both of the currentSearch and currentSearch to local by invoking the functions below 
    storeCurrentSearch(currentSearch)
        // console.log(currentSearch)
    storeBreweriesArray(breweriesArray)
        // console.log(breweriesArray)

    breweryCollectionEl.empty()

    renderBreweryCollection()
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
// STORE the last `currentCity` to local 
function storeCurrentCity(boop){
    localStorage.setItem("storedCurrentCity", JSON.stringify(boop));
}

function renderBreweryCollection(){
    for (let i = 0; i < currentSearch.length; i++) {
        var brewery = currentSearch[i];
            console.log(breweriesArray)
    $(breweryCollectionEl).append($("<p>").text(brewery).addClass("collection-item"));
    }
}

function myScript(){
    mainCardImg.empty();
//the below is breaking when live on the web
    // mainCardImg.append(($("<img>")).attr("src", "https://www.freefavicon.com/freefavicons/food/beer-stein-152-202218.png"));
//instead of the line above, i saved the image locally just to try.
    mainCardImg.append(($("<img>")).attr("src", "../Assets/Images/beerIcon.png"));
    mainCardImg.append($("<p>").text("Error! Someone design this brewery a logo"))
};
//DECLARE the function to RENDER the main card
function renderMainCard(boop){
//EMPTY the mainCardEl of any previously generated elements
    mainCardEl.empty()
    mainCardImg.empty();
    console.log(boop)

//APPEND the name to the `mainCardEl`
    // mainCardEl.append(($("<p>")).text("Name: " + boop.breweryName).addClass("mainCardName"))
    $(breweryInfoHeaderEl).removeData();
    $(breweryInfoHeaderEl).text(boop.breweryName)

    var breweryLogoURL = "https://logo.clearbit.com/" + boop.breweryWebsite;
        console.log(breweryLogoURL)
    mainCardImg.append(($("<img>")).attr("src", breweryLogoURL).attr("onerror", "myScript()"));


        // onerror="myScript"
    // if(breweryLogoURL == "") { 
    //     mainCardImg.append(($("<img>")).attr("src", "https://www.freefavicon.com/freefavicons/food/beer-stein-152-202218.png"));
    // } else {
    //     mainCardImg.append(($("<img>")).attr("src", breweryLogoURL));
    // }

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

//IF latitude and longitude are not provided by the API
    if(boop.breweryLat == null || boop.breweryLon == null ){
        //RENDER a replacement image instead of a map
        $("#mapContainer").empty();
    //OPTION 1
        // $("#mapContainer").append($("<img>").attr("src", "../LatePlanter/Assets/Images/beerIcon2.png"))
    
    //OPTION 2
        var limerick = "There once was an API about Beer, <br>T'was supposed to display a map here, <br> Though it gave us no latitude, <br>We don’t have an attitude,<br>Surely there's some alcohol ...near."

        $("#mapContainer")
        .append($("<div>").attr("id","limerickContainerEl"))
        .append($("<p>")
        .attr("id", "limerickEl")
        .append(limerick))

    }else{

    generateMap(boop.breweryLat,boop.breweryLon)
    console.log(boop.breweryLon,boop.breweryLat)
}
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
                    console.log(renderedBreweryObj)
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

console.log(currentBrewery)
//HERE FUNCTIONALITY TO CREATE A MAP
function generateMap(boopLat,boopLon){
    //Clear the previous map's contents
    $("#mapContainer").empty();
var platform = new H.service.Platform({
    'apikey': 'oyplKZqjZWkRlK7jD7wKXERHDj0wnsUcAEKdHsCa45Q'
});

  // Obtain the default map types from the platform object:

    var defaultLayers = platform.createDefaultLayers();

    // Instantiate (and display) a map object:
    var map = new H.Map(
        document.getElementById('mapContainer'),
        defaultLayers.vector.normal.map,
        {
        zoom: 17,
        center: { lat: boopLat, lng: boopLon }
        });
        console.log(map)

//HERE functionality to create the marker
    // Define a variable holding SVG mark-up that defines an icon image:

    // OPTION 1 START
    var svgMarkup = '<svg width="60" height="24" ' +
        'xmlns="http://www.w3.org/2000/svg">' +
        '<rect stroke="white" fill="#5E1717" x="1" y="1" width="50" ' +
        'height="22" /><text x="26" y="18" font-size="12pt" ' +
        'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
        'fill="white">BEER</text></svg>';

    // Create an icon, an object holding the latitude and longitude, and a marker:
    var icon = new H.map.Icon(svgMarkup),
        coords = {lat: boopLat, lng: boopLon},
        marker = new H.map.Marker(coords, {icon: icon});

    // Add the marker to the map and center the map at the location of the marker:
    map.addObject(marker);
    map.setCenter(coords);
    // OPTION 1 FINISH


}