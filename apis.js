var request = require("request");
const axios = require("axios")
const moment = require('moment')
const urlsConfig = require('./config')
const G = require('./Geopoint')

var apis = {};

//const

apis.disasterUrl = "http://igis.basarnas.go.id:8098/portalproxy/iserver/services/map-SARData/rest/maps/DisasterMap/queryResults.json?returnContent=true";
apis.disasterQuery = {
    'queryMode': 'SqlQuery',
    'queryParameters': {
        'customParams': null,
        'prjCoordSys': null,
        'expectCount': 100000,
        'networkType': "LINE",
        'queryOption': "ATTRIBUTEANDGEOMETRY",
        'queryParams': [{
            'attributeFilter': "smid&gt;0",
            'name': "disaster_py@Disaster#1",
            'joinItems': null,
            'linkItems': null,
            'ids': null,
            'orderBy': null,
            'groupBy': null,
            'fields': null
        }],
        'startRecord': 0,
        'holdTime': 10,
        'returnCustomResult': false
    }
};
apis.disasterIndex = 11;
apis.disasterIcon = 'historic';
apis.disasterName = 'disaster';

apis.sarOfficeUrl = "http://igis.basarnas.go.id:8098/portalproxy/iserver/services/map-SARData/rest/maps/SARoffice/queryResults.json?returnContent=true";
apis.sarOfficeQuery = {
    'queryMode': 'SqlQuery',
    'queryParameters': {
        'customParams': null,
        'prjCoordSys': null,
        'expectCount': 100000,
        'networkType': "LINE",
        'queryOption': "ATTRIBUTEANDGEOMETRY",
        'queryParams': [{
            'attributeFilter': "smid&gt;0",
            'name': "POS_SAR@SARoffice",
            'joinItems': null,
            'linkItems': null,
            'ids': null,
            'orderBy': null,
            'groupBy': null,
            'fields': null
        }],
        'startRecord': 0,
        'holdTime': 10,
        'returnCustomResult': false
    }
};
apis.sarOfficeIndex = 6;
apis.sarOfficeIcon = 'place';
apis.sarOfficeName = 'saroffice';

apis.hospitalUrl = "http://igis.basarnas.go.id:8098/portalproxy/iserver/services/map-SARData/rest/maps/hospital/queryResults.json?returnContent=true";
apis.hospitalQuery = {
    'queryMode': 'SqlQuery',
    'queryParameters': {
        'customParams': null,
        'prjCoordSys': null,
        'expectCount': 100000,
        'networkType': "LINE",
        'queryOption': "ATTRIBUTEANDGEOMETRY",
        'queryParams': [{
            'attributeFilter': "smid&gt;0",
            'name': "hospital_pt@hospital_police",
            'joinItems': null,
            'linkItems': null,
            'ids': null,
            'orderBy': null,
            'groupBy': null,
            'fields': null
        }],
        'startRecord': 0,
        'holdTime': 10,
        'returnCustomResult': false
    }
};
apis.hospitalIndex = 5;
apis.hospitalIcon = 'amenity';
apis.hospitalName = 'hospital';

apis.policeUrl = "http://igis.basarnas.go.id:8098/portalproxy/iserver/services/map-SARData/rest/maps/police/queryResults.json?returnContent=true";
apis.policeQuery = {
    'queryMode': 'SqlQuery',
    'queryParameters': {
        'customParams': null,
        'prjCoordSys': null,
        'expectCount': 100000,
        'networkType': "LINE",
        'queryOption': "ATTRIBUTEANDGEOMETRY",
        'queryParams': [{
            'attributeFilter': "smid&gt;0",
            'name': "police_pt@hospital_police",
            'joinItems': null,
            'linkItems': null,
            'ids': null,
            'orderBy': null,
            'groupBy': null,
            'fields': null
        }],
        'startRecord': 0,
        'holdTime': 10,
        'returnCustomResult': false
    }
};

apis.policeIndex = 11;
apis.policeIcon = 'amenity';
apis.policeName = 'police';

