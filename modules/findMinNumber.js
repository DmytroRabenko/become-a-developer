/*
Дана функція приймає посилання на файл та повертає новий об'єкт проміс,
- використовуючи createReadStream ми свого роду розділяємо дані на частини, 
- потім ці частини розбиваємо на масив строк та проходимось по цим даним циклом
- кожне число перевіряється, чи воно є числом та чи воно менше поточного мінімального числа, 
якщо так, то мінімальне число оновлюється.
- після того як весь файл прочитано,передається мінімальне число
*/
const fs = require('fs');

function findMinNumber(fileName) {
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(fileName, 'utf8');
        let minNumber = Infinity;

        stream.on('data', (data) => {
            const numbers = data.split('\n');

            for (const numberStr of numbers) {
                const number = Number(numberStr);
                if (!isNaN(number) && number < minNumber) {
                    minNumber = number;
                }
            }
        });

        stream.on('end', () => {
            resolve(minNumber);
        });

        stream.on('error', (err) => {
            reject(err);
        });
    });
}

module.exports = findMinNumber;