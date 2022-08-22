


var geolocation = new qq.maps.Geolocation("TKUBZ-D24AF-GJ4JY-JDVM2-IBYKK-KEBCU", "myapp");

var options = { timeout: 8000 };

geolocation.getLocation(showPosition, showErr, options)

function showPosition(position) {

};

function showErr() {

};
