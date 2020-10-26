<style>
    body {
      background: indigo;
      color: lightseagreen;
    }
    a {
      color: lightyellow;
    }
</style>
## Static Site Generators

Some people knit. Some bake. Me? I build static site generators. This site is one of them.

My introduction to static site generators was the incredible [Gatsby JS](
www.gatsbyjs.com), and this site was built with Gatsby originally. Gatsby is an amazing product, but I don't want to write React in my off-time.

Even worse, I couldn't make Gatsby work with Leaflet. At the time, I was very interested in JavaScript maps, and there was a quirk where Leaflet would bind itself to the `window` object before it was instatiated. This may have been fixed since then.

### DIY is Better

At the end of the day, a static site generator doesn't need much. You need a way to load and parse some files and then pass that content to an HTML template. It doesn't need to be particularly performant or secure since it only ever runs on my machine at home. Static files get generated and then pushed up to Netlify.

### Planned Features

#### Comments

I really want to figure out a way to have comments, which seems difficult on a static html site. Possibilities (in reverse order of preference):

- Comments post to node server and are fetched regularly and built into the static blog
- Comments post to AWS Lambda and ???
- [FormSpree](https://formspree.io/) form to comment
- Email to comment

#### Tags

I really like the idea of a dynamic tagging system. At build time, I'd like to link the tags to allow links to relevant posts. Tags are better than categories as they allow for discoverability and browsing. I can't say there will ever be enough posts here to justify a system like this, but that's not why I'm doing this. I like building the blog more than I like posting to it. Deeply ironic.

[This blog](https://www.jwz.org/blog/) has a fantastic system whereby every post has a list of `previously` links at the bottom. I'd like my tags to function similarly, allowing an organic link from page to page. Damned if I know how I'm going to implement it, but I have ideas.

#### Maps

There will be maps. Oh yes. There will be maps.

#### RSS

I'd like to generate an RSS feed as well. It's only considerate.

### What will you write about?

Maybe lots of things. Maybe nothing. Maybe I'll tear the whole thing down next month and try again.

<div id="meta">
COMMENTS::https://api.github.com/repos/ianschwartz/site/issues/1/comments
</div>
