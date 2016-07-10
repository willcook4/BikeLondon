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
// count of cars
  var carCount = 0;

//// ---- Functions ----

//create a new car
function newCar(lane) {
  if (lane === "topR") {
    var $car = $("<div id=\"car\"></div>");
    $(".board").append($car);
    console.log('making a new car');
    $('#car').css({ backgroundColor: 'blue', 
                      width: '100px',
                      height: '100px',
                      position: 'absolute', 
                      top: '130px',
                      left: '600px',
                      margin: '0px' });

  } else if (lane === "bottomR") {
    var $car = $("<div id=\"car\"></div>");
    $(".board").append($car);
    console.log('making a new car');
    $('#car').css({ backgroundColor: 'blue', 
                    width: '100px',
                    height: '100px',
                    position: 'absolute', 
                    top: '320px',
                    left: '600px',
                    margin: '0px' });
  } else {
  }
}

function carMoveRtoL($car) {
    $car.animate({left: "-600px"}, 5000)
    // $car.animate({left: "-500px"}, 2500).delay( 2000 );
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

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
      playerAlive = true;
    } else { 
      playerAlive = false;
    }
  }
//// ---- Game ----
// ---- Game movements  ----

newCar("topR");
// newCar("bottomR");  
carMoveRtoL($('#car'));
newCar("bottomR");

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
