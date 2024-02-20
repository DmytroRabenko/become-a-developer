const fs = require('fs');

function findMedian(fileName) {
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
            const sortedNumbers = numbers.sort((a, b) => a - b);
            const length = sortedNumbers.length;
            let median;
            if (length % 2 === 0) {
                median = (sortedNumbers[length / 2 - 1] + sortedNumbers[length / 2]) / 2;
            } else {
                median = sortedNumbers[Math.floor(length / 2)];
            }
            resolve(median);
        });

        stream.on('error', (err) => {
            reject(err);
        });
    });
}

module.exports = findMedian;
