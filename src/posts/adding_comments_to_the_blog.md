<style>
    body {
        background: darkkhaki;
        color: black;
    }
</style>

I've been thinking about comments a lot. This blog is built with my own static site generator, and adding live comments to a site with no backend is no easy task.

I narrowed my options down to these options:

- Users email their comments. A Node script checks the email once per day and adds the comments to a DB. I generate the HTML at build time.
- Build a separate app that sits in `the cloud` and receives comments posted from the browser. At build time, the static site generator pulls down any new comments and generates the HTML.
- Host comments on a third party service not necessarily meant for this purpose (Reddit, Lemmy, <del>Hacker News</del> <ins>The Orange Site</ins>).

I did a little searching and found a blog post on using GitHub issues as a backend for a comments system. The GitHub API allows you to request issue comments in JSON format, which makes them very easy to display.

It's all very crude at the moment, but it works. The markdown parsing is the weakest point right now. I figured half-baked comments are better than no comments. But I really need the markdown to be parsed identically to GitHub's.

### Update: 2020-26-10

I've updated the build tools for the blog to inlcude Pandoc and JSDom, which gives me the ability to manipulate the generated HTML. Previously, I was parsing the MD with JavaScript and having a heck of a time of it. That means that our links to `meta` data (like where comments are located), can be left in the HTML with `display: none;`. If you view the source of this page, you'll see it right there.

<div id="meta">
COMMENTS::https://api.github.com/repos/ianschwartz/site/issues/2/comments
</div>
