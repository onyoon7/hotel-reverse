var mysql = require('mysql');

/*--------------------------------------------------------------------
  1. Create a MySQL database connection and export it
  - host: localhost
  - user: root
  - password: (root password of individual installation,
               in my case: lion0787)
  - database: hotel-reverse (let's determine database name)

  2. Then connect to 'hotel-reverse' database
 --------------------------------------------------------------------*/

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1008',
  database: 'hotelreverse'
});

connection.connect(function(err) {
  if (err) {
    console.log('can`t connect to mysql database');
    return;
  }
  console.log('successfully connected to database...');
});

//delete all rows in client, deal, hotel
connection.query('DELETE FROM client', function(err, results, fields){
  if(err) throw err;
  console.log("Successfully deleted");
});
connection.query('DELETE FROM deal', function(err, results, fields){
  if(err) throw err;
  console.log("Successfully deleted");
});
connection.query('DELETE FROM hotel', function(err, results, fields){
  if(err) throw err;
  console.log("Successfully deleted");
});

//create dummy data in client, deal, hotel
var client = [{
  client_ID: '000a',
  client_PW: '000a',
  client_Name: '하이오',
  client_Email: '000a@gmail.com',
  billingInfo: '000a-0001-0002-0003',
  member: 1
},
{
  client_ID: '000b',
  client_PW: '000b',
  client_Name: '개살구',
  client_Email: '000b@gmail.com',
  billingInfo: '000b-0001-0002-0003',
  member: 0
},
{
  client_ID: '000c',
  client_PW: '000c',
  client_Name: '나부자',
  client_Email: '000c@gmail.com',
  billingInfo: '000c-0001-0002-0003',
  member: 0
}];
var deal = [
  {
    checkIn_Date: '2016-06-20',
    checkOut_Date: '2016-06-30',
    mainArea_Name: '서울시',
    subArea_Name: '강남구',
    bid_Price: 350000,
    bid_Transaction: 0
  },
  {
    checkIn_Date: '2016-07-14',
    checkOut_Date: '2016-07-29',
    mainArea_Name: '서울시',
    subArea_Name: '서초구',
    bid_Price: 600000,
    bid_Transaction: 0
  },
  {
    checkIn_Date: '2016-12-04',
    checkOut_Date: '2016-12-23',
    mainArea_Name: '제주도',
    subArea_Name: '서귀포시',
    bid_Price: 300000,
    bid_Transaction: 0
  }

];
var hotel = [
  {
    hotel_ID: 'a1',
    hotel_PW: 'a1',
    hotel_Name: 'a1 hotel',
    hotel_Address: '서울시 강남구',
    mainArea_Name: '서울시',
    subArea_Name: '강남구',
    hotel_Rate: 3,
    mgr_Name: '오동길',
    booking_Num: 100
  },
  {
    hotel_ID: 'a2',
    hotel_PW: 'a2',
    hotel_Name: 'a2 hotel',
    hotel_Address: '서울시 서초구',
    mainArea_Name: '서울시',
    subArea_Name: '서초구',
    hotel_Rate: 5,
    mgr_Name: '박준희',
    booking_Num: 200
  },
  {
    hotel_ID: 'a3',
    hotel_PW: 'a3',
    hotel_Name: 'a3 hotel',
    hotel_Address: '제주도 서귀포시',
    mainArea_Name: '제주도',
    subArea_Name: '서귀포시',
    hotel_Rate: 2,
    mgr_Name: '양서리',
    booking_Num: 300
  }
];

for(var i = 0; i < client.length; i++){
  var query1 = 'INSERT INTO Client SET client_ID=?, client_PW=?, client_Name=?, client_Email=?, billingInfo=?, member=?';
  var query2 = [client[i].client_ID, client[i].client_PW, client[i].client_Name, client[i].client_Email, client[i].billingInfo, client[i].member];

  connection.query(query1, query2, function(err, results, fields){
    if(err){
      console.log('Unsuccessful!');
    }else{
      console.log('Successfl!');
    }
  })
}
var rows;
for(var i = 0; i < deal.length; i++){
  var query1 = 'INSERT INTO Deal SET checkIn_Date=?, checkOut_Date=?, mainArea_Name=?, subArea_Name=?, bid_Price=?, bid_Transaction=?, bid_StartTime=now(), bid_EndTime=now()+INTERVAL 1 DAY';
  var query2 = [deal[i].checkIn_Date, deal[i].checkOut_Date, deal[i].mainArea_Name, deal[i].subArea_Name, deal[i].bid_Price, deal[i].bid_Transaction];
  console.log(query1);
  console.log(query2);

  connection.query(query1, query2, function(err, results, fields){
    if(err){
      console.log('Unsuccessful!');
    }else{
      console.log('Successfl!');

    }
  })
}


  connection.query('select booking_Num from Deal', function(err, results, fields){
    if(err){
      console.log('Unsuccessful!');
    }else{
      console.log('Successfl!');
      console.log(results);
      rows = results;
      console.log('rows: ', rows);
      console.log('rows[0] booking_Num', rows[0].booking_Num)
    }
  })





setTimeout(function(){
  console.log('rows=> ', rows);
  for(var i = 0; i < hotel.length; i++){
    var query1 = 'INSERT INTO Hotel SET hotel_ID=?, hotel_PW=?, hotel_Name=?, hotel_Address=?, mainArea_Name=?, subArea_Name=?, hotel_Rate=?, mgr_Name=?, booking_Num=?';
    var query2 = [hotel[i].hotel_ID, hotel[i].hotel_PW, hotel[i].hotel_Name, hotel[i].hotel_Address, hotel[i].mainArea_Name, hotel[i].subArea_Name, hotel[i].hotel_Rate, hotel[i].mgr_Name, rows[i].booking_Num];

    connection.query(query1, query2, function(err, results, fields){
      if(err){
        console.log(err);
        console.log('Unsuccessful!');
      }else{
        console.log('Successfl!');
      }
    })
  }

  connection.end();
}, 1000);
