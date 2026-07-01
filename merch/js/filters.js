let currentSortMode = 'default';
let currentCategory = 'all';
let searchQuery = '';

function getFilteredProducts(products) {
    let filtered = [...products];
    
    if (currentCategory !== 'all') {
        filtered = filtered.filter(p => p.category === currentCategory);
    }
    
    if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const queryWords = query.split(/\s+/).filter(w => w.length > 0);
        
        filtered = filtered.filter(product => {
            const searchText = [
                product.name || '',
                product.description || '',
                product.category || ''
            ].join(' ').toLowerCase();
            
            return queryWords.every(word => searchText.includes(word));
        });
    }
    
    return filtered;
}

function getSortedProducts(filteredProducts) {
    if (currentSortMode === 'asc') {
        return filteredProducts.sort((a, b) => {
            const priceA = a.variants ? Math.min(...a.variants.map(v => v.price)) : a.price;
            const priceB = b.variants ? Math.min(...b.variants.map(v => v.price)) : b.price;
            return priceA - priceB;
        });
    }
    if (currentSortMode === 'desc') {
        return filteredProducts.sort((a, b) => {
            const priceA = a.variants ? Math.max(...a.variants.map(v => v.price)) : a.price;
            const priceB = b.variants ? Math.max(...b.variants.map(v => v.price)) : b.price;
            return priceB - priceA;
        });
    }
    return filteredProducts;
}