console.log("Page loaded, Game on!");

//// Will Cook
//// Web Development Immersive 21 - London GA 2016 

//// Self initializing function to auto start the script
$(function() {

  
//// ----  Variables   ----
// Amount of cars to make in this level+1:
  var carsToMake = 40;
// Is the player alive
  var playerAlive = true;
// has the player won?
  var playerWon = false;
// Variable to store the bike
  var $bike = $('#bike');
// Count the number of cars on screen
  var numberOfCars = 0;
// Keeping track of what cars are on screen
  var carsOnScreen = [];
// Car tracking number
  var carNumber = 1;
// The last car moved
  var lastCarMoved = "";

// Balanced ()
  var balancedL = 10;
  var balancedR = 10;  


//// ---- Functions ----


// Create the random cars for the level.
  function levelSetup() {
    console.log("Setting up the Level");
    for (i = 0; i <= carsToMake; i++) {
      // make random cars
      randomCar2();
      // console.log(i);
    }  
  }

// function to create a random car
// Need to track the car number to know when animation is done
  function randomCar2() {
  
  // Create a car..
  // Possible Cars
    var carTopRowOptions = ['topR', 'bottomR'];
    var carBottomRowOptions = ['topL', 'bottomL'];
  // Random number generators (0 or 1)
    var randomNum1 = Math.floor(Math.random()*(1-0+1)+0);
    var randomNum2 = Math.floor(Math.random()*(1-0+1)+0);
  // Create a unique car... If a 0 create a top row car, 1 bottom row car
    if (randomNum2 === 0){  
      newCar(carTopRowOptions[randomNum1], carNumber);

  // If the car is a right starting car then give it the properties
  // of a right car.  
      // $( ".car[id*='topR']").css({'background-color': 'blue',
      //                           'top': '130px',
      //                           'left': '600px'});
      // $( ".car[id*='bottomR']").css({'background-color': 'gold',
      //                           'top': '130px',
      //                           'left': '600px'});
      $( ".car[id*='topR']").css({'background-image': 'url("./images/blackcab.png")',
                                'top': '125px',
                                'left': '600px'});
      $( ".car[id*='bottomR']").css({'background-image': 'url("./images/bluecar.png")',
                                'top': '130px',
                                'left': '600px'});
      
    } else {
  // else if the random number is a 1 make a bottom row car
      newCar(carBottomRowOptions[randomNum1],carNumber);
      // If the car is a Left starting car then give it the properties
      // of a left car. 

      $( ".car[id*='bottomL']").css({'background-image': 'url("./images/greencar.png")',
                                'top': '320px',
                                'left': '-300px'});
      $( ".car[id*='topL']").css({'background-image': 'url("./images/yellowcar.png")',
                                'top': '315px',
                                'left': '-300px'});

    }
    carNumber +=1;  
    // console.log(carNumber + " car number");
  }

// Create a new car
  function newCar(lane,carTrackingNumber) {
    var $car = $("<div class=\"car\" id=\"car" + lane + carTrackingNumber + "\"></div>");
    $(".board").append($car);
    carsOnScreen.push("#car" + lane + carTrackingNumber);
    console.log(carsOnScreen + ' COS');
    numberOfCars += 1;
  }

// Play again
  function playAgain() {
    // Reset the page 
    console.log('playAgain running...');
    location.reload(true);
  }

  // Loop for monitoring and moving the cars
  function playGame() {
  // for each car in carsOnScreen[] move it.
    // Need to record the last car moved
    // var lastCarMoved = "";
    // Now moved global
    for(i=0;i<carsOnScreen.length; i++) {
      // console.log(carsOnScreen.length);
      // console.log(carsOnScreen[i] + " car on carsOnScreen[i]");
      // Random time to animate the car for
      // var randomTime = Math.floor(Math.random() * (10000-1000+1)+1000);
      lastCarMoved = carsOnScreen[i];
      // console.log(lastCarMoved + " last car moved");
      // var tempI = i;
      // console.log(carsOnScreen[i]);
      if (carsOnScreen[i]) {
        // console.log(i, "if statement");
        (function(i){
          // console.log(i, "playGame");
          setTimeout(function() {
            console.log(i, "setInterval");
            console.log(carsOnScreen.length);
              // function loop() {
                // console.log('Running Loop' + i);
                // console.log(carsOnScreen[i] + " COS[i] going into moveCar");
                // console.log(i, "moveCar in loop");
            moveCar(carsOnScreen[i], lastCarMoved);
              // loop();
              // return loop;
              // console.log(i, carsOnScreen.length-1);
            if(i == carsOnScreen.length-1) {
              console.log("sequence over");
              if (playerAlive === true) {
                youWon();
              }
            }
          }, 1000 * i);
        }(i));
      } else {
        // [i] Must be undefined... if this is running 
      }
    }
  } 

  function carMoveRtoL($car) {
    $car.animate({left: "-400px"}, 5000)
    // $car.animate({left: "-500px"}, 2500).delay( 2000 );
  };

  function carMoveLtoR($car) {
    $car.animate({left: "800px"}, 5000)
  };


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
    if (playerAlive){
      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
        playerAlive = true;
      } else { 
        playerAlive = false;
      }
    } else {
    }
  }

  // Do the following if the player has been hit
  function playerHit($car) {
    // if ((!playerAlive) || (checkForWin === true)) {
    if (!playerAlive) {  
      // change the color of the bike if hit
      // $bike.css("background-color", "red");
      $($bike).css({'background-image': 'url("./images/bikered.png'});
      console.log($car.attr('id') + " hit the biker");
      console.log("You Lost");

      // Play sound fx [removed due to duplicate play]
      // var audio = new Audio("./audio/crash.wav");
      // audio.play(); 
      setTimeout(function () {
        
        $('.gameoverhit').attr('id','show');
        $('.board').removeAttr('id');

      }, 1000);
    }
  }

  // Check if the player is balancing
  function checkIsBalanced () {
    if (playerAlive) {
      if (balancedL > 0 && balancedR > 0) {
        console.log("You are balanced");
      } else {
        $($bike).css({'background-image': 'url("./images/fallover.png'});
        console.log("You fell off!");
        var audio = new Audio("./audio/bikefallover.wav");
        audio.play();
        playerAlive = false;
        setTimeout(function () {
          $('.gameoverfelloff').attr('id','show');
          $('.board').removeAttr('id');
        }, 1000);
      }
    }
  }

  // Win function based on surviving a number of cars
  // being generated.
  function checkForWin() { 
    
      // The amount of cars to win the level
      if (numberOfCars === 50) {
        console.log("You survived - You Won!");
        $('.gameoveryouwon').attr('id','show');
        $('.board').removeAttr('id');
        return true;
        //You won!
      } else {
        return false; // You did not win!
    }
  }

  function youWon() { 
    console.log("You survived - You Won!");
    $('.gameoveryouwon').attr('id','show');
    $('.board').removeAttr('id');
    var audio = new Audio("./audio/bikebell.wav");
    audio.play();
    playerWon = true;
  }


