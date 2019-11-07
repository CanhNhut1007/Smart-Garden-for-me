void TatDen()
{
     DataLamp = 0;
     digitalWrite(pin_den,LOW);
}
 void MoDen()
 {
    DataLamp = 1;
     digitalWrite(pin_den,HIGH);
 
 }
 void TatMayBom()
 {
    DataPump = 0;
     digitalWrite(pin_bom,LOW); 
 
 }
 void MoMayBom()
 {
   DataPump = 1;
   digitalWrite(pin_bom,HIGH);
   
 }
