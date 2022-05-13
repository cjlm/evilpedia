---
title: Bookworm stats
layout: base.html
description: "The index page of my website"
---

<div class="aligning">
<div class="header">

# {{ title }}

<div role="doc-subtitle">
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tristique magna sit amet purus. Sit amet justo donec enim diam vulputate ut pharetra sit. In massa tempor nec feugiat nisl.
</div>
</div>

<div class="sheet">

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
{% for i in bwFeed %}
<tr>
<td>{{i.no | safe}}</td>
<td><a href="{{i.link}}">{{i.title | safe}}</a></td>
<td>{{i.ratingMike}}</td>
<td>{{i.ratingJoe}}</td>
<td>{{i.ratingAve}}</td>
</tr>
{% endfor %}
</tbody>
</table>
</div>

</div>