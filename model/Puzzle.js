const configuration_1 = {
    "rows" : 5,
    "columns" : 4,
    "ninjase" :  { "row":2, "column":0 },
    "walls" : [
        { "row":0, "column":3},
        { "row":1, "column":1},
        { "row":1, "column":2},
        { "row":1, "column":3},
        { "row":3, "column":0},
        { "row":3, "column":1},
        { "row":3, "column":3},
        { "row":4, "column":3},
    ],
    "doors" : [
        { "color" : "green", "row":2, "column":3},
        { "color" : "red",   "row":4, "column":1 }
    ],
    "keys": [
        { "color" : "green", "row":4, "column":0},
        { "color" : "red",   "row":0, "column":2 }
    ],
}

const configuration_2 = {
    "rows" : 3,
    "columns" : 4,
    "ninjase" :  { "row":1, "column":0 },
    "walls" : [],
    "doors" : [
        { "color" : "green", "row":2, "column":0},
        { "color" : "green", "row":1, "column":3},
        { "color" : "red",   "row":0, "column":0},
        { "color" : "red",   "row":2, "column":1}
    ],
    "keys": [
        { "color" : "green", "row":1, "column":2},
        { "color" : "green", "row":2, "column":3},
        { "color" : "red",   "row":1, "column":1},
        { "color" : "red",   "row":2, "column":2},
        { "color" : "blue",  "row":0, "column":3},
    ],
}

const configuration_3 = {
    "rows" : 2,
    "columns" : 5,
    "ninjase" :  { "row":0, "column":0 },
    "walls" : [ { "row":1, "column":0 } ],
    "doors" : [
        { "color" : "green",  "row":1, "column":3},
        { "color" : "red",    "row":0, "column":4},
        { "color" : "yellow", "row":1, "column":1},
        { "color" : "blue",   "row":1, "column":2}
    ],
    "keys": [
        { "color" : "red",    "row":0, "column":1},
        { "color" : "green",  "row":0, "column":2},
        { "color" : "blue",   "row":0, "column":3},
        { "color" : "yellow", "row":1, "column":4}
    ],
}

const configuration_4 = {
    "rows" : 8,
    "columns" : 8,
    "ninjase" :  { "row":4, "column":4 },
    "walls" : [ { "row":1, "column":0 },
              { "row":2, "column":0 },
              { "row":3, "column":0 },
              { "row":4, "column":0 },
              { "row":5, "column":0 },
              { "row":6, "column":0 },
              { "row":0, "column":0 },
              { "row":7, "column":0 },
              { "row":7, "column":1 },
              { "row":7, "column":2 },
              { "row":7, "column":3 },
              { "row":7, "column":4 },
              { "row":7, "column":5 },
              { "row":7, "column":6 },
              { "row":7, "column":7 },
              { "row":6, "column":7 },
              { "row":5, "column":7 },
              { "row":5, "column":6 },
              { "row":5, "column":5 },
              { "row":5, "column":4 },
              { "row":5, "column":3 },
              { "row":5, "column":2 },
              { "row":4, "column":7 },
              { "row":3, "column":7 },
              { "row":2, "column":7 },
              { "row":1, "column":7 },
              { "row":0, "column":7 },
              { "row":0, "column":1 },
              { "row":0, "column":2 },
              { "row":0, "column":3 },
              { "row":0, "column":4 },
              { "row":0, "column":5 },
              { "row":0, "column":6 }],
    "doors" : [
        { "color" : "green",  "row":2, "column":3},
        { "color" : "red",    "row":1, "column":4},
        { "color" : "yellow", "row":2, "column":1},
        { "color" : "blue",   "row":2, "column":2},
        { "color" : "blue",   "row":5, "column":1},
        { "color" : "cyan",   "row":6, "column":6}
    ],
    "keys": [
        { "color" : "red",    "row":1, "column":1},
        { "color" : "green",  "row":6, "column":1},
        { "color" : "blue",   "row":6, "column":3},
        { "color" : "blue",   "row":3, "column":3},
        { "color" : "yellow", "row":1, "column":2},
        { "color" : "cyan",   "row":6, "column":5}
    ],
}

const configuration_5 = {
    "rows" : 80,
    "columns" : 80,
    "ninjase" :  { "row":4, "column":4 },
    "walls" : [ { "row":40, "column":40 },
              { "row":41, "column":41 },
              { "row":40, "column":41 },
              { "row":41, "column":40 }],
    "doors" : [
        { "color" : "red",  "row":1, "column":10}
    ],
    "keys": [
        { "color" : "red",    "row":1, "column":1}
    ],
}

var level1 = JSON.parse(JSON.stringify(configuration_1));
var level2 = JSON.parse(JSON.stringify(configuration_2));
var level3 = JSON.parse(JSON.stringify(configuration_3));
var level4 = JSON.parse(JSON.stringify(configuration_4));
var level5 = JSON.parse(JSON.stringify(configuration_5));