from django.shortcuts import render

# Create your views here.

from django.views.decorators.http import require_http_methods


def render_htmx_or_full(request, partial_template, full_template):
    if request.headers.get('HX-Request'):
        return render(request, partial_template)
    return render(request, full_template, {'content_template': partial_template})

@require_http_methods(['GET'])
def home_view(request):
    return render_htmx_or_full(request, 'home/home_partial.html', 'home/home.html')