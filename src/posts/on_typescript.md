I don't like it.

### My experience

I work on a large and tangled React codebase. We have two linter rules related to `any` types:

  - no implicit any
  - no explicit any

The end result is that every function, component has to have a type declaration.

### I don't like writing code just to suit the compiler

<div id="description">
There are two types of people who write TypeScript. For those who come from statically typed languages, Typescript is a way of writing JavaScript without some of the pains of JavaScript. These reluctant JS devs are forced into it because browsers don't speak Java anymore. You can't build a front end in C#.

Then there is me. I started as a JS dev. It's my *lingua materna*. I learned in a web browser console and built websites the old fashioned way without compilers or tooling or anything like that. Just Sublime Text, `python -m SimpleHTTPServer` and a browser window. Later I moved on to React and through my exposure to React I got comfortable in NodeJS.
</div>
For me and, I assume, others like me, there is a particular frustration wherein I write perfectly usable code that will work fine in the environment it is destined for, but the compiler won't accept it. Alternatively, I struggle to come up with flexible typing when needed. The only way to make this stuff work is to write pointless code to appease the tyrannical robot <del>overlord</del><ins>I mean protector</ins> that is the typescript compiler.

### Large codebases may have too many similar types

This is self explanatory, but similar types leave you with three options: write glue code to toggle the types back and forth (bad), add more similar types / duplicated code to avoid the similar types or refactor which could be easier said than done in a large codebase.

### Typescript is best used with OOP

Typescript seems to work best when you type your data, not your functions. The language has a lot of little things that work really well with classes. For example, if you are trying to manually check a type, you can use `instanceof`if the type is an instance of a class. If it's just an object with an interface though, you lose that capability.

Unfortunately, classes are not en vogue in the React community. React pushes a functional model which is great, but the result is that everybody I work with things of typing in terms of input but not output.

React developers often delegate too much responsibility to React. All of their code lives in the body of components, maybe with some hooks and helper functions scattered around. React works best, in my opinion, when most of the work lives outside of React. Instead of continually adding props to components, I want to build a thing and send it tumbling down the React tree with all the information needed to work on it included. Classes are a solid abstraction in JS, and you can make them pure functions just fine.

So the point of this is, the React community largely follows a paradigm that doesn't really work well with TypeScript. It could, but it doesn't. Admittedly I can write the code the way I want, but the whole reason for a language like TS is to make it easier to work with other people's code.

### Typing feels like an afterthought

Unlike Elm, where the types are really a first class feature of the language, types in TypeScript feel like they are stapled on, and for me that translates into the code I write. The simplest route to productivity seems to be writing the code first, then fighting with the type system for half a day to appease it. Is there a better way?

### In Summation

Someday I'd like to try a project with TypeScript my way, and I think I might like that. I'd prefer to use the types conservatively, leaving most code *un*typed except the most important bits. I probably won't do that unless Deno becomes mainstream enough to seriously contend with Node.

<div id="meta">
COMMENTS::https://api.github.com/repos/ianschwartz/site/issues/1/comments
</div>
