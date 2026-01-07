from django import forms
from .models import UploadedFile

ALLOWED_TYPES = [
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]


class FileUploadForm(forms.ModelForm):
    class Meta:
        model = UploadedFile
        fields = ['file']
        widgets = {
            'file': forms.FileInput(attrs={
                'class': 'form-control',
                'accept': '.txt,.doc,.docx'
            })
        }

    def clean_file(self):
        file = self.cleaned_data.get('file')

        if not file:
            return file

        if file.size > 5 * 1024 * 1024:  # 5MB
            raise forms.ValidationError("Файл слишком большой (макс. 5MB)")

        mime_type = magic.from_buffer(file.read(1024), mime=True)
        file.seek(0)

        if mime_type not in ALLOWED_TYPES:
            raise forms.ValidationError(
                f'Недопустимый тип файла: {mime_type}. '
                'Разрешены только TXT, DOC, DOCX.'
            )

        valid_extensions = ['.txt', '.doc', '.docx']
        ext = os.path.splitext(file.name)[1].lower()

        if ext not in valid_extensions:
            raise forms.ValidationError(f'Недопустимое расширение: {ext}')

        return file