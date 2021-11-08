/**
 * ✔️ После завершения работы функции создаётся папка files-copy, содержимое которой является точной копией исходной папки files.
 * ✔️ При добавлении/удалении/изменении файлов в папке files и повторном запуске node 04-copy-directory содержимое папки files-copy актуализируется.
 * ✔️ Запрещается использование fsPromises.cp()
 * 
 * https://nodejs.org/api/fs.html#fs_fspromises_destFile_src_dest_mode
 * https://nodejs.org/api/fs.html#fs_fspromises_mkdir_path_options
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
 * https://developer.mozilla.org/en-US/docs/Web/API/File/name
 */

const fs = require('fs/promises');
const path = require('path');

const copyDirectory = async () => {
  try {
    const srcFolder = path.join(__dirname, 'files');
    const destFolder = path.join(__dirname, 'files-copy');
    //fsPromises.readdir(path[, options]) считываем содержимое каталога. Если options.withFileTypes равен true, разрешаемый массив будет содержать объекты <fs.Dirent> - представление записи каталога.
    const array = await fs.readdir('04-copy-directory', { withFileTypes: true });

    // Проверка на наличие в директории папки files-copy. Если true - удаляем её (и ниже создаем вновь). Причина - поддерживать актуальность файлов.
    if (array.some((element) => element.name === 'files-copy')) {
      // fsPromises.rm(path[, options]) удаляем файлы и каталоги. recursive имеет значение <boolean> - если true, выполнить рекурсивное удаление каталога. Операции повторяются при неудаче. По умолчанию: false.
      await fs.rm(destFolder, { recursive: true });
    }

    if (array.some((element) => element.name === 'files')) {
      // fsPromises.mkdir(path[, options]) асинхронно создаем каталог.
      await fs.mkdir(destFolder);
      // Читаем содержимого папки files
      const files = await fs.readdir(srcFolder);

      for (const file of files) {
        const srcFile = path.join(srcFolder, file);
        const destFile = path.join(destFolder, file);
        // fsPromises.copyFile(src, dest[, mode]) асинхронно копируем файлы src в dest (из папки files в папку files-copy). По умолчанию dest перезаписывается, если он уже существует.
        await fs.copyFile(srcFile, destFile);
      }
      console.log('Congrats! Your folder was copied successfully!');
    } else {
      console.log('Sorry, but there is nothing to copy');
    }
  } catch (err) {
    console.error(err);
  }
}

copyDirectory();