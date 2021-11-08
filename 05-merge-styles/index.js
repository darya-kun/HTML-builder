/**
 * ✔️ После завершения работы скрипта в папке project-dist должен находиться файл bundle.css содержащий стили из всех файлов папки styles.
 * ✔️ При добавлении/удалении/изменении файлов стилей в папке styles и повторном запуске скрипта файл bundle.css перезаписывается и содержит актуальные стили.
 * ✔️ Любые файлы имеющие расширение отличное от css или директории игнорируются.
 * ✔️ Стили находящиеся в файле bundle.css созданном в процессе сборки не должны быть повреждены.
 * 
 * https://nodejs.org/api/fs.html#fspromisesreaddirpath-options
 * https://nodejs.org/api/fs.html#fspromisesreadfilepath-options
 * https://nodejs.org/api/fs.html#fspromiseswritefilefile-data-options
 * 
 */

const fs = require('fs/promises');
const path = require('path');
const stylesFolder = path.join(__dirname, 'test-files/styles');
const destFolder = path.join(__dirname, 'project-dist');

const mergeStyles = async () => {
  try {
    // Читаем содержимое папки styles
    const files = await fs.readdir(stylesFolder, { withFileTypes: true });
    const stylesArray = [];
    
    for (const file of files) {
      const filePath = path.join(stylesFolder, file.name);
      const fileExtname = path.extname(filePath).substr(1);
      // Проверяем является ли объект файлом и имеет ли файл нужное расширение
      if (file.isFile() && fileExtname == 'css') {
        // fsPromises.readFile(path[, options]) - асинхронно считываем все содержимое css файлов.
        const data = await fs.readFile(filePath, {encoding:"utf-8"});
        // Записываем прочитанные данные в массив, удаляя пробельные символы с начала и конца строки методом trim()
        stylesArray.push(data.trim());
      }
    }
    // fsPromises.writeFile(file, data[, options]) - записываем массив стилей в файл bundle.css с новой строки
    await fs.writeFile(path.join(destFolder, 'bundle.css'), stylesArray.join('\n'));
    console.log('Congrats! New bundle.css was created successfully!');
  } catch (err) {
    console.error(err);
  }
};

mergeStyles();