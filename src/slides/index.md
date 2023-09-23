---
marp: true
eleventyNavigation:
  key: root
---

# Welcome

{% assign navPages = collections.all | eleventyNavigation: key %}
{{ navPages | json }}
