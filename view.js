function createDomElement(gameObj){
    var container1 = document.querySelector('.container');
    const gameELement = document.createElement("div");
    gameELement.innerHTML = `<div id="${gameObj._id}">
                        <h1>${gameObj.title}</h1> 
                        <img src="${gameObj.imageUrl}" />
                        <p>${gameObj.description}</p> 
                        <button class="delete-btn">Delete Game</button>
                        <button class="edit-btn">Edit Game</button></div>`;    
    container1.appendChild(gameELement);

    const gameObjectId = document.getElementById(`${gameObj._id}`);
    gameObjectId.addEventListener("click", event =>{
        if(event.target.classList.contains("delete-btn")){
            deleteGame(event.target.parentElement.getAttribute("id"));          
            removeDeletedElementFromDOM(event.target.parentElement);          
        }else if(event.target.classList.contains("edit-btn")){           
            createUpdateDivElement( gameObj, event.target.parentElement);        
        }
    });
}

function createUpdateDivElement(updateGameObj, gameContainer){  
    const updateElement = document.createElement("div");
    updateElement.classList.add("updateFormDiv");
    updateElement.innerHTML = 
        `<div class ="updateForm", id ="${updateGameObj._id}">
        <label for="gameTitle">Here you can update the Title</label>
        <input type="text" value="${updateGameObj.title}" name="gameTitle" id="updateGameTitle" />
        
        <label for="updateGameDescription">Here you can modify the description</label>
        <input type="text" name="updateGameDescription" value = "${updateGameObj.description}" id="updateGameDescription" />

        <label for="gameImageUrl">Put a new URL image</label>
        <input type="text" value = "${updateGameObj.imageUrl}" name="updateGameImageUrl" id="updateGameImageUrl" />

        <button class="updateBtn">Save Changes</button>
        <button class="cancelBtn">Cancel</button>
        </div>`;
    gameContainer.appendChild(updateElement);
    console.log('gameContainer is: ', gameContainer);
    console.log('updated game object is: ', updateGameObj);
    
    const updateGameObjectId = document.getElementById(`${updateGameObj._id}`);
    updateGameObjectId.addEventListener("click", event => {
        if(event.target.classList.contains("cancelBtn")){
            removeDeletedElementFromDOM(event.target.parentElement); 
        }else if (event.target.classList.contains("updateBtn")){        
            const updateGameTitleInputValue = updateElement.querySelector('#updateGameTitle').value;
            const updateGameDescriptionInputValue = updateElement.querySelector('#updateGameDescription').value;
            const updateGameImageUrlInputValue = updateElement.querySelector('#updateGameImageUrl').value;
            
            gameContainer.querySelector('h1').innerHTML = updateGameTitleInputValue;
            gameContainer.querySelector('p').innerHTML = updateGameDescriptionInputValue;
            gameContainer.querySelector('img').src = updateGameImageUrlInputValue;

            updateGameObj.title=updateGameTitleInputValue;
            updateGameObj.description=updateGameDescriptionInputValue;
            updateGameObj.imageUrl=updateGameImageUrlInputValue;
            
            updateGameRequest(updateGameObj);
            removeDeletedElementFromDOM(event.target.parentElement);
        }    
    });
}      
  
function removeDeletedElementFromDOM(domElement){
    domElement.remove();
}

function validateFormElement(inputElement, errorMessage){
    if(inputElement.value === "") {
        if(!document.querySelector('[rel="' + inputElement.id + '"]')){
            buildErrorMessage(inputElement, errorMessage);
        }
    } else {
        if(document.querySelector('[rel="' + inputElement.id + '"]')){
            console.log("the error is erased!");
            document.querySelector('[rel="' + inputElement.id + '"]').remove();
            inputElement.classList.remove("inputError");
        }
    }
}

function validateReleaseTimestampElement(inputElement, errorMessage){
    if(isNaN(inputElement.value) && inputElement.value !== "") {
        buildErrorMessage(inputElement, errorMessage);
    }
}

function buildErrorMessage(inputEl, errosMsg){
    inputEl.classList.add("inputError");
    const errorMsgElement = document.createElement("span");
    errorMsgElement.setAttribute("rel", inputEl.id);
    errorMsgElement.classList.add("errorMsg");
    errorMsgElement.innerHTML = errosMsg;
    inputEl.before(errorMsgElement);
}

document.querySelector(".submitBtn").addEventListener("click", event => {
    event.preventDefault();

    const gameTitle = document.getElementById("gameTitle");
    const gameDescription = document.getElementById("gameDescription");
    const gameGenre = document.getElementById("gameGenre");
    const gamePublisher = document.getElementById("gamePublisher");
    const gameImageUrl = document.getElementById("gameImageUrl");
    const gameRelease = document.getElementById("gameRelease");

    validateFormElement(gameTitle, "The title is required!");
    validateFormElement(gameGenre, "The genre is required!");
    validateFormElement(gameImageUrl, "The image URL is required!");
    validateFormElement(gameRelease, "The release date is required!");

    validateReleaseTimestampElement(gameRelease, "The release date you provided is not a valid timestamp!");

    if(gameTitle.value !== "" && gameGenre.value !== "" && gameImageUrl.value !== "" && gameRelease.value !== "") {
        var urlencoded = new URLSearchParams();
        urlencoded.append("title", gameTitle.value);
        urlencoded.append("releaseDate", gameRelease.value);
        urlencoded.append("genre", gameGenre.value);
        urlencoded.append("publisher", gamePublisher.value);
        urlencoded.append("imageUrl", gameImageUrl.value);
        urlencoded.append("description", gameDescription.value);
        console.log("aici e urlencoded ", urlencoded)

        createGameRequest(urlencoded);
    }
    gameTitle.value = "";
    gameDescription.value = "";
    gamePublisher.value = "";
    gameImageUrl.value = "";
    gameRelease.value = "";
})
