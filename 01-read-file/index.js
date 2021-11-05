/**
 * ✔️ Импортировать необходимые для выполнения задания модули fs и path.
 * ✔️ Создать новый ReadStream из файла text.txt.
 * ✔️ Направить поток чтения в стандартный поток вывода, т.е. консоль. Вы можете использовать как высокоуровневый console.log(), так и работать напрямую с потоком вывода process.stdout.
 * 
 * https://www.youtube.com/watch?v=eQGBS15vUac
 * https://www.youtube.com/watch?v=3aGSqasVPsI&t=1713s
 */


// The path module provides utilities for working with file and directory paths.
const path = require('path');
// The fs module enables interacting with the file system.
const fs = require('fs');

// stream.Readable - встроенный класс, который реализует потоки для чтения, как правило используются его наследники. В частности для чтения из файла есть fs.ReadSream.
// Функция join из модуля Path позволяет создать полный путь к текстовому файлу основываясь на переменной __dirname хранящей путь к каталогу, где находится файл скрипта. 
const stream = new fs.ReadStream(path.join(__dirname, 'text.txt'), {encoding:"utf-8"});

// «readable» событие - данные просчитаны и находятся во внутреннем буфере потока, который мы можем получить используя вызов «read()». Затем мы можем что-то сделать с данными — «data» и подождать следующего «readable».z
stream.on('readable', (data) => {
  while (data = stream.read()) {
    console.log(data);
  }
});