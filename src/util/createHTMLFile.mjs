import {EJS} from "../EJS";
import {FS} from "./FS";
import {Pandoc} from "./Pandoc.mjs";

export const createHTMLFile = async (f) => {
    const {createdAt, editedAt, pathToFile, fileName, htmlFileName} = f;
    const result = await Pandoc(pathToFile)
    const meta = new Map()

    await FS.mkdir(htmlFileName);

    const wasEdited = Math.abs(createdAt.valueOf() - editedAt.valueOf()) > 2015478
    const title = toTitleCase(fileName);
    const str = await EJS.renderFile('./views/wrapper.ejs', {
        content: result,
        createdAt,
        editedAt: wasEdited ? editedAt : null,
        title,
        meta
    });
    await FS.writeFile(f.htmlFileName, str);
    console.log(f.htmlFileName + " html written")
    return {title, pubDate: createdAt, description: result, slug: htmlFileName.slice(1)}
        ;
}

export function toTitleCase(string = '') {
    let sentence = string.toLowerCase().split("_");
    for (let i = 0; i < sentence.length; i++) {
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }

    return sentence.join(" ");
}
