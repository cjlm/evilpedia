---
title: Index
layout: base.html
description: "The index page of my website"
---
# {{ title }}

## Episodes
{{ bwFeed }}

<table>
<thead>
<tr>
<th>Episode</th>
<th>Title</th>
</tr>
</thead>

{% for i in bwFeed %}
<tbody>
<tr>
<td>{{i.no | safe}}</td>
<td>{{i.title | safe}}</td>
</tr>
</tbody>
{% endfor %}
</table>