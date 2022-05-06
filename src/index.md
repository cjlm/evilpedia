---
title: Index
layout: base.html
description: "The index page of my website"
---
# {{ title }}

## Episodes
{{ bwFeed | log }}
<table>
<tr>
<th>Episode</th>
<th>Title</th>
</tr>

{% for i in bwFeed %}
<tr>
<td>{{i.no}}</td>
<td>{{i.title}}</td>
</tr>
{% endfor %}
</table>