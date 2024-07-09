document.addEventListener('DOMContentLoaded', function() {
    let currentStep = 1;

    function showStep(step) {
        document.querySelectorAll('.wizard-step').forEach(stepElement => {
            stepElement.classList.add('d-none');
        });
        document.getElementById('step' + step).classList.remove('d-none');
    }

    function updateProductPreview() {
        const productName = document.getElementById('productName').value || 'Product Name';
        const productDescription = document.getElementById('productDescription').value || 'Product Description';

        document.getElementById('previewProductName').textContent = productName;
        document.getElementById('previewProductDescription').textContent = productDescription;

        const productImages = document.getElementById('productImages').files;
        if (productImages.length > 0) {
            const previewImage = document.getElementById('previewImage');
            previewImage.src = URL.createObjectURL(productImages[0]);
            previewImage.style.display = 'block';
        } else {
            document.getElementById('previewImage').style.display = 'none';
        }

        let netPrice = parseFloat(document.getElementById('netPrice').value) || 0;
        let listPrice = parseFloat(document.getElementById('listPrice').value) || 0;
        let discountPercentage = parseFloat(document.getElementById('discountPercentage').value) || 0;
        let gstRate = parseFloat(document.getElementById('gstRate').value) || 0;
        let shippingCharges = parseFloat(document.getElementById('shippingCharges').value) || 0;

        
        let discountedListPrice = listPrice - (listPrice * (discountPercentage / 100));
        
      
        if (netPrice > 0) {
            netPrice -= (netPrice * (discountPercentage / 100));
        }

        
        let finalPrice = netPrice > 0 ? netPrice : discountedListPrice;

        
        if (gstRate > 0) {
            let gstAmount = finalPrice * (gstRate / 100);
            if (document.getElementById('inclusiveGst').checked) {
                finalPrice += gstAmount;
            }
        }

        
        finalPrice += shippingCharges;

        
        document.getElementById('previewProductPrice').textContent = finalPrice.toFixed(2);
    }

    function updateStorePreview() {
        const storeName = document.getElementById('storeName').value || 'Store Name';
        const storeTitle = document.getElementById('storeTitle').value || 'Store Title';
        const storePhone = document.getElementById('storePhone').value || 'N/A';
        const storeEmail = document.getElementById('storeEmail').value || 'N/A';

        document.getElementById('previewStoreName').textContent = storeName;
        document.getElementById('previewStoreTitle').textContent = storeTitle;
        document.getElementById('previewStorePhone').textContent = storePhone;
        document.getElementById('previewStoreEmail').textContent = storeEmail;

        const storeLogo = document.getElementById('storeLogo').files;
        if (storeLogo.length > 0) {
            const previewStoreLogo = document.getElementById('previewStoreLogo');
            previewStoreLogo.src = URL.createObjectURL(storeLogo[0]);
            previewStoreLogo.style.display = 'block';
        } else {
            document.getElementById('previewStoreLogo').style.display = 'none';
        }
    }

    document.querySelectorAll('.next-step').forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep < 4) {
                currentStep++;
                showStep(currentStep);
                if (currentStep === 3) {
                    updateProductPreview();
                } else if (currentStep === 4) {
                    updateStorePreview();
                }
            }
        });
    });

    document.querySelectorAll('.prev-step').forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                showStep(currentStep);
            }
        });
    });

    document.querySelector('.finish').addEventListener('click', () => {
        alert('Onboarding Completed!');
    });

    document.querySelectorAll('.theme-options .btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.theme-options .btn').forEach(btn => {
                btn.classList.remove('btn-success');
                btn.classList.add('btn-primary');
            });
            button.classList.remove('btn-primary');
            button.classList.add('btn-success');
        });
    });

    document.getElementById('skuCodeCheckbox').addEventListener('change', function() {
        const skuCodeInput = document.getElementById('skuCode');
        skuCodeInput.classList.toggle('d-none', !this.checked);
    });

    document.getElementById('hsnSacCodeCheckbox').addEventListener('change', function() {
        const hsnSacCodeInput = document.getElementById('hsnSacCode');
        hsnSacCodeInput.classList.toggle('d-none', !this.checked);
    });

    // Update product preview on input changes......
    document.getElementById('productName').addEventListener('input', updateProductPreview);
    document.getElementById('productDescription').addEventListener('input', updateProductPreview);
    document.getElementById('productImages').addEventListener('change', updateProductPreview);
    document.getElementById('netPrice').addEventListener('input', updateProductPreview);
    document.getElementById('listPrice').addEventListener('input', updateProductPreview);
    document.getElementById('discountPercentage').addEventListener('input', updateProductPreview);
    document.getElementById('gstRate').addEventListener('input', updateProductPreview);
    document.getElementById('shippingCharges').addEventListener('input', updateProductPreview);
    document.getElementById('inclusiveGst').addEventListener('change', updateProductPreview);

    // Update store preview on input changes....
    document.getElementById('storeName').addEventListener('input', updateStorePreview);
    document.getElementById('storeTitle').addEventListener('input', updateStorePreview);
    document.getElementById('storePhone').addEventListener('input', updateStorePreview);
    document.getElementById('storeEmail').addEventListener('input', updateStorePreview);
    document.getElementById('storeLogo').addEventListener('change', updateStorePreview);
});
