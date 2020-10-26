<div id="meta">
COMMENTS::https://api.github.com/repos/ianschwartz/site/issues/4/comments
</div>
<style>
    body {
        background: #102118;
        color: #82c58b;
    }
    a {
        color: #00db31;
    }
</style>
## The Hardest and Easiest Part of ReactJS

In the last year, I switched from a small shop where I was _the_ front-end guy to a bigger one where there are dozens of us. Dozens of us! I've gotten a lot better at reading other people's code as a result, especially React code. React is great in that it has a small, unopinionated API, but that same freedom is also its biggest weakness.

Think about all the varying opinions on React. I'm here to tell you that they are all absolutely right. React is great and React is garbage and it all depends on this one factor, this problem that I keep seeing solved in various wrong ways.

See, there's one rule when it comes to React. Only one. Data flows from the top of the app downward. Pour the champagne into the glass at the top of the pyramid and watch it trickle down. That's your data. The champagne. A lot of the code I see answers this question:

*"How do I propogate state changes from lower in the tree back up to the top?"*

You don't. Don't do it. Data from state goes down, not up.

*"Ok, sure, but I have this state down here and when it changes, I need this other thing higher in the tree to change in response"*

Your state is in the wrong place.

*"OK, but this component is fetching user data, which is used all over the app so I'll--"*

No.

*"So how do I do it then?"*

Writing really good React is easy if you understand two core concepts:

- closures
- async programming

See, it's not that you can't send data back up the tree, but that it has to be in response to something explicitly happening. The idiomatic way to do it is to pass down a closure which is then called in response to a user action, or as a callback to some asyncronous event.

<iframe width="560" height="315" src="https://www.youtube.com/embed/eIrqyjlX_OU?start=57" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### A bad example (if a bit contrived):

<pre><code>const Parent = () => {
    const [id, setId] = useState();
    return &lt;Child id={id} setId={setData} />
}

const Child = ({ id, setId }) => {
    const [fetchedId, setFetchedId] = useState();

    if (!id) {
        someAPIFunction().then((user) => setFetchedData(user.id));
    }

    if (id !== fetchedId) setId(fetchedId);

    return .......
}</code></pre>

*"Why is this bad?"*

First of all, the two pieces of state are redundant. They can never not equal the same thing so why have it twice?

*"Dude, you wrote this strawman code."*

This time, sure, but I've code reviewed it plenty of times.

*"Sigh. Fine, continue "*

Here's an even worse implementation using `React.useEffect`.

<pre><code>const Child = ({ id, setId }) => {
    const [fetchedId, setFetchedId] = useState();

    if (!id) {
        someAPIFunction().then((user) => setFetchedData(user.id));
    }

    useEffect(() => setId(fetchedId), [setId, fetchedId]);

    return .......
}</code></pre>

*"Aw, jeez, Schwartz. Nobody would write that"*.

It's done all the time, [including in documentation for popular libraries](https://formik.org/docs/examples/dependent-fields). And the point is that, yes it works, but no, that way madness lies. In a large React app, this kind of behavior will shoot you in the foot so flipping fast, because you won't know where changes are coming from.

In my <del>expert</del> <ins>humble</ins> opinion, the right way is to have all your data fetching at the top of the app, so you never have to send data back up the tree.

*"But I want the query to happen when `Child` renders, not before."*

Fair, but I would still setup the query high in the tree, and pass the closure down to get called when `Child` renders.

<pre><code>const Parent = () => {
    const [id, setId] = useState();
    const [loading, setLoading] = useState(false);

    const fetchData = () {
        setLoading(true);
        someAPIFunction()
          .then((user) => setFetchedData(user.id))
          .finally(() => setLoading(false);
    };

    return &lt;Child id={id} onLoad={fetchData} loading={loading} />
}

const Child = ({ id, onLoad, loading }) => {
    if (!id && !loading) {
      onLoad();
    }
    return .......
}</code></pre>

The difference is that we are executing the query high in the tree and storing the state high in the tree. The child component can still be in charge of calling the function.

This also makes testing much easier, as testing `Child` doesn't require mocking the API response at all. You can just check that it calls its `onLoad` method when it first loads. You could further abstract the loading and data fetching behavior behind a custom hook that can also be tested in isolation.

*"Seems so easy, but this example is so simple and contrived"*

It's supposed to be simple. It only gets hard if you forget to refactor as you go. Where to put your state and effects is the fundamental question of React programming. Building out a React app will require you to make assumptions about where state belongs and then [revisit those assumptions constantly](https://reactjs.org/docs/lifting-state-up.html). The first time you ask yourself, how do I propogate this change back up the tree reactively, that's the exact moment you should be questioning where things are located in your app, because data shouldn't move up, but down. Go with the flow.
