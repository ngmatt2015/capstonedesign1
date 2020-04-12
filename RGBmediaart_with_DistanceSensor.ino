//variables for led
int led[3] = {15, 4, 17};
int gnd[3] = {2, 16, 5};
//variables for distance sensor (HC-SR04)
int trigPin = 14;    // Trigger
int echoPin = 12;    // Echo
long duration, cm, inches;
 
void setup() {
  //Serial Port begin
  Serial.begin (115200);
  //Define inputs and outputs for distance sensor
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  //Define inputs and outputs for led
  for (int i=0; i<3; i++) {
    pinMode(led[i], OUTPUT);
    digitalWrite(led[i], 1);
    
    pinMode(gnd[i], OUTPUT);
    digitalWrite(gnd[i], 0);
  }
}
 
void loop() {
  // The sensor is mtriggered by a HIGH pulse of 10 or more microseconds.
  // Give a short LOW pulse beforehand to ensure a clean HIGH pulse:
  digitalWrite(trigPin, LOW);
  delayMicroseconds(5);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
 
  // Read the signal from the sensor: a HIGH pulse whose
  // duration is the time (in microseconds) from the sending
  // of the ping to the reception of its echo off of an object.
  pinMode(echoPin, INPUT);
  duration = pulseIn(echoPin, HIGH);
 
  // Convert the time into a distance : since distance = verocity * time
  cm = (duration/2) / 29.1;     // Divide by 29.1 or multiply by 0.0343
  inches = (duration/2) / 74;   // Divide by 74 or multiply by 0.0135

    for (int k=0; k<3; k++) {
    //if it is very close, blink faster
      if (inches <= 1){
        digitalWrite(led[k], 1);
        delay(10);
        digitalWrite(led[k], 0);
        delay(20);
      }
      //if it is in distance blink speed is proportional to the distance
      else{
        digitalWrite(led[k], 1);
        delay(inches * 25);
        digitalWrite(led[k], 0);
        delay(inches * 50); 
      }
  }
  
  //just for serial to check the distance
  Serial.print(inches);
  Serial.print("in, ");
  Serial.print(cm);
  Serial.print("cm");
  Serial.println();
  
  delay(250);
}
