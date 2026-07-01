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

    if (sorted.length === 0) {
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
        
        let priceHtml = '';
        let variantsHtml = '';
        
        if (product.variants) {
            variantsHtml = `
                <div class="product-variants">
                    ${product.variants.map((v, i) => `
                        <div class="variant-option">
                            <input type="radio" name="variant-${product.id}" id="var-${product.id}-${i}" ${i === 0 ? 'checked' : ''} data-price="${v.price}">
                            <label for="var-${product.id}-${i}">
                                <span>${v.label}</span>
                                <span class="variant-price">${formatPrice(v.price)}</span>
                            </label>
                        </div>
                    `).join('')}
                </div>
            `;
            priceHtml = `<div class="price" id="price-${product.id}">${formatPrice(product.variants[0].price)}</div>`;
        } else {
            priceHtml = `<div class="price">${formatPrice(product.price)}</div>`;
        }

        return `
            <div class="product-card" data-id="${escapeHtml(product.id)}">
                <img src="${escapeHtml(img)}" alt="${escapeHtml(product.name)}" loading="lazy" onerror="this.src='https://placehold.co/400x400/e9eef3/8b9cb0?text=Error'">
                <h3>${escapeHtml(product.name)}</h3>
                ${priceHtml}
                ${variantsHtml}
                ${product.description ? `<p style="font-size:0.8rem;color:#64748b;margin-top:0.3rem;">${escapeHtml(product.description)}</p>` : ''}
                <span class="product-category">${categoryNames[product.category] || 'Прочее'}</span>
            </div>
        `;
    }).join('');

    document.querySelectorAll('.variant-option input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const productId = this.name.replace('variant-', '');
            const price = parseInt(this.dataset.price);
            const priceEl = document.getElementById(`price-${productId}`);
            if (priceEl) priceEl.textContent = formatPrice(price);
        });
    });
}