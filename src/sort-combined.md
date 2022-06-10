{% extends "src/index.md" %}

{% block tbody %}
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
{% endblock %}