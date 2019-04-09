const leboncoin = require('leboncoin-api');

async function getData(page) {
    var search = new leboncoin.Search()
        .setPage(page)
        .setFilter(leboncoin.FILTERS.ALL)
        .setCategory("locations")
        .setLocation([
                    {"zipcode": "01210"},
                    {"zipcode": "01280"},
                    {"zipcode": "01630"},
                    ])
        .addSearchExtra("real_estate_type", ["1"]); // maison
        //.addSearchExtra("price", {min: 1500, max: 2000}) // will add a range of price
        //.addSearchExtra('furnished', ["1", "Non meublé"]); // will add enums for Meublé and Non meublé
    
    // Please check into categories & sub categories constants to know which are the sub categories to add into "addSearchExtra"
    
    let data = await search.run();
    // .then(function (data) {
    //     console.log(data.page); // the current page
    //     console.log(data.pages); // the number of pages
    //     console.log(data.nbResult); // the number of results for this search
    //     console.log(data.results); // the array of results
    //     data.results[0].getDetails().then(function (details) {
    //         console.log(details); // the item 0 with more data such as description, all images, author, ...
    //     }, function (err) {
    //         console.error(err);
    //     });
    //     // data.results[0].getPhoneNumber().then(function (phoneNumer) {
    //     //     console.log(phoneNumer); // the phone number of the author if available
    //     // }, function (err) {
    //     //     console.error(err); // if the phone number is not available or not parsable (image -> string) 
    //     // });
    // }, function (err) {
    //     console.error(err);
    // });



    return data;
}

// Helper to use file
async function putDataInFile(filePath,data) {
    return new Promise( (resolve, reject) => {
        fs.writeFile(filePath, data, function(err) {
            resolve();
            if(err) {
                reject(err);
            }
            resolve(true);
        })
    })
}


const fs = require('fs');

module.exports = {
    getEntries: async () => {
        try {
            let out=await getData(1);
            return out;
            //putDataInFile("./leboncoin.raw.json",JSON.stringify(out,null,4));
        }
        catch(err) {
            console.log(err);
        }
    }
}
