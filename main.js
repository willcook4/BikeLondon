console.log("Page loaded, Game on!");

//// Will Cook
//// Web Development Immersive 21 - London GA 2016 

//// Self initializing function to auto start the script
$(function() {
  
//// ----  Variables   ----
// Is the player alive
  var playerAlive = true;
// Variable to store the bike  
  var $bike = $('#bike');
// Count the number of cars on screen
  var numberOfCars = 0;
// Keeping track of what cars are on screen
  var carsOnScreen = [];
// Car tracking number
  var carNumber = 1;
// The last car moved


//// ---- Functions ----

// Function to check if the bike has hit a car
// Returns true if there is a collision
  function collisionTest($bike, $car) {
    var x1 = $bike.offset().left;
    var y1 = $bike.offset().top;
    var h1 = $bike.outerHeight(true);
    var w1 = $bike.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $car.offset().left;
    var y2 = $car.offset().top;
    var h2 = $car.outerHeight(true);
    var w2 = $car.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
      playerAlive = true;
    } else { 
      playerAlive = false;
    }
  }

  //   if (carToMove.includes('L')) {
  //     // console.log('would move L to R');
  //     carMoveLtoR($(carToMove));
  //   } else {
  //     // console.log('would move R to L');
  //     carMoveRtoL($(carToMove));
  //   }
  // }


  // function moveCar() {
  //   // for (i=0; i < carsOnScreen.length; i++) {
  //     console.log("Car: "+ carsOnScreen[i] + " would move here...");
  //     if (carsOnScreen[i].includes('L')) {
  //       // console.log('would move L to R');
  //       carMoveLtoR($(carsOnScreen[i]));
  //     } else {
  //       // console.log('would move R to L');
  //       carMoveRtoL($(carsOnScreen[i]));
  //     }
  //   }
  // }

  // Move that car..
  // On condition that if on the same row they dont go at same time

  // Once animation is finished remove the car..


  /////
    // function randomCarTopRow() {
    // // Possible Cars
    //   var carTopRowOptions = ['topL', 'topR'];
    //   var carBottomRowOptions = ['bottomL', 'bottomR'];
    // // randomise which one goes first
    // // Random number 0 or 1
    //   var randomNum1 = Math.floor(Math.random()*(1-0+1)+0);
    //   // var randomNum2 = Math.floor(Math.random()*(1-0+1)+0);
    //   // console.log(randomNum);
    //   // console.log(carTopRowOptions[randomNum1]+" top row");
    //   // console.log(carBottomRowOptions[randomNum2]);


  // function randomCarBottomRow() {
  // // Possible Cars
  //   // var carTopRowOptions = ['topL', 'topR'];
  //   var carBottomRowOptions = ['bottomL', 'bottomR'];
  // // randomise which one goes first
  // // Random number 0 or 1
  //   // var randomNum1 = Math.floor(Math.random()*(1-0+1)+0);
  //   var randomNum2 = Math.floor(Math.random()*(1-0+1)+0);
  //   // console.log(randomNum);
  //   // console.log(carTopRowOptions[randomNum1]);
  //   // console.log(carBottomRowOptions[randomNum2] +" bottom row");

  //   newCar(carBottomRowOptions[randomNum2]);
  //   //   // Variable for random time to move
  //   //   // return Math.floor(Math.random() * (max - min + 1)) + min;
  //   var randomTime = Math.floor(Math.random()*(4000-0+1)+0);
  //   if (carBottomRowOptions[randomNum2] === 'bottomL') {
  //     carsOnScreen.push("#carbottomL");
  //     // Move  the car right
  //     carMoveLtoR($("#car" + carBottomRowOptions[randomNum2]));
  //     setTimeout(function(){
  //       $("#car" + carBottomRowOptions[randomNum2]).stop(true,true);
  //       $("#car" + carBottomRowOptions[randomNum2]).detach();
  //     },8500);
  //   } else {
  //     carsOnScreen.push("#carbottomR");
  //     // Move the car left
  //     setTimeout(function(){
  //       carMoveRtoL($("#car" + carBottomRowOptions[randomNum2]));  
  //     },3000);
  //     setTimeout(function(){
  //       $("#car" + carBottomRowOptions[randomNum2]).stop(true,true);
  //       $("#car" + carBottomRowOptions[randomNum2]).detach();
  //     },8500);
  //   }
  // };

  //   // Create the car
  //   newCar(carOptions[randomNum]);
  //   // Variable for random time to move
  //   // return Math.floor(Math.random() * (max - min + 1)) + min;
  //   var randomTime = Math.floor(Math.random()*(4000-0+1)+0);

//// ---- Game ----

// Bike movement control

  $(document).on("keydown", function(e) {

      // Get the position of the bike
      // Set as a fload to 2dp to do comparison with later
      // for collision detection
    var leftPosition = parseFloat($bike.css("left")).toFixed(2);
    
    switch(e.which) {
      case 37: // Left
        if(!playerAlive) {
          // Ignore the keypress if the player is dead (deactivate keypress)
          return false;
        }
        console.log("Left pressed");
        if (leftPosition < 32) {
          // Set the maximum left gameplay distance you can go
          console.log("You can't go left anymore!");
        } else {
          console.log("Going left")
          $bike.css("left", "-=25px");
        }
        break;
      case 38 : // Up
        if(!playerAlive) {
          return false;
        }
        $bike.css("top", "-=50px");
        break;
      
      case 39: // Right
        console.log(playerAlive); 
        if(!playerAlive) {
          return false;
        }
        console.log("Right key pressed");
        // Set the maximum right gameplay distance you can go
        if (leftPosition > 385) {
          console.log("You can't go right anymore!");
        } else {
          console.log("Going right")
          $bike.css("left", "+=25px");
          // collisionYes();
                       }
        break;
      case 40: // Down
        if(!playerAlive) {
          return false;
        }
        $bike.css("top", "+=50px");
        break;
      default:
    }

    // Call the test to see if a collision has happened
    collisionTest($bike, $('#car'));

    // Do the following if the player has been hit
    if(!playerAlive) {
      // $bike.remove();
      $bike.css("background-color", "red");
    }
  });

// // Close of the self-init function
});
// // End

// ////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////
