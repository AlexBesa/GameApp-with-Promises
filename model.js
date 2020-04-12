var apiURL = "https://games-world.herokuapp.com";

function getGamesList(){
    return fetch(apiURL + "/games", {
        method: "GET",
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
    })
    .then(response => response.json())
    .then(responseData => {
        // throw new Error("eroarea mea!")
        for(var i = 0; i < responseData.length; i++) {         
            createDomElement(responseData[i]);
            console.log("all data is here: ",responseData)
        }
    }).catch(error => {console.log("There is an error: ",error)});
}
getGamesList();

function deleteGame(gameID) {
    return fetch(apiURL + "/games/" + gameID, {method: "DELETE"})
    .then(response => response.text())
    .then(apiresponse => {
        console.log("api resp",apiresponse)
    })
    .catch(error =>{console.log("The api cannot be deleted: ",error)});
}

function createGameRequest(gameObject){
    return fetch(apiURL + "/games", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: gameObject
    })
    .then(response => response.json())
    .then(function(createdGame){
        console.log("game created successfully in Dom ",createdGame);
        createDomElement(createdGame);
    })
    .catch(error =>{console.log("The game cannot be created: ",error)});
}

function updateGameRequest(updatedGameObj){	
    return fetch(apiURL + "/games/" + updatedGameObj._id, {
        method: "PUT",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body:"title=" + updatedGameObj.title 
            +"&description=" + updatedGameObj.description 
            +"&imageUrl=" + updatedGameObj.imageUrl
    })
    .then(response => response.json())
    .then(updatedGame => {console.log("Status update: Success !!! ",updatedGame)})
    .catch(error =>{console.log("The game cannot be updated: ",error)});
}
