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
          const node = dom.window.document.createTextNode(`Inline image: ${img.alt} (https://schwartz.world${img.src})`);
          img.parentNode.appendChild(node)
          img.remove()
        })
        body.querySelectorAll('video').forEach(vid => {
          const node = dom.window.document.createTextNode(`Inline video: ${vid.alt} (https://schwartz.world${vid.src})`);
          img.parentNode.appendChild(node)
          img.remove()
        })
        base += `
    <item>
        <title>${toTitleCase(title)}</title>
        <pubDate>${new Date(pubDate).toDateString()}</pubDate>
        <link>https://schwartz.world${slug}</link>
        <description>${toTitleCase(title)} posted on ${new Date(pubDate).toDateString()}</description>
        <content>${body.innerHTML}</content>
    </item>
    `
    }
    fs.writeFileSync('./blog/rss.xml', rssTemplate(base), (e) => {
        if (e) console.error(e);
        console.log("rss done")
    });
}
