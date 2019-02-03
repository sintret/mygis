var cron = require('node-cron');
const moment = require('moment')

const Store = require('data-store');
const store = new Store('app', {path: 'data.json'});
const request = require('request')
const axios = require("axios")
const apis = require("./apis")
const urlsConfig = require('./config')


function simasda(year) {

    return new Promise(function (resolve, reject) {
        axios.post("http://simasda.basarnas.go.id:8088/beritasar/services/berita/2017-01-01/" + year, urlsConfig.adminAcount).then(function (res) {
            resolve(res.data);
        }).catch(function (err) {
            console.log('err', err);
            reject(err.message);
        });
    });
}


async function getSimasda() {
    var year = moment().format("YYYY-MM-DD")
    var arr = await simasda(year);
    var query = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].status_berita == "AKTIF" && arr[i].longitude.length > 1 && i < 20) {
            var latitude = parseFloat(arr[i].latitude);

            if(latitude < 200 && latitude > -200){

                query.push(arr[i])

            }
        }
    }

    store.set('simasda', query);
}


async function getSearch() {

    var search = await apis.searchData();
    store.set("search", search)
    
}

var myTasks = {}

myTasks.crawl = cron.schedule('30 5,7,9,10,12,14,16,18,20,22,23 * * *', () => {

    getSimasda();
    getSearch();

}, {
    scheduled: true
});

module.exports = myTasks;