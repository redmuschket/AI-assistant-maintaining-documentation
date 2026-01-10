from django import template
from django.templatetags.static import static

register = template.Library()

@register.inclusion_tag('homepage/examples_stats.html')
def render_examples_items():
    items = [
        {'title': 'Активных баз', 'number': '1 247'},
        {'title': 'Сущностей', 'number': '56 832'},
        {'title': 'Статей', 'number': '2 412'},
        {'title': 'Презентаций', 'number': '1 985'},
    ]
    return {'items': items}