apis.logdataUrl = "http://igis.basarnas.go.id:8098/portalproxy/iserver/services/map-SARData/rest/maps/logdata/queryResults.json?returnContent=true";
apis.logdataQuery = {
    'queryMode': 'SqlQuery',
    'queryParameters': {
        'customParams': null,
        'prjCoordSys': null,
        'expectCount': 100000,
        'networkType': "LINE",
        'queryOption': "ATTRIBUTEANDGEOMETRY",
        'queryParams': [{
            'attributeFilter': "smid&gt;0",
            'name': "logdata@Mobile_Position",
            'joinItems': null,
            'linkItems': null,
            'ids': null,
            'orderBy': null,
            'groupBy': null,
            'fields': null
        }],
        'startRecord': 0,
        'holdTime': 10,
        'returnCustomResult': false
    }
};
apis.logdataIndex = 11;
apis.logdataIcon = 'report';
apis.logdataName = 'logdata';

apis.helicopterUrl = "http://igis.basarnas.go.id:8098/portalproxy/iserver/services/map-SARData/rest/maps/HELIKOPTER/queryResults.json?returnContent=true";
apis.helicopterQuery = {
    'queryMode': 'SqlQuery',
    'queryParameters': {
        'customParams': null,
        'prjCoordSys': null,
        'expectCount': 100000,
        'networkType': "LINE",
        'queryOption': "ATTRIBUTEANDGEOMETRY",
        'queryParams': [{
            'attributeFilter': "smid&gt;0",
            'name': "HELIKOPTER@helocopter",
            'joinItems': null,
            'linkItems': null,
            'ids': null,
            'orderBy': null,
            'groupBy': null,
            'fields': null
        }],
        'startRecord': 0,
        'holdTime': 10,
        'returnCustomResult': false
    }
};
apis.helicopterIndex = 11;
apis.helicopterIcon = 'layer-plane';
apis.helicopterName = 'helicopter';

apis.mobilePositionUrl = "http://igis.basarnas.go.id:8098/portalproxy/iserver/services/map-SARData/rest/maps/MobilePosition/queryResults.json?returnContent=true";
apis.mobilePositionQuery = {
    'queryMode': 'SqlQuery',
    'queryParameters': {
        'customParams': null,
        'prjCoordSys': null,
        'expectCount': 100000,
        'networkType': "LINE",
        'queryOption': "ATTRIBUTEANDGEOMETRY",
        'queryParams': [{
            'attributeFilter': "smid&gt;0",
            'name': "mobile_position@Mobile_Position",
            'joinItems': null,
            'linkItems': null,
            'ids': null,
            'orderBy': null,
            'groupBy': null,
            'fields': null
        }],
        'startRecord': 0,
        'holdTime': 10,
        'returnCustomResult': false
    }
};
apis.mobilePositionIndex = 11;
apis.mobilePositionIcon = 'layer-plane';
apis.mobilePositionName = 'mobilePosition';

apis.searchUrl = "http://igis.basarnas.go.id:8099/iserver/services/data-SARData/rest/data/featureResults.json?returnContent=true&fromIndex=0&toIndex=100";
apis.searchQuery = {
    'datasetNames': ["Indonesia_3857:poi_pt"],
    'getFeatureMode': "SQL",
    'queryParameter': {'name': "poi_pt@Indonesia_3857", 'attributeFilter': "NAME LIKE '%pos%'"}
};


apis.myRequest = function (url, t) {

    var options = {
        method: 'POST',
        url: url,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify(t)
    };

    return new Promise(function (resolve) {

        request(options, function (error, response, body) {
            if (error) {
                resolve(error)
            }

            resolve(body)
        });
    });
}

