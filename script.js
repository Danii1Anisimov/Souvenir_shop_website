(function() {
    const STORAGE_KEY = 'mini_shop_products_v13';
    const ADMIN_PASSWORD = 'admin123';

    let products = [];
    let isAdmin = false;
    let currentSortMode = 'default';

    function showToast(message, duration = 3000) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), duration);
    }

    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function formatPrice(value) {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0
        }).format(value);
    }

    function generateId() {
        return `${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    }

    function getStockClass(stock) {
        if (stock <= 0) return 'out';
        return '';
    }

    function getStockText(stock) {
        if (stock <= 0) return '❌ Нет в наличии';
        return `✅ В наличии (${stock} шт.)`;
    }

    function getDefaultProducts() {
        return [
                    {
                        id: generateId(),
                        name: 'Бандана/косынка с логотипом ЧГУ',
                        price: 220,
                        stock: 1,
                        image: 'images/2026-05-27_12-54-46.png',
                        description: 'Стильная бандана с логотипом ЧГУ'
                    },
                    {
                        id: generateId(),
                        name: 'Бейсболка с логотипом ЧГУ',
                        price: 240,
                        stock: 1,
                        image: 'images/2026-05-27_12-54-57.png',
                        description: 'Классическая бейсболка с вышитым логотипом'
                    },
                    {
                        id: generateId(),
                        name: 'Браслет силиконовый',
                        price: 60,
                        stock: 1,
                        image: 'images/2026-05-27_12-55-08.png',
                        description: 'Силиконовый браслет с символикой ЧГУ'
                    },
                    {
                        id: generateId(),
                        name: 'Ветровка с логотипом',
                        price: 1600,
                        stock: 1,
                        image: 'images/2026-05-27_12-55-52.png',
                        description: 'Легкая ветровка с логотипом университета'
                    },
                    {
                        id: generateId(),
                        name: 'Внешний аккумулятор',
                        price: 580,
                        stock: 1,
                        image: 'images/2026-05-27_12-56-00.png',
                        description: 'Easy Metal 2200 мАч, красный'
                    },
                    {
                        id: generateId(),
                        name: 'Высокие носки с логотипом',
                        price: 250,
                        stock: 1,
                        image: 'images/2026-05-27_12-56-13.png',
                        description: 'Белые или красные носки с символикой'
                    },
                    {
                        id: generateId(),
                        name: 'Гантель',
                        price: 500,
                        stock: 1,
                        image: 'images/2026-05-27_12-56-20.png',
                        description: 'Heracles 1 кг, красная'
                    },
                    {
                        id: generateId(),
                        name: 'Ежедневник',
                        price: 650,
                        stock: 1,
                        image: 'images/2026-05-27_12-56-25.png',
                        description: 'Chillout, недатированный, красный'
                    },
                    {
                        id: generateId(),
                        name: 'Значок заказной с логотипом ЧГУ',
                        price: 21,
                        stock: 1,
                        image: 'images/2026-05-27_12-56-30.png',
                        description: '56 мм Тираж: 100'
                    },
                    {
                        id: generateId(),
                        name: 'Значок заказной с логотипом ЧГУ',
                        price: 19,
                        stock: 1,
                        image: 'images/2026-05-27_12-56-30.png',
                        description: '56 мм Тираж: 200'
                    },
                    {
                        id: generateId(),
                        name: 'Значок заливной',
                        price: 83,
                        stock: 1,
                        image: 'images/2026-05-27_12-56-51.png',
                        description: ''
                    },
                    {
                        id: generateId(),
                        name: 'Кружка с манжетом',
                        price: 220,
                        stock: 1,
                        image: 'images/2026-05-27_12-56-57.png',
                        description: ''
                    },
                    {
                        id: generateId(),
                        name: 'Маска с логотипом',
                        price: 65,
                        stock: 1,
                        image: 'images/2026-05-27_12-57-06.png',
                        description: ''
                    },
                    {
                        id: generateId(),
                        name: 'Мяч футбольный',
                        price: 660,
                        stock: 1,
                        image: 'images/2026-05-27_12-57-10.png',
                        description: 'Street, бело-красный'
                    },
                    {
                        id: generateId(),
                        name: 'Пакет ПВД',
                        price: 20,
                        stock: 1,
                        image: 'images/2026-05-27_12-57-16.png',
                        description: '20*30см'
                    },
                    {
                        id: generateId(),
                        name: 'Пакет ПВД',
                        price: 19,
                        stock: 1,
                        image: 'images/2026-05-27_12-57-16.png',
                        description: '30*40см'
                    },
                    {
                        id: generateId(),
                        name: 'Пакет ПВД',
                        price: 18,
                        stock: 1,
                        image: 'images/2026-05-27_12-57-16.png',
                        description: '40*50см'
                    },
                    {
                        id: generateId(),
                        name: 'Папка с резинками',
                        price: 62,
                        stock: 1,
                        image: 'images/2026-05-27_12-57-42.png',
                        description: 'А4 пластик'
                    },
                    {
                        id: generateId(),
                        name: 'Пешеходный светоотражатель «Сердце»',
                        price: 85,
                        stock: 1,
                        image: 'images/2026-05-27_12-57-49.png',
                        description: 'красный'
                    },
                    {
                        id: generateId(),
                        name: 'Прозрачный зонт-трость Clear',
                        price: 880,
                        stock: 1,
                        image: 'images/2026-05-27_12-57-54.png',
                        description: ''
                    },
                    {
                        id: generateId(),
                        name: 'Ручка шариковая Scribo',
                        price: 140,
                        stock: 1,
                        image: 'images/2026-05-27_12-58-02.png',
                        description: 'красная'
                    },
                    {
                        id: generateId(),
                        name: 'Ручка шариковая Slider',
                        price: 49,
                        stock: 1,
                        image: 'images/2026-05-27_12-58-06.png',
                        description: 'красная с белым'
                    },
                    {
                        id: generateId(),
                        name: 'Рюкзак Unit Back To Back',
                        price: 1120,
                        stock: 1,
                        image: 'images/2026-05-27_12-58-14.png',
                        description: 'красный'
                    },
                    {
                        id: generateId(),
                        name: 'Свисток на шнурке Ready',
                        price: 95,
                        stock: 1,
                        image: 'images/2026-05-27_12-58-17.png',
                        description: 'белый'
                    },
                    {
                        id: generateId(),
                        name: 'Свитшот с логотипом',
                        price: 2150,
                        stock: 1,
                        image: 'images/2026-05-27_12-58-25.png',
                        description: '250гр вышивка'
                    },
                    {
                        id: generateId(),
                        name: 'Свитшот с логотипом',
                        price: 1550,
                        stock: 1,
                        image: 'images/2026-05-27_12-58-25.png',
                        description: '250гр флекс'
                    },
                    {
                        id: generateId(),
                        name: 'Свитшот с логотипом',
                        price: 3000,
                        stock: 1,
                        image: 'images/2026-05-27_12-58-25.png',
                        description: '310гр вышивка'
                    },
                    {
                        id: generateId(),
                        name: 'Свитшот с логотипом',
                        price: 2435,
                        stock: 1,
                        image: 'images/2026-05-27_12-58-25.png',
                        description: '310гр флекс'
                    },
                    {
                        id: generateId(),
                        name: 'Спортивная бутылка Marathon',
                        price: 800,
                        stock: 1,
                        image: 'images/2026-05-27_12-58-58.png',
                        description: 'красная'
                    },
                    {
                        id: generateId(),
                        name: 'Сувенирная игрушка «Учик»',
                        price: 215,
                        stock: 1,
                        image: 'images/2026-05-27_12-59-04.png',
                        description: 'большой'
                    },
                    {
                        id: generateId(),
                        name: 'Сувенирная игрушка «Учик»',
                        price: 100,
                        stock: 1,
                        image: 'images/2026-05-27_12-59-04.png',
                        description: 'малый'
                    },
                    {
                        id: generateId(),
                        name: 'Сумка для документов HotDoc',
                        price: 650,
                        stock: 1,
                        image: 'images/2026-05-27_12-59-16.png',
                        description: 'серая'
                    },
                    {
                        id: generateId(),
                        name: 'Термостакан Forma',
                        price: 780,
                        stock: 1,
                        image: 'images/2026-05-27_12-59-41.png',
                        description: 'красный 350 мл'
                    },
                    {
                        id: generateId(),
                        name: 'Толстовка (с капюшоном) с логотипом',
                        price: 3000,
                        stock: 1,
                        image: 'images/2026-05-27_12-59-51.png',
                        description: 'вышивка'
                    },
                    {
                        id: generateId(),
                        name: 'Толстовка (с капюшоном) с логотипом',
                        price: 2435,
                        stock: 1,
                        image: 'images/2026-05-27_12-59-51.png',
                        description: 'флекс'
                    },
                    {
                        id: generateId(),
                        name: 'Учик магнит',
                        price: 75,
                        stock: 1,
                        image: 'images/2026-05-27_12-59-56.png',
                        description: ''
                    },
                    {
                        id: generateId(),
                        name: 'Флешка «Капсула»',
                        price: 700,
                        stock: 1,
                        image: 'images/2026-05-27_13-00-02.png',
                        description: 'красная, 8 Гб'
                    },
                    {
                        id: generateId(),
                        name: 'Футболка с логотипом ЧГУ',
                        price: 400,
                        stock: 1,
                        image: 'images/2026-05-27_13-00-09.png',
                        description: '1 лого (на спине)'
                    },
                    {
                        id: generateId(),
                        name: 'Футболка с логотипом ЧГУ',
                        price: 490,
                        stock: 1,
                        image: 'images/2026-05-27_13-00-18.png',
                        description: '2 лого (на спине и на груди)'
                    },
                    {
                        id: generateId(),
                        name: 'Холщовая сумка Strong 210',
                        price: 350,
                        stock: 1,
                        image: 'images/2026-05-27_13-00-22.png',
                        description: 'белая, с логотипом ЧГУ'
                    },
                    {
                        id: generateId(),
                        name: 'Чехол для пропуска Twill',
                        price: 230,
                        stock: 1,
                        image: 'images/2026-05-27_13-00-28.png',
                        description: 'красный'
                    }
        ];
    }

    function loadProducts() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    products = parsed;
                } else {
                    products = getDefaultProducts();
                    saveProducts();
                }
            } else {
                products = getDefaultProducts();
                saveProducts();
            }
        } catch (e) {
            console.error('Error loading products:', e);
            products = getDefaultProducts();
            saveProducts();
        }
    }

    function saveProducts() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
        } catch (e) {
            console.error('Error saving products:', e);
        }
    }

    function getSortedProducts() {
        if (currentSortMode === 'asc') {
            return [...products].sort((a, b) => a.price - b.price);
        }
        if (currentSortMode === 'desc') {
            return [...products].sort((a, b) => b.price - a.price);
        }
        return [...products];
    }

    function handleDescToggle(e) {
        const btn = e.currentTarget;
        const id = btn.getAttribute('data-id');
        const descDiv = document.getElementById(`desc-${id}`);
        if (descDiv) {
            descDiv.classList.toggle('show');
            btn.innerHTML = descDiv.classList.contains('show') ? '🔼 Скрыть описание' : '📖 Показать описание';
        }
    }

    function renderProducts() {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;

        const productsToRender = getSortedProducts();

        if (productsToRender.length === 0) {
            productsGrid.innerHTML = '<p style="text-align:center; color:#64748b; grid-column:1/-1;">✨ Товары появятся здесь</p>';
            return;
        }

        productsGrid.innerHTML = productsToRender.map(product => {
            const imgSrc = product.image || 'https://placehold.co/400x400/e9eef3/8b9cb0?text=No+Image';
            const stockClass = getStockClass(product.stock);
            const stockText = getStockText(product.stock);
            return `
                <div class="product-card" data-id="${escapeHtml(product.id)}">
                    <img src="${escapeHtml(imgSrc)}" alt="${escapeHtml(product.name)}" loading="lazy" onerror="this.src='https://placehold.co/400x400/e9eef3/8b9cb0?text=Error'">
                    <h3>${escapeHtml(product.name)}</h3>
                    <div class="price">${formatPrice(product.price)}</div>
                    <div class="stock ${stockClass}">${stockText}</div>
                    <button class="desc-toggle" data-id="${escapeHtml(product.id)}">📖 Показать описание</button>
                    <div class="product-description" id="desc-${escapeHtml(product.id)}">
                        ${escapeHtml(product.description || 'Описание отсутствует.')}
                    </div>
                </div>
            `;
        }).join('');

        document.querySelectorAll('.desc-toggle').forEach(btn => {
            btn.removeEventListener('click', handleDescToggle);
            btn.addEventListener('click', handleDescToggle);
        });
    }

    function handleEditClick(e) {
        const id = e.currentTarget.getAttribute('data-id');
        loadProductToForm(id);
    }

    function handleDeleteClick(e) {
        const id = e.currentTarget.getAttribute('data-id');
        deleteProduct(id);
    }

    function renderAdminProductList() {
        const adminProductList = document.getElementById('adminProductList');
        if (!adminProductList) return;

        if (products.length === 0) {
            adminProductList.innerHTML = '<li style="color:#94a3b8;">Нет товаров, добавьте первый</li>';
            return;
        }

        adminProductList.innerHTML = products.map(p => `
            <li class="admin-product-item" data-id="${escapeHtml(p.id)}">
                <span title="${escapeHtml(p.name)}">${escapeHtml(p.name)} (${formatPrice(p.price)}) [${p.stock} шт.]</span>
                <div class="admin-actions">
                    <button class="icon-btn edit" data-id="${escapeHtml(p.id)}" title="Редактировать">✏️</button>
                    <button class="icon-btn delete" data-id="${escapeHtml(p.id)}" title="Удалить">🗑️</button>
                </div>
            </li>
        `).join('');

        document.querySelectorAll('.icon-btn.edit').forEach(btn => {
            btn.removeEventListener('click', handleEditClick);
            btn.addEventListener('click', handleEditClick);
        });

        document.querySelectorAll('.icon-btn.delete').forEach(btn => {
            btn.removeEventListener('click', handleDeleteClick);
            btn.addEventListener('click', handleDeleteClick);
        });
    }

    function loadProductToForm(id) {
        const product = products.find(p => p.id === id);
        if (!product) return;

        document.getElementById('editId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productStock').value = product.stock || 0;
        document.getElementById('productImage').value = product.image;
        document.getElementById('productDesc').value = product.description || '';
        document.getElementById('submitBtn').textContent = '💾 Сохранить изменения';
        document.getElementById('cancelEditBtn').classList.remove('hidden');
    }

    function resetForm() {
        document.getElementById('productForm').reset();
        document.getElementById('editId').value = '';
        document.getElementById('submitBtn').textContent = '➕ Добавить товар';
        document.getElementById('cancelEditBtn').classList.add('hidden');
        document.getElementById('productStock').value = 10;
    }

    function addOrUpdateProduct(e) {
        e.preventDefault();

        if (!isAdmin) {
            showToast('Доступ только для администратора');
            return;
        }

        const name = document.getElementById('productName').value.trim();
        const price = parseFloat(document.getElementById('productPrice').value);
        const stock = parseInt(document.getElementById('productStock').value);
        const image = document.getElementById('productImage').value.trim();
        const description = document.getElementById('productDesc').value.trim();

        if (!name || isNaN(price) || price < 0 || !image || isNaN(stock) || stock < 0) {
            showToast('Пожалуйста, заполните все поля');
            return;
        }

        const editingId = document.getElementById('editId').value;

        if (editingId) {
            const index = products.findIndex(p => p.id === editingId);
            if (index !== -1) {
                products[index] = { ...products[index], name, price, stock, image, description };
                showToast('Товар обновлён');
            }
        } else {
            products.push({
                id: generateId(),
                name,
                price,
                stock,
                image,
                description
            });
            showToast('Товар добавлен');
        }

        saveProducts();
        resetForm();
        refreshAll();
    }

    function deleteProduct(id) {
        if (!isAdmin) return;
        if (!confirm('Удалить товар навсегда?')) return;

        products = products.filter(p => p.id !== id);
        if (document.getElementById('editId').value === id) resetForm();
        saveProducts();
        refreshAll();
        showToast('Товар удалён');
    }

    function setSortMode(mode) {
        currentSortMode = mode;
        document.querySelectorAll('.sort-btn').forEach(btn => {
            const sortType = btn.getAttribute('data-sort');
            if (sortType === mode) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        renderProducts();
    }

    function setAdminStatus(status) {
        isAdmin = status;
        const adminPanel = document.getElementById('adminPanel');
        const loginBlock = document.getElementById('loginBlock');

        if (isAdmin) {
            adminPanel.classList.remove('hidden');
            loginBlock.classList.add('hidden');
            renderAdminProductList();
            showToast('Добро пожаловать в админ-панель');
        } else {
            adminPanel.classList.add('hidden');
            loginBlock.classList.remove('hidden');
            resetForm();
        }
    }

    function refreshAll() {
        renderProducts();
        if (isAdmin) renderAdminProductList();
    }

    function init() {
        loadProducts();
        renderProducts();
        setAdminStatus(false);

        document.getElementById('productForm').addEventListener('submit', addOrUpdateProduct);
        document.getElementById('cancelEditBtn').addEventListener('click', resetForm);
        document.getElementById('loginBtn').addEventListener('click', () => {
            const password = document.getElementById('adminPassword').value;
            if (password === ADMIN_PASSWORD) {
                setAdminStatus(true);
                document.getElementById('adminPassword').value = '';
            } else {
                showToast('Неверный пароль');
            }
        });
        document.getElementById('logoutAdminBtn').addEventListener('click', () => setAdminStatus(false));

        document.querySelectorAll('.sort-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const mode = btn.getAttribute('data-sort');
                setSortMode(mode);
            });
        });

        document.getElementById('adminPassword').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') document.getElementById('loginBtn').click();
        });
    }

    init();
})();