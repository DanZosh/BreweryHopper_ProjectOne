// Declare DOM elements
var cityInputEl = $("#cityName")
var breweryInfoHeaderEl = $("#breweryInfo");
var resultsHeaderEl = $(".resultsHeader");
    console.log(resultsHeaderEl);

// Elements of the main card
var mainCardEl = $(".mainCard");
var mainCardNameEl = $(".mainCardName");
var mainCardTypeEl = $(".mainCardType");

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
    //Clear the currentSearch of the previous search
    currentSearch = []
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
        breweriesArray.push(breweryObj)
        currentSearch.push(response[i].name)
            console.log(breweryLat);
            console.log(breweryLat);
    };

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
            // console.log(breweriesArray)
    $(breweryCollectionEl).append($("<p>").text(brewery).addClass("collection-item"));
    }
}

//DECLARE the function to RENDER the main card
function renderMainCard(boop){
//EMPTY the mainCardEl of any previously generated elements
    mainCardEl.empty()
    console.log(boop)

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

    generateMap(boop.breweryLat,boop.breweryLon)
    console.log(boop.breweryLon,boop.breweryLat)


    // var APIkey = "AIzaSyCNMT79cyhTQf0GVQoNdOpOKcYsTL2jqdQ";
    // var latitude = boop.breweryLat;
    // var longitude = boop.breweryLon;

    // getMap(APIkey, latitude, longitude);

//     function getMap(APIkeyVar, latVar, lonVar) {
//         // var queryURL="https://www.google.com/maps/embed/v1/view?key=AIzaSyCNMT79cyhTQf0GVQoNdOpOKcYsTL2jqdQ&center=47.669159,-122.299126&zoom=18&maptype=satellite";
//         var queryURL="https://www.google.com/maps/embed/v1/view?key=" + APIkeyVar + "&center=" + latVar + "," + lonVar + "&zoom=18&maptype=satellite";
//             console.log(queryURL);

//         $.ajax({
//             url: queryURL,
//             method: "GET"
//         })
//         .then(function(response) {
//             console.log(response);
//             $("iframe").attr("src", queryURL);

//         })
//     }

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

    // var category = [Any, Miscellaneous, Programming, Dark, Pun, Spooky, Christmas];

var category = "Any";

function getJoke() {
    var queryURL =  "https://sv443.net/jokeapi/v2/joke/" + category + "?lang=en?amount=1?type=twopart?blacklistFlags=nsfw,religious,political,racist,sexist";
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        console.log(response);
        console.log(response.setup);

        if(response.flags.racist == true) {
            jokeEl.append(($("<p>")).text("We're outta jokes!").addClass("setup"))
        } else {
            jokeEl.append(($("<p>")).text(response.setup).addClass("setup"));
        }

        if(response.flags.racist == true) {
            jokeEl.append(($("<p>")).text("Search again!").addClass("setup"))
        } else {
            jokeEl.append(($("<p>")).text(response.delivery).addClass("setup"));
        }
    })
}

searchButtonEl.on("click", function(event) {
    
    event.preventDefault();

    // var jokeCategoryValue = jokeInputEl.val().trim();

    getJoke();

});



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
    var svgMarkup = '<svg width="24" height="24" ' +
        'xmlns="http://www.w3.org/2000/svg">' +
        '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
        'height="22" /><text x="12" y="18" font-size="12pt" ' +
        'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
        'fill="white">B</text></svg>';

    // Create an icon, an object holding the latitude and longitude, and a marker:
    var icon = new H.map.Icon(svgMarkup),
        coords = {lat: boopLat, lng: boopLon},
        marker = new H.map.Marker(coords, {icon: icon});

    // Add the marker to the map and center the map at the location of the marker:
    map.addObject(marker);
    map.setCenter(coords);
    // OPTION 1 FINISH

    // //OPTION 2 START
    // // Create a marker icon from an image URL:
    // var icon = new H.map.Icon("./Images/beerIcon2.png");

    // // Create a marker using the previously instantiated icon:
    // var marker = new H.map.Marker({ lat: boopLat, lng: boopLon }, { icon: icon });

    // // Add the marker to the map:
    // map.addObject(marker);
    // //OPTION 2 END
}