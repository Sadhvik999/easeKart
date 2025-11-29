// Fetch 250+ real-time Amazon products from multiple categories
async function fetchMultipleCategories() {
    const categories = [
        { query: 'laptop', pages: 5 },
        { query: 'smartphone', pages: 5 },
        { query: 'tablet', pages: 3 },
        { query: 'headphones', pages: 3 },
        { query: 'smartwatch', pages: 3 },
        { query: 'camera', pages: 2 },
        { query: 'gaming console', pages: 2 },
        { query: 'keyboard', pages: 2 },
        { query: 'mouse', pages: 2 }
    ];

    const apiKey = process.env.RAPIDAPI_KEY || '9a4a00eb96msh4abc67f0e62ad78p16b6afjsnfbf1de091569';
    let allProducts = [];

    console.log('🔍 Fetching Amazon products from multiple categories...\n');

    for (const category of categories) {
        for (let page = 1; page <= category.pages; page++) {
            try {
                const searchUrl = `https://real-time-amazon-data.p.rapidapi.com/search?query=${encodeURIComponent(category.query)}&page=${page}&country=US`;

                const options = {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': apiKey,
                        'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
                    }
                };

                console.log(`Fetching ${category.query} - Page ${page}...`);
                const response = await fetch(searchUrl, options);
                const result = await response.json();

                if (result.data && result.data.products) {
                    const products = result.data.products.map(product => {
                        // Parse price
                        let price = 0;
                        if (product.product_price) {
                            price = parseFloat(product.product_price.replace(/[^0-9.]/g, ''));
                        } else if (product.product_minimum_offer_price) {
                            price = parseFloat(product.product_minimum_offer_price.replace(/[^0-9.]/g, ''));
                        }

                        // Parse rating
                        const rating = parseFloat(product.product_star_rating) || 0;

                        // Determine category
                        let productCategory = 'Electronics';
                        const title = product.product_title.toLowerCase();
                        if (title.includes('laptop') || title.includes('notebook')) productCategory = 'Laptop';
                        else if (title.includes('chromebook')) productCategory = 'Chromebook';
                        else if (title.includes('macbook') || title.includes('mac ')) productCategory = 'Apple';
                        else if (title.includes('phone') || title.includes('smartphone') || title.includes('iphone')) productCategory = 'Smartphone';
                        else if (title.includes('tablet') || title.includes('ipad')) productCategory = 'Tablet';
                        else if (title.includes('headphone') || title.includes('earbuds') || title.includes('airpods')) productCategory = 'Audio';
                        else if (title.includes('watch') || title.includes('smartwatch')) productCategory = 'Wearable';
                        else if (title.includes('camera') || title.includes('gopro')) productCategory = 'Camera';
                        else if (title.includes('gaming') || title.includes('playstation') || title.includes('xbox') || title.includes('nintendo')) productCategory = 'Gaming';
                        else if (title.includes('keyboard')) productCategory = 'Accessories';
                        else if (title.includes('mouse')) productCategory = 'Accessories';

                        // Build description
                        const descParts = [];
                        if (product.product_badge) descParts.push(product.product_badge);
                        if (product.sales_volume) descParts.push(product.sales_volume);
                        if (product.delivery) descParts.push(product.delivery);
                        const description = descParts.join(' - ');

                        return {
                            name: product.product_title,
                            price: price,
                            Category: productCategory,
                            imageUrl: product.product_photo,
                            description: description || null,
                            rating: rating
                        };
                    }).filter(p => p.price > 0 && p.imageUrl);

                    allProducts.push(...products);
                    console.log(`✅ Added ${products.length} products from ${category.query} page ${page}`);
                }

                // Small delay to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 500));

            } catch (error) {
                console.error(`❌ Error fetching ${category.query} page ${page}:`, error.message);
            }
        }
    }

    console.log(`\n📦 Total products fetched: ${allProducts.length}\n`);
    console.log('const products = ' + JSON.stringify(allProducts, null, 2) + ';\n');
    console.log(`\n✅ Generated ${allProducts.length} valid products for seeding`);

    return allProducts;
}

fetchMultipleCategories();
