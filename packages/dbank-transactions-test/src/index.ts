import { DataFrame, IDataFrame } from 'data-forge';
import * as fs from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);

async function loadTransactionsFromFile(fileName: string) {
  const buffer = await readFileAsync(fileName);
  return new DataFrame(JSON.parse(buffer.toString()).transactions);
}

async function main() {
  const filenames = [
    '../../doc/deutsche-bank/samples/transactions/1.json',
    '../../doc/deutsche-bank/samples/transactions/2.json',
    '../../doc/deutsche-bank/samples/transactions/3.json',
    '../../doc/deutsche-bank/samples/transactions/5.json',
  ];
  let df: IDataFrame = new DataFrame();
  for (let filename of filenames) {
    const loadedDF = await loadTransactionsFromFile(filename);
    df = df.concat(loadedDF);
  }
  //console.log(df.toString());
  console.log(
    df
      .groupBy(e => e.originIban)
      .inflate(e => ({ count: e.count(), originIban: e.first().originIban }))
      .toString()
  );

  console.log(df.count());
  fs.writeFileSync('./out.csv', df.toCSV());
}

main();
