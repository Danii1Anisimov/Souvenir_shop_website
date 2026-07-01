const STORAGE_KEY = 'mini_shop_products_v18';

function formatPrice(value) {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0
    }).format(value);
}

function getDefaultProducts() {
    return [
        // ОДЕЖДА
        { id: 'bandana', name: 'Бандана/косынка с логотипом ЧГУ', category: 'clothing', image: 'images/2026-05-27_12-54-46.png', price: 220, description: 'Стильная бандана с логотипом ЧГУ' },
        { id: 'baseball-cap', name: 'Бейсболка с логотипом ЧГУ', category: 'clothing', image: 'images/2026-05-27_12-54-57.png', price: 240, description: 'Классическая бейсболка с вышитым логотипом' },
        { id: 'windbreaker', name: 'Ветровка с логотипом', category: 'clothing', image: 'images/2026-05-27_12-55-52.png', price: 1600, description: 'Легкая ветровка с логотипом университета' },
        { id: 'socks', name: 'Высокие носки с логотипом', category: 'clothing', image: 'images/2026-05-27_12-56-13.png', price: 250, description: 'Белые или красные носки с символикой ЧГУ' },
        { id: 'mask', name: 'Маска с логотипом', category: 'clothing', image: 'images/2026-05-27_12-57-06.png', price: 65, description: 'Защитная маска с символикой ЧГУ' },
        { id: 'sweatshirt', name: 'Свитшот с логотипом', category: 'clothing', image: 'images/2026-05-27_12-58-25.png', variants: [{ label: '250гр флекс', price: 1550 }, { label: '250гр вышивка', price: 2150 }, { label: '310гр флекс', price: 2435 }, { label: '310гр вышивка', price: 3000 }], description: 'Свитшот с логотипом ЧГУ' },
        { id: 'hoodie', name: 'Толстовка с капюшоном и логотипом', category: 'clothing', image: 'images/2026-05-27_12-59-51.png', variants: [{ label: 'Флекс', price: 2435 }, { label: 'Вышивка', price: 3000 }], description: 'Толстовка с капюшоном и логотипом ЧГУ' },
        { id: 'tshirt', name: 'Футболка с логотипом ЧГУ', category: 'clothing', image: 'images/2026-05-27_13-00-09.png', variants: [{ label: '1 лого (на спине)', price: 400 }, { label: '2 лого (спина + грудь)', price: 490 }], description: 'Футболка с логотипом ЧГУ' },

        // АКСЕССУАРЫ
        { id: 'bracelet', name: 'Браслет силиконовый', category: 'accessories', image: 'images/2026-05-27_12-55-08.png', price: 60, description: 'Силиконовый браслет с символикой ЧГУ' },
        { id: 'powerbank', name: 'Внешний аккумулятор', category: 'accessories', image: 'images/2026-05-27_12-56-00.png', price: 580, description: 'Easy Metal 2200 мАч, красный' },
        { id: 'backpack', name: 'Рюкзак Unit Back To Back', category: 'accessories', image: 'images/2026-05-27_12-58-14.png', price: 1120, description: 'Рюкзак, красный' },
        { id: 'bag-canvas', name: 'Холщовая сумка Strong 210', category: 'accessories', image: 'images/2026-05-27_13-00-22.png', price: 350, description: 'Белая сумка с логотипом ЧГУ' },
        { id: 'bag-docs', name: 'Сумка для документов HotDoc', category: 'accessories', image: 'images/2026-05-27_12-59-16.png', price: 650, description: 'Серая сумка для документов' },
        { id: 'pass-cover', name: 'Чехол для пропуска Twill', category: 'accessories', image: 'images/2026-05-27_13-00-28.png', price: 230, description: 'Красный чехол для пропуска' },
        { id: 'umbrella', name: 'Прозрачный зонт-трость Clear', category: 'accessories', image: 'images/2026-05-27_12-57-54.png', price: 880, description: 'Прозрачный зонт-трость' },

        // КАНЦЕЛЯРИЯ
        { id: 'notebook', name: 'Ежедневник', category: 'stationery', image: 'images/2026-05-27_12-56-25.png', price: 650, description: 'Chillout, недатированный, красный' },
        { id: 'folder', name: 'Папка с резинками', category: 'stationery', image: 'images/2026-05-27_12-57-42.png', price: 62, description: 'Папка А4, пластик' },
        { id: 'pen-scribo', name: 'Ручка шариковая Scribo', category: 'stationery', image: 'images/2026-05-27_12-58-02.png', price: 140, description: 'Красная ручка Scribo' },
        { id: 'pen-slider', name: 'Ручка шариковая Slider', category: 'stationery', image: 'images/2026-05-27_12-58-06.png', price: 49, description: 'Красная с белым ручка' },
        { id: 'flash-drive', name: 'Флешка «Капсула»', category: 'stationery', image: 'images/2026-05-27_13-00-02.png', price: 700, description: 'Красная флешка, 8 Гб' },
        { id: 'plastic-bag', name: 'Пакет ПВД', category: 'stationery', image: 'images/2026-05-27_12-57-16.png', variants: [{ label: '20×30 см', price: 20 }, { label: '30×40 см', price: 19 }, { label: '40×50 см', price: 18 }], description: 'Пакет ПВД' },

        // СУВЕНИРЫ
        { id: 'toy-uchik', name: 'Сувенирная игрушка «Учик»', category: 'souvenirs', image: 'images/2026-05-27_12-59-04.png', variants: [{ label: 'Малый', price: 100 }, { label: 'Большой', price: 215 }], description: 'Мягкая игрушка Учик' },
        { id: 'magnet-uchik', name: 'Учик магнит', category: 'souvenirs', image: 'images/2026-05-27_12-59-56.png', price: 75, description: 'Магнит с Учиком' },
        { id: 'pin-ordered', name: 'Значок заказной с логотипом ЧГУ', category: 'souvenirs', image: 'images/2026-05-27_12-56-30.png', variants: [{ label: '56 мм, тираж 100 шт', price: 21 }, { label: '56 мм, тираж 200 шт', price: 19 }], description: 'Заказной значок с логотипом ЧГУ' },
        { id: 'pin-filled', name: 'Значок заливной', category: 'souvenirs', image: 'images/2026-05-27_12-56-51.png', price: 83, description: 'Заливной значок' },
        { id: 'reflector', name: 'Светоотражатель «Сердце»', category: 'souvenirs', image: 'images/2026-05-27_12-57-49.png', price: 85, description: 'Красный светоотражатель' },

        // ПРОЧЕЕ
        { id: 'dumbbell', name: 'Гантель', category: 'other', image: 'images/2026-05-27_12-56-20.png', price: 500, description: 'Heracles 1 кг, красная' },
        { id: 'mug', name: 'Кружка с манжетом', category: 'other', image: 'images/2026-05-27_12-56-57.png', price: 220, description: 'Кружка с манжетом' },
        { id: 'ball', name: 'Мяч футбольный', category: 'other', image: 'images/2026-05-27_12-57-10.png', price: 660, description: 'Street, бело-красный' },
        { id: 'whistle', name: 'Свисток на шнурке Ready', category: 'other', image: 'images/2026-05-27_12-58-17.png', price: 95, description: 'Белый свисток' },
        { id: 'bottle', name: 'Спортивная бутылка Marathon', category: 'other', image: 'images/2026-05-27_12-58-58.png', price: 800, description: 'Красная спортивная бутылка' },
        { id: 'thermo-cup', name: 'Термостакан Forma', category: 'other', image: 'images/2026-05-27_12-59-41.png', price: 780, description: 'Красный термостакан, 350 мл' }
    ];
}

function loadProducts() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
    } catch (e) {}
    const defaults = getDefaultProducts();
    saveProducts(defaults);
    return defaults;
}

function saveProducts(products) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(products)); } catch (e) {}
}