// const uploadArea = document.getElementById('upload-area');
// const fileInput = document.getElementById('file-input');
// const previewImage = document.getElementById('preview-image');
// const removeButton = document.getElementById('remove-button');

// // 处理文件选择
// fileInput.addEventListener('change', handleFileSelect);

// // 处理拖拽
// uploadArea.addEventListener('dragover', (e) => {
//     e.preventDefault();
//     uploadArea.classList.add('dragging');
// });

// uploadArea.addEventListener('dragleave', () => {
//     uploadArea.classList.remove('dragging');
// });

// uploadArea.addEventListener('drop', (e) => {
//     e.preventDefault();
//     uploadArea.classList.remove('dragging');
//     const files = e.dataTransfer.files;
//     if (files.length > 0) {
//         handleFile(files[0]);
//     }
// });

// // 处理移除图片
// removeButton.addEventListener('click', () => {
//     previewImage.style.display = 'none';
//     removeButton.style.display = 'none';
//     uploadArea.style.display = 'block';
//     fileInput.value = '';
// });

// function handleFileSelect(e) {
//     const file = e.target.files[0];
//     if (file) {
//         handleFile(file);
//     }
// }

// function handleFile(file) {
//     if (file.type.startsWith('image/')) {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//             previewImage.src = e.target.result;
//             previewImage.style.display = 'block';
//             removeButton.style.display = 'inline-block';
//             uploadArea.style.display = 'none';
//         };
//         reader.readAsDataURL(file);
//     } else {
//         alert('请选择图片文件！');
//     }
// }

// upload.js
// 获取DOM元素
const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
const previewImage = document.getElementById('preview-image');
const removeButton = document.getElementById('remove-button');

// 页面加载时检查是否有存储的图片
window.addEventListener('load', () => {
    const savedImage = sessionStorage.getItem('uploadedImage');
    if (savedImage) {
        previewImage.src = savedImage;
        previewImage.style.display = 'block';
        removeButton.style.display = 'inline-block';
        uploadArea.style.display = 'none';
    }
});

// 处理文件选择
fileInput.addEventListener('change', handleFileSelect);

// 处理拖拽
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragging');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragging');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragging');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
});

// 处理移除图片
removeButton.addEventListener('click', () => {
    previewImage.style.display = 'none';
    removeButton.style.display = 'none';
    uploadArea.style.display = 'block';
    fileInput.value = '';
    // 从 sessionStorage 中删除图片
    sessionStorage.removeItem('uploadedImage');
});

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        handleFile(file);
    }
}

function handleFile(file) {
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageData = e.target.result;
            // 存储图片数据到 sessionStorage
            sessionStorage.setItem('uploadedImage', imageData);
            
            previewImage.src = imageData;
            previewImage.style.display = 'block';
            removeButton.style.display = 'inline-block';
            uploadArea.style.display = 'none';
        };
        reader.readAsDataURL(file);
    } else {
        alert('请选择图片文件！');
    }
}