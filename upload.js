$(document).ready(function() {
    const btnUpload = $("#upload_file");
    const btnOuter = $(".button_outer");
    const uploadedView = $("#uploaded_view");
    const generateBtn = $(".lok");
    let uploadedImage = null;
    let originalImageURL = null; // Store original image URL
    function resetUploadState() {
        uploadedView.removeClass("show");
        uploadedView.html('<span class="file_remove">X</span>');
        btnOuter.removeClass("file_uploading file_uploaded");
        btnUpload.val('');
        uploadedImage = null;
        uploadedView.hide();
        $(".button_outer").show();
        $(".error_msg").text("");
        if (originalImageURL) {
            URL.revokeObjectURL(originalImageURL); // Release memory
            originalImageURL = null;
        }
    }
    function handleFileUpload(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedImage = file;
            originalImageURL = e.target.result; // Store for potential reset
            setTimeout(function() {
                btnOuter.addClass("file_uploaded");
                uploadedView.html(
                    `<span class="file_remove">X</span>
                    <img src="${e.target.result}" class="uploaded-image">`
                ).addClass("show").show();
            }, 1500);
        };
        reader.readAsDataURL(file);
    }
    btnUpload.on("change", function(e) {
        const file = e.target.files[0];
        if (!file) return;
        const ext = file.name.split('.').pop().toLowerCase();
        if ($.inArray(ext, ['webp','png','jpg','jpeg']) == -1) {
            $(".error_msg").text("Not an Image...");
            resetUploadState();
            return;
        }
        uploadedView.html('<span class="file_remove">X</span>');
        $(".error_msg").text("");
        btnOuter.addClass("file_uploading");
        handleFileUpload(file);
    });
    $(document).on("click", ".file_remove", function(e) {
        e.stopPropagation();
        resetUploadState();
    });
    generateBtn.on("click", async function() {
        if (!uploadedImage) {
            alert('Please upload an image first');
            return;
        }
        try {
            generateBtn.prop('disabled', true);
            generateBtn.text('Processing...');
            // *** 1. Create Blob from uploadedImage (File object) ***
            const blob = uploadedImage; // The uploadedImage is already a File (which is a Blob-like object)
            if (!(blob instanceof Blob)) {
                throw new Error("uploadedImage is not a Blob"); // Check if it is a blob
            }
            // *** 2. Import the library ***
            const backgroundRemoval = await import('https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.5.8/+esm');
            // *** 3. Call removeBackground ***
            const resultBlob = await backgroundRemoval.removeBackground(blob);
            const imageUrl = URL.createObjectURL(resultBlob);
            uploadedView.html(
                `<span class="file_remove">X</span>
                <img src="${imageUrl}" class="uploaded-image">
                <a href="${imageUrl}" download="removed-background.png" class="download-btn">Download Image</a>`
            ).show();
        } catch (error) {
            console.error('Error:', error);
            alert('Error processing image: ' + error.message); // Display the actual error message
        } finally {
            generateBtn.prop('disabled', false);
            generateBtn.text('Generate');
        }
    });
    resetUploadState();
});