// If the car is on the Left move it Right
// Otherwise move it Right 
function actuallyMoveCar(carToMove) {

  if (carToMove.includes('L')) {
    // console.log('would move L to R');
    carMoveLtoR($(carToMove));
  } else {
    // Car must be from the R, moving it L now...
    // console.log('would move R to L');
    carMoveRtoL($(carToMove));
  }
}


// Car moving logic, based on what moved before
// This stops the cars from driving over each other
function moveCar(carToMove, lastCarMoved) {
  console.log(carToMove + " moving");
  console.log(lastCarMoved + " lastCarMoved");
  // for (i=0; i < carsOnScreen.length; i++) {
    // console.log("Car: "+ carToMove + " is the car on the move...");
    // if (carToMove.includes('top')) {
    //   // console.log("carToMove includes top");
    // } else if (carToMove.includes('bottom')) {
    //   // console.log("carToMove includes bottom");
    // } else {
    //   // console.log("carToMove else");
    // }
    // Find out what the last car moved was... to avoid collisoins
    if (lastCarMoved === carToMove) {
      // console.log("lastCarMoved === carToMove");
      // Same Car. Move the car, No collision possible
      actuallyMoveCar(carToMove);
      

    // Else if both on the same row. Move one then the other.
    // To avoid collisions       
    // } else if ((lastCarMoved.includes('top') && (carToMove.includes('top'))) && 
    //   ((lastCarMoved.includes('L')) && (carToMove.includes('R')))) {
    //     // console.log("waiting to move TopRCar, TopLCar in the way");
    //     // Need to add a wait before moving the car...
    //     setTimeout(function(){
    //       actuallyMoveCar(carToMove);
    //       // console.log("A");
    //     },6000);
    
    // } else if ((lastCarMoved.includes('top') && (carToMove.includes('top'))) && 
    //   ((lastCarMoved.includes('R')) && (carToMove.includes('L')))) {
    //     // Need to add a wait before moving the car...
    //     // console.log("waiting to move TopLCar, TopRCar in the way");
    //     setTimeout(function(){
    //       actuallyMoveCar(carToMove);
    //       // console.log("B");
    //     },6000);

    // } else if ((lastCarMoved.includes('bottom') && (carToMove.includes('bottom'))) &&
    //   ((lastCarMoved.includes('L')) && (carToMove.includes('R')))) {
    //     // Need to add a wait before moving the car...
    //     // console.log("waiting to move BottomRCar, BottomLCar in the way");
    //     setTimeout(function(){
    //       actuallyMoveCar(carToMove);
    //       // console.log("C");
    //     },6000);

    // } else if ((lastCarMoved.includes('bottom') && (carToMove.includes('bottom'))) &&
    //   ((lastCarMoved.includes('R')) && (carToMove.includes('L')))) {
    //     // Need to add a wait before moving the car...
    //     // console.log("waiting to move BottomLCar, BottomRCar in the way");
    //     setTimeout(function(){
    //       actuallyMoveCar(carToMove);
    //       // console.log("D");
    //     },6000);

    } else if (lastCarMoved === "") {
      // First lastCarMoved will be blank/empty
      // Just move the car
      actuallyMoveCar(carToMove);
      // console.log("E");

    // Same row conflict
    } else if ((lastCarMoved.includes("topL") && (carToMove.includes('bottomL')))) {
      console.log("Green Car waiting on Yellow Car");
      setTimeout(function(){
        actuallyMoveCar(carToMove);
      }, 6000);

    // Same row conflict
    } else if ((lastCarMoved.includes("bottomL") && (carToMove.includes('topL')))) {
      console.log("Yellow Car waiting on Green Car");
      setTimeout(function(){
        actuallyMoveCar(carToMove);
      }, 6000);

    // Same row conflict
    } else if ((lastCarMoved.includes("bottomR") && (carToMove.includes('topR')))) {
      console.log("Blue Car waiting on Black Car");
      setTimeout(function(){
        actuallyMoveCar(carToMove);
      }, 6000);

    // Same row conflict
    } else if ((lastCarMoved.includes("topR") && (carToMove.includes('bottomR')))) {
      console.log("Black Car waiting on Blue Car");
      setTimeout(function(){
        actuallyMoveCar(carToMove);
      }, 6000);

    // Not a collision, just move the car 
    } else {
      actuallyMoveCar(carToMove);
      // console.log("F");
    }
  }