apis.simasda = function () {

    var year = moment().format("YYYY-MM-DD")

    return new Promise(function (resolve, reject) {
        axios.post("http://simasda.basarnas.go.id:8088/beritasar/services/berita/2017-01-01/" + year, urlsConfig.adminAcount).then(function (res) {

            var arr = res.data;
            var query = [];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].status_berita == "AKTIF" && arr[i].longitude.length > 1 && i < 20) {

                    var obj = arr[i];
                    var latitude = arr[i].latitude;
                    var longitude = 0

                    if (latitude.indexOf("°") > -1) {

                        var lon = arr[i].latitude;
                        var explodeLon = lon.split("'");

                        var lat = arr[i].longitude;
                        var explodeLat = lat.split("'");


                        var point = new G.GeoPoint(explodeLon+"'", explodeLat+"'");

                        latitude = point.getLatDec();
                        longitude = point.getLonDec();
                        
                    } else {
                        latitude = parseFloat(arr[i].latitude);
                        longitude = parseFloat(arr[i].longitude);


                    }

                    obj.latitude = latitude;
                    obj.longitude = longitude;

                    if (latitude < 200 && latitude > -200) {

                        query.push(obj)

                    }
                }
            }

            resolve(query);

        }).catch(function (err) {
            console.log('err', err);
            reject(err.message);
        });
    });
}

//check text is json or not
apis.isJson = function (text) {
    if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

        //the json is ok
        return true;
    } else {
        //the json is not ok
        return false;
    }
}

apis.buildQuery = function (json, name) {

    var count = json.totalCount;
    var features = []

    try {
        var datas = json.recordsets[0].features;

        if (count > 0) {
            for (var i = 0; i < count; i++) {
                var obj;
                if (name == apis.disasterName) {
                    obj = apis.disasterProperty(datas[i])
                } else if (name == apis.sarOfficeName) {
                    obj = apis.sarOfficeProperty(datas[i])
                } else if (name == apis.hospitalName) {
                    obj = apis.hospitalProperty(datas[i])
                } else if (name == apis.policeName) {
                    obj = apis.policeProperty(datas[i])
                } else if (name == apis.logdataName) {
                    obj = apis.logdataProperty(datas[i])
                } else if (name == apis.helicopterName) {
                    obj = apis.helicopterProperty(datas[i])
                } else if (name == apis.mobilePositionName) {
                    obj = apis.mobilePositionProperty(datas[i])
                }

                features.push(obj)
            }
        }

        return features;
    }
    catch (e) {
        alert('invalid json');
        return null;
    }
}

apis.searchData = async function () {

    //store data in search then
    var search = [];

    //disaster
    var disasterContent = await apis.myRequest(apis.disasterUrl, apis.disasterQuery);
    var disasterJSON = JSON.parse(disasterContent);
    var disasterArray = apis.buildQuery(disasterJSON, apis.disasterName);

    //sar office
    var sarOfficeContent = await apis.myRequest(apis.sarOfficeUrl, apis.sarOfficeQuery);
    var sarOfficeJSON = JSON.parse(sarOfficeContent);
    var sarOfficeArray = apis.buildQuery(sarOfficeJSON, apis.sarOfficeName);

    var a = disasterArray.concat(sarOfficeArray);

    //hospitalUrl
    var hospitalContent = await apis.myRequest(apis.hospitalUrl, apis.hospitalQuery);
    var hospitalJSON = JSON.parse(hospitalContent);
    var hospitalArray = apis.buildQuery(hospitalJSON, apis.hospitalName);

    var b = a.concat(hospitalArray)

    //policeUrl
    var policeContent = await apis.myRequest(apis.policeUrl, apis.policeQuery);
    var policeJSON = JSON.parse(policeContent);
    var policeArray = apis.buildQuery(policeJSON, apis.policeName);

    var c = b.concat(policeArray)

    //logdataUrl
    var logdataContent = await apis.myRequest(apis.logdataUrl, apis.logdataQuery);
    var logdataJSON = JSON.parse(logdataContent);
    var logdataArray = apis.buildQuery(logdataJSON, apis.logdataName);

    var d = c.concat(logdataArray)


    //helicopterUrlURL
    var helicopterContent = await apis.myRequest(apis.helicopterUrl, apis.helicopterQuery);
    var helicopterJSON = JSON.parse(helicopterContent);
    var helicopterArray = apis.buildQuery(helicopterJSON, apis.helicopterName);

    var e = d.concat(helicopterArray)


    //mobilePositionUrl

    var mobilePositionUrlContent = await apis.myRequest(apis.mobilePositionUrl, apis.mobilePositionQuery);
    var mobilePositionJSON = JSON.parse(mobilePositionUrlContent);
    var mobilePositionArray = apis.buildQuery(mobilePositionJSON, apis.mobilePositionName);

    var f = e.concat(mobilePositionArray)

    return f;
}


