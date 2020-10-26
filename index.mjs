import fs from 'fs';
import jsdom from 'jsdom';
import ejs from 'ejs';
import path from 'path';
import {buildIndex, FS} from "./src/buildIndex.mjs";
import showdown from 'showdown';
import nodePandoc from 'node-pandoc';
const {JSDOM} = jsdom;
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
  const { createdAt, editedAt, pathToFile, fileName, htmlFileName } = f;
  const pandocPathArr = htmlFileName.split('/')
  const _ = pandocPathArr.pop();
  const pandocPath = pandocPathArr.join('/');


    const result = await Pandoc(pathToFile)
    const meta = new Map()

    if (!fs.existsSync(pandocPath)){
      fs.mkdirSync(pandocPath, {recursive: true}, err => console.error(err.message));
    }

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
    return { title, pubDate: createdAt, description: result, slug: htmlFileName.slice(1) }
  ;
}

export const EJS = {
  renderFile: (path, options) => {
    return new Promise((resolve, reject) => {
      ejs.renderFile(path, options,
        undefined,
        async (e, str) => {
          if (e) console.error(e.message);
          return resolve(str)
        });
    })
  }
}

export const Pandoc = (pathToFile, options = []) => {
  return new Promise((resolve, reject) => {
    nodePandoc(pathToFile, [], async (err, result) => {
      if (err) reject(err.message);
      return resolve(result)
    })
  })
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

const createRSSFeed = async (entries) => {
  let base = '';
  for (let entry of entries) {
    const {title, slug, description, pubDate} = entry

    const dom = new JSDOM(description);
    const body = dom.window.document.body;
    const removables = [
      ...body.querySelectorAll('style'),
      ...body.querySelectorAll('iframe'),
      ...body.querySelectorAll('br'),
      ...body.querySelectorAll('script'),
    ];
    removables.forEach(r => r.remove());
    base += `
    <item>
        <title>${toTitleCase(title)}</title>
        <pubDate>${new Date(pubDate).toDateString()}</pubDate>
        <link>https://schwartz.world${slug}</link>
        <description>${body.innerHTML}</description>
    </item>
    `
  }
  fs.writeFileSync('./blog/rss.xml', rssTemplate(base), (e) => {
    if (e) console.error(e);
    console.log("rss donerss donerss donerss donerss donerss donerss donerss donerss donerss done")
  });
}
const RSSEntries = [];
const main = async () => {
  const files = await buildIndex()
  for (let f of files) {
    ensureDirectoryExistence(f.htmlFileName)
    const entry = await createHTMLFile(f);
    RSSEntries.push(entry);
  }
  await createBlogIndex(files)
  await createRSSFeed(RSSEntries)
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
