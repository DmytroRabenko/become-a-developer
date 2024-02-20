/*
Дана функція приймає посилання на файл та повертає новий об'єкт проміс,
- використовуючи createReadStream ми свого роду розділяємо дані на частини, 
- потім ці частини розбиваємо на масив строк та проходимось по цим даним циклом
- кожне число перевіряється, чи воно є числом та додаємо його до масиву
при завершенні читання файлу викликається подія end
- якщо поточна послідовність порожня або поточне число більше попереднього, 
додаємо його до поточної послідовності
- якщо поточна послідовність більша за попередню максимальну, 
оновлюємо максимальну послідовність
- потім перевіряємо останню поточну послідовність чисел
- передаємо результат
*/

const fs = require('fs');

function findLongestIncreasingSequence(fileName) {
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(fileName, 'utf8');
        const numbers = [];
        
        stream.on('data', (data) => {
            const numberStrings = data.split('\n');
            for (const numberString of numberStrings) {
                const number = Number(numberString);
                if (!isNaN(number)) {
                    numbers.push(number);
                }
            }
        });

        stream.on('end', () => {
            let maxSequence = [];
            let currentSequence = [];
            for (let i = 0; i < numbers.length; i++) {
                if (currentSequence.length === 0 || numbers[i] > currentSequence[currentSequence.length - 1]) {
                    currentSequence.push(numbers[i]);
                } else {
                    if (currentSequence.length > maxSequence.length) {
                        maxSequence = currentSequence;
                    }
                    currentSequence = [numbers[i]];
                }
            }
            // Перевіряємо останню послідовність чисел
            if (currentSequence.length > maxSequence.length) {
                maxSequence = currentSequence;
            }
            resolve(maxSequence);
        });

        stream.on('error', (err) => {
            reject(err);
        });
    });
}

module.exports = findLongestIncreasingSequence;