apis.searchFunction = function (arr, text) {

    var search = text.toLowerCase();
    var myArr = []
    for (var i = 0; i < arr.length; i++) {

        var myString = arr[i].properties.NAME || "";
        console.log(myString)
        if (myString.length > 0) {

            var mytext = myString.toLowerCase();
            if (mytext.indexOf(search) > -1) {
                myArr.push(arr[i])
            }
        }
    }

    var obj = {}
    obj.type = 'FeatureCollection';
    obj.features = myArr;

    return obj;
}


/*
 {
 "fieldNames" : ["SMID", "SMKEY", "SMSDRIW", "SMSDRIN", "SMSDRIE", "SMSDRIS", "SMGRANULE", "SMUSERID", "SMLIBTILEID", "SMAREA", "SMPERIMETER", "NAME", "TYPE", "SUB_ACCIDENT", "DEGREE", "DESCRIPTION", "REPORTER", "REPORT_TIME", "EXECUTIVE", "EXECUTION_STATUS", "PLOTTING", "DISASTER_TIME", "PICTURE"],
 "ID" : 57,
 "fieldValues" : ["57", "-2", "1.25707572347518E7", "-910154.805048665", "1.25727828160014E7", "-912027.512241652", "2025.58124955744", "0", "1", "1811211.9808517", "5534.42006410959", "Test ", "Dangerous Condition for Human Beings", "Missing People on the Mountain", "2", "dsfdf", "basarnas_1", "2018-12-19 9:59:32", "", "", "", "2018-12-19 09:59:03", "/uploads/1545188257819-Penguins.jpg"],
 "geometry" : {
 "id" : 57,
 "center" : {
 "y" : -911091.1586451575,
 "x" : 1.257184646240573E7
 },
 "style" : null,
 "parts" : [5],
 "partTopo" : [1],
 "points" : [{
 "y" : -910766.3012749458,
 "x" : 1.2570757234751802E7
 }, {
 "y" : -912027.5122416508,
 "x" : 1.2572018445718506E7
 }, {
 "y" : -911263.1419588005,
 "x" : 1.257278281600136E7
 }, {
 "y" : -910154.8050486642,
 "x" : 1.2571674479091223E7
 }, {
 "y" : -910766.3012749458,
 "x" : 1.2570757234751802E7
 }
 ],
 "type" : "REGION"
 }
 }

 to

 {
 "type" : "Feature",
 "properties" : {
 "SMID" : "459008",
 "SMX" : "1.29959100622925E7",
 "SMY" : "418922.86921557",
 "SMLIBTILEID" : "1",
 "SMUSERID" : "0",
 "NAME" : "Warung Maskampret",
 "NAME_NATIVE" : "",
 "NAME_EN" : "",
 "NAME_CH" : "",
 "KIND" : "restaurant",
 "TYPE" : "tourism",
 "FIELD_SMGEOPOSITION" : "-1",
 "stringID" : null,
 "ID" : 459008
 },
 "geometry" : {
 "type" : "Point",
 "coordinates" : [12995910.0622925, 418922.86921557]
 },
 "id" : 459008
 }
 */
apis.disasterProperty = function (data) {

    var obj = {}
    obj.type = "Feature";
    var properties = {}
    properties.SMID = data.fieldValues[0];
    properties.SMX = data.geometry.center.x;
    properties.SMY = data.geometry.center.y;
    properties.SMLIBTILEID = data.fieldValues[8];
    properties.SMUSERID = data.fieldValues[7];
    properties.NAME = data.fieldValues[11];
    properties.NAME_NATIVE = data.fieldValues[11];
    properties.NAME_EN = "";
    properties.NAME_CH = "";
    properties.KIND = apis.disasterIcon;
    properties.TYPE = apis.disasterIcon;
    properties.FIELD_SMGEOPOSITION = -1;
    properties.stringID = null;
    properties.ID = data.ID;
    obj.properties = properties;

    var geometry = {}
    geometry.type = "Point";
    geometry.coordinates = [data.geometry.center.x, data.geometry.center.y];
    obj.geometry = geometry;

    obj.ID = data.ID;

    return obj;
}


