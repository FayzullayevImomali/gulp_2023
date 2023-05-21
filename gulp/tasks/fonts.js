import fs from 'fs';
import fonter from "gulp-fonter";
import ttf2woff2 from 'gulp-ttf2woff2';

export const fonts = () => {
    //Ишем файли шрифтов .otf
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: 'FONTS',
            message: "Error: <%= error.mesage"
        })
    ))
    //Converting to .ttf
    .pipe(fonter({
        formats: [ttf]
    }))
    // putting to source folder
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'FONTS',
                message: "Error: <%= error.mesage"
            })
        ))
}