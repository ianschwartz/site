import fs from 'fs';
import ejs from 'ejs';
import path from 'path';
import {buildIndex, FS} from "./src/buildIndex.mjs";
import showdown from 'showdown';

const converter = new showdown.Converter()

function parseMd(content) {
  return converter.makeHtml(content);
}

const parseContent = (str = '') => {
  const realContent = [];
  const meta = new Map();
  for (let row of str.split('\n')) {
    if (row.substring(0, 2) === '!@') {
      const m = row.split('::');
      meta.set(m[0].slice(2), m[1]);
    } else {
      realContent.push(row)
    }
  }
  return {content: realContent.join('\n'), meta}
}

const createHTMLFile = async (f) => {
  const { createdAt, editedAt, pathToFile, fileName } = f;
  const raw = await FS.readFile(pathToFile);
  const { content, meta } = parseContent(raw)
  const wasEdited = Math.abs(createdAt.valueOf() - editedAt.valueOf()) > 2015478
  await ejs.renderFile('./views/wrapper.ejs', {
      content: parseMd(content),
      createdAt,
      editedAt: wasEdited ? editedAt : null,
      title: toTitleCase(fileName),
      meta
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
      title: 'Blog Index',
      meta: new Map(),
    },
    undefined,
    (e, str) => {
      if (e) console.error(e.message);
      fs.writeFileSync('./blog/index.html', str);
    });
}

const rssTemplate = (items) => `<?xml version="1.0"?>
<rss version="2.0">
  <channel>
    <title>schwartz.world blog</title>
    <link>https://schwartz.world/blog/</link>
    <description>JS Developer, Dad, Slacker</description>
    ${items}
  </channel>
</rss>`

const createRSSFeed = async (files) => {
  let base = '';
  for (let file of files) {
    const slug = file.htmlFileName.slice(1)
    const raw = await FS.readFile(file.pathToFile);
    const { content } = parseContent(raw)
    const body = parseMd(content).replace(/^<iframe.*$/m, '');
    base += `
    <item>
        <title>${toTitleCase(file.fileName)}</title>
        <pubDate>${file.createdAt}</pubDate>
        <link>https://schwartz.world${slug}</link>
        <description>${body}</description>
    </item>
    `
  }
  fs.writeFileSync('./blog/rss.xml', rssTemplate(base), (e) => {
    if (e) console.error(e);
    console.log("rss done")
  });
}

const main = async () => {
  const files = await buildIndex()
  for (let f of files) {
    ensureDirectoryExistence(f.htmlFileName)
    await createHTMLFile(f)
  }
  await createBlogIndex(files)
  await createRSSFeed(files)
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