/*
 {
 "fieldNames" : ["SMID", "SMX", "SMY", "SMLIBTILEID", "SMUSERID", "NO", "NAMA", "TIPE", "LATTITUDE", "LONGITUDE"],
 "ID" : 1,
 "fieldValues" : ["1", "1.42589135757104E7", "-412726.449021359", "1", "0", "1", "Kansar Ambon", "KANSAR", "-3.705", "128.09"],
 "geometry" : {
 "id" : 1,
 "center" : {
 "y" : -412726.449021359,
 "x" : 1.42589135757104E7
 },
 "style" : null,
 "parts" : [1],
 "partTopo" : [],
 "points" : [{
 "y" : -412726.449021359,
 "x" : 1.42589135757104E7
 }
 ],
 "type" : "POINT"
 }
 }

 to

 {
 "type" : "Feature",
 "properties" : {
 "SMID" : "459008",
 "SMX" : "1.29959100622925E7",
 "SMY" : "418922.86921557",
 "SMLIBTILEID" : "1",
 "SMUSERID" : "0",
 "NAME" : "Warung Maskampret",
 "NAME_NATIVE" : "",
 "NAME_EN" : "",
 "NAME_CH" : "",
 "KIND" : "restaurant",
 "TYPE" : "tourism",
 "FIELD_SMGEOPOSITION" : "-1",
 "stringID" : null,
 "ID" : 459008
 },
 "geometry" : {
 "type" : "Point",
 "coordinates" : [12995910.0622925, 418922.86921557]
 },
 "id" : 459008
 }
 */
apis.sarOfficeProperty = function (data) {

    var obj = {}
    obj.type = "Feature";
    var properties = {}
    properties.SMID = data.fieldValues[0];
    properties.SMX = data.fieldValues[1];
    properties.SMY = data.fieldValues[2];
    properties.SMLIBTILEID = data.fieldValues[3];
    properties.SMUSERID = data.fieldValues[4];
    properties.NAME = data.fieldValues[6];
    properties.NAME_NATIVE = data.fieldValues[6];
    properties.NAME_EN = "";
    properties.NAME_CH = "";
    properties.KIND = apis.sarOfficeIcon;
    properties.TYPE = apis.sarOfficeIcon;
    properties.FIELD_SMGEOPOSITION = -1;
    properties.stringID = null;
    properties.ID = data.ID;
    obj.properties = properties;

    var geometry = {}
    geometry.type = "Point";
    geometry.coordinates = [data.geometry.center.x, data.geometry.center.y];
    obj.geometry = geometry;

    obj.ID = data.ID;

    return obj;
}


/*
 {
 "fieldNames" : ["SMID", "SMX", "SMY", "SMLIBTILEID", "SMUSERID", "NAME", "KIND", "TYPE", "FIELD_SMGEOPOSITION"],
 "ID" : 133,
 "fieldValues" : ["133", "1.37615581283544E7", "-1138937.86910899", "1", "0", "Puskesmas Pembantu Oebufu", "hospital", "amenity", "-1"],
 "geometry" : {
 "id" : 133,
 "center" : {
 "y" : -1138937.86910899,
 "x" : 1.37615581283544E7
 },
 "style" : null,
 "parts" : [1],
 "partTopo" : [],
 "points" : [{
 "y" : -1138937.86910899,
 "x" : 1.37615581283544E7
 }
 ],
 "type" : "POINT"
 }
 }

 to

 {
 "type" : "Feature",
 "properties" : {
 "SMID" : "459008",
 "SMX" : "1.29959100622925E7",
 "SMY" : "418922.86921557",
 "SMLIBTILEID" : "1",
 "SMUSERID" : "0",
 "NAME" : "Warung Maskampret",
 "NAME_NATIVE" : "",
 "NAME_EN" : "",
 "NAME_CH" : "",
 "KIND" : "restaurant",
 "TYPE" : "tourism",
 "FIELD_SMGEOPOSITION" : "-1",
 "stringID" : null,
 "ID" : 459008
 },
 "geometry" : {
 "type" : "Point",
 "coordinates" : [12995910.0622925, 418922.86921557]
 },
 "id" : 459008
 }
 */
