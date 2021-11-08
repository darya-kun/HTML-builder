/** 20 баллов
 * ✔️ Импортировать необходимые для выполнения задания модули fs и path.
 * ✔️ Создать новый ReadStream из файла text.txt.
 * 
 * https://nodejs.org/api/stream.html#event-readable
 */

const path = require('path');
const fs = require('fs');
const stream = new fs.ReadStream(path.join(__dirname, 'text.txt'), {encoding:"utf-8"});

// Событие 'readable' возникает, когда есть данные, доступные для чтения из потока, или когда достигнут конец потока. Если данные доступны, stream.read() вернет эти данные.
stream.on('readable', (data) => {
  while (data = stream.read()) {
    console.log(data);
  }
});