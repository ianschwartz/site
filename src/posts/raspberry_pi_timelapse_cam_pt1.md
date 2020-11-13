<style>
    body {
      background: #480028;
      color: #fc54ff;
    }
    a {
      color: #df0064;
      font-weight: bolder;
    }
    code {
        color: #e8a7f8;
        background: #000;
    }
</style>
<div id="meta">
COMMENTS::https://api.github.com/repos/ianschwartz/site/issues/12/comments

TAGS::raspberry_pi,computer_photography,ffmpeg,nodejs,javascript,hacking,static_site,jamstack
</div>

I'm a front-end dev by trade, and while I am comfortable whipping up a server
in a few different frameworks, I really prefer to avoid exposing any of my server-side
code to the open internet. [For example, this site generates a build on my local
machine, then pushes it to Github.](https://schwartz.world/blog/static_site_generators/) The content is then served by Netlify with no need
to maintain a server. JAMStack, baby!

But how far can we take it?

I have this idea I've been mulling over for a while. I recently got the new
`Raspberry Pi High Quality camera`, and it's pretty nice. I'm using the cheapest lens
I could get, and the images are pretty good. Eventually, I'd love to invest in
a nicer lens, but <span id='experience'>experience has taught me to build first and then buy later.</span> I've
got a whole pile of Arduino and Pi boards to remind me, lest I forget.

The idea is to create a timelapse camera, which is a common enough use-case
for the Pi. The program I'm going to write is real Unix-y, because each piece is responsible
for so little. There are three components:

### Image Server

Most of the time when people use the Pi as a webcam / security cam, they configure it
to actively snap photos regularly and then push those photos to an external server or possibly
just stream them over the network. I've done the opposite, the Pi runs a simple Flask app.
When it receives a connection, it snaps a picture and returns the picture over HTTP where it
can be saved as a file or whatever.

I did it this way because I really don't want to have to write code on the Pi. I don't want
to SSH, I don't want to hook up a monitor. I just want to have a machine I can send an HTTP request
to and get a picture back and keep all the actual business code on my laptop or `server` (also a laptop).

### Image Client

The client is also very minimal. I'm using NodeJS at the moment, but it could just as easily
be any other language, even just a cron job that calls `curl` and pipes the output to a jpg.
The code is barely interesting enough to post (although I eventually will).

Right now the picture just uses the default settings, but eventually I would like
to configure settings so it takes longer exposures as the sun goes down. Maybe one endpoint
for daytime pics and one for nighttime, and the client can decide which kind of picture to take.

### Build Server

A third program on the client machine will make a call to `FFMPEG` at regular intervals to
stitch all the individual files into a video or gif, and then push the resulting file up
to Github. The idea is that you could go to the URL and see the current version of the timelapse,
which gets longer every time you visit the URL, as you keep loading the latest version.

### Proof of Concept

I'm not nearly ready to show the world the code, but I did whip up a quick video of the "sunrise"
as viewed from my office window. As this is a POC, I haven't done the following:

- focus the image
- take the screen off the window
- <a href='#experience'>gotten a better lens</a>

Without further ado:

<video controls width="250">
    <source src="/video/sunrise-2020-11-13.mp4"
            type="video/mp4">

    Sorry, your browser doesn't support embedded videos.
</video>

