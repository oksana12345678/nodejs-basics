import startServer from './server.js';
import { initMongoDB } from './db/initMongoDB.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';

const bootstrap = async () => {
  await initMongoDB();
  await createDirIfNotExists(TEMP_UPLOAD_DIR);
  await createDirIfNotExists(UPLOAD_DIR);
  startServer();
};

void bootstrap();

// import fs from 'fs/promises';

// const message = 'Hello world';
// console.log(message);
// const count = (numbers) => {
//   return numbers.map((num) => num + 1);
// };
// console.log(count([2, 4, 4, 5]));
// // * reading
// (async () => {
//   try {
//     const data = await fs.readFile('text.txt', 'utf8');
//     console.log('Вміст файлу:', data);
//   } catch (err) {
//     console.error('Помилка читання файлу:', err);
//   }
// })();
// * write to file {it's change all file }
// const data = 'I love you, Node';
// [fs.writeFile('test.txt', data)];

// (async () => {
//   const data = 'I love you, Node!';
//   try {
//     await fs.writeFile('text.txt', data, 'utf-8');
//     console.log('success');
//   } catch (error) {
//     console.error('error of write your message', error);
//   }
// })();
// * add to file
// const dataName = 'My name is Oksana';
// [fs.appendFile('test.txt', dataName)];

// (async () => {
//   const data = 'My name is Oksana';
//   try {
//     await fs.appendFile('text.txt', data, 'utf-8');
//     console.log('success');
//   } catch (error) {
//     console.error('error of add something', error);
//   }
// })();
// * rename
// [fs.rename('test.txt', 'textFile.txt')];

// (async () => {
//   try {
//     await fs.rename('textFile.txt', 'text.txt');
//     console.log('success');
//   } catch (error) {
//     console.error('error wheat', error);
//   }
// })();
// * delete
// (async () => {
//   try {
//     await fs.unlink('text.txt');
//   } catch (error) {
//     console.error('error', error);
//   }
// })();

// * take a table
//! not working [fs.readdir('')];

// (async () => {
//   try {
//     const files = await fs.readdir('.');
//     console.log('list of files:', files);
//   } catch (error) {
//     console.error('error is:', error);
//   }
// })();

// * checking fore file availability
//! not working [fs.access('test')];
// (async () => {
//   const path = 'test';
//   try {
//     await fs.access(path);
//     console.log(`file or directory '${path}' is available`);
//   } catch (err) {
//     if (err.code === 'ENOENT') {
//       console.log(`File or directory ${path} does not exist`);
//     } else {
//       console.error(
//         `file or directory availability check error '${path}':`,
//         err,
//       );
//     }
//   }
// })();
