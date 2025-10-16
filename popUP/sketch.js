const article = document.getElementById('article');
const text = article.textContent;//text里放入了article的Content
article.textContent = '';//清空？why？

//把一切变成letter（char）
text.split(' ').forEach(letter => {
    const span = document.createElement('span');
    span.className = 'collectable';
    span.textContent = letter;
    article.appendChild(span);//在每个class前面加上span，其实就是变成<span class="clickable">🍃</span>
    article.appendChild(new Text(' '));
});

let collectedLetters = [];

document.querySelectorAll('.collectable').forEach(letter => {
    letter.addEventListener('click', (e) => {
        let newLetter = document.createElement('span');
        newLetter.className = 'letter';
        newLetter.textContent = e.target.textContent;
        document.body.appendChild(newLetter);
        collectedLetters.push(newLetter);
    });
});

document.addEventListener('mousemove', (e) => {
    collectedLetters.forEach((letter, index) => {
        letter.style.left = (e.clientX  + Math.random() * 20 + index * 0.1) + 'px';
        letter.style.top = (e.clientY + index * 15) + 'px';
    });
});




const input = document.querySelector("#check");
const flowerImage = document.querySelector("#flower");
input.addEventListener("click", function () {
    if (input.checked === true) {
        flowerImage.style.display = "block";
    }
    else {
        flowerImage.style.display = "none";
    }
})



// 上传图片

const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
const previewImage = document.getElementById('preview-image');
const removeButton = document.getElementById('remove-button');

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
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
            removeButton.style.display = 'inline-block';
            uploadArea.style.display = 'none';
        };
        reader.readAsDataURL(file);
    } else {
        alert('请选择图片文件！');
    }
}
