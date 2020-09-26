import fs from 'fs';
import ejs from 'ejs';
import path from 'path';
import {buildIndex, FS} from "./src/buildIndex.mjs";
import showdown from 'showdown';

const converter = new showdown.Converter()

function parseMd(content) {
  return converter.makeHtml(content);
}

const createHTMLFile = async (f) => {
  const { createdAt, editedAt, pathToFile, fileName } = f;
  const content = await FS.readFile(pathToFile);
  const wasEdited = Math.abs(createdAt.valueOf() - editedAt.valueOf()) > 2015478
  await ejs.renderFile('./views/wrapper.ejs', {
      content: parseMd(content),
      createdAt,
      editedAt: wasEdited ? editedAt : null,
      title: toTitleCase(fileName)
    },
    undefined,
    (e, str) => {
      if (e) console.error(e.message);
      fs.writeFileSync(f.htmlFileName, str);
    });
}

const createBlogIndex = async (files) => {
  const links = files.sort((a, b) => {
    return b.editedAt.valueOf() - a.editedAt.valueOf();
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
      title: 'Blog Index'
    },
    undefined,
    (e, str) => {
      if (e) console.error(e.message);
      fs.writeFileSync('./blog/index.html', str);
    });
}

const main = async () => {
  const files = await buildIndex()
  for (let f of files) {
    ensureDirectoryExistence(f.htmlFileName)
    await createHTMLFile(f)
  }
  createBlogIndex(files)
}
main().then(() => console.log('done'));

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

function toTitleCase(string = '') {
  let sentence = string.toLowerCase().split("_");
  for (let i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }

  return sentence.join(" ");}
