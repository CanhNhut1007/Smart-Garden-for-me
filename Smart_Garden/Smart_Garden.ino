#include "ThingSpeak.h"
#include <ESP8266WiFi.h>
#include <DHT.h>
#include <Wire.h>
#include <LiquidCrystal.h>
#include <LiquidCrystal_I2C.h>
 
const int pin_flame = 3;
const int sensor_pin = A0;
const int DHTPIN = 13;       //Đọc dữ liệu từ DHT11 ở chân 2 trên mạch Arduino
const int DHTTYPE = DHT11;
const int pin_den=14;
const int pin_bom=15;
unsigned long myChannelNumber = 647935;
const char * myWriteAPIKey ="WQ2OV6P18T3F4ZET";
const char * myReadAPIKey ="ZACA691B4F3VC19B";
 
int Humidity = 0;    //Đọc độ ẩm
int Temperature = 0; //Đọc nhiệt độ
int Soil_Moisture = 0; //Đọc độ ẩm đất
int SensorFire = 0;
int range = 0;
int DataLamp = 0;
int DataPump = 0;
 
char ssid[] = "RedmiS2";   // your network SSID (name) 
char pass[] = "19980804";   // your network password
int keyIndex = 0;            // your network key Index number (needed only for WEP)
String myStatus = "";

DHT dht(DHTPIN, DHTTYPE);
 
WiFiClient  client;
LiquidCrystal_I2C lcd(0x3f, 20, 4);  
 
void setup()
{
 
  lcd.begin();                     
  lcd.backlight();
 
  pinMode(pin_den,OUTPUT);
  pinMode(pin_bom,OUTPUT);  
  digitalWrite(pin_den,LOW);
  digitalWrite(pin_bom,LOW);
  
  ThingSpeak.begin(client);  // Initialize ThingSpeak

  dht.begin();
}
 
void loop()
{  
  Humidity = int(dht.readHumidity());
  Temperature = int(dht.readTemperature());

  while(Humidity > 1000)
  {
     Humidity = int(dht.readHumidity());
  }
  while(Temperature > 1000)
  {
    Temperature = int(dht.readTemperature());
  }
  Soil_Moisture = int( 100.00 - ( (analogRead(A0)/1023.00) * 100.00));
  SensorFire = analogRead(pin_flame);                                                                           
  range = map(SensorFire, 0, 1024, 0, 3);

  WiFi.begin(ssid, pass);
// Connect or reconnect to WiFi
  while(WiFi.status() != WL_CONNECTED)
  {
    delay(500);    
  } 
 
  lcd.setCursor(0, 0);
  lcd.print("Smart Garden For Me");
  
  lcd.setCursor(0, 1);
  lcd.print("Temp:");
  lcd.print(Temperature);
  lcd.print(" oC ");
 
  lcd.setCursor(10, 1);
  lcd.print("Humi:");
  lcd.print(Humidity);
  lcd.print(" % ");
 
  lcd.setCursor(0, 2);
  lcd.print("Soil:");
  lcd.print(Soil_Moisture);
  lcd.print(" %");
  
  if (range == 0 || range == 1)
  {
    lcd.setCursor(10, 2);
    lcd.print("Fire: Yes");
  }
  else
  {
    lcd.setCursor(10, 2);
    lcd.print("Fire: No ");
  }
 
  int data_field_7 = readTSDataField(myChannelNumber,7);

  if(data_field_7 == -1)
  {
    lcd.setCursor(0, 3);
    lcd.print("Lamp: NO ");
  }
  else
  {
    lcd.setCursor(0, 3);
    lcd.print("Lamp: ");
    lcd.print(data_field_7);
    lcd.print("   ");
    if(data_field_7 == 1)
    {
      MoDen();
    }
    else
    {
      TatDen();
    }
  }
  
 
  int data_field_8 = readTSDataField(myChannelNumber,8);

  if(data_field_8 == -1)
  {
    lcd.setCursor(10, 3);
    lcd.print("Pump: NO ");
  }
  else
  {
    lcd.setCursor(10, 3);
    lcd.print("Pump: ");
    lcd.print(data_field_8);
    lcd.print("  ");
    if(data_field_8 == 1)
    {
      MoMayBom();
    }
    else
    {
      TatMayBom();
    }
  }
  Sendata();
  delay(1000);
}
