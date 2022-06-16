---
title: About
layout: base.njk
description: "Bookworm stats is a project that shows the ratings of books discussed in the Bookworm podcast. Learn more about the project on this site."
---
<div class="about-page">
<div class="about-text">

# About
## <i class="fa-solid fa-microphone-lines"></i> The podcast
[Bookworm](https://bookworm.fm/) is an excellent podcast that is dedicated to "doing more than just reading books". It is hosted by [Joe Buhlig](https://twitter.com/joebuhlig) and [Mike Schmitz](https://twitter.com/_MikeSchmitz). Every two weeks Mike and Joe discuss a new book, its takeaways and action items.
<br><br>
The first episode was released on July 7, 2016. So far, an impressive {{ bwFeed.episodes | length}} episodes have been released. You can subscribe to the podcast on the [Bookworm website](https://bookworm.fm).

## <i class="fa-regular fa-file-code"></i> The project
Hi! I'm Joschua. Loving to read, I am a big fan of the Bookworm podcast. It's a fantastic way to go deeper on read books and to explore new ones.
<br><br>
However, when looking for book recommendations, I don't have the time to listen through all episodes of the podcast. So I set about creating a website that lists all ratings to scan to inform my next read. I hope it is helpful to you too!
<br><br>
This is the first website that I've written! It is built with [Eleventy](https://www.11ty.dev/), a static site generator. If you want to learn more about it, you can find some notes and links on my [digital garden](https://joschuasgarden.com/00+Meta/04+Tools/Eleventy). The source code is available on [Github](https://github.com/selfire1/bookworm-stats). Feel free to raise an [issue](https://github.com/selfire1/bookworm-stats/issues) if you notive anything out of order.
<br><br>
I stole the colours from Tobias Van Schneider's [curated color palletes](https://access.mymind.com/colors). It's number 87, "In the vines", in case you were wondering. The beautiful CSS shadow were generated using [SmoothShadows](https://shadows.brumm.af/). The icons are from [Font Awesome](https://fontawesome.com/). The site is hosted on [Cloudflare Pages](https://pages.cloudflare.com/). Anytime there is a new item in the Bookworm feed, [IFTTT](https://ifttt.com/) triggers a deployment hook to Cloudflare to build the site.
<br><br>
If you want to follow along on what I am creating, feel free to connect on [Twitter](https://twitter.com/selfire1).
</div>
</div>