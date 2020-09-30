<style>
    body {
        background: pink;
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

!@COMMENTS::https://api.github.com/repos/ianschwartz/site/issues/2/comments