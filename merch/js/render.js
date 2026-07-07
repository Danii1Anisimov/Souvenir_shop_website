function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function renderProducts(products) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    const filtered = getFilteredProducts(products);
    const sorted = getSortedProducts(filtered);

    if (sorted.length === 0 && !isAdmin) {
        grid.innerHTML = '<div class="no-results">🔍 Товары не найдены. Попробуйте изменить запрос или категорию.</div>';
        return;
    }

    const categoryNames = {
        'clothing': 'Одежда',
        'accessories': 'Аксессуары',
        'stationery': 'Канцелярия',
        'souvenirs': 'Сувениры',
        'other': 'Прочее'
    };

    grid.innerHTML = sorted.map(product => {
        const img = product.image || 'https://placehold.co/400x400/e9eef3/8b9cb0?text=No+Image';
        const productAvailable = isProductAvailable(product);
        const isFullyOutOfStock = !productAvailable;
        const isArchived = product.archived === true;
        
        let priceHtml = '';
        let variantsHtml = '';
        
        if (product.variants) {
            const availableVariants = product.variants.filter(v => v.inStock !== false);
            const firstAvailable = product.variants.find(v => v.inStock !== false);
            
            variantsHtml = `
                <div class="product-variants">
                    ${product.variants.map((v, i) => {
                        const variantOutOfStock = v.inStock === false;
                        const isFirstAvailable = firstAvailable && v.label === firstAvailable.label && v.price === firstAvailable.price;
                        return `
                        <div class="variant-option ${variantOutOfStock ? 'variant-out-of-stock' : ''}">
                            <input type="radio" name="variant-${product.id}" id="var-${product.id}-${i}" ${isFirstAvailable ? 'checked' : ''} data-price="${v.price}" ${variantOutOfStock ? 'disabled' : ''}>
                            <label for="var-${product.id}-${i}" class="${variantOutOfStock ? 'out-of-stock-label' : ''}">
                                <span>${v.label}${variantOutOfStock ? ' (нет в наличии)' : ''}</span>
                                <span class="variant-price">${formatPrice(v.price)}</span>
                            </label>
                        </div>
                    `}).join('')}
                </div>
            `;
            priceHtml = `<div class="price" id="price-${product.id}">${firstAvailable ? formatPrice(firstAvailable.price) : formatPrice(product.variants[0].price)}</div>`;
        } else {
            priceHtml = `<div class="price">${formatPrice(product.price)}</div>`;
        }

        return `
            <div class="product-card ${isFullyOutOfStock ? 'out-of-stock' : ''} ${isArchived ? 'archived' : ''}" data-id="${escapeHtml(product.id)}">
                ${isFullyOutOfStock && !isArchived ? '<div class="out-of-stock-badge">Нет в наличии</div>' : ''}
                ${isArchived ? '<div class="out-of-stock-badge archived-badge">В архиве</div>' : ''}
                <div class="product-image-wrapper">
                    <img src="${escapeHtml(img)}" alt="${escapeHtml(product.name)}" loading="lazy" onerror="this.src='https://placehold.co/400x400/e9eef3/8b9cb0?text=Error'" class="${isFullyOutOfStock && !isArchived ? 'out-of-stock-image' : ''}">
                </div>
                <h3>${escapeHtml(product.name)}</h3>
                ${priceHtml}
                ${variantsHtml}
                ${product.description ? `<p class="product-description">${escapeHtml(product.description)}</p>` : ''}
                <span class="product-category">${categoryNames[product.category] || 'Прочее'}</span>
                ${isAdmin ? `
                    <div class="admin-actions show">
                        <button class="modal-btn small" onclick="event.stopPropagation(); showProductModal(products.find(p=>p.id==='${product.id}'))">✏️</button>
                        ${product.archived ? 
                            `<button class="modal-btn small primary" onclick="event.stopPropagation(); restoreProduct('${product.id}')">↩️</button>` :
                            `<button class="modal-btn small" onclick="event.stopPropagation(); archiveProduct('${product.id}')">📦</button>`
                        }
                        <button class="modal-btn small danger" onclick="event.stopPropagation(); deleteProduct('${product.id}')">🗑️</button>
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');

    // Кнопка добавления товара для админа
    if (isAdmin) {
        const addCard = document.createElement('div');
        addCard.className = 'product-card admin-add-card';
        addCard.innerHTML = `
            <div class="admin-add-content">
                <span style="font-size:3rem;">+</span>
                <span style="font-size:1rem;font-weight:600;">Добавить товар</span>
            </div>
        `;
        addCard.addEventListener('click', () => showProductModal(null));
        grid.appendChild(addCard);
    }

    // Обработчик изменения варианта (только для доступных)
    document.querySelectorAll('.variant-option input[type="radio"]:not([disabled])').forEach(radio => {
        radio.addEventListener('change', function() {
            const productId = this.name.replace('variant-', '');
            const price = parseInt(this.dataset.price);
            const priceEl = document.getElementById(`price-${productId}`);
            if (priceEl) priceEl.textContent = formatPrice(price);
        });
    });
}