apis.hospitalProperty = function (data) {

    var obj = {}
    obj.type = "Feature";
    var properties = {}
    properties.SMID = data.fieldValues[0];
    properties.SMX = data.fieldValues[1];
    properties.SMY = data.fieldValues[2];
    properties.SMLIBTILEID = data.fieldValues[3];
    properties.SMUSERID = data.fieldValues[4];
    properties.NAME = data.fieldValues[5];
    properties.NAME_NATIVE = data.fieldValues[5];
    properties.NAME_EN = "";
    properties.NAME_CH = "";
    properties.KIND = apis.hospitalIcon;
    properties.TYPE = apis.hospitalIcon;
    properties.FIELD_SMGEOPOSITION = data.fieldValues[8];
    properties.stringID = null;
    properties.ID = data.ID;
    obj.properties = properties;

    var geometry = {}
    geometry.type = "Point";
    geometry.coordinates = [data.geometry.center.x, data.geometry.center.y];
    obj.geometry = geometry;

    obj.ID = data.ID;

    return obj;
}


/*
 {
 "fieldNames" : ["SMID", "SMX", "SMY", "SMLIBTILEID", "SMUSERID", "NAME", "NAME_NATIVE", "NAME_EN", "NAME_CH", "KIND", "TYPE", "FIELD_SMGEOPOSITION"],
 "ID" : 145,
 "fieldValues" : ["145", "1.2313499876429E7", "-860149.86850093", "1", "0", "Polres Klaten", "", "", "", "police", "amenity", "-1"],
 "geometry" : {
 "id" : 145,
 "center" : {
 "y" : -860149.86850093,
 "x" : 1.2313499876429E7
 },
 "style" : null,
 "parts" : [1],
 "partTopo" : [],
 "points" : [{
 "y" : -860149.86850093,
 "x" : 1.2313499876429E7
 }
 ],
 "type" : "POINT"
 }
 }

 to

 {
 "type" : "Feature",
 "properties" : {
 "SMID" : "459008",
 "SMX" : "1.29959100622925E7",
 "SMY" : "418922.86921557",
 "SMLIBTILEID" : "1",
 "SMUSERID" : "0",
 "NAME" : "Warung Maskampret",
 "NAME_NATIVE" : "",
 "NAME_EN" : "",
 "NAME_CH" : "",
 "KIND" : "restaurant",
 "TYPE" : "tourism",
 "FIELD_SMGEOPOSITION" : "-1",
 "stringID" : null,
 "ID" : 459008
 },
 "geometry" : {
 "type" : "Point",
 "coordinates" : [12995910.0622925, 418922.86921557]
 },
 "id" : 459008
 }
 */
apis.policeProperty = function (data) {

    var obj = {}
    obj.type = "Feature";
    var properties = {}
    properties.SMID = data.fieldValues[0];
    properties.SMX = data.fieldValues[1];
    properties.SMY = data.fieldValues[2];
    properties.SMLIBTILEID = data.fieldValues[3];
    properties.SMUSERID = data.fieldValues[4];
    properties.NAME = data.fieldValues[5];
    properties.NAME_NATIVE = data.fieldValues[6];
    properties.NAME_EN = data.fieldValues[7];
    properties.NAME_CH = data.fieldValues[8];
    properties.KIND = data.fieldValues[9];
    properties.TYPE = data.fieldValues[10];
    properties.FIELD_SMGEOPOSITION = data.fieldValues[11];
    properties.stringID = null;
    properties.ID = data.ID;
    obj.properties = properties;

    var geometry = {}
    geometry.type = "Point";
    geometry.coordinates = [data.geometry.center.x, data.geometry.center.y];
    obj.geometry = geometry;

    obj.ID = data.ID;

    return obj;
}


