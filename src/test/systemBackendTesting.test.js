const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');       //environmental variables
const cors = require('cors');           //middleware
const bodyParser = require('body-parser');
const request = require('supertest');

//import APIs
const attendanceAPI = require('../apis/attendance.api'); 
const employeeLeaveAPI = require('../apis/employeeLeaves.api'); 
const foodApi = require('../apis/food.api'); 
const ingredientApi = require('../apis/ingredient.api');  
const serviceListApi = require('../apis/serviceList.api');  
const customerServiceApi = require('../apis/customerService.api');  
const roomAPI = require('../apis/room.api');  
const serviceAPI = require('../apis/service.api');   
const employeeAPI = require('../apis/employee.api');     
const bookingAPI = require('../apis/booking.api');  

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
jest.setTimeout(18000);

//port no for run backend server
const PORT = process.env.TESTPORT || 8067;
const MONGODB_URI = process.env.TESTMONGODB_URI;

//connect to database
mongoose.connect(MONGODB_URI || '&w=majority', {
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
});

//root route
app.route('/').get((req, res) => {
    res.send('SPM Project Test');
});

app.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}`);
});

//register router - CHANGEABLE.
 
app.use('/room', roomAPI());     
app.use('/employee', employeeAPI());     
app.use('/service', serviceAPI());   
app.use('/booking', bookingAPI()); 
app.use('/food', foodApi()); 
app.use('/serviceList', serviceListApi());   
app.use('/ingredient', ingredientApi());  
app.use('/customerService', customerServiceApi());   
app.use('/attendance', attendanceAPI());
app.use('/employeeLeaves', employeeLeaveAPI());

//TestCases
//test case 01 - add new room
test('Backend Test Case 01 - Should insert a new room ', async () => {
    await request(app).post('/room/create').send({
        roomNo:"Z002",
        category:"Single Room",
        airConditioningCategory:"A/C",
        description: "High Budget Room",
        price:18000,
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

//test case 02 - Update room details
test('Backend Test Case 02 - Should update existing room details  ', async () => {
    await request(app).patch('/room/update/61542fffd452935a383b6918').send({
        roomNo:"Z055",
        category:"Double Room",
        airConditioningCategory:"Non A/C",
        description: "Budget Room",
        price:18070,
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

//test case 03 - delete room details
test('Backend Test Case 03 - Should delete existing room details  ', async () => {
    await request(app).delete('/room/6154a770877e0b25dcbe7983').send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})

//test case 04 - get specific room details
test('Backend Test Case 04 - Should get specific room details  ', async () => {
    await request(app).get('/room/6154d07f651ba2408436d4c4').send({
    }).expect(200).then((res) => {
        id = res.body._id;
    });
})