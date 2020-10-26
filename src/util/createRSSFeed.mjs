import {toTitleCase} from "./createHTMLFile.mjs";
import fs from "fs";
import {JSDOM, rssTemplate} from "../../index.mjs";

export const createRSSFeed = async (entries) => {
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
            body.querySelector('#meta'),
        ];
        removables.forEach(r => {
          if (r) r.remove()
        });
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
