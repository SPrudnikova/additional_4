function makeArrFromString(string, base) {
    const regExp = new RegExp('.{1,' + base + '}', 'g');
    const divisionRest = string.length % base;
    if (divisionRest) {
        const firstPart = string.slice(0, divisionRest);
        const lastPartArr = string.slice(divisionRest).match(regExp);
        return [firstPart, ...lastPartArr].map(item => parseInt(item));
    } else {
        return string.match(regExp)
                     .map(item => parseInt(item));
    }
}

function unshiftDigit (targetArr, patternArr) {
    const unshiftQty = patternArr.length - targetArr.length;
    for (let i = 0; i < unshiftQty; i++) {
        targetArr.unshift(0);
    }
}

function makeArrayMatrix (arrayLength, numberQty, firstArr, secondArr) {
    const MAX_BASE_DIGIT_QTY = arrayLength * numberQty - 1;
    const arrayMatrix = [];

    for (let i = 0; i < arrayLength; i++) {
        const arrayRow = Array.apply(null, {length: MAX_BASE_DIGIT_QTY});
        arrayMatrix.push(arrayRow.map(() => 0));
    }

    for (let i = 0; i < firstArr.length; i++) {
        for (let j = 0; j < secondArr.length; j++) {
            arrayMatrix[i][i+j] = firstArr[i] * secondArr[j];
        }
    }

    return arrayMatrix;
}

function makeFinalArray (arrayMatrix, base, digitBase) {
    let valueInMemory = 0;
    const innerArrayLength = arrayMatrix[0].length;
    const finalArray = [];
    for (let j = innerArrayLength-1; j >= 0; j--) {
        let innerItemsSum = 0;
        for (let i = 0; i < arrayMatrix.length; i++) {
            innerItemsSum = innerItemsSum + arrayMatrix[i][j];
        }
        innerItemsSum = innerItemsSum + valueInMemory;
        if (innerItemsSum > base) {
            const innerItemsSumToSet = addZeroes (innerItemsSum % base, digitBase);
            finalArray.unshift(innerItemsSumToSet);
            valueInMemory = (innerItemsSum - innerItemsSumToSet)/base;
        } else {
            valueInMemory = 0;
            const innerItemsSumToSet = addZeroes (innerItemsSum, digitBase);
            finalArray.unshift(innerItemsSumToSet);
        }
    }

    return [valueInMemory, ...finalArray];
}

function addZeroes (innerItemsSum, digitBase) {
    let innerItemsSumString = innerItemsSum.toString();
    while (innerItemsSumString.length < digitBase) {
        innerItemsSumString = "0" + innerItemsSumString;
    }
    return innerItemsSumString;
}

function calculateBigIntegerMultiply (first, second) {
    const BASE = 1000000;
    const DIGIT_BASE = BASE.toString().length - 1;
    const NUMBER_QTY = 2;
    const firstArr = makeArrFromString(first, DIGIT_BASE);
    const secondArr = makeArrFromString(second, DIGIT_BASE);
    if (firstArr.length !== secondArr.length) {
        firstArr.length > secondArr.length ? unshiftDigit(secondArr, firstArr) : unshiftDigit(firstArr, secondArr);
    }

    const arrayMatrix = makeArrayMatrix(firstArr.length, NUMBER_QTY, firstArr, secondArr);
    const finalArr = makeFinalArray(arrayMatrix, BASE, DIGIT_BASE);

    return finalArr.join('').replace(/^0+/,'');
}

module.exports = function multiply(first, second) {
    const simpleMultiple = Number(first) * Number(second);
    if (simpleMultiple < Number.MAX_SAFE_INTEGER) {
        return simpleMultiple.toString();
    } else {
        return calculateBigIntegerMultiply(first, second);
    }
};



//1st variant
// function unshiftDigit (targetArr, patternArr) {
//     const unshiftQty = patternArr.length - targetArr.length;
//     for (let i = 0; i < unshiftQty; i++) {
//         targetArr.unshift(0);
//     }
// }
//
// function makeArrayMatrix (arrayLength, firstArr, secondArr) {
//     const arrayMatrix = [];
//     const MAX_BASE_DIGIT_QTY = arrayLength*2-1;
//
//     for (let i = 0; i < MAX_BASE_DIGIT_QTY; i++) {
//         const arrayRow = Array.apply(null, {length: MAX_BASE_DIGIT_QTY});
//         arrayMatrix.push(arrayRow.map(() => 0));
//     }
//
//     for (let i = 0; i < firstArr.length; i++) {
//         for (let j = 0; j < secondArr.length; j++) {
//             arrayMatrix[i][i+j] = firstArr[i] * secondArr[j];
//         }
//     }
//
//     return arrayMatrix;
// }
//
// function makeFinalArray (arrayMatrix) {
//     const digitBase = 10;
//     let valueInMemory = 0;
//     const innerArrayLength = arrayMatrix[0].length;
//     const finalArray = [];
//     for (let j = innerArrayLength - 1; j >= 0; j--) {
//         let innerItemsSum = 0;
//         for (let i = 0; i < arrayMatrix.length; i++) {
//             innerItemsSum = innerItemsSum + arrayMatrix[i][j];
//         }
//         innerItemsSum = innerItemsSum + valueInMemory;
//         const innerItemsSumToSet = innerItemsSum % digitBase;
//         finalArray.unshift(innerItemsSumToSet);
//         valueInMemory = (innerItemsSum - innerItemsSumToSet) / digitBase;
//     }
//
//     return [valueInMemory, ...finalArray];
// }
//
// function calculateBigIntegerMultiply (first, second) {
//     const firstArr = first.split('').map(item => parseInt(item));
//     const secondArr = second.split('').map(item => parseInt(item));
//     if (firstArr.length !== secondArr.length) {
//         firstArr.length > secondArr.length ? unshiftDigit(secondArr, firstArr) : unshiftDigit(firstArr, secondArr);
//     }
//
//     const arrayMatrix = makeArrayMatrix(firstArr.length, firstArr, secondArr);
//     const finalArr = makeFinalArray(arrayMatrix);
//
//     return finalArr.join('').replace(/^0+/,'');
// }
//
// module.exports = function multiply(first, second) {
//     const simpleMultiple = Number(first) * Number(second);
//     if (simpleMultiple < Number.MAX_SAFE_INTEGER) {
//         return simpleMultiple.toString();
//     } else {
//         return calculateBigIntegerMultiply(first, second);
//     }
// };
