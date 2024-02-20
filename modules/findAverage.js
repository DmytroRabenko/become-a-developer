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
