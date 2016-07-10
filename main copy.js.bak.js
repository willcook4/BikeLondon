console.log("Page loaded, Game on!");

// // Will Cook
// // Web Development Immersive 21 - London GA 2016 




// // Self initializing function to auto start the script
$(function() {
  var playerAlive = true;

//  while (playerAlive) {
  console.log('hello');
//   // ----  Variables   ----
//   // Variable to store if there has been a collision or not 
    // var collision = false;
//   // Variable to store the bike
  var $bike = $('#bike');
//   // Game time left (seconds)
//     var time = 30;
//   // Is the player alive?
    


//   // ---- Functions ----

//   // Function to check if the bike has hit a car
//   // Returns true if there is a collision
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

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) playerAlive = true;
    //playerAlive = false;
    else playerAlive = false;
  }

//   // ---- Game ----
//   // Runs the game timer down. var time set above


//     // var timerId = setInterval(function() {
//       // Game runs until time === 0 or the 
//       // Check the window and see if there has been a collision every 200ms
//         // window.setInterval(function() {
            
  // function collisionYes() {
  //   $('#result').text(collisionTest($('#bike'), $('#car')));
  // console.log(collisionTest($('#bike'),$('#car')) === true);
  //     $('#bike').css("background-color", "red");
  //     console.log("Game over carface!");
  //     playerAlive = false;
  //     console.log(playerAlive);
  //   } else {
  //     $('#bike').css("background-color", "green");
  //     // console.log("No collisions(Yet)");
  //   }
  // //         // }, 200);
  // }


//while (playerAlive) {
//       // Bike movement control

  $(document).on("keydown", function(e) {

      // Get the position of the bike
    var leftPosition = parseFloat($bike.css("left")).toFixed(2);
    // Set as a fload to 2dp to do comparison with later
    // for collision detection


     
    switch(e.which) {
      case 37: // left
        if(!playerAlive) {
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
      case 38 : // up
        if(!playerAlive) {
          return false;
        }
        $bike.css("top", "-=50px");
        break;
      
      case 39: // right
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
      case 40: // down
        if(!playerAlive) {
          return false;
        }
        $bike.css("top", "+=50px");
        break;
      default:

      
    }
    collisionTest($bike, $('#car'));

    if(!playerAlive) {
      // $bike.remove();
      $bike.css("background-color", "red");
    }
  });
//}

//     //   time--;
//     //   console.log(time);
//     //   if(time === 0) {
//     //     clearInterval(timerId);
//     //     console.log("Time has run out");
//     //     playerAlive = false;
//     //   }
//     // }, 1000);
// }
// // Close of the self-init function
});
// // End

// ////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////


// //   var $bike = $('#bike');
// //   $(document).on("keydown", function(e) {
// //     var leftPosition = ($bike.css("left"));
// //     // console.log(leftPosition+ "pure left position");
// //     leftPosition = parseFloat(leftPosition);
// //     leftPosition = leftPosition.toFixed(2);
// //     // console.log(leftPosition + " float to 2dp.");


// //     switch(e.which) {
// //       case 37:
// //       case "ArrowLeft":
// //         console.log("Left pressed");
// //         if (leftPosition < 32) {
// //           console.log("You can't go left anymore!");
// //         } else {
// //           console.log("Going left")
// //           $bike.css("left", "-=25px");
// //         }
// //         break;
// //       case 38 :
// //       case "ArrowUp":

// //         $bike.css("top", "-=50px");
// //         break;
      
// //       case 39:
// //       case "ArrowRight":
// //         console.log("Right key pressed");
// //         if (leftPosition > 385) {
// //           console.log("You can't go right anymore!");
// //         } else {
// //           console.log("Going right")
// //           $bike.css("left", "+=25px");
// //         }
// //         break;
// //       case 40:
// //       case "ArrowDown":
// //         $bike.css("top", "+=50px");
// //         break;

// //     }
// //   });

// //   // Move a car from r to left
// //   function carMoveRtoL($car) {
// //     $car.animate({left: "-500px"}, 2500).delay( 2000 );
// //   };
// //   carMoveRtoL($('#car'));
  
// //   // Move a car from r to left
// //   function carMoveLtoR($car) {
// //     $car.animate({left: "500px"}, 2500).delay( 25000 );
// //   };
// //   carMoveLtoR($('#car'));  

// //   // Hide a car not on the board
// //   function hideCar($car) {
// //     if ($('#car').css('left'))
// //     $car.hide();
// //   };
// //   // hideCar($('#car'));

// //   //create a new car
// //   function newCar() {
// //     var $car = $("<div></div>");
// //     $(".board").append($car);
// //     console.log('making a new car');
// //     $('#car').css({ backgroundColor: 'black', 
// //                     width: '100px',
// //                     height: '100px',
// //                     position: 'absolute', 
// //                     top: '400px',
// //                     left: '400px',
// //                     margin: '0px;' });
// //   }
// //   setTimeout(newCar, 2000);
// //   setTimeout(carMoveRtoL($('#car')), 10);

// //   // Function to check if the bike has hit a car
// //   // Returns true if there is a collision
// //   function collision($bike, $car) {
// //      var $x1 = $bike.offset().left;
// //      var $y1 = $bike.offset().top;
// //      var $h1 = $bike.outerHeight(true);
// //      var $w1 = $bike.outerWidth(true);
// //      var $b1 = $y1 + $h1;
// //      var $r1 = $x1 + $w1;
// //      var $x2 = $car.offset().left;
// //      var $y2 = $car.offset().top;
// //      var $h2 = $car.outerHeight(true);
// //      var $w2 = $car.outerWidth(true);
// //      var $b2 = $y2 + $h2;
// //      var $r2 = $x2 + $w2;

// //      if ($b1 < $y2 || $y1 > $b2 || $r1 < $x2 || $x1 > $r2) return false;
// //      return true;
// //   }
// //   collision($($('#bike')),($('#car')));
  
// // // Check for a collision every 200ms, Change the bike color if a collision happens
// //   window.setInterval(function() {
// //       $('#result').text(collision($('#bike'), $('#car')));

// //       if ((collision($($('#bike')),($('#car')))) === true) {
// //         $('#bike').css("background-color", "red");
// //         console.log("Game over carface!");
// //         $('#car').finish();
// //         $('#car').remove();


// //       } else {
// //         $('#bike').css("background-color", "green");
// //       }
// //   }, 200);


// //   // $('#bike,#car').draggable();

// // });

