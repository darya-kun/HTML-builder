/**
 * ✔️ После завершения работы скрипта должна быть создана папка project-dist
 * ✖️ В папке project-dist должны находиться файлы index.html и style.css
 * ✖️ В папке project-dist должна находиться папка assets являющаяся точной копией папки assets находящейся в 06-build-page
 * ✔️ Запрещается использование fsPromises.cp()
 * ✖️ Файл index.html должен содержать разметку являющуюся результатом замены шаблонных тегов в файле template.html
 * ✔️ Файл style.css должен содержать стили собранные из файлов папки styles
 * ✖️ При добавлении компонента в папку и соответствующего тега в исходный файл template.html повторное выполнение скрипта приведёт файл index.html в папке project-dist в актуальное состояние перезаписав его. Файл style.css и папка assets так же должны поддерживать актуальное состояние 
 * ✖️ Исходный файл template.html не должен быть изменён в ходе выполнения скрипта
 * ✖️ Запись в шаблон содержимого любых файлов кроме файлов с расширением .htmlявляется ошибкой
 */

 /**
  * ✔️ Импорт всех требуемых модулей
    2. Прочтение и сохранение в переменной файла-шаблона
    3. Нахождение всех имён тегов в файле шаблона
    4. Замена шаблонных тегов содержимым файлов-компонентов
    5. Запись изменённого шаблона в файл index.htmlв папке project-dist
    6. Использовать скрипт написанный в задании 05-merge-stylesдля создания файла style.css
    7. Использовать скрипт из задания 04-copy-directoryдля переноса папки assetsв папку project-dist 
  */
const fs = require('fs/promises');
const path = require('path');
const destFolder = path.join(__dirname, 'project-dist');

const createFolder = async () => {
  try {
    await fs.mkdir(destFolder);
  } catch (err) {
    console.error(err);
  }
}

// Добавляем HTML
// const mergeHTML = async () => {
//   try {
    
//   } catch (err) {
//     console.error(err);
//   }
// }

// Добавляем css
const mergeStyles = async () => {
  const stylesFolder = path.join(__dirname, 'styles');

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
    await fs.writeFile(path.join(destFolder, 'style.css'), stylesArray.join('\n'));
    // console.log('Congrats! New style.css was created successfully!');
  } catch (err) {
    console.error(err);
  }
};

// Создаем копию папки assets
const copyDirectory = async () => {
  try {
    const srcFolder = path.join(__dirname, 'assets');
    const destFolder = path.join(__dirname, 'project-dist', 'assets');
    //fsPromises.readdir(path[, options]) считываем содержимое каталога. Если options.withFileTypes равен true, разрешаемый массив будет содержать объекты <fs.Dirent> - представление записи каталога.
    await fs.mkdir(destFolder);
    const srcFiles = await fs.readdir(srcFolder, { withFileTypes: true });

    for (const file of srcFiles) {
      const srcFile = path.join(srcFolder, file);
      const destFile = path.join(destFolder, file);
      await fs.copyFile(srcFile, destFile);
    }
  } catch (err) {
    console.error(err);
  }
}

const buildPage = async () => {
  try {
    createFolder();
    // await mergeHTML();
    await mergeStyles();
    await copyDirectory();
    // console.log('Congrats! Your page was created successfully!');
  } catch (err) {
    console.error(err);
  }
};

buildPage();