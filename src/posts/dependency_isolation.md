<style>
    body {
      background: steelblue;
      color: lightgoldenrodyellow;
    }
    a {
      color: firebrick;
      font-weight: bolder;
    }
    h1, h2, h3, h4, h5 {
        color: darkgreen;
    }
</style>
<div id="meta">
TAGS::tech,javascript,refactoring,thoughts
COMMENTS::https://api.github.com/repos/ianschwartz/site/issues/18/comments
</div>

### Refactoring Driven Development

I'm a big believer in `code fast, refactor often`. You
learn more about the product you are trying to build by building it than you
do by thinking, and your best bet is to just get it built and then rebuild the
broken parts with the knowledge you've gained. This philosophy extends beyond
just development, as design and product priorities are likely to change as well.

When I first read an explanation of the term `refactoring`, I remember thinking that
it sounded insane. Coding seemed so hard. How could someone get code working and
then go back and rewrite it a different way? Why would you do the same work twice?
Turns out that refactoring is necessary and fun, so you should just stop worrying and
learn to love it. And the number one proven way to not hate refactors, is to code
defensively against them. Every line of code you write is either wrong, or eventually
going to be wrong. Scripting is different, we're talking about application development.
Code that needs to be supported long-term.

### An Experiment in RDD

I'm working on a NodeJS project right now (another static site generator, yes how did
you know?), and I'm trying something I've been toying with for a long time. Let me
explain the problem:

You build an app, and you need some date functionality, so you bring in `DateLib` (not a real library). Its
hardly a controversial decision, but it might be the right one for you. `DateLib` is great
and quickly it becomes woven into the fabric of your code. Every React component or
function with date needs imports `DateLib`. It's no big deal.

`<Foo>{DateLib(bar).format("dddd, MMMM Do YYYY, h:mm:ss a")}</Foo>`

Some problems I can foresee:

- Multiple devs not being aligned on date handling: Are your date formats consistent across
your app?

- Eventually `DateLib` is likely to require an upgrade, or perhaps it may not always meet
your needs and you will feel trapped.

- Feature development requires searching through the codebase for patterns to copy.

What if you only called each dependency in one file in your entire app. One dependency per
file, one file per dependency. I believe this would encourage code that is easier to refactor
and build upon. In a new file create some sort of container (object, class, closure, doesn't matter),
and re-export the functionality you actually need in your app. When the time comes to refactor,
there will be a clear path. One file with changes to make. Even if that file has 40 methods,
they are all in one clear place and not scattered throughout the codebase.

More than that, this pattern encourages better abstractions. Code that is important to
your app shouldn't be reimplemented everywhere. I'm not talking about functions like
`const getFirstLetter = (str) => str[0];`. I couldn't care less about that stuff becuase
your method for getting the first letter is never going to need rethinking.

When you call `DateLib().format('MM-DD-YYYY)`, what are you actually trying to do? There
probably is a semantic meaning to that date, which you are failing to express, and because
you are failing to express it, you're never going to reuse it even if you wrap it in a cute
reusable function. Crafting meaningful abstractions is a present to future you.

### Make Abstractions Introspectable

So, to beat our example to death here, it's likely that you only need a handful of date
formats for a single app. What are you doing that you have 40 different date formats? It
increases the cognitive load for using your software, and exponentially increases the cognitive load
for developing it. Loading all interactions with `DateLib` into a single container with methods
on it, means that devs can introspect that container, logging it to the console or a debugger
and poking at the different methods. This is much simpler than having to go through the `DateLib`
docs all the time.

### Make Abstractions Reusable Across Projects

If you find yourself actually creating reusable abstractions, you may find that you are able
to pull those out and use them across projects, even if it's by copy-pasting a single file.
How can you reuse 10,000 disparate calls to `DateLib().format()`?

### Make Abstractions Testable

Tests aren't just `is this code doing what its supposed to`. I mean they are, obviously, but
for me there is a contract between the name of a method and what it's supposed to be doing. Tests
confirm this contract is being held up. Using this method, I can ensure that 100% of my
date-formatting functionality is covered in a single test file. Testing this way is actually
fun.

Anyway, I'm trying it now, but I'm not ready to open source the code just yet. Curious about other people's
thoughts.

<3

schwartz
