//Основной модуль
import gulp from "gulp";
// Импорт путей

import {path} from "./gulp/config/path.js";

//Импорт обший плагинов

import { plugins } from "./gulp/config/plugins.js";

// Передаем знанеия в глобальную переменную
global.app = {
    path: path,
    gulp: gulp,
    plugins: plugins
}

// Импорт задач
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html }  from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/JavascriptTask.js";
import {images} from "./gulp/tasks/images.js";




const watcher = function() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

const mainTasks = gulp.parallel(copy, html, scss , js, images);

//Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));


//Выполнения сцкнария по умолчанию

gulp.task('default', dev);