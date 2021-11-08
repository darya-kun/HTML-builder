/**
 * ✔️ Внутри папки 02-write-file находится 1 файл index.js
 * ✔️ При выполнении команды node 02-write-file в папке 02-write-file создаётся текстовый файл, а в консоль выводится приглашение на ввод текста
 * ✔️ После ввода текста в каталоге 02-write-file введённый текст должен быть записан в созданный ранее файл. Процесс не завершается и ждёт нового ввода.
 * ✔️ После следующего ввода созданный изначально текстовый файл дополняется новым текстом, процесс продолжает ждать ввод.
 * ✔️ При нажатии сочетания клавиш ctrl + c или вводе exit в консоль выводится прощальная фраза и процесс завершается. 
 * 
 * https://nodejs.org/api/readline.html#event-sigint
 * https://nodejs.org/api/process.html#processstdin
 * https://nodejs.org/api/stream.html#writableendchunk-encoding-callback
 */

const path = require('path');
const fs = require('fs');
const stream = new fs.createWriteStream(path.join(__dirname, 'answers.txt'), {encoding:"utf-8"});
const process = require('process');

// модуль Readline для чтения чего-либо из потока(stream) по строке за раз
const readline = require('readline').createInterface({
  // строка, которую вводят в консоль пользователем
  input: process.stdin,
  // строка, которая выводится в консоль нами
  output: process.stdout
});

process.stdout.write(`Hello! Please describe yout feelings about the RS School:\n`);

// The 'line' event is emitted whenever the input stream receives an end-of-line input. This usually occurs when the user presses Enter or Return.
readline.on('line', function(input) { 
  // console.log(typeof input);
  (input.includes('exit')) ? exitProcess() : stream.write(`${input}\n`);
});

const exitProcess = () => {
  // The rl.close() method closes the InterfaceConstructor instance and relinquishes control over the input and output streams. 
  readline.close();
  process.stdout.write(`Nice! Thanks for your answers!\n`);
  stream.end();
}

// The 'SIGINT' even≠t is emitted whenever the input stream receives a Ctrl+C input, known typically as SIGINT. If there are no 'SIGINT' event listeners registered when the input stream receives a SIGINT, the 'pause' event will be emitted.
readline.on('SIGINT', exitProcess);
