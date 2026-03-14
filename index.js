import Croppr from 'croppr';

const uploadButton = document.getElementById('upload-button');
const cropButton = document.getElementById('crop-button');
const downloadButton = document.getElementById('download-button');
const image = document.getElementById('upload-image');
let cropper;
let croppedImage;

function uploadImage(e) {
    const file = e.target.files[0];
    if (file){
        if (file.size > 1024 * 300){
            alert('Maximum file is too big');
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            image.src = e.target.result;
            createCropper()
        }
        reader.readAsDataURL(file);
    }
}

function createCropper() {
    if (cropper)
        cropper.destroy();
    cropper = new Croppr(image)
}

function getCroppedCanvas() {
    const cropperData = cropper.getValue();
    const canvas = document.createElement('canvas');
    canvas.width = cropperData.width;
    canvas.height = cropperData.height;
    canvas.getContext('2d').drawImage(
        image,
        cropperData.x,
        cropperData.y,
        cropperData.width,
        cropperData.height,
        0,
        0,
        cropperData.width,
        cropperData.height);
    return canvas;
}

function cropImage() {
    if (croppedImage)
        croppedImage.remove();
    croppedImage = document.createElement('img');
    croppedImage.style.maxWidth = '500px'
    croppedImage.style.maxHeight = '700px'
    croppedImage.src = getCroppedCanvas().toDataURL();
    document.body.appendChild(croppedImage);
}

function downloadImage() {
    const link = document.createElement('a');
    link.download = "image.png";
    link.href = getCroppedCanvas().toDataURL();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}

uploadButton.addEventListener('change', uploadImage);
cropButton.addEventListener('click', cropImage);
downloadButton.addEventListener('click', downloadImage);