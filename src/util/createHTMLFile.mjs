import {EJS} from "../EJS.mjs";
import {FS} from "./FS.mjs";
import {Pandoc} from "./Pandoc.mjs";
import {JSDOM} from "../../index.mjs";

export const createHTMLFile = async (f) => {
  const {createdAt, editedAt, pathToFile, fileName, htmlFileName} = f;
  const result = await Pandoc(pathToFile)

  const dom = new JSDOM(result);

  const domMeta = dom.window.document.body.querySelector('#meta');
    const meta = new Map()
    if (domMeta) {
      Array.from(domMeta.children).forEach(child => {
        const [key, value] = child.innerHTML.split('::');
        meta.set(key, value);
      })
    }

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
    await FS.writeFile(htmlFileName, str);
    console.log(htmlFileName + " html written")
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
