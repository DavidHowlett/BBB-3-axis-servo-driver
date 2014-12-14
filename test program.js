// Test programme for BBB.


var b = require('bonescript');


var cyclespersecond = 5;


// set up all the pins
var pin_servo = 'P9_14';
var pin_pot = 'P9_40';
var pin_switch = 'P8_19';


// for the normal io, set the pin direction (not required for ADC)
b.pinMode(pin_switch, b.INPUT);
b.pinMode(pin_servo, b.OUTPUT);


// define the servo object
var servo = {
    pin : pin_servo,
    duty_cycle : 0, // this is what is output to the servo but calculated in a formula for rc servos - see updateServo routine
    duty_ratio : 0.115, // part of the calculation for the specific servo I used
    duty_min : 0.03, // so is this - it tweaks that starting position
    frequency : 60, // output to the servo
    position : 0.5 // this is just the starting position (roughly central)
}




// set the cycle counter so that it calls a routine repeatedly
setInterval(function(){cycle()},1000 / cyclespersecond);


function cycle()
{
    // read all the inputs
    var value_pot = analogRead(pin_pot);   // this is a value between 0 and 1
    var value_switch = b.digitalRead (pin_switch);  // this is either 0 or 1
    
    console.log ("Pot: " + value_pot);
    console.log ("Switch: " + value_switch);
    
    servo.position = value_pot; // just copy the value of the pot to the servo for the purposes of testing
    
    updateServo (servo);
}


function updateServo (servo) {
    
    // ensure the position in a range of 0 to 1 just in case some external calculation made an error
    if (servo.position < 0) servo.position = 0;
    if (servo.position > 1) servo.position = 1; 
  
    // Calculate the duty cycle of the servo
    servo.duty_cycle = (servo.position * servo.duty_ratio) + servo.duty_min;


    b.analogWrite(servo.pin, servo.duty_cycle, servo.frequency);


}
// end of code


// Save the file as test.js


