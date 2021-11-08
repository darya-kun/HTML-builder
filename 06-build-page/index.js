/**
 * ✔️ После завершения работы скрипта должна быть создана папка project-dist
 * ✖️ В папке project-dist должны находиться файлы index.html и style.css
 * ✔️ В папке project-dist должна находиться папка assets являющаяся точной копией папки assets находящейся в 06-build-page
 * ✔️ Запрещается использование fsPromises.cp()
 * ✖️ Файл index.html должен содержать разметку являющуюся результатом замены шаблонных тегов в файле template.html
 * ✔️ Файл style.css должен содержать стили собранные из файлов папки styles
 * ✖️ При добавлении компонента в папку и соответствующего тега в исходный файл template.html повторное выполнение скрипта приведёт файл index.html в папке project-dist в актуальное состояние перезаписав его. Файл style.css и папка assets так же должны поддерживать актуальное состояние 
 * ✖️ Исходный файл template.html не должен быть изменён в ходе выполнения скрипта
 * ✖️ Запись в шаблон содержимого любых файлов кроме файлов с расширением .html является ошибкой
 */

const fs = require('fs/promises');
const path = require('path');
const destFolder = path.join(__dirname, 'project-dist');

// Создаем новую папку project-dist и пересоздаем для актуализации
const createFolder = async () => {
  try {
    const array = await fs.readdir('06-build-page', { withFileTypes: true });
    if (array.some((element) => element.name === 'project-dist')) {
      await fs.rm(destFolder, { recursive: true });
    }
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
    const files = await fs.readdir(stylesFolder, { withFileTypes: true });
    const stylesArray = [];
    for (const file of files) {
      const filePath = path.join(stylesFolder, file.name);
      const fileExtname = path.extname(filePath).substr(1);
      if (file.isFile() && fileExtname == 'css') {
        const data = await fs.readFile(filePath, {encoding:"utf-8"});
        stylesArray.push(data.trim());
      }
    }
    await fs.writeFile(path.join(destFolder, 'style.css'), stylesArray.join('\n'));
  } catch (err) {
    console.error(err);
  }
};

// Создаем копию папки assets
const copyDirectory = async (srcFolder, destFolder) => {
  try {
    await fs.mkdir(destFolder);
    const srcFiles = await fs.readdir(srcFolder, { withFileTypes: true });
    for (const file of srcFiles) {
      const srcFile = path.join(srcFolder, file.name);
      const destFile = path.join(destFolder, file.name);
      if (file.isFile()) {
        await fs.copyFile(srcFile, destFile);
      } else {
        await copyDirectory(srcFile, destFile);
      }
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
    await copyDirectory(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));
    console.log('Congrats! Your page was created successfully!');
  } catch (err) {
    console.error(err);
  }
};

buildPage();