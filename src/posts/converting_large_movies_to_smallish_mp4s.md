<style>
    body {
      background: darkslategrey;
      color: darkturquoise;
    }
    a {
      color: paleturquoise;
      font-weight: bolder;
    }
    h1, h2, h3, h4, h5 {
        color: dodgerblue;
    }
    code {
        color: skyblue;
    }
</style>

Not much to this. I've set up a Plex server on a 2011ish MacBook air. This server is also responsible for hosting some homemade services on my local network.

Eventually I'd like to get it working with some sort of attached storage, but at the moment I'm using the MacBook's HD which is relatively meager once you start filling up the HD with movies. I don't need much though, since the main purpose is providing my kids with better educational content than is offered on Netlix / Prime / Hulu, as well as allowing us to eliminate our Disney+ subscription. The kids watch the same movies over and over again (he said as he cued up Olaf's Frozen Adventure for the 10,000th time).

Warning: It isn't a fast process, at least not on an old-ass MacBook. Doing a full season of a TV show takes forever since FFMPEG goes through line by line.

Warning: This appends `.mp4` to the filename, meaning `some-movie.mkv` becomes `some-movie.mkv.mp4`. I'm working on a bulk file renaming tool to run afterward to format the titles into the Plex naming scheme (`"MASH s01e09"`).

#### BASH
```
shrinkmov() {
    for movie in *;
    do;
        ffmpeg -i $movie -c:v libx264 -crf 18 "$movie.mp4" && rm $movie;
    done;
}
```

#### ZSH
```
shrinkmov() {
    for movie in $(ls);
    do;
        ffmpeg -i $movie -c:v libx264 -crf 18 "$movie.mp4" && rm $movie;
    done;
}
```

<div id="meta">
COMMENTS::https://api.github.com/repos/ianschwartz/site/issues/5/comments

TAGS::unixtools,tech
</div>

