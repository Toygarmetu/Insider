(() => {
    const self = {}; // Created self for attaching functions
    
    // Attach functions to self object
    self.buildHTML = () => {
        // Check if carousel already exists to prevent duplicates
        if ($('.product-carousel-container').length > 0) {
            return;
        }
        
        const html = `
            <div class="product-carousel-container">
                <h2 class="product-carousel-title">You Might Also Like</h2>
                <div class="carousel-wrapper">
                    <button type="button" class="carousel-button prev-button"></button>
                    <div class="product-carousel"></div>
                    <button type="button" class="carousel-button next-button"></button>
                </div>
            </div>
        `;

        $('.product-detail').after(html);
        self.loadProducts();
    };

    self.buildCSS = () => {
        const css = `
            .product-carousel-container {
                width: 100%;
                margin: 2rem 0;
                position: relative;
                background-color: #f8f8f8;
                padding: 2rem 0;
                overflow-x: hidden;
            }
            .product-carousel-title {
                font-size: 3rem;
                margin-bottom: 1.25rem;
                text-align: left;
                color: #333;
                padding-left: 0;
                margin-left: 19rem;
                font-weight: 200;
                font-family: Arial, sans-serif;
                line-height: 1.2;
            }
            .carousel-wrapper {
                position: relative;
                overflow: hidden;
                margin: 0 19rem;
                padding: 0;
            }
            .product-carousel {
                display: flex;
                gap: 2rem;
                transform: translateX(0);
                transition: transform 0.3s ease;
                width: 100%;
            }
            .product-slide {
                flex: 0 0 calc((100% - 14rem) / 6.5);
                min-width: calc((100% - 14rem) / 6.5);
            }
            .product-card {
                position: relative;
                text-align: center;
                display: flex;
                flex-direction: column;
                border: none;
                padding: 0;
                background-color: #fff;
                height: 100%;
            }
            .product-card a {
                display: block;
                width: 100%;
                position: relative;
                padding-top: 150%;
                overflow: hidden;
            }
            .product-image {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
                background-color: #fff;
            }
            .product-title {
                font-size: 14px;
                margin: 12px 0 8px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                color: #333;
                line-height: 1.4;
                padding: 0 8px;
                text-align: left;
                min-height: 40px;
                height: 40px;
            }
            .product-price {
                font-weight: bold;
                color: rgb(34, 61, 170);
                margin: 0 0 12px 8px;
                text-align: left;
                height: 20px;
            }
            .favorite-btn {
                position: absolute;
                top: 10px;
                right: 10px;
                background: white;
                border: none;
                cursor: pointer;
                font-size: 16px;
                padding: 8px;
                width: 32px;
                height: 32px;
                border-radius: 4px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
                z-index: 1;
            }
            .favorite-btn::before {
                content: '♡';
                font-size: 20px;
                color: #666;
            }
            .favorite-btn.active::before {
                content: '♥';
                color: rgb(34, 61, 170);
            }
            .carousel-button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 48px;
            height: 48px;
            background: transparent;
            border: none;
            cursor: pointer;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
            }
            .prev-button { 
                left: 10px;
            }
            .next-button { 
                right: 10px;
            }
            .prev-button:after,
            .next-button:after {
                content: "";
                width: 16px;
                height: 16px;
                border-style: solid;
                border-color: #333;
                border-width: 3px 3px 0 0;
                position: absolute;
                top: 50%;
                left: 50%;
            }
            .prev-button:after {
                transform: translate(-25%, -50%) rotate(-135deg);
            }
            .next-button:after {
                transform: translate(-75%, -50%) rotate(45deg);
            }

            @media (max-width: 75rem) { /* 1200px */
                .carousel-wrapper {
                    margin: 0 8rem;
                }
                .product-carousel-title {
                    margin-left: 8rem;
                }
                .product-slide { 
                    flex: 0 0 calc((100% - 10rem) / 4.5);
                    min-width: calc((100% - 10rem) / 4.5);
                }
                .prev-button { left: 1rem; }
                .next-button { right: 1rem; }
            }

            @media (max-width: 48rem) { /* 768px */
                .carousel-wrapper {
                    margin: 0 4rem;
                }
                .product-carousel-title {
                    margin-left: 4rem;
                    font-size: 2.5rem;
                    font-weight: 200;
                }
                .product-slide { 
                    flex: 0 0 calc((100% - 4rem) / 2.5);
                    min-width: calc((100% - 4rem) / 2.5);
                }
                .prev-button { left: 0.5rem; }
                .next-button { right: 0.5rem; }
                .carousel-button {
                    width: 3rem;
                    height: 3rem;
                }
                .prev-button:after,
                .next-button:after {
                    width: 1rem;
                    height: 1rem;
                }
            }

            @media (max-width: 30rem) { /* 480px */
                .carousel-wrapper {
                    margin: 0 2rem;
                }
                .product-carousel-title {
                    margin-left: 2rem;
                    font-size: 1.25rem;
                }
                .product-slide { 
                    flex: 0 0 calc((100% - 2rem) / 1.5);
                    min-width: calc((100% - 2rem) / 1.5);
                }
                .prev-button { left: 0.5rem; }
                .next-button { right: 0.5rem; }
                .carousel-button {
                    width: 2.5rem;
                    height: 2.5rem;
                }
            }

            .carousel-button:disabled {
                opacity: 1;
                cursor: not-allowed;
            }
            .carousel-button:disabled:after {
                border-color: #999;
            }
        `;
    
        $('<style>').addClass('carousel-style').html(css).appendTo('head');
    };

    self.loadProducts = async () => {
        const STORAGE_KEY = 'lcw_carousel_products';
        const cached = localStorage.getItem(STORAGE_KEY);
        
        try {
            let products;
            
            if (cached) {
                products = JSON.parse(cached);
            } else {
                const response = await fetch('https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                products = await response.json();
                
                // Validate product data before caching
                if (!Array.isArray(products)) {
                    products = [];
                }
                
                // Filter out invalid products
                products = products.filter(product => 
                    product && 
                    (product.id || product.productId) && 
                    (product.name || product.title) &&
                    (product.url || product.link || product.productUrl) &&
                    (product.img || product.imageUrl || product.image)
                );
                
                localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
            }
            
            if (products.length === 0) {
                throw new Error('No valid products found');
            }
            // Render products
            self.renderProducts(products);
        } catch (error) {
            console.error('Error loading products:', error);
            $('.product-carousel').html(`
                <div style="text-align: center; padding: 20px;">
                    Unable to load products. Please try again later.
                </div>
            `);
        }
    };

    self.renderProducts = (products) => {
        const carousel = $('.product-carousel');
        const favorites = new Set(JSON.parse(localStorage.getItem('lcw_favorite_products') || '[]'));
        
        products.forEach(product => {
            // Extract product data 
            const {
                id = '',
                name = '',
                price = '',
                url = '',
                img = '',
                imageUrl = '',
                link = '',
                image = ''
            } = product;

            // Handle different possible property names for URLs
            const productUrl = url || link || '#';
            const productImageUrl = img || imageUrl || image || '';

            // Ensure URLs absolute
            const finalProductUrl = productUrl.startsWith('http') 
                ? productUrl 
                : `https://www.lcwaikiki.com${productUrl}`;
                
            const finalImageUrl = productImageUrl.startsWith('http')
                ? productImageUrl
                : `https://www.lcwaikiki.com${productImageUrl}`;

            const slide = $(`
                <div class="product-slide">
                    <div class="product-card">
                        <a href="${finalProductUrl}" target="_blank">
                            <img class="product-image" 
                                 src="${finalImageUrl}" 
                                 alt="${name}"
                                 onerror="this.onerror=null; this.src='https://www.lcwaikiki.com/images/no-image.jpg';">
                        </a>
                        <button class="favorite-btn ${favorites.has(id) ? 'active' : ''}"
                                data-id="${id}"></button>
                        <h3 class="product-title">${name}</h3>
                        <div class="product-price">${price} TL</div>
                    </div>
                </div>
            `);
            carousel.append(slide);
        });
    };

    self.setEvents = () => { // Set events for carousel
        let currentPosition = 0;
        let isAnimating = false;

        const getSlideWidth = () => {
            const carousel = $('.product-carousel');
            const totalWidth = carousel.width();
            return (totalWidth - 120) / 6.5 + 20; // Account for gap
        };



        const slide = (direction) => { // Slide function
            if (isAnimating) return;
            isAnimating = true;

            const carousel = $('.product-carousel');
            const slideWidth = getSlideWidth();
            const maxScroll = -(carousel[0].scrollWidth - carousel.width());

            if (direction === 'prev') {
                currentPosition = Math.min(currentPosition + slideWidth, 0);
            } else {
                currentPosition = Math.max(currentPosition - slideWidth, maxScroll);
            }

            carousel.css('transform', `translateX(${currentPosition}px)`);
            
            setTimeout(() => {
                isAnimating = false;
            }, 300);
        };

        // Event listeners
        $('.prev-button').on('click', () => slide('prev'));
        $('.next-button').on('click', () => slide('next'));

        // Handle window resize
        let resizeTimeout;
        $(window).on('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                currentPosition = 0;
                $('.product-carousel').css('transform', 'translateX(0)');
            }, 150);
        });
        
        $(document).on('click', '.favorite-btn', function() { // Add event listener for favorite button
            const btn = $(this);
            const productId = btn.data('id');
            const favorites = new Set(JSON.parse(localStorage.getItem('lcw_favorite_products') || '[]'));
            
            if (favorites.has(productId)) {
                favorites.delete(productId);
                btn.removeClass('active');
            } else {
                favorites.add(productId);
                btn.addClass('active');
            }
            
            localStorage.setItem('lcw_favorite_products', JSON.stringify([...favorites]));
        });
    };
    // Init function to run the code
    const init = () => {
        if (!document.querySelector('.product-detail')) return;
        self.buildHTML();
        self.buildCSS();
        self.setEvents();
    };
    
    if (typeof jQuery === 'undefined') { // Check if jQuery is loaded, if not, load it (from first rule)
        const script = document.createElement('script');
        script.src = 'https://code.jquery.com/jquery-3.6.0.min.js'; 
        script.onload = init;
        document.head.appendChild(script);
    } else {
        init();
    }

})();