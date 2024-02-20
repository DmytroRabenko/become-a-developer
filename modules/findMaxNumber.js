/*
Дана функція приймає посилання на файл та повертає новий об'єкт проміс,
- використовуючи createReadStream ми свого роду розділяємо дані на частини, 
- потім ці частини розбиваємо на масив строк та проходимось по цим даним циклом
- кожне число перевіряється, чи воно є числом та чи воно більше поточного максимального числа, 
якщо так, то максимальне число оновлюється.
- після того як весь файл прочитано,передається максимальне число
*/
const fs = require('fs');

function findMaxNumber(fileName) {
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(fileName, 'utf8');
        let maxNumber = -Infinity;
        stream.on('data', (data) => {
            const numbers = data.split('\n');

            for (const numberStr of numbers) {
                const number = Number(numberStr);
                if (!isNaN(number) && number > maxNumber) {
                    maxNumber = number;
                }
            }
        });

        stream.on('end', () => {
            resolve(maxNumber);
        });

        stream.on('error', (err) => {
            reject(err);
        });
    });
}

module.exports = findMaxNumber;
