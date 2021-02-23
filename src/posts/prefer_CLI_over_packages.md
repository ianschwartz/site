Anybody who knows me and talks tech with me will know that I prefer not to write ReactJS code outside of work.
This isn't because I don't like React. On the contrary, I really like it. Part of how I'm able to stay so productive
at work, despite the challenges of children, sleep debt and general Covid-era stress, is that I'm really used to React. I
have internalized enough of the paradigms to where I don't really worry about _whether_ I'll be able to build something,
but I can actually enjoy picking the paradigm that suits my <del>mood</del> <ins>use case</ins>. 

I don't write React outside of work because I've gotten too opinionated about it. The _way_ I write React isn't compatible
with the quick, hacky programs I like to put together in my free time. I seek novelty in my hobby programming to make up for
the repetitive nature of professional development. So I switch it up.

The thing about switching it up, is that every ecosystem is different, and it can be really tiring having to learn new ways of
doing _everything_. Take databases as an example. I use `sqlite3` on most projects because it's simple, and the single file database 
format is really easy to backup (just include it in version control or even email the file to yourself). I don't know if I'd use this strategy for everything, but it works for most things. I'd like to emphasize that this is probably a terrible idea for enterprise
code.

`node` is the backend I use when I care about speed of development. I write JS every day (well, TypeScript), so I can get from
idea to viable program pretty quickly. So, what are my options here for interacting with an `sqlite3` database in `nodeJS`? There
are a few NPM packages available that present a JS wrapper around the `sqlite3` API, each with different API decisions. One uses 
callbacks, another `async/await`, another wraps the callback-based one with promises. Am I going to take the time to audit those
dependencies? Can I even get them to install?

More importantly, does it actually simplify anything to access `sqlite3` using one of these dependencies? Does it make it easier for me? Do I need everything these packages provide?

Instead, my strategy for `sqlite3` has been to use [child_process.exec](https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback) to make DB calls to the command line. 

### Portability of Code

I don't always write `node`. I sometimes like Rust and Ruby and Python and Lua and zsh. The first problem with using a package as
described above is that I may not even have access to packages to support my use case. Lua packages are a mess. Rust crates are easy
to install, but many are immature. Besides all that, each package requires learning its unique API in a language you may or may not
be confident in writing. Sure, I can grok well-written JS docs or even dive into source code, but I don't know if I can do that in a
language I only dabble in. By relying on `sqlite3` directly, I remove the mental overhead of this one thing. Learn it once, use it everywhere.
You probably don't even have to install it on your machine, because it is used everywhere!

### Unchanging API

It is extremely unlikely that the `sqlite3` command line tools will change much in their usage. The same cannot often be said for 
language-level packages.

### Crafting Abstractions is the Fun Part

You could just write simple functions that make SQL queries, but it's more fun to come up with your own API. `sqlite3` can be
extended to output JSON, meaning you probably don't need much glue to make it work in almost any programming environment, so
you might as well create something that you can take with you from project to project.

### You Should Be Using An ORM!

Should I though? It's useful for projects of a certain size, but simple relationships are easy to model in SQL, and with an ORM
you have a whole new abstraction layer to learn. I never really grokked the Django ORM when I had to work with it. ActiveRecord is
amazing but probably overkill for your `todo` app.