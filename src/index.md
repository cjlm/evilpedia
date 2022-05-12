---
title: Bookworm stats
layout: base.html
description: "The index page of my website"
---
# {{ title }}

## Episodes

<table>
<thead>
<tr>
<th>No</th>
<th>Title</th>
<th>Mike's Rating</th>
<th>Joe's Rating</th>
<th>Average Rating</th>
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