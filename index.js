const axios = require('axios') 
const querystring = require('querystring');
const fs = require('fs');

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

async function main() {
    try {
        //let result=await getDataFromFile("E:\\develop\\private\\scrape3\\glocals.json");
        let result=await getData();
        putDataInFile("E:\\develop\\private\\scrape3\\glocals.json",result);
        parseData(result);
    }
    catch (err) {
        console.log(err)
    }
}

main();