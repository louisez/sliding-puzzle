/* 
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
Title : Project 1 Sliding Block Puzzle
Author : Louise Zhou
Created : 9/24/15
Modified : 9/27/15
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
*/

// Add any other global variables you may need here.

    //1d array of all tile elements
    var tilesArray = [];

    //2d array of tiles for easier checking
    var tiles = [];

    //4x4 puzzle
    var boardWidth = 4;
    var boardLength = 4;

    //true when we're done shuffling the board
    var isShuffled = false;
    
    //true when a key has been pressed
    var keyPressed = false;
    
    //start out with unsolved puzzle
    var isSolved = false;

    //keep track of score;
    var scoreValue = 0;

    //array of image options
    var imageOptions = ["duck.jpg", "cats.jpg", "do.jpg", "fluffycat.jpg", "kai.jpg", "girl.jpg", "city.jpg", "pokemon.jpg", "gintama.png"];

/**
 * Creates all the tiles necessary.
 * @return undefined
 */
function createTiles(){
    // figure out what tile specific information you need to add
    tiles = [
        [tilesArray[0], tilesArray[1], tilesArray[2], tilesArray[3]],
        [tilesArray[4], tilesArray[5], tilesArray[6], tilesArray[7]], 
        [tilesArray[8], tilesArray[9], tilesArray[10], tilesArray[11]], 
        [tilesArray[12], tilesArray[13], tilesArray[14], tilesArray[15]]
        ];
}


//checks if tile is hidden
//takes in a tile
function isHidden(tile){
    var tileImage = tile.children[0];
    return tileImage.style.visibility==="hidden";
}


//takes in a visibility a clicked tile (tile1) and hidden (tile2)
//makes clicked tile1 hidden, makes hidden tile has left and top style 
//properties of clicked tile
function switchTiles(tile1, tile2){
        
    var tileImage1 = tile1.children[0];
    var tileImage2 = tile2.children[0];
        
        
    var left = tileImage1.style.left;
    var top = tileImage1.style.top;
    tileImage2.style.left = left;
    tileImage2.style.top = top;
    tileImage2.style.visibility = "";
    tileImage1.style.visibility = "hidden";
    //check if the switch solved the puzzle
    if(isShuffled){
        updateScore();
        checkSolution();

    }


    return;
}

//updates the score h1 in the html
function updateScore(){
    scoreValue+=1;
    var scoreDisplay = document.getElementById("score");
    scoreDisplay.textContent = "You've taken "+scoreValue+" moves in this Sliding Puzzle Game";
    
}

/**
 * function that could get called when a tile is clicked.
 * @param clicked tile
 * @return Fill in what the function returns here!
 */
function tileClicked(tile){
    //first check if puzzle is solved

    // check if the tile can move to the empty spot
    // if the tile can move, move the tile to the empty spot
    //check if clicked tile is adjacent to hidden tile
    //use event.target to see which one was clicked
    
    
    if(isShuffled && keyPressed===false){
        var tileId = event.currentTarget.id;
        var tile = document.getElementById(tileId);
    }
    //calling tileClicked when shuffling in beginning
    //and when using keypresses
    else{
        var tileId = tile.id;
    }
    
    for(var i=0; i<boardWidth; i++){
        for(var j=0; j<boardWidth; j++){
            //if it's the clicked tile
            var row = i.toString();
            var col = j.toString();
            var sum = row+col;
            if(sum===tileId){

                var clickedTile = tiles[i][j];

                //check top
                if(i>0){
                    var topTile = tiles[i-1][j];
                    if (isHidden(topTile)){
                        switchTiles(clickedTile, topTile);
                        
                    }
                }//check bottom
                if(i<boardWidth-1){
                    console.log(tiles[i+1][j]);

                    var bottomTile = tiles[i+1][j];

                    if(isHidden(bottomTile)){
                        switchTiles(clickedTile, bottomTile);
                    }
                }//check left
                if(j>0){
                    var leftTile = tiles[i][j-1];
                    if(isHidden(leftTile)){
                       switchTiles(clickedTile, leftTile);
                    }
                }//check right
                if(j<boardWidth-1){
                    var rightTile = tiles[i][j+1];
                    if(isHidden(rightTile)){
                        switchTiles(clickedTile, rightTile);
                    }
                }
                
            }
        }
    }
    keyPressed = false;
    return;
}
                            

//switches all the image srcs in the html to a new iage
function changeImage(newImage){
    var imagesArray = document.getElementsByClassName("image");
    for (var i=0; i<imagesArray.length;i++){
        imagesArray[i].src = newImage;
    }
}
                    

//@param min and max range to generate random number
//@return random number between 0 (inclusive) and 3 (inclusive)

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
} 


 //Shuffle up the tiles in the beginning of the game
 

function shuffleTiles(){
    //in case we call shuffleTiles from button after page is loaded
    if(event.currentTarget.id==="reset"){
        scoreValue = 0;
        var scoreDisplay = document.getElementById("score");
        scoreDisplay.textContent = "You've taken "+scoreValue+" moves in this Sliding Puzzle Game";

    }
    
    if(event.currentTarget.id==="imageButton"){
        changeImage(imageOptions[getRandomInt(0,8)]);
    }
    isShuffled=false;
    for(var i =0; i<300; i++){
        var row = getRandomInt(0, 3);
        var col = getRandomInt(0, 3);
        var randomTile = tiles[row][col];
        //simulate clicking a bunch of times
        tileClicked(randomTile);
    }
    isShuffled = true;

}

//check if each tile has the correct style for top and left
function checkSolution(){
    if(isShuffled){
        for(var i=0; i<boardWidth; i++){
            for(var j=0; j<boardWidth; j++){
                var currTile = tiles[i][j];
                var currTileImage = currTile.children[0];
                var top = parseInt(currTileImage.style.top);
                var left = parseInt(currTileImage.style.left);
                var iscurrTileHidden = currTileImage.style.visibility;
                if(currTileImage.style.visibility==="hidden" || i*-100===top && j*-100===left){
                    //its in the right place 
                    continue;
                }else{
                    return;
                }
            }

        }
    isSolved = true;
    alert("You solved it!");
    return;
    }
    
    
}

//returns the array of hidden tile indices in 1d tilesArray
function getHiddenTileIndex(){
    var hiddenTileIndices = [];  
    for(var i=0; i<tiles.length; i++){
        for(var j=0; j<tiles.length; j++){
            var currTileImage = tiles[i][j].children[0];
            if(currTileImage.style.visibility==="hidden"){
                hiddenTileIndices.push(i);
                hiddenTileIndices.push(j);
            }
        }
    }
    return hiddenTileIndices;
}

//keyboard directions
function checkKey(e) {
    keyPressed = true;

    e = e || window.event;
    var i = getHiddenTileIndex()[0];
    var j = getHiddenTileIndex()[1];

    if (e.keyCode == '38') {
        // up arrow
        tileClicked(tiles[i+1][j]);

        
    }
    else if (e.keyCode == '40') {
        // down arrow
        tileClicked(tiles[i-1][j]);

    }
    else if (e.keyCode == '37') {
       // left arrow
        tileClicked(tiles[i][j+1]);

    }
    else if (e.keyCode == '39') {
       // right arrow
        
        tileClicked(tiles[i][j-1]);

    }

}

/**
 * When the page loads, create our puzzle
 */
window.onload = function () {

  // generate parameters for a random puzzle
  // create the tiles
    tilesArray = document.getElementsByClassName("tile");
    createTiles();
    document.onkeydown = checkKey;
  // shuffle the tiles
    shuffleTiles();
}