/*
 {
 "fieldNames" : ["SMID", "SMX", "SMY", "SMLIBTILEID", "SMUSERID", "ID", "SENDER", "RECEIVER", "MSG", "SENTTIME", "RECEIVEDTIME", "OPERATOR", "MSGTYPE", "REFERENCE", "STATUS", "Z"],
 "ID" : 2208,
 "fieldValues" : ["2208", "1.22076482122541E7", "-768712.158409643", "1", "0", "930", "+8821676020484", "+882161760", "GPSWPT 170220145252     Lat S 006 Deg 053'019.685\"\" Lon E 109 Deg 039'047.411\"\" Alt 00013m 14:52:52Z 20.02.17      \n", "2017-02-20 22:23:47", "2017-02-20 22:23:47", "smpp0true", "SMS:TEXT", "", "100", "13.0"],
 "geometry" : {
 "id" : 2208,
 "center" : {
 "y" : -768712.158409643,
 "x" : 1.22076482122541E7
 },
 "style" : null,
 "parts" : [1],
 "partTopo" : [],
 "points" : [{
 "y" : -768712.158409643,
 "x" : 1.22076482122541E7
 }
 ],
 "type" : "POINT"
 }
 }

 to

 {
 "type" : "Feature",
 "properties" : {
 "SMID" : "459008",
 "SMX" : "1.29959100622925E7",
 "SMY" : "418922.86921557",
 "SMLIBTILEID" : "1",
 "SMUSERID" : "0",
 "NAME" : "Warung Maskampret",
 "NAME_NATIVE" : "",
 "NAME_EN" : "",
 "NAME_CH" : "",
 "KIND" : "restaurant",
 "TYPE" : "tourism",
 "FIELD_SMGEOPOSITION" : "-1",
 "stringID" : null,
 "ID" : 459008
 },
 "geometry" : {
 "type" : "Point",
 "coordinates" : [12995910.0622925, 418922.86921557]
 },
 "id" : 459008
 }
 */
apis.logdataProperty = function (data) {

    var obj = {}
    obj.type = "Feature";
    var properties = {}
    properties.SMID = data.fieldValues[0];
    properties.SMX = data.fieldValues[1];
    properties.SMY = data.fieldValues[2];
    properties.SMLIBTILEID = data.fieldValues[3];
    properties.SMUSERID = data.fieldValues[4];
    properties.NAME = data.fieldValues[6] + " " + data.fieldValues[7];
    properties.NAME_NATIVE = "";
    properties.NAME_EN = "";
    properties.NAME_CH = "";
    properties.KIND = "place"
    properties.TYPE = apis.logdataIcon;
    properties.FIELD_SMGEOPOSITION = -1;
    properties.stringID = null;
    properties.ID = data.ID;
    obj.properties = properties;

    var geometry = {}
    geometry.type = "Point";
    geometry.coordinates = [data.geometry.center.x, data.geometry.center.y];
    obj.geometry = geometry;

    obj.ID = data.ID;

    return obj;
}


/*
 {
 "fieldNames" : ["SMID", "SMX", "SMY", "SMLIBTILEID", "SMUSERID", "OID_", "NAME", "FOLDERPATH", "Z"],
 "ID" : 1,
 "fieldValues" : ["1", "1.1883933842185E7", "-729695.133820158", "1", "0", "0", "Atang Senjaya Airport Helicopter SAR 1", "Atang Senjaya Airport Helicopter SAR 1.kmz", "0.0"],
 "geometry" : {
 "id" : 1,
 "center" : {
 "y" : -729695.133820158,
 "x" : 1.1883933842185E7
 },
 "style" : null,
 "parts" : [1],
 "partTopo" : [],
 "points" : [{
 "y" : -729695.133820158,
 "x" : 1.1883933842185E7
 }
 ],
 "type" : "POINT"
 }
 }

 to

 {
 "type" : "Feature",
 "properties" : {
 "SMID" : "459008",
 "SMX" : "1.29959100622925E7",
 "SMY" : "418922.86921557",
 "SMLIBTILEID" : "1",
 "SMUSERID" : "0",
 "NAME" : "Warung Maskampret",
 "NAME_NATIVE" : "",
 "NAME_EN" : "",
 "NAME_CH" : "",
 "KIND" : "restaurant",
 "TYPE" : "tourism",
 "FIELD_SMGEOPOSITION" : "-1",
 "stringID" : null,
 "ID" : 459008
 },
 "geometry" : {
 "type" : "Point",
 "coordinates" : [12995910.0622925, 418922.86921557]
 },
 "id" : 459008
 }
 */
