const data = [{
        "_id": "5b5e3168c6bf40f2c1235cd6",
        "index": 0,
        "age": 39,
        "eyeColor": "green",
        "name": "Stein",
        "favoriteFruit": "apple"
    },
    {
        "_id": "5b5e3168e328c0d72e4f27d8",
        "index": 1,
        "age": 38,
        "eyeColor": "blue",
        "name": "Cortez",
        "favoriteFruit": "strawberry"
    },
    {
        "_id": "5b5e3168cc79132b631c666a",
        "index": 2,
        "age": 2,
        "eyeColor": "blue",
        "name": "Suzette",
        "favoriteFruit": "apple"
    },
    {
        "_id": "5b5e31682093adcc6cd0dde5",
        "index": 3,
        "age": 19,
        "eyeColor": "green",
        "name": "George",
        "favoriteFruit": "banana"
    }
];

const findTypes = function () {
    let arr = [];
    for (let i = 0; i < arguments.length; i++) {
        arr.push(typeof arguments[i]);
    }
    return arr;
};
findTypes(null, 5, 'hello')

const executeforEach = function (arr, func) {
    for (let i = 0; i < arr.length; i++) {
        func(arr[i]);
    }
};
executeforEach([1, 2, 3], function (el) {
    console.log(el);
})

const mapArray = function (arr, func) {
    let newArr = [];
    executeforEach(arr, function (el) {
        newArr.push(func(el));
    });
    return newArr;
};
mapArray([2, 5, 8], function (el) {
    return el + 3;
})

const filterArray = function (arr, func) {
    let filterArr = [];
    executeforEach(arr, function (el) {
        if (func(el)) {
            filterArr.push(el);
        }
    });
    return filterArr;
};
filterArray([2, 5, 8], function (el) {
    return el > 3;
})

const getAmountOfAdultPeople = function (enterData) {
    return filterArray(enterData, function (el) {
        return el.age > 18;
    }).length;
};
getAmountOfAdultPeople(data)

const getGreenAdultBananaLovers = function (enterData) {
    let filterArr = filterArray(enterData, function (el) {
        return el.age > 18 && el.favoriteFruit === "banana" && el.eyeColor === "green";
    });
    return mapArray(filterArr, function (el) {
        return el.name;
    });
};
getGreenAdultBananaLovers(data)

const keys = function (object) {
    let arr = [];
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            arr.push(key);
        }
    }
    return arr;
};
keys({
    keyOne: 1,
    keyTwo: 2,
    keyThree: 3
})

const values = function (object) {
    let arr = [];
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            arr.push(object[key]);
        }
    }
    return arr;
};
values({
    keyOne: 1,
    keyTwo: 2,
    keyThree: 3
})

const showFormattedDate = function (date) {
    const shortMonth = {
        month: 'short'
    };
    return `Date: ${date.getDate()} of ${date.toLocaleDateString('en-US', shortMonth)}, ${date.getFullYear()}`;
};
showFormattedDate(new Date('2019-01-27T01:10:00'))

const isEvenYear = function (date) {
    return date.getFullYear() % 2 === 0;
};
isEvenYear(new Date('2019-01-27T01:10:00'))

const isEvenMonth = function (date) {
    const month = date.getMonth() + 1;
    return month % 2 === 0;
};
isEvenMonth(new Date('2019-02-27T01:10:00'))