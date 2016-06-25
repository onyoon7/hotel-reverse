import Sequelize from 'sequelize';
import mysql from 'mysql';

/*--------------------------------------------------------------------
  1. Connect to MySQL database(hotelreverse) connection and export it
  - host: localhost
  - user: root
  - password: (root password of individual installation,
               in my case: lion0787)
  - database: hotelreverse

  2. Then connect to 'hotelreverse' database
 --------------------------------------------------------------------*/

const sequelize = new Sequelize('hotelreverse', 'hotel', 'hotel', {
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
  .then((err) => {
    console.log('connection has been established successfully');
  })
  .catch((err) => {
    console.log('unable to connect to database: ', err);
  })


/*--------------------------------------------------------------------
  To use tables, set models
  We use already installed databases and tables

  1. Client table
  2. Deal table
  3. Hotel table
 --------------------------------------------------------------------*/

let Client = sequelize.define('Client', {
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


let Deal = sequelize.define('Deal', {
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
  },
  imp_uid: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'imp_uid'
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


let Hotel = sequelize.define('Hotel', {
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
Client.sync().then(() => {
    console.log('now, can use Client table');
});

Deal.sync().then(() => {
  console.log('now, can use Deal table');
});

Hotel.sync().then(() => {
  console.log('now, can use Hotel table');
});

export default { Client, Deal, Hotel};




