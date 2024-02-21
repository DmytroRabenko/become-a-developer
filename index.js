const fs = require('fs');
const path = require('path');
const findMaxNumber = require('./modules/findMaxNumber');
const findMinNumber = require('./modules/findMinNumber');
const findMedian = require('./modules/findMedian');
const findAverage = require('./modules/findAverage');
const findLongestIncreasingSequence = require('./modules/findLongestIncreasingSequence');
const findLongestDecreasingSequence = require('./modules/findLongestDecreasingSequence');

const dataPath = path.join(__dirname, 'data/10m.txt');

const startTime = new Date();
// Перевірка наявності файлу
fs.access(dataPath, fs.constants.F_OK, (err) => {
    if (err) {
        console.error('Помилка: файл не знайдено');
        return;
    }
//для відслідковування часу виконання
    Promise.all([
        findMaxNumber(dataPath),
        findMinNumber(dataPath),
        findMedian(dataPath),
        findAverage(dataPath),
        findLongestIncreasingSequence(dataPath),
        findLongestDecreasingSequence(dataPath)
    ])
    .then((results) => {
        const [maxNumber, minNumber, median, average, increasingSequence, decreasingSequence] = results;
        console.log('Максимальне число:', maxNumber);
        console.log('Мінімальне число:', minNumber);
        console.log('Медіана:', median);
        console.log('Середнє арифметичне:', average);
        console.log('Найбільша збільшуюча послідовність чисел:', increasingSequence);
        console.log('Найбільша зменшуюча послідовність чисел:', decreasingSequence);
        const endTime = new Date();
        const executionTime = (endTime - startTime) / 1000;
        console.log('Час виконання:', executionTime, 'c');
    })
    .catch((err) => {
        console.error('Виникла помилка:', err);
    });
});

/*
Вітаю, мене звати Дмитро, я фронт-енд розробник, але нещодавно розпочав вивчати базу Node.js, 
оскільки дане завдання більш актуально на бекенді, вирішив виконувати його саме таким чином.

Що стосується вирішення, то спочатку я просто створював з даного файлу масив чисел, але таке 
рішення виконувалось в два рази довше ніж з використанням createReadStream.

Також пробував в деяких прикладах використовувати reduce та обєкт Math але все ж таки зупинився 
на такому вирішенні

Для запуску потрібно в терміналі виконати команду - node index.js
*/





