/** 20 баллов
 * ✔️️ При выполнении команды node 03-files-in-folder в корневом каталоге репозитория в консоль выводится информация о файлах содержащихся внутри secret-folder. Данные должны быть выведены в формате <имя файла>-<расширение файла>-<вес файла>. Пример: example - txt - 128.369kb. Конвертация в кб по желанию.
 * ✔️️ Информация должна выводиться только для файлов. Наличие информации о директориях считается ошибкой.
 * 
 * https://nodejs.org/dist/latest-v16.x/docs/api/fs.html#fspromisesreaddirpath-options
 * https://nodejs.org/api/path.html#pathparsepath
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr
 * https://developer.mozilla.org/en-US/docs/Web/API/FileSystemEntry/isFile
 */

const path = require('path');
const fs = require('fs/promises');
const folder = path.join(__dirname, 'secret-folder');

const getFilesInfo = async () => {
  //fsPromises.readdir(path[, options]) считываем содержимое каталога. Если options.withFileTypes равен true, разрешаемый массив будет содержать объекты <fs.Dirent> - представление записи каталога. Запись представляет комбинацию пар имени файла и типа файла.
  try {
    const files = await fs.readdir(folder, { withFileTypes: true });

    for (const file of files)
      // Проверка для исключения попадания в выдачу папки image.jpg
      if (file.isFile()) {
        const filePath = path.join(folder, file.name);
        const fileName = path.parse(filePath).name;
        // Методом path.extname() возвращаем расширение пути от последнего появления символа точки до конца строки.
        const fileExtname = path.extname(filePath).substr(1);
        // fs.stat(path[, options], callback) получаем информацию о размере файла
        const fileSize = (await fs.stat(filePath)).size;
        console.log(`${fileName} - ${fileExtname} - ${fileSize}b`);
      }
  } catch (err) {
    console.error(err);
  }
};

getFilesInfo();