apis.helicopterProperty = function (data) {

    var obj = {}
    obj.type = "Feature";
    var properties = {}
    properties.SMID = data.fieldValues[0];
    properties.SMX = data.fieldValues[1];
    properties.SMY = data.fieldValues[2];
    properties.SMLIBTILEID = data.fieldValues[3];
    properties.SMUSERID = data.fieldValues[4];
    properties.NAME = data.fieldValues[6];
    properties.NAME_NATIVE = "";
    properties.NAME_EN = "";
    properties.NAME_CH = "";
    properties.KIND = "place"
    properties.TYPE = apis.helicopterIcon;
    properties.FIELD_SMGEOPOSITION = -1;
    properties.stringID = null;
    properties.ID = data.ID;
    obj.properties = properties;

    var geometry = {}
    geometry.type = "Point";
    geometry.coordinates = [data.geometry.center.x, data.geometry.center.y];
    obj.geometry = geometry;

    obj.ID = data.ID;

    return obj;
}


/*
 {
 "fieldNames" : ["SMID", "SMX", "SMY", "SMLIBTILEID", "SMUSERID", "WORKERNAME", "TIME"],
 "ID" : 1,
 "fieldValues" : ["1", "1.19914923800474E7", "-765418.910447485", "1", "0", "zhangsan", "201807041720"],
 "geometry" : {
 "id" : 1,
 "center" : {
 "y" : -765418.910447485,
 "x" : 1.19914923800474E7
 },
 "style" : null,
 "parts" : [1],
 "partTopo" : [],
 "points" : [{
 "y" : -765418.910447485,
 "x" : 1.19914923800474E7
 }
 ],
 "type" : "POINT"
 }
 }

 to

 {
 "type" : "Feature",
 "properties" : {
 "SMID" : "459008",
 "SMX" : "1.29959100622925E7",
 "SMY" : "418922.86921557",
 "SMLIBTILEID" : "1",
 "SMUSERID" : "0",
 "NAME" : "Warung Maskampret",
 "NAME_NATIVE" : "",
 "NAME_EN" : "",
 "NAME_CH" : "",
 "KIND" : "restaurant",
 "TYPE" : "tourism",
 "FIELD_SMGEOPOSITION" : "-1",
 "stringID" : null,
 "ID" : 459008
 },
 "geometry" : {
 "type" : "Point",
 "coordinates" : [12995910.0622925, 418922.86921557]
 },
 "id" : 459008
 }
 */
apis.mobilePositionProperty = function (data) {

    var obj = {}
    obj.type = "Feature";
    var properties = {}
    properties.SMID = data.fieldValues[0];
    properties.SMX = data.fieldValues[1];
    properties.SMY = data.fieldValues[2];
    properties.SMLIBTILEID = data.fieldValues[3];
    properties.SMUSERID = data.fieldValues[4];
    properties.NAME = data.fieldValues[5];
    properties.NAME_NATIVE = "";
    properties.NAME_EN = "";
    properties.NAME_CH = "";
    properties.KIND = "place"
    properties.TYPE = apis.helicopterIcon;
    properties.FIELD_SMGEOPOSITION = -1;
    properties.stringID = null;
    properties.ID = data.ID;
    obj.properties = properties;

    var geometry = {}
    geometry.type = "Point";
    geometry.coordinates = [data.geometry.center.x, data.geometry.center.y];
    obj.geometry = geometry;

    obj.ID = data.ID;

    return obj;
}


module.exports = apis;