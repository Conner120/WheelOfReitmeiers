const { PrismaClient } = require('@prisma/client');

const csvToJson = require('convert-csv-to-json');

const prisma = new PrismaClient();
// parse the data from the csv file
const json = csvToJson.fieldDelimiter(',').getJsonFromCsv('Puzzels.csv');

// eslint-disable-next-line no-plusplus
async function main() {
  return new Promise(async (resolve, reject) => {
    for (let index = 0; index < json.length; index++) {
      const element = json[index];
      console.log(element);
      if (
        Number.isNaN(parseInt(element['NumberofWords'], 10)) === false &&
        Number.isNaN(parseInt(element['TotalNumberofLetters'], 10)) === false
      ) {
        // create a new row in the database
        await prisma.wOFPuzzle
          .create({
            data: {
              category: element.Category,
              puzzle: element.Phrases,
              letters: parseInt(element['NumberofWords'], 10),
              words: parseInt(element['TotalNumberofLetters'], 10),
            },
          })
          .then(() => {
            console.log('Puzzle created');
          })
          .catch((e) => {
            console.log(e);
            console.log({
              category: element.Category,
              puzzle: element.Phrases,
              words: parseInt(element['NumberofWords'], 10),
              letters: parseInt(element['TotalNumberofLetters'], 10),
            });
            reject(e);
          });
      }
    }
    resolve();
  });
}
main().then(() => {
  console.log('Database seeded');
  process.exit(0);
});
