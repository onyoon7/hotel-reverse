export interface Contract {
  booking_Num: number;
  client_Index: number;
  hotel_ID: string;
  checkIn_Date: string;
  checkOut_Date: string;
  mainArea_Name: string;
  subArea_Name: string;
  bid_Price: number;
  bid_StartTime: string;
  bid_EndTime: string;
  bid_Transaction: boolean;
  imp_uid: string;
}
