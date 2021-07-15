import Vue from "vue";

// Create a filter to make all xx.3=>xx.30 2 digits

Vue.filter("priceValue", function (value) {
    if (!value) {
        return "";
    }
    // change the value to float
    const result = parseFloat(value);
    // if Value is interger
    if (Number.isInteger(result)) {
        return result;
    }
    return result.toFixed(2);
});

/*:
    Time filter: 6->06
*/

Vue.filter("filterTime", (value) => {
    if (!value) {
        return "";
    }
    var result;
    const arr = value.split(":");
    // console.log("arr", arr);
    if (parseInt(arr[0]) < 10) {
        result = "0" + arr[0];
    } else {
        result = arr[0];
    }
    if (parseInt(arr[1]) < 10) {
        result = result + ":0" + arr[1];
    } else {
        result = result + ":" + arr[1];
    }
    if (parseInt(arr[2]) < 10) {
        result = result + ":0" + arr[2];
    } else {
        result = result + ":" + arr[2];
    }
    return result;
}

);
