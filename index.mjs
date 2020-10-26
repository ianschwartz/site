import jsdom from 'jsdom';
import {buildIndex} from "./src/buildIndex.mjs";
import {createHTMLFile} from "./src/util/createHTMLFile.mjs";
import {createBlogIndex} from "./src/util/createBlogIndex.mjs";
import {createRSSFeed} from "./src/util/createRSSFeed";

export const {JSDOM} = jsdom;


export const rssTemplate = (items) => `<?xml version="1.0"?>
<rss version="2.0">
  <channel>
    <title>schwartz.world blog</title>
    <link>https://schwartz.world/blog/</link>
    <description>JS Developer, Dad, Slacker</description>
    ${items}
  </channel>
</rss>`

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

