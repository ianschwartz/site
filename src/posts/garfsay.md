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
COMMENTS::https://api.github.com/repos/ianschwartz/site/issues/16/comments

TAGS::software,computing,rust,hacking,unixtools
</div>

So here I am, a week or so into being a Rustacean™. To experiment, I whipped up a little program that takes a string and then reprints it to the console with an ascii drawing of a popular cartoon cat. Basically `cowsay` but less `moo moo` and more `meow meow`.

It might seem like a silly project, but I think it was a better first project than a number guessing game or a to-do list. You can say what you want about JavaScript, but there is a lot less mental overhead required for this kind of thing in a scripting language.

I was all set to walk away when a friend submitted a PR to allow the use of `args`. My original implementation only supported piping, but now `garfsay` is a full-on `cowsay` clone. Then, I thought, why keep the fun for myself, and I bundled that bad boy up and pushed it to `crates.io` where it awaits installation by anyone who has a use for a program with no use.

If you have Rust installed on your machine, feel free to `cargo install garfsay`, or otherwise [stay tuned here](/garfsay) and eventually I'll post a binary. 

Anyway, feel free to check the project out at it's new home