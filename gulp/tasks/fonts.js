import fs from 'fs';
import fonter from "gulp-fonter";
import ttfwoff2 from 'gulp-ttf2woff2';

export const font = () => {
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
        formats: ['ttf']
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
        .pipe(fonter({
            formats: ['woff']
        }))
        .pipe(app.gulp.dest(`${app.path.build.fonts}/fonts/`))
        .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
        .pipe(ttfwoff2())
        .pipe(app.gulp.dest(`${app.path.build.fonst}`))
};

export const fontStyle = () => {
    // Файл стилей подключения шрифтов
    let fontFile = `${app.path.srcFolder}/scss/fonts.scss`;
    //Проверяем сушествуют ли файл шрифтов 
    fs.readdir(app.path.build.fonts, function(err, fontsFiles) {
      if (fontsFiles) {
        // Проверяем сушествуют ли файл стилей для подключения шрифтов
        if(!fs.existsSync(fontsFile)) {
            //Если файл нет создаем его
            fs.writeFile(fontsFiles, '', cb);
            let newFileOnly;
            for (var i = 0; i < fontsFiles.length; i++) {
                // записываем подключения шрифтов в файл стилей
                let fontFileName = fontsFiles[i].split('.')[0];
                if(newFileOnly !== fontFileName) {
                    let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                    let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                    if(fontWeight.toLowerCase() === 'thin') {
                        fontWeight = 100;
                    } else if(fontWeight === 'extralight') {
                        fontWeight = 200;
                    } else if (fontWeight.toLowerCase() === 'medium') {
                        fontWeight = 500;
                    } else if( fontWeight.toLowerCase() === 'semibold') {
                        fontWeight = 600;
                    } else if(fontWeight.toLowerCase() === 'bold') {
                        fontWeight = 700;
                    } else if(fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
                        fontWeight = 800;
                    } else if(fontWeight.toLowerCase() === 'black') {
                        fontWeight = 900;
                    } else {
                        fontWeight = 400;
                    }
                    fs.appendFile(fontsFiles, 
                            `@font-face {
                             font-family: ${fontName};
                             font-display: swap;
                             src: url("../fonts/${fontFileName}.woff") format("woff"), url("../fonts/${fontFileName}.woff2) format(woff2);
                             font-weight: ${fontWeight};
                             font-style: normal; 
                            }\r\n
                        `, cb)
                    // fs.appendFile(fontsFiles, `@font-face {\n\tfont-family: ${fontName}; \n\tfont-display:swap;\n\tsrc: url(../fonts/${fontFileName}.woff) format("woff"); \n\tfont-weight: ${fontWeight}; \n\tfont-style: normal;\n}\r\n`, cb);
                    
                    newFileOnly = fontFileName;
                     
                }
            }
        } else {
            console.log('Файл scss/fonts.scss уже сушествует. для обновления файла нужно его удалить');
        }
      }  
    });
    return app.gulp.src(`${app.path.srcFolder}`);
    function cb () {}
}

