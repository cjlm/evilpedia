---
title: Bookworm stats
layout: base.html
description: "The index page of my website"
---

<div class="aligning">
<div class="header">

<i class="fa-solid fa-ranking-star"></i>
# {{ title }}

<div role="doc-subtitle">
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tristique magna sit amet purus. Sit amet justo donec enim diam vulputate ut pharetra sit. In massa tempor nec feugiat nisl.
</div>
</div>

<div class="sheet">
<i class="fa-solid fa-headphones"></i>

## Episodes
<table>
<thead>
<tr>
<th>No</th>
<th>Title</th>
<th>Mike's Rating</th>
<th>Joe's Rating</th>
<th>Combined</th>
</tr>
</thead>

<tbody>
{% for i in bwFeed.episodes %}
<tr>
<td>{{i.no | safe}}</td>
<td><a href="{{i.link}}">{{i.title | safe}}</a></td>
<td>{{i.starsMike | safe}}</td>
<td>{{i.starsJoe | safe}}</td>
<td>{{i.ratingAve}}</td>
</tr>
{% endfor %}
</tbody>
</table>
</div>
<div class="fact-cards">

</div>

</div>