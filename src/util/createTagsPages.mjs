import {EJS} from "../EJS.mjs";
import {FS} from "./FS.mjs";

export const createTagsPages = async (entries) => {
    const entriesMap = sortEntriesToMap(entries);
    [...entriesMap].forEach(tag => {
      createPage(tag);
    })
}
const sortEntriesToMap = (entries) => {
    const map = new Map()
    entries.forEach(({title, slug, pubDate, meta}) => {
        const TAGS = meta.get('TAGS') || ''
        const tags = TAGS.split(',');
        tags.forEach(tag => {
            if (tag) {
                if (!map.get(tag)) map.set(tag, [])
                map.get(tag).push({title, slug, pubDate})
            }
        })
    })
    return map;
}

const createPage = async ([tag, pages]) => {
  const links = pages.map(page => {
    return `<li>
    <a href="${page.slug}">${page.title} - ${page.pubDate.toDateString()}</a>
</li>`
  }).join('')
 const str = await EJS.renderFile('./views/tags.ejs', {
    title: tag,
    links,
  });
  await FS.mkdir(`./blog/tags/${tag}/index.html`);
  await FS.writeFile(`./blog/tags/${tag}/index.html`, str);
}
