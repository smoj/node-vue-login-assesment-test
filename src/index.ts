import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import * as express from "express";
import * as bp from "body-parser";
import * as cookieParser from "cookie-parser";
import fetch from 'node-fetch';
import * as https from "https";
import * as fs from "fs";

// import * as queryString from "querystring";
// import * as cors from "cors";

// const server = http.createServer().listen(3030);

const app = express()
const bodyParser = bp.json();
const router = express.Router();


// Here we are configuring express to use body-parser as middle-ware.
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
app.use(cookieParser());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'null');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Pass to next layer of middleware
    next();
});

app.get('/', (req, res) => {
const jsonBody = {status: 'Ok!'};
  res.send(jsonBody);
})

// add router in the Express app.
app.use("/", router);

// static folder
app.use(express.static(__dirname + '/public/'));

// app.use('/htmlgenerator/css', express.static(__dirname + '/public/'))

// handle SPA
app.get(/.*/, (req, res)=>{res.sendFile(__dirname + '/public/index.html')});


app.listen(3001, () => {
    console.log(`HTTP Server listen at port 3001`);
  })