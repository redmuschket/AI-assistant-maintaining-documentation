document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const uploadArea = document.querySelector('.upload-area');
    const fileInfo = document.getElementById('fileInfo');
    const uploadBtn = document.getElementById('uploadBtn');
    const btnRemove = document.querySelector('.btn-remove');

    // Элементы модального окна (Bootstrap 5)
    const errorModalEl = document.getElementById('errorModal');
    let errorModal = null;
    if (errorModalEl) {
        errorModal = new bootstrap.Modal(errorModalEl);
    }
    const errorModalBody = document.getElementById('errorModalBody');

    // Разрешенные расширения
    const ALLOWED_EXTENSIONS = ['txt', 'doc', 'docx'];

    // Функция показа ошибки
    function showError(message) {
        if (errorModal && errorModalBody) {
            errorModalBody.textContent = message;
            errorModal.show();
        } else {
            // Фолбэк, если модалка не найдена
            alert(message);
        }
    }

    // Проверка файла
    function validateFile(file) {
        const ext = file.name.split('.').pop().toLowerCase();
        if (!ALLOWED_EXTENSIONS.includes(ext)) {
            showError(`Ошибка: Файл ".${ext}" не поддерживается. Разрешены только: ${ALLOWED_EXTENSIONS.join(', ')}`);
            return false;
        }
        return true;
    }

    // Обработчик выбора файла (клик)
    fileInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            if (validateFile(file)) {
                showFileInfo(file);
            } else {
                fileInput.value = ''; // Сброс
            }
        }
    });

    // Drag & drop
    ['dragover', 'dragenter'].forEach(event => {
        uploadArea.addEventListener(event, e => {
            e.preventDefault();
            e.currentTarget.classList.add('border-primary');
        });
    });

    ['dragleave', 'drop'].forEach(event => {
        uploadArea.addEventListener(event, e => {
            e.currentTarget.classList.remove('border-primary');

            if (event === 'drop') {
                e.preventDefault();

                if (e.dataTransfer.files.length > 0) {
                    const file = e.dataTransfer.files[0];
                    if (validateFile(file)) {
                        fileInput.files = e.dataTransfer.files;
                        showFileInfo(file);
                    }
                }
            }
        });
    });

    // Удаление файла (сброс формы)
    if (btnRemove) {
        btnRemove.addEventListener('click', function() {
            resetForm();
        });
    }

    function resetForm() {
        fileInput.value = '';
        fileInfo.classList.add('d-none');
        uploadBtn.disabled = true;
    }

    function showFileInfo(file) {
        document.querySelector('.file-name').textContent = file.name;
        document.querySelector('.file-size').textContent = formatFileSize(file.size);
        document.querySelector('.file-preview').innerHTML = getFileIcon(file);

        fileInfo.classList.remove('d-none');
        uploadBtn.disabled = false;
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function getFileIcon(file) {
        const ext = file.name.split('.').pop().toLowerCase();
        const icons = {
            doc: 'bi bi-file-word',
            docx: 'bi bi-file-word',
            txt: 'bi bi-file-text'
        };
        return `<i class="${icons[ext] || 'bi bi-file-earmark'}" style="font-size: 1.5rem;"></i>`;
    }
});
