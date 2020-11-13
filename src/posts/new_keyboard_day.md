<style>
    body {
        background: #3a1700;
        color: #f8943b;
    }
    a {
      color: #ff5900;
    }
    a:visited {
      color: #ff4000;
    }
</style>

It's new keyboard day in the `schwartz` household. I've been a mechanical
keyboard user for the last 2.5 years, pretty much since I stopped cosplaying
as a software dev and actually became one. At my last job I somehow wound
up with a friend's [Code keyboard](https://codekeyboards.com/) when he left.

### Tweaking the Setup

I use this phrase a lot, because I do it a lot. One vertical monitor and a laptop;
two horizontal monitors, laptop closed; one vertical, one horizontal _and_ laptop
screen. The only part of my workstation that is non-negotiable is the
[Kensington Expert Trackball](https://www.kensington.com/en-ca/p/products/control/trackballs/expert-mouse-optical-trackball/).
Everything else is fair game. There is no ideal arrangement, the act of fiddling is
its own reward. I never did this before I was a professional werb derv. In fact,
I learned to code on a sub-$200 Chromebook with no external peripherals.

### My Old Keyboard

For the last year, I've been using an [Asceny One](https://asceny.com/) 60% keyboard
with Gateron Blue switches. There are only two things I don't like about it:

 - `fn` button required to use arrow keys
 - `fn` button required for backticks

I've tried remapping keys, but without QMK support, it's a challenge, especially on
macos. Maybe if I was a Real Programmer™, but I'm just a werb derv, and I couldn't
do it. Too bad really, because the lighting (which is programmable) is amazing. I may
return to this keyboard after my journey into ortholinear-land.

### My New Keyboard

When trying to find a larger, small keyboard (70-75%) you inevitably find
that most of the options require soldering. That sent me down this keyboard
rabbit-hole, the culmination of which was the purchase of the following monstrosity:


This is the ID75 (aka Idobo). Gateron Green switches, frankenkeys for now until
I decide on a working layout. Remapping is a cinch with [QMK Configurator](https://config.qmk.fm/)
and [QMK Toolbox](https://github.com/qmk/qmk_toolbox). A big part of my decision to buy
it was the lack of soldering invovled in the assembly.

So here I am after half a day of working on the damn thing, and I can't decide if I
see the potential and love it or if I'm unnecessarily complicating my life for no reason.
Sure, I love endlessly tweaking my setup, but my typing just went from 80wpm to like 20wpm.

I think the real power in this keyboard lies in frequently tweaking the mapping.
I keep overshooting the `backspace` key, but I can remap it to go in the place I expect
it to, instead of forcing my body to retrain.

I think I may separate out the letters into two halves with the arrow/fn keys in the middle. There's a lot
more keys than I'm used to, and I'd like to program in some macros for when I'm writing
code. I wonder if I can hit a key and have it input `const x = () => {};`. I know I can
do it with Hammerspoon but having it built into the keyboard would mean the behavior
would exist when I work on a Raspberry Pi or my laptop-repurposed-as-a-server. There is
absolutely a chance I will use the ID75 for a few months and decide to go
back to a regular staggered keyboard.

<div id="meta">
COMMENTS::https://api.github.com/repos/ianschwartz/site/issues/10/comments

TAGS::tech,hacking,keyboard,computing,home_office
</div>
