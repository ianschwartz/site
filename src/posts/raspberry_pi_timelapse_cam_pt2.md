<style>
    body {
      background: #004823;
      color: #d2ffd7;
    }
    a {
      color: #86df00;
      font-weight: bolder;
    }
    code {
        color: #153e1f;
        background: #cefcd3;
    }
</style>
<div id="meta">
COMMENTS::https://api.github.com/repos/ianschwartz/site/issues/12/comments

TAGS::raspberry_pi,computer_photography,ffmpeg,nodejs,javascript,hacking,static_site,jamstack
</div>

I've been trying to improve the quality of the timelapse videos I'm taking with the Pi. I'll be
honest, I don't know much about photography, but I went through and tried each of the [sensor modes](https://picamera.readthedocs.io/en/release-1.13/fov.html#sensor-modes)
one by one. Mode #1 seems to be the best so far, although I think I'll inevitably have to learn to use
the settings (shutter speed, ISO, etc) manually.

The images come back decently sharp, but far from what
you'd expect from a product called the "High Quality Camera". In fairness, I'm using the cheapest
lens I could get, so I don't know what to expect. Eventually I'd like the camera to take
either ambient light level (with a sensor) or the time of sunset (from an API) into account
and do longer exposures when it's dark out.

The next step is actually going to try the same process using a Pi Zero W with the 5MP camera
module and see how those pictures come out in comparison. I'd like to use the cheaper hardware
for the eventual permanent camera setup. With winter coming, I'd love to have a timelapse pointed
at the backyard full-time. I'm probably going to use the crappier camera for this so I can save the
HQ one for other experiments.

Anyway, without further ado, here's the latest timelapse.

### Ice

<video controls width="250">
    <source src="/video/ice.mp4"
            type="video/mp4">

    Sorry, your browser doesn't support embedded videos.
</video>
