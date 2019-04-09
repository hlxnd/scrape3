const axios = require('axios') 
const querystring = require('querystring');
const fs = require('fs');
const seloger = require('./seloger.js');
const leboncoin = require("./leboncoin.js")

function getData() {
    let queryParameters=querystring.stringify({
        "form[bl_city_network]":"1",
        "start": 0,
        "limit": 1000
    });

    return new Promise( (resolve, reject) => {
        axios.post('https://www.glocals.com/classifieds/housing-and-real-estate/&get_classified_flats', queryParameters)
            .then(function (response) {
                resolve(JSON.stringify(response.data,null,'\t'));
            })
            .catch(function (error) {
                reject(error);
            });
        })
}

function parseData(data) {
    console.log(data);
}

// Helper to use file
function getDataFromFile(filePath) {
    return new Promise( (resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err)
            }
                resolve(data)
            })
        })
}

// Helper to use file
function putDataInFile(filePath,data) {
    return new Promise( (resolve, reject) => {
        fs.writeFile("E:\\develop\\private\\scrape3\\glocals.json", data, function(err) {
            resolve();
            if(err) {
                reject(err);
            }
            resolve(true);
        })
    })
}

async function loadDataFromGlocals() {
    let result=await getDataFromFile("E:\\develop\\private\\scrape3\\glocals.json");
    //let result=await getData();
    //putDataInFile("E:\\develop\\private\\scrape3\\glocals.json",result);
    parseData(result);
}

async function main() {
    try {
        //loadDataFromGlocals();
        //seloger.getEntries().then(data => console.log(data))
        leboncoin.getEntries().then(data => console.log(data))
    }
    catch (err) {
        console.log(err)
    }
}


//main();

const express = require('express')
const app = express()
const port = 3000

app.get('/', async (req, res, next) => {
    try {
        //loadDataFromGlocals();
        res.json(await leboncoin.getEntries());
    }
    catch (err) {
        console.log(err)
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

