from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.shortcuts import get_object_or_404, redirect
from django.contrib import messages
import magic

from .forms import FileUploadForm
from .models import File


@csrf_exempt
def upload_api(request):
    files = File.objects.filter(user=request.user)

    if request.method == 'POST':
        form = FileUploadForm(request.POST, request.FILES)
        if form.is_valid():
            file_obj = form.cleaned_data['file']
            File.objects.create(
                user=request.user,
                original_name=file_obj.name,
                file_size=file_obj.size,
                file=file_obj,
                mime_type=magic.from_buffer(file_obj.read(1024), mime=True)
            )
            messages.success(request, 'Файл успешно загружен!')
            return redirect('file:loader')
        else:
            for field, errors in form.errors.items():
                for error in errors:
                    messages.error(request, f"{error}")
    else:
        form = FileUploadForm()

    return render(request, 'file/loader.html', {'form': form, 'files': files})

def loader_page(request):
    files = File.objects.all()
    return render(request, 'file/loader.html', {'files': files})

def delete_file(request, pk):
    if request.method == 'POST':
        file = get_object_or_404(File, pk=pk, user=request.user)
        file.delete()
        messages.success(request, 'Файл удалён!')
    return redirect('file:loader')
