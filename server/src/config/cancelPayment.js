//
//  usage:
//  - command line에서 crontab -e 실행
//  - */10 * * * * absolute_path_of_node absolute_path_of_canccelPayment.js
//  
//  crontab format
//  - MIN HOUR DOM MON DOW CMD
//    * MIN: minute (0 ~ 59)
//    * HOUR: hour (0 ~ 23)
//    * DOM: Day of Month (1 ~ 31)
//    * MON: Month field (1 ~ 12)
//    * DOW: Day of week (0~6)
//    * CMD: command

// 1. get current time

// 2. find deals where bid_Transaction=0 and bid_EndTime < current_Time

// 3. cancel transaction

// issues: do we need another field in deal?

var Sequelize = require('sequelize');
var mysql = require('mysql');
var moment = require('moment');
var request = require('request');
var formData = require('form-data');
var nodemailer = require('nodemailer');

/*--------------------------------------------------------------------
  1. Connect to MySQL database(hotelreverse) connection and export it
  - host: localhost
  - user: hotel
  - password: hotel
  - database: hotelreverse

  2. Then connect to 'hotelreverse' database
 --------------------------------------------------------------------*/

var sequelize = new Sequelize('hotelreverse', 'hotel', 'hotel', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(function(err) {
    console.log('connection has been established successfully');
  })
  .catch(function(err) {
    console.log('unable to connect to database: ', err);
  })


/*--------------------------------------------------------------------
  To use tables, set models
  We use already installed databases and tables

  1. Client table
  2. Deal table
  3. Hotel table
 --------------------------------------------------------------------*/

var Client = sequelize.define('Client', {
  client_Index: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'client_Index'
  },
  client_ID: {
    type: Sequelize.STRING(128),
    defaultValue: null,
    field: 'client_ID'
  },
  client_PW: {
    type: Sequelize.STRING(128),
    allowNull: false,
    field: 'client_PW'
  },
  client_Name: {
    type: Sequelize.STRING(128),
    allowNull: false,
    field: 'client_Name'
  },
  client_Email: {
    type: Sequelize.STRING(128),
    allowNull: false,
    unique: true,
    field: 'client_Email'
  },
  billingInfo: {
    type: Sequelize.STRING(128),
    allowNull: false,
    field: 'billingInfo'
  },
  member: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'member'
  }

}, {
  tableName: 'Client',
  associate: function(models) {
    Client.hasMany(models.Deal, {
      foreignKey: 'client_Index',
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },
  timestamps: false,
  freezeTableName: true
});


var Deal = sequelize.define('Deal', {
  booking_Num: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'booking_Num'
  },
  client_Index: {
    type: Sequelize.INTEGER,
    field: 'client_Index'
  },
  hotel_ID: {
    type: Sequelize.STRING(128),
    field: 'hotel_ID'
  },
  checkIn_Date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    field: 'checkIn_Date'
  },
  checkOut_Date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    field: 'checkOut_Date'
  },
  mainArea_Name: {
    type: Sequelize.STRING(128),
    allowNull: false,
    field: 'mainArea_Name'
  },
  subArea_Name: {
    type: Sequelize.STRING(128),
    allowNull: false,
    field: 'subArea_Name'
  },
  bid_Price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: 'bid_Price'
  },
  bid_StartTime: {
    type: Sequelize.DATE,
    allowNull: false,
    field: 'bid_StartTime'
  },
  bid_EndTime: {
    type: Sequelize.DATE,
    allowNull: false,
    field: 'bid_EndTime'
  },
  bid_Transaction: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'bid_Transaction'
  }
}, {
  tableName: 'Deal',
  associate: function(models) {
    Deal.belongsTo(models.Client, {foreignKey: 'client_Index'});
    //Deal.belongsTo(models.Hotel, {foreignKey: 'booking_Num'});
  },
  timestamps: false,
  freezeTableName: true
});


var Hotel = sequelize.define('Hotel', {
  hotel_Index: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'hotel_Index'
  },
  hotel_ID: {
    type: Sequelize.STRING(128),
    allowNull: false,
    field: 'hotel_ID'
  },
  hotel_PW: {
    type: Sequelize.STRING(128),
    allowNull: false,
    field: 'hotel_PW'
  },
  hotel_Name: {
    type: Sequelize.STRING(128),
    allowNull: false,
    field: 'hotel_Name'
  },
  hotel_Address: {
    type: Sequelize.STRING(128),
    allowNull: false,
    field: 'hotel_Address'
  },
  mainArea_Name: {
    type: Sequelize.STRING(128),
    allowNull: false,
    field: 'mainArea_Name'
  },
  subArea_Name: {
    type: Sequelize.STRING(128),
    allowNull: false,
    field: 'subArea_Name'
  },
  hotel_Rate: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: 'hotel_Rate'
  },
  mgr_Name: {
    type: Sequelize.STRING(128),
    allowNull: false,
    field: 'mgr_Name'
  }
}, {
  tableName: 'Hotel',
  // associate: function(models) {
  //   Hotel.hasMany(models.Deal, {
  //     foreignKey: 'booking_Num',
  //     onDelete: 'cascade',
  //     onUpdate: 'cascade'
  //   })
  // },
  timestamps: false,
  freezeTableName: true
});


