from django import template
from django.templatetags.static import static

register = template.Library()


@register.inclusion_tag('homepage/important.html')
def render_important_items():
    items = [
        {
            'icon': 'important-character',
            'icon_src': static('homepage/image/character-big.svg'),
            'title': 'Персонажи',
            'description': 'Создавайте детальные профили героев...',
            'rows': [
                'Связи с персонажами',
                'Роль в сюжете',
                'Упоминания',
                'Фракция',
                'Описание',
            ],
        },
        {
            'icon': 'important-artifact',
            'icon_src': static('homepage/image/artifact-big.svg'),
            'title': 'Артефакт',
            'description': 'Опишите артефакты через уникальные карточки...',
            'rows': [
                'Связи артефакта с персонажами',
                'Упоминания',
                'Локация',
                'Описание',
            ],
        },
        {
            'icon': 'important-event',
            'icon_src': static('homepage/image/event-big.svg'),
            'title': 'События',
            'description': 'Опишите важные события подробно...',
            'rows': [
                'Упоминания',
                'Персонажи',
                'Локация',
                'Описание',
            ],
        },
        {
            'icon': 'important-artifact',
            'icon_src': static('homepage/image/location-big.svg'),
            'title': 'Локации',
            'description': 'Наполняйте свой рассказ продуманными локациями...',
            'rows': [
                'Упоминания',
                'События',
                'Описание',
            ],
        },
    ]

    return {'items': items}