During my week off in between jobs, I decided
to build a sudoku web app. I think I'm at a
solid place to say that the features are all pretty
much there, but the UX still needs a little
polish. I'm still researching ad networks, but
I'd love to have a few variants of this out in
the wild eventually with a banner ad on the page,
an idea I'm blatantly stealing from a thread on
the Orange Site.

One thing that makes my sudoku implementation
unique is that I'm tracking the entire game state
in the URL at all times. You can copy/paste the URL
and pick up your game exactly as you left it.
This is based on an idea I have been playing with at work,
and one that I'd like to see more devs use. 

### Global State in React

I am not a fan of having global state in React.
Most state doesn't need to be global, and in some
ways the pain of prop-drilling is a natural
deterrant. When you build React apps, if you stick
to what I consider to be the React paradigm
(state lives high in the tree, props get passed down,
events bubble up), you get some guarantees. If
the UI changes, you should be able to follow the 
tree upward until you find the state that changed
to trigger that UI change. Global state is anathema to this.

I think it comes from people who haven't internalized
the React Compositional Model. We used to build
websites where we would reach out and change things
directly with JavaScript, but you're not really
supposed to need to give orders like that in React.

If I was going to recommend something I don't
recommend, I would say that global state makes sense
if that state is:

- Mostly read-only
- Only able to be changed by one type of element

But before I reach for redux or mobx or
schwartx, I like to use the pre-existing global
state stores in the browser. Cookies are for global
state that lasts for a session or longer.
LocalStorage is for more persistant state. Most
important is the URL.

### The URL

The URL of a page (including any query string params),
is an interesting beast. On the one hand, it
is completely ephemeral. Many people don't even
think about them as they browse around and
unscrupulous browser vendors want to de-emphasize
the URL.

On the other hand, a URL can also be persistant.
Whatever URL the user has bookmarked or copy/pasted
is their entry point into the website. This can
be a powerful tool. How much information could you
actually encode in a URL?

Sudoku is an excellent starting point, as a sudoku
game can trivially be encoded as an 81 character
string. Digits 1-9 have obvious meaning, and a 
character can be chosen to represent an empty
space.

I decided to take it a step further, as players
need the ability to note the possible candidates
in each square. If you think of the candidates
as 9 boolean values (it could be 1, it could not be
2, etc), then they can be trivially represented
as a 9-digit binary number. To save a little space,
why not encode them as integers? "111111111" in 
binary is only 512 in decimal after all.

Play `schwudoku` online at
<a href="https://www.schwudoku.com">
schwudoku.com</a>
 and let me know what you think!