const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');       //environmental variables
const cors = require('cors');           //middleware
const bodyParser = require('body-parser');
const path = require('path');
const fileRoutes = require('./src/routes/file-upload-routes');
const productRouter = require('./src/routers/productRouter');






const userRouter = require('./src/routers/userRouter');
const orderRouter = require('./src/routers/orderRouter.js');
const { data } = require('./data.js');

//const APIs
const Role = require("./src/models/role.model");

//import APIs
const employeeAPI = require('./src/apis/employee.api');    
const roomAPI = require('./src/apis/room.api');    
const serviceAPI = require('./src/apis/service.api');    
const authAPI = require('./src/apis/auth.api');    
const userAPI = require('./src/apis/user.api');    
const customerAPI = require('./src/apis/customer.api');    

const billAPI = require('./src/apis/bill.api');    
const attendanceAPI = require('./src/apis/attendance.api');    
const employeeLeaveAPI = require('./src/apis/employeeLeaves.api');    

// const customerServiceApi = require('./src/apis/customerService.api'); 
// const serviceListApi = require('./src/apis/serviceList.api'); 
const foodorderAPI = require('./src/apis/foodorder.api');  
const foodorderingAPI = require('./src/apis/foodordering.api');  
const bookingAPI = require('./src/apis/booking.api');  
const kitchenorderAPI = require('./src/apis/kitchen.api');
const cashpaymentAPI = require('./src/apis/cashpayment.api');
const creditpaymentAPI = require('./src/apis/creditpayment.api');


 

const foodApi = require('./src/apis/food.api'); 
const ingredientApi = require('./src/apis/ingredient.api'); 
const ingredientOrderApi = require('./src/apis/ingredientOrder.api'); 
const customerServiceApi = require('./src/apis/customerService.api'); 
const serviceListApi = require('./src/apis/serviceList.api'); 
   



dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extened: true }));

//port no for run backend server
const PORT = process.env.PORT || 8066;
const MONGODB_URI = process.env.MONGODB_URI;

//connect to database
mongoose.connect(MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}, (error) => {
  if (error) {
    console.log('Database Error: ', error.message);
  }
});

//open connection
mongoose.connection.once('open', () => {
  console.log('Database Synced');
  initial();
});

app.use(express.static(path.join(__dirname, "./ui/build")));

//root route
app.route('/').get((req, res) => {
  res.sendFile(path.join(__dirname, "./ui/build/index.html"));
});

//register router - CHANGEABLE
app.use('/employee', employeeAPI());     
app.use('/room', roomAPI());     
app.use('/service', serviceAPI());     
app.use('/auth', authAPI());     
app.use('/user', userAPI());     
app.use('/customer', customerAPI());     

// app.use('/bill', billAPI());     
// app.use('/booking', bookingAPI());
// app.use('/customerService',customerServiceApi()); 
// app.use('/serviceList',serviceListApi()); 

app.use('/foodorder', foodorderAPI());  
app.use('/foodordering', foodorderingAPI());
app.use('/booking', bookingAPI());  
//app.use('/product', productApI());  
// app.use('/api/products', productAPI());
app.use('/kitchenorder', kitchenorderAPI());
app.use('/cashpayment', cashpaymentAPI());
app.use('/creditpayment', creditpaymentAPI());

//
app.use('/bill', billAPI());
app.use('/attendance', attendanceAPI());
app.use('/employeeLeaves', employeeLeaveAPI());


app.use('/api/users', userRouter);
app.use('/api/products/', productRouter);
app.use('/api/orders', orderRouter);

app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

// app.get('/api/products', (req, res)=>{
//   res.send(data.products);
// });


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', fileRoutes.routes);



app.use('/food',foodApi()); 
app.use('/ingredient',ingredientApi()); 
app.use('/ingredientOrder',ingredientOrderApi()); 
app.use('/customerService',customerServiceApi()); 
app.use('/serviceList',serviceListApi()); 

app.use('/booking', bookingAPI());



app.listen(PORT, () => {
  console.log(`Server is up and running on PORT ${PORT}`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}