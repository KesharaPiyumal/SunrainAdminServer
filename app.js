const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/database');
const assetsDir = require('path').join(__dirname, '/assets');

// Test mySql connection
db.authenticate()
  .then(() => console.log('MySQL DB Connected..!'))
  .catch(err => console.log('Error: ' + err));

const app = express();
const corsOptions = {
  origin: 'http://localhost:4202',
  optionsSuccessStatus: 200
};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// access to assets folder
app.use(express.static(assetsDir));

// routes for the all requests
app.use('/user', require('./api/routes/usersR'));
app.use('/customer', require('./api/routes/customerR'));
app.use('/supplier', require('./api/routes/supplierR'));
app.use('/purchaseOrder', require('./api/routes/purchaseOrderR'));
app.use('/productDelivery', require('./api/routes/productDeliveryR'));
app.use('/workOrder', require('./api/routes/workOrderR'));
app.use('/inventory', require('./api/routes/inventoryR'));
app.use('/expense', require('./api/routes/expenseR'));
app.use('/turnOver', require('./api/routes/turnOverR'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, console.log('Server started on PORT: ' + PORT));
