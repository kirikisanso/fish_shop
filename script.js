document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const products = document.querySelectorAll('.product');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartModal = document.getElementById('cartModal');
    const openCartBtn = document.getElementById('openCart');
    const closeCartBtn = document.getElementById('closeCart');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cartCount');

    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const categoryFilter = document.getElementById('categoryFilter');
    const applyFilterBtn = document.getElementById('applyFilter');

    const productModal = document.getElementById('productModal');
    const closeModal = document.getElementById('closeModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalPrice = document.getElementById('modalPrice');
    const modalAddToCart = document.getElementById('modalAddToCart');

    let currentProduct = null;
    const cart = [];

    function updateCart() {
        cartItemsList.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} — ${item.price} сом`;
            cartItemsList.appendChild(li);
            total += item.price;
        });
        cartTotal.textContent = total;
        cartCount.textContent = cart.length;
    }

    addToCartButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const product = e.target.closest('.product');
            cart.push({
                name: product.dataset.name,
                price: parseInt(product.dataset.price)
            });
            updateCart();
        });
    });

    openCartBtn.addEventListener('click', () => {
        cartModal.classList.remove('hidden');
    });

    closeCartBtn.addEventListener('click', () => {
        cartModal.classList.add('hidden');
    });

    function searchProducts() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        products.forEach(product => {
            const title = product.querySelector('.product-title').textContent.toLowerCase();
            const description = product.querySelector('.product-description').textContent.toLowerCase();
            product.style.display = (title.includes(searchTerm) || description.includes(searchTerm)) ? 'block' : 'none';
        });
    }

    searchButton.addEventListener('click', searchProducts);
    searchInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') searchProducts();
    });

    applyFilterBtn.addEventListener('click', () => {
        const min = parseInt(minPriceInput.value) || 0;
        const max = parseInt(maxPriceInput.value) || Infinity;
        const category = categoryFilter.value;
        products.forEach(product => {
            const price = parseInt(product.dataset.price);
            const cat = product.dataset.category;
            const match = price >= min && price <= max && (category === '' || category === cat);
            product.style.display = match ? 'block' : 'none';
        });
    });

    // Модалка описания
    products.forEach(product => {
        product.querySelector('.product-image').addEventListener('click', () => {
            currentProduct = product;
            modalImage.src = product.querySelector('img').src;
            modalTitle.textContent = product.dataset.name;
            modalDescription.textContent = product.querySelector('.product-description').textContent;
            modalPrice.textContent = product.dataset.price + ' сом';
            productModal.classList.remove('hidden');
        });
    });

    closeModal.addEventListener('click', () => {
        productModal.classList.add('hidden');
    });

    modalAddToCart.addEventListener('click', () => {
        cart.push({
            name: currentProduct.dataset.name,
            price: parseInt(currentProduct.dataset.price)
        });
        updateCart();
        productModal.classList.add('hidden');
    });
});
