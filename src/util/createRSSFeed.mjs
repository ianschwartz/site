import {toTitleCase} from "./createHTMLFile.mjs";
import fs from "fs";
import {JSDOM, rssTemplate} from "../../index.mjs";

export const createRSSFeed = async (entries) => {
    let base = '';
    const ents = entries.sort((a, b) => {
      return new Date(b.pubDate) - new Date(a.pubDate)
    })
    for (let entry of ents) {
        const {title, slug, description, pubDate} = entry

        const dom = new JSDOM(description);
        const body = dom.window.document.body;
        const removables = [
            ...body.querySelectorAll('style'),
            ...body.querySelectorAll('iframe'),
            ...body.querySelectorAll('br'),
            ...body.querySelectorAll('script'),
            body.querySelector('#meta'),
        ];
        removables.forEach(r => {
          if (r) r.remove()
        });

        body.querySelectorAll('img').forEach(img => {
          const node = dom.window.document.createTextNode(img.alt);
          img.parentNode.appendChild(node)
          img.remove()
        })
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
