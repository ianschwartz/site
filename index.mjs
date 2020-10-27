import jsdom from 'jsdom';
import {buildIndex} from "./src/buildIndex.mjs";
import {createHTMLFile} from "./src/util/createHTMLFile.mjs";
import {createBlogIndex} from "./src/util/createBlogIndex.mjs";
import {createRSSFeed} from "./src/util/createRSSFeed.mjs";

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
 try {
   const files = await buildIndex()
   for (let f of files) {
     await createHTMLFile(f).then(entry => {
       RSSEntries.push(entry)
     });
   }
   await createBlogIndex(files)
   return await createRSSFeed(RSSEntries)
 } catch (e) {
   console.error('main', e)
 }
}
main().then(() => console.log('done'));

