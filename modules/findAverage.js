/*
Дана функція приймає посилання на файл та повертає новий об'єкт проміс,
- використовуючи createReadStream ми свого роду розділяємо дані на частини, 
створюємо змінні для суми чисел та кількості чисел
- потім ці частини розбиваємо на масив строк та проходимось по цим даним циклом
- переводимо строку в число  
- якщо це число, додаємо його до суми та збільшуємо кількість чисел на 1
При завершенні читання файлу виконується метод end, обчислюється та повертається середнє значення
*/

const fs = require('fs');

function findAverage(fileName) {
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(fileName, 'utf8');
        let sum = 0;
        let count = 0;

        stream.on('data', (data) => {
            const numbers = data.split('\n');
            for (const numberStr of numbers) {
                const number = Number(numberStr);
                if (!isNaN(number)) {
                    sum += number;
                    count++;
                }
            }
        });

        stream.on('end', () => {
            const average = sum / count;
            resolve(average);
        });

        stream.on('error', (err) => {
            reject(err);
        });
    });
}

module.exports = findAverage;


/*const fs = require('fs');

function findAverage(fileName) {
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(fileName, 'utf8');
        let sum = 0;
        let count = 0;

        stream.on('data', (data) => {
            const numbers = data.split('\n').map(Number).filter(number => !isNaN(number));
            sum += numbers.reduce((acc, curr) => acc + curr, 0);
            count += numbers.length;
        });

        stream.on('end', () => {
            const average = sum / count;
            resolve(average);
        });

        stream.on('error', (err) => {
            reject(err);
        });
    });
}

module.exports = findAverage;
*/