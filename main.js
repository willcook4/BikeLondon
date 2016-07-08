console.log("Page loaded!");

$(function() {
  var $bike = $('#bike');
  $(document).on("keydown", function(e) {
    var $leftPosition = ($bike.css("left"));
    // console.log($leftPosition+ "pure left position");
    $leftPosition = parseFloat($leftPosition);
    $leftPosition = $leftPosition.toFixed(2);
    // console.log($leftPosition + " float to 2dp.");


    switch(e.which) {
      case 37:
      case "ArrowLeft":
        console.log("Left pressed");
        if ($leftPosition < 32) {
          console.log("You can't go left anymore!");
        } else {
          console.log("Going left")
          $bike.css("left", "-=25px");
        }
        break;
      case 38 :
      case "ArrowUp":

        $bike.css("top", "-=50px");
        break;
      
      case 39:
      case "ArrowRight":
        console.log("Right key pressed");
        if ($leftPosition > 385) {
          console.log("You can't go right anymore!");
        } else {
          console.log("Going right")
          $bike.css("left", "+=25px");
        }
        break;
      case 40:
      case "ArrowDown":
        $bike.css("top", "+=50px");
        break;

    }
  });

  // Move a car from r to left
  function carMoveRtoL($car) {
    $($car).animate({left: "-500px"}, 2500).delay( 2000 );
  };
  carMoveRtoL($('#car'));
  
  // Move a car from r to left
  function carMoveLtoR($car) {
    $($car).animate({left: "500px"}, 2500).delay( 25000 );
  };
  carMoveLtoR($('#car'));  

  // Hide a car not on the board
  function hideCar($car) {
    if ($('#car').css('left'))
    $($car).hide();
  };
  // hideCar($('#car'));

  //create a new car
  function newCar() {
    var $car = $("<div></div>");
    $(".board").append($car);
    console.log('making a new car');
    $('#car').css({ backgroundColor: 'black', 
                    width: '100px',
                    height: '100px',
                    position: 'absolute', 
                    top: '400px',
                    left: '400px',
                    margin: '0px;' });
  }
  setTimeout(newCar, 2000);
  setTimeout(carMoveRtoL($('#car')), 10);

  // Function to check if the bike has hit a car
  // Returns true if there is a collision
  function collision($bike, $car) {
     var $x1 = $bike.offset().left;
     var $y1 = $bike.offset().top;
     var $h1 = $bike.outerHeight(true);
     var $w1 = $bike.outerWidth(true);
     var $b1 = $y1 + $h1;
     var $r1 = $x1 + $w1;
     var $x2 = $car.offset().left;
     var $y2 = $car.offset().top;
     var $h2 = $car.outerHeight(true);
     var $w2 = $car.outerWidth(true);
     var $b2 = $y2 + $h2;
     var $r2 = $x2 + $w2;

     if ($b1 < $y2 || $y1 > $b2 || $r1 < $x2 || $x1 > $r2) return false;
     return true;
  }
  collision($($('#bike')),($('#car')));
  
// Check for a collision every 200ms, Change the bike color if a collision happens
  window.setInterval(function() {
      $('#result').text(collision($('#bike'), $('#car')));

      if ((collision($($('#bike')),($('#car')))) === true) {
        $('#bike').css("background-color", "red");
        console.log("Game over carface!");
        $('#car').finish();
        $('#car').remove();


      } else {
        $('#bike').css("background-color", "green");
      }
  }, 200);


  // $('#bike,#car').draggable();

});

