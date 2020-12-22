<style>
    body {
      background: #ebebeb;
      color: #690606;
    }
    a {
      color: #ad0505;
      font-weight: bolder;
    }
</style>
<div id="meta">
COMMENTS::https://api.github.com/repos/ianschwartz/site/issues/15/comments

TAGS::software,computing,building_the_blog,rust,hacking,unixtools
</div>

## Whoops

If you're looking at my RSS feed, you're probably wondering why all my past posts are showing up as today's date. That's because I moved development of the blog off my work machine and onto my Dell XPS 15 running Ubuntu. I'm trying to learn more about Unix and systems programming, and I cloned the repo onto this machine to write this post. No problem.

Well, slight problem, as the blog posts here use file metadata to store their `created_at` and `edited_at` information. New machine, all new files. It's a major flaw in the system, and one I'll have to rectify. For now, dear reader, ignore the other blog posts. This is the only new one. Or read the old ones. That's also a choice.

The question is, do I change the entire system, or add a step to the first build to set the proper dates? This is the fun part of RYO software, I think.

## Systems Programming

That's right, kiddos. I've been called a hipster before, and what the hell, I ride a fixie and enjoy a cortado as much as the next guy. I'm jumping on the Rust bandwagon.

I've been writing React professionally for close to three years now and I'm just so bored of it. The browser is still a great platform to develop for, possibly the most truely portable software you can write at this point, but I can't bring myself to write ReactJS outside of work hours anymore. I used to feel really good when I figured out how to use a new NPM module or browser API, but I think I'm getting good enough at JS to where these things aren't so cryptic anymore. I'm not trying to brag, because I know I still have a lot to learn, but I recognize that I've hit a plateau.

Rust feels like the right choice for me. A lot the syntax is similar enough to JavaScript and Lua that I can read other people's code, but there are also a ton of new concepts to internalize. Functional-ish JavaScript actually feels like great training for the Rust ownership model. And the type system feels much more intuitive to me than the sad, misguided blurp that is TypeScript.

I've written a simple cowsay clone, and my next project is going to be [porting my MineSweeper clone](https://letter-press.netlify.app/scooper/) to the terminal using [Termion](https://github.com/redox-os/termion). It would be fun to try porting someone else's software too. I bet I could figure out how to implement `gorilla.bas` in Rust. Hmmm.... Does this bring me one step closer to my goal of writing children's software?

The other big reason for learning Rust is that I've been using Unix tools a lot more lately. Most of the node scripts I write call shell commands and then just grab the output. For example, I've been trying to figure out how to take a screenshot from a USB webcam in Node. Node doesn't have a built-in API, so the easiest method is to spin up a browser instance, access the webcam through the DOM, take a pic then return the data. OK, great, but what if I want to do the same thing in a Python app? Every computer I own comes with ffmpeg pre-installed, so it makes a lot more sense to figure out the FFMPEG command one time, save it somewhere (or better yet alias it), and then just call it from any script that needs to take a screenshot.

So here I am writing little one-off scripts and tools for myself in Node and Python, but I don't really know what I'm doing. As I get more into Unix tools, I need to learn more about the system. It's time to learn a low-level language, and for some reason I'm just less scared of Rust than I am C.

Lastly, there are no jobs in Rust really. A few, but not many. I know what it's like to start learning a language years before you anticipate having a job writing it, and I think Rust is a good investment in the long term. I could use it to write internal tooling to support developers, or create NPM modules that call Rust code to access low-level APIs. I don't know. Whatever.

Anyway, I'm enjoying it, and these little forays into other languages always make me a stronger JS dev, so even if I don't become a master Rustacean, it's still time well spent.