//// ---- Game ----

  
  // Create the random cars for the level.
  levelSetup();

  // Get the cars moving
  playGame();
  
// Event Listeners
  // Game over hit...
  $('.gameoverhit').click(function() {
    playAgain();
  })
  // Game over fell off...
  $('.gameoverfelloff').click(function() {
    playAgain();
  })
  // Game over fell off...
  $('.gameoveryouwon').click(function() {
    playAgain();
  })

// Bike movement control

  $(document).on("keydown", function(e) {

      // Get the position of the bike
      // Set as a float to 2dp to do comparison with later
      // for collision detection
    var leftPosition = parseFloat($bike.css("left")).toFixed(2);
    var topPosition = parseFloat($bike.css("top")).toFixed(2);
    
    switch(e.which) {
      case 90: // Left Balancing key (z key)
        balancedL +=0.8;
        if (balancedL < 10) {
          $('#balancedL').css('color', 'red');
        } else {
          $('#balancedL').css('color', 'rgb(46, 111, 200)');
        }
        break;
      
      case 88: // Right Balancing key (x key) 
        balancedR +=0.8;
        if (balancedR < 10) {
          $('#balancedR').css('color', 'red');
        } else {
          $('#balancedR').css('color', 'rgb(46, 111, 200)');
        }
      break;
      
      case 37: // Left
        if(!playerAlive) {
          // Return false = player has won or died
          // Ignore the keypress if the player is dead (deactivate keypress)
          return false;
        }
        console.log("Left pressed");
        if (leftPosition < 32) {
          // Set the maximum left gameplay distance you can go
          console.log("You can't go left anymore!");
        } else {
          console.log("Going left");
          e.preventDefault();
          $bike.css("left", "-=25px");
        }
        balancedL -=1;
        if (balancedL < 10) {
          $('#balancedL').css('color', 'red');
        } else {
          $('#balancedL').css('color', 'rgb(46, 111, 200)');
        }
        break;
      case 38 : // Up
        if(!playerAlive) {
          return false;
        }
        console.log("up pressed");
        if (topPosition > 115) {
        // Set the maximum height up the screen the bike can go
        //console.log(playerAlive);
          console.log("going up");
          $bike.css("top", "-=45px");
        } else {
          console.log("You can't go Up anymore!");
        }
        balancedL -=1;
        if (balancedL < 10) {
          $('#balancedL').css('color', 'red');
        } else {
          $('#balancedL').css('color', 'rgb(46, 111, 200)');
        }
        break;
      
      case 39: // Right
        // console.log(playerAlive); 
        if(!playerAlive) {
          return false;
        }
        console.log("Right key pressed");
        // Set the maximum right gameplay distance you can go
        if (leftPosition > 385) {
          console.log("You can't go right anymore!");
        } else {
          console.log("Going right")
          e.preventDefault();
          $bike.css("left", "+=20px");
          // collisionYes();
        }
        balancedR -=1;
        if (balancedR < 10) {
          $('#balancedR').css('color', 'red');
        } else {
          $('#balancedR').css('color', 'rgb(46, 111, 200)');
        } 
        break;
      case 40: // Down
        if(!playerAlive) {
          return false;
        }
        console.log("Down key pressed");
        if (topPosition > 350) {
          console.log("You can't go Down anymore!");
        } else {
          console.log("Going Down");
          $bike.css("top", "+=32px");
        }
        balancedR -=1; 
        if (balancedR < 10) {
          $('#balancedR').css('color', 'red');
        } else {
          $('#balancedR').css('color', 'rgb(46, 111, 200)');
        }
        break;
      default:
    }
    // Check if the player has balance points above 0
    checkIsBalanced();
    // Check if the player has won
    // checkForWin();

    // Log the players balance points to the screen
    // console.log(parseFloat(balancedL).toFixed(1));
    // $('#balancedL').text("Left Balance: " + parseFloat(balancedL).toFixed(1));
    $('#balancedL').text(parseFloat(balancedL).toFixed(1) + " ");
    // console.log(balancedR);
    // $('#balancedR').text("Right Balance: " + parseFloat(balancedR).toFixed(1));
    $('#balancedR').text(" " + parseFloat(balancedR).toFixed(1));
    // console.log(carsOnScreen+" COS");
    // console.log(playerAlive);
    // console.log(checkForWin);
    // if (playerAlive && !(checkForWin())) {
    if (playerAlive) {

    // Call the test to see if a collision has happened
    // Collision test for each element(-bike) on sceen. 
      for (i=0; i<carsOnScreen.length; i++) {
       // console.log(carsOnScreen[i] + " yo!");
      // Test if any of the cars on screen have hit the player 
        collisionTest($bike,$(carsOnScreen[i]));
      // If the player has been hit the following will create action
        playerHit($(carsOnScreen[i]));
      }
  }
  });
// // Close of the self-init function
});
// // End

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
