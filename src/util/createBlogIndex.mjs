import {toTitleCase} from "./createHTMLFile.mjs";
import ejs from "ejs";
import fs from "fs";

export const createBlogIndex = async (files) => {
    const links = files.sort((a, b) => {
        return b.createdAt.valueOf() - a.createdAt.valueOf();
    }).map(f => {
        return `<li>
      <a href="/blog/${f.fileName}">
        <b>${toTitleCase(f.fileName)}</b>
      </a> ${f.createdAt.toDateString()}
    </li>`
    }).join('\n');

    const content = `<div>
    <ul id="links">
        ${links}
    </ul>
</div>`
    await ejs.renderFile('./views/wrapper.ejs', {
            content,
            createdAt: null,
            editedAt: new Date(),
            title: 'Blog Index',
            meta: new Map(),
        },
        undefined,
        (e, str) => {
            if (e) console.error(e.message);
            fs.writeFileSync('./blog/index.html', str);
        });
}
