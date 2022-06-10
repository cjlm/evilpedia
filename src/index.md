---
title: Bookworm stats
layout: base.html
description: "The index page of my website"
---

<div class="aligning">
<div class="header">

<div class="icon-center-one">
<i class="fa-solid fa-book-open-reader"></i>

# {{ title }}
</div>
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
{{ bwFeed | log }}
{% for i in bwFeed.episodes %}
<tr>
<td>{{i.no | safe}}</td>
<td>
<a href="{{i.link}}">{{i.title | safe}}</a>
</td>
<td> 
<span class="rating-no">{{i.ratingMike}}</span>
<span class ="rating-stars">{{i.starsMike | safe}}</span>
</td>
<td>
<span class="rating-no">{{i.ratingJoe}}</span>
<span class ="rating-stars">{{i.starsJoe | safe}}</span>
</td>
<td>{{i.ratingAve}}</td>
</tr>
{% endfor %}
</tbody>
</table>
</div>
<div class="card-container">
<div class="card-item">
<ul>
{% for i in bwFeed.fiveStars %}
<li>{{ i.title | safe}}</li>
{% endfor %}
</ul>
</div>
<div class="card-item">The first episode was Episode 1!</div>
<div class="card-item">Another fun fact!</div>
</div>
</div>