// sync to the table
Client.sync().then(function() {
  //console.log('now, can use Client table');
});

Deal.sync().then(function() {
  //console.log('now, can use Deal table');
});

Hotel.sync().then(function() {
  //console.log('now, can use Hotel table');
});

function makeTime(date) {
  var yyyymmdd = date.toISOString().split('T')[0];
  var second = date.toISOString().split('T')[1];
  var hhmmss = second.split('.')[0];

  return yyyymmdd + ' ' + hhmmss;
}

/*
  Current Cancel Policy
  Find all bids 
    - where bid_Transaction=0 &&
    - bid_EndTime < current_Time
 */


/*---------------------------------------------
  rsponse form from iamport

    {
      "code": 0,
      "message": "string",
      "response": {
        "imp_uid": "string",
        "merchant_uid": "string",
        "pay_method": "string",
        "pg_provider": "string",
        "pg_tid": "string",
        "escrow": true,
        "apply_num": "string",
        "card_name": "string",
        "card_quota": 0,
        "vbank_name": "string",
        "vbank_num": "string",
        "vbank_holder": "string",
        "vbank_date": 0,
        "name": "string",
        "amount": 0,
        "cancel_amount": 0,
        "buyer_name": "string",
        "buyer_email": "string",
        "buyer_tel": "string",
        "buyer_addr": "string",
        "buyer_postcode": "string",
        "custom_data": "string",
        "user_agent": "string",
        "status": "ready",
        "paid_at": 0,
        "failed_at": 0,
        "cancelled_at": 0,
        "fail_reason": "string",
        "cancel_reason": "string",
        "receipt_url": "string"
      }
    } 

    request format: multipart/form-data
    (usually, form data is sent to server with format
     application/x-www-form-urlencoded)

    to simplify the usage of multipar/form-data
    use npm package form-data
    (npm install form-data)

    {
      imp_uid: 'imp41836879', // 취소할 거래의 고유번호
      merchant_uid: 'merchant_uid'  // 가맹점에서 전달한 고유 거래번호
      amount: amount,         // 부분 취소 요청금액, 누락이면 전액 취소
      reason: 'reason',       // 변경 사유
      refund_holder: 'refund_holder'  // 환불계좌 예금주(가상계좌 취소시 필수)
      refund_bank: 'refund_bank',      // 환불계좌 은행코드(가상계좌 취소시 필수)
      refund_account: 'refund_account'  // 환불계좌 계좌번호(가상계좌 취소시 필수)
    } 

 ---------------------------------------------*/

function cancelPayment(results) {
  console.log('the list of deals to be canceled >>>>');
  console.log(results);

  if (results.length === 0) {
    console.log('no items to cancel');
    return;
  }

  var url = 'https://api.iamport.kr/payments/cancel?_token=cc526a227073d08bbd5faea1563d2052c7866dfa';
  var cancelRequest = {
    imp_uid: 'imp41836879',
    merchant_uid: '',
    //amonut: 0,
    reason: '거래 실패',
    refund_holder: '',
    refund_bank: '',
    refund_account: ''
  }

  for (var i = 0; i < results.length; i++) {
    request({
      url: url,
      method: 'post',
      formData: cancelRequest,
      json: true
    }, function(err, response, body) {
      if (err) {
        return console.error('cancel failed: ' + err);
      }
      console.log('Cancel successful! Server response with: ', body);
      sendCancelNotification(results);
    })    
  }

}




function sendCancelNotification(results) {

  function sendMail(client_Email) {
    console.log('client_Email:' + client_Email);
    //console.log('booking_Num:' + booking_Num);
    client_Email = 'gooday2.luv@gmail.com';

    var smtpTransport = nodemailer.createTransport("SMTP", {
      service: 'Gmail',
      auth: {
        user: client_Email,
        pass: 'a1082926'
      }
    }); 

    var mailOptions = {
      from: 'hotelreverse <korean.crossfitter@gmail.com>',
      to: client_Email,
      subject: 'Cancel Notification',
      text: '고객님, 주문번호가 취소되었습니다.'
    };

    smtpTransport.sendMail(mailOptions, function(error, response){

      if (error){
        console.log(error);
      } else {
        console.log("Message sent : " + response.message);
      }
      smtpTransport.close();
    });  

  }

  
  for (var i = 0; i < results.length; i++) {
    console.log("results[i].client_Index", results[i].client_Index)
    Client.findOne({
      where: {client_Index: results[i].client_Index}
    })
    .then(function(client) {
      //console.log("results>>>");
      //console.log(self.results[i]);
      console.log(client.dataValues);
      sendMail(client.dataValues.client_Email);
    })
    .catch(function(error) {
      console.log('Error: ' + error)
    })
  }


}

var currentTime = makeTime(new Date());

Deal.findAll({
    where: {
      bid_Transaction: false,
      bid_EndTime: {
        $gt: currentTime
      }
    }
  })
  .then(function(deals) {
    var results = [];
    for (var i = 0; i < deals.length; i++) {
      results.push(deals[i].dataValues);
    }
    return results;
  })
  .then(function(results) {
    cancelPayment(results);
  })
  .catch(function(error) {
    console.log('Error: ' + error);
  })
