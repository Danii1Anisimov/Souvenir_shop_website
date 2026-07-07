let isAdmin = false;
let editingProductId = null;

function showLoginModal() {
    document.getElementById('loginModal').classList.add('show');
    document.getElementById('loginInput').value = '';
    document.getElementById('passwordInput').value = '';
    document.getElementById('loginError').classList.remove('show');
    document.getElementById('loginError').textContent = '';
}

function hideLoginModal() {
    document.getElementById('loginModal').classList.remove('show');
}

function showProductModal(product) {
    editingProductId = product ? product.id : null;
    document.getElementById('productModalTitle').textContent = product ? 'Редактировать товар' : 'Добавить товар';
    document.getElementById('productId').value = product ? product.id : '';
    document.getElementById('productName').value = product ? product.name : '';
    document.getElementById('productCategory').value = product ? product.category : 'clothing';
    document.getElementById('productImage').value = product ? (product.image || '') : '';
    document.getElementById('productPrice').value = product ? (product.price || '') : '';
    document.getElementById('productDescription').value = product ? (product.description || '') : '';
    document.getElementById('productInStock').checked = product ? (product.inStock !== false) : true;
    
    document.getElementById('variantsList').innerHTML = '';
    if (product && product.variants) {
        product.variants.forEach(v => {
            addVariantRow(v.label, v.price, v.inStock !== false);
        });
    }
    
    document.getElementById('productModal').classList.add('show');
}

function hideProductModal() {
    document.getElementById('productModal').classList.remove('show');
    editingProductId = null;
}

function addVariantRow(label = '', price = '', inStock = true) {
    const container = document.getElementById('variantsList');
    const row = document.createElement('div');
    row.className = 'variant-row';
    row.innerHTML = `
        <input type="text" class="variant-label" placeholder="Название" value="${label}">
        <input type="number" class="variant-price" placeholder="Цена" value="${price}">
        <label style="display:flex;align-items:center;gap:0.2rem;font-size:0.7rem;">
            <input type="checkbox" class="variant-stock" ${inStock ? 'checked' : ''}> В наличии
        </label>
        <button class="remove-variant">✕</button>
    `;
    row.querySelector('.remove-variant').addEventListener('click', () => row.remove());
    container.appendChild(row);
}

function getVariantsFromForm() {
    const rows = document.querySelectorAll('.variant-row');
    const variants = [];
    rows.forEach(row => {
        const label = row.querySelector('.variant-label').value.trim();
        const price = parseInt(row.querySelector('.variant-price').value);
        const inStock = row.querySelector('.variant-stock').checked;
        if (label && !isNaN(price)) {
            variants.push({ label, price, inStock });
        }
    });
    return variants.length > 0 ? variants : null;
}

function saveProduct() {
    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value.trim();
    const category = document.getElementById('productCategory').value;
    const image = document.getElementById('productImage').value.trim();
    const price = parseInt(document.getElementById('productPrice').value);
    const description = document.getElementById('productDescription').value.trim();
    const inStock = document.getElementById('productInStock').checked;
    const variants = getVariantsFromForm();
    
    if (!name) return alert('Введите название товара');
    if (!variants && isNaN(price)) return alert('Введите цену или добавьте варианты');
    
    const productData = {
        id: id || name.toLowerCase().replace(/[^a-zа-я0-9]/g, '-'),
        name,
        category,
        image: image || 'https://placehold.co/400x400/e9eef3/8b9cb0?text=No+Image',
        description,
        inStock,
        price: variants ? undefined : price,
        variants
    };
    
    if (id) {
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...productData };
        }
    } else {
        productData.id = productData.id + '-' + Date.now();
        products.push(productData);
    }
    
    saveProducts(products);
    hideProductModal();
    renderProducts(products);
}

function deleteProduct(id) {
    if (confirm('Удалить товар навсегда?')) {
        products = products.filter(p => p.id !== id);
        saveProducts(products);
        renderProducts(products);
    }
}

function archiveProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        product.archived = true;
        product.inStock = false;
        saveProducts(products);
        renderProducts(products);
    }
}

function restoreProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        product.archived = false;
        saveProducts(products);
        renderProducts(products);
    }
}

function initAdmin() {
    document.getElementById('adminBtn').addEventListener('click', () => {
        if (isAdmin) {
            document.getElementById('adminBtn').classList.remove('active');
            isAdmin = false;
            renderProducts(products);
        } else {
            showLoginModal();
        }
    });
    
    document.getElementById('loginSubmit').addEventListener('click', () => {
        const login = document.getElementById('loginInput').value;
        const password = document.getElementById('passwordInput').value;
        if (login === 'admin' && password === 'admin') {
            isAdmin = true;
            document.getElementById('adminBtn').classList.add('active');
            hideLoginModal();
            renderProducts(products);
        } else {
            const error = document.getElementById('loginError');
            error.textContent = 'Неверный логин или пароль';
            error.classList.add('show');
        }
    });
    
    document.getElementById('loginCancel').addEventListener('click', hideLoginModal);
    
    document.getElementById('productSave').addEventListener('click', saveProduct);
    document.getElementById('productCancel').addEventListener('click', hideProductModal);
    
    document.getElementById('addVariant').addEventListener('click', () => addVariantRow());
}

initAdmin();
