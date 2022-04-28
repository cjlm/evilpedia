---
title: Index
layout: base.html
description: "The index page of my website"
---
# {{ title }}

{% for items in feed %}
<li>
{{ items.title }}
</li>
{% endfor %}