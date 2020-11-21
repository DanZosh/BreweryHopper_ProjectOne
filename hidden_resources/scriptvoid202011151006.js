//DECLARE DOM ELEMENTS

// var cityInputEl = "Seattle" //change this after you have an input to grab from!
var cityInputEl = $("#cityName")
    console.log(cityInputEl)

//Elements of the main card
var mainCardNameEl = $(".mainCardName")
    // console.log(mainCardNameEl)
var mainCardTypeEl = $(".mainCardType")
    // console.log(mainCardTypeEl)
var mainCardAddressEl = $(".mainCardAddress")
    // console.log(mainCardAddressEl)
var mainCardPhoneEl = $(".mainCardPhone")
    // console.log(mainCardPhoneEl) 
var mainCardWebsiteEl = $(".mainCardWebsite")

var searchButtonEl = $(".searchButton")
    console.log(searchButtonEl)
// var breweryCollectionEl = $(".collection")
//     console.log(breweryCollectionEl)  
var breweryCollectionEl = $("#resultsList")
    console.log(breweryCollectionEl)


//DECLARE global variables
var breweriesArray=[]
var breweryObj;
var currentBrewery=""



//GET breweryStuff 
function getBreweries(boop) {
    $(breweryCollectionEl).empty();
    var queryURL="https://api.openbrewerydb.org/breweries?by_city="+boop
        console.log(queryURL)
    //AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        console.log(response)

// LOOP through the results to store each brewery as an object in our `breweriesArray`
    for (let i = 0; i < 10; i++) {
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
    };
    $(breweryCollectionEl).empty();
//RENDER the `breweriesArray` to the `breweryCollectionEl` element
    for (let i = 0; i < breweriesArray.length; i++) {
        var brewery = breweriesArray[i].breweryName;
            // console.log(breweriesArray)
    $(breweryCollectionEl).append($("<p>").text(brewery).addClass("collection-item"));
    }


});
}

// getBreweries();
// console.log(breweriesArray)

//CLICK FUNCTIONALITY
searchButtonEl.on("click", function(event) {
        console.log(breweryCollectionEl)
    breweryCollectionEl.empty();
        console.log(breweryCollectionEl)
    event.preventDefault();
        console.log(this);
    
        console.log(breweryCollectionEl);
    
    var cityCapitalized = cityInputEl.val().trim();
        console.log(cityCapitalized)

getBreweries(cityCapitalized)
    // return
});

//RENDER main card
function renderMainCard(){

$(mainCardNameEl).empty();
$(mainCardNameEl).append()

mainCardTypeEl = $(".mainCardType")

mainCardAddressEl = $(".mainCardAddress")

mainCardPhoneEl = $(".mainCardPhone")
    
mainCardWebsiteEl = $(".mainCardWebsite")



}
renderMainCard()