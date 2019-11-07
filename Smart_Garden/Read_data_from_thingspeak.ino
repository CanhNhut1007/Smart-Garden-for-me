void Sendata() 
{
  // set the fields with the values
  ThingSpeak.setField(1, Temperature);
  ThingSpeak.setField(2, Humidity);
  ThingSpeak.setField(3, Soil_Moisture);
  ThingSpeak.setField(4, SensorFire);
  ThingSpeak.setField(5, DataLamp);
  ThingSpeak.setField(6, DataPump);
 
  char buffer1[10];
  String str_Humidity = dtostrf(Humidity, 4, 1, buffer1); 
  char buffer2[10];
  String str_Temperature = dtostrf(Temperature, 4, 1, buffer2); 
  char buffer3[10];
  String str_Soil_Moisture = dtostrf(Soil_Moisture, 4, 1, buffer3); 
  char buffer4[10];
  String str_SensorFire = dtostrf(SensorFire, 4, 1, buffer4); 
  char buffer5[10];
  String str_DataLamp = dtostrf(DataLamp, 4, 1, buffer5); 
  char buffer6[10];
  String str_DataPump = dtostrf(DataPump, 4, 1, buffer6); 
 
  myStatus = String("Temperature: " + str_Temperature + "   " + "Humidity : " + str_Humidity + "   " + "Soil_Moisture: " + str_Soil_Moisture + "   " + "SensorFire: " + str_SensorFire + "   " + "DataLamp: " + str_DataLamp + "   " + "DataPump: " + str_DataPump ); 
  ThingSpeak.setStatus(myStatus);
  
  // write to the ThingSpeak channel
  int x = ThingSpeak.writeFields(myChannelNumber, myWriteAPIKey);
  if(x == 200){
  //  Serial.println("Channel update successful.");
  }
  else{
   // Serial.println("Problem updating channel. HTTP error code " + String(x));
  }
  
  delay(1000); // Wait 20 seconds to update the channel again
}


int readTSDataField( long TSChannel,unsigned int TSField ){
  if (ThingSpeak.readStringField(myChannelNumber, TSField, myReadAPIKey)!= "null")
  {
    int data =  ThingSpeak.readFloatField( TSChannel, TSField,myReadAPIKey);
    return data;
  }
  return (-1);
}
