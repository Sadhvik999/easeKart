// Fetch real-time Amazon product data from RapidAPI
async function fetchAmazonProducts() {
    const searchUrl = 'https://real-time-amazon-data.p.rapidapi.com/search?query=laptop&page=1&country=US';

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': process.env.RAPIDAPI_KEY || '9a4a00eb96msh4abc67f0e62ad78p16b6afjsnfbf1de091569',
            'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
        }
    };

    try {
        console.log('🔍 Fetching real-time Amazon products...\n');

        const response = await fetch(searchUrl, options);
        const result = await response.json();

        if (result.data && result.data.products) {
            console.log(`✅ Found ${result.data.products.length} products\n`);

            // Transform products to match Prisma schema exactly
            const products = result.data.products.map(product => {
                // Parse price - handle null and remove currency symbols
                let price = 0;
                if (product.product_price) {
                    price = parseFloat(product.product_price.replace(/[^0-9.]/g, ''));
                } else if (product.product_minimum_offer_price) {
                    price = parseFloat(product.product_minimum_offer_price.replace(/[^0-9.]/g, ''));
                }

                // Parse rating - convert to Float
                const rating = parseFloat(product.product_star_rating) || 0;

                // Determine category based on product title
                let category = 'Electronics';
                const title = product.product_title.toLowerCase();
                if (title.includes('laptop')) category = 'Laptop';
                else if (title.includes('chromebook')) category = 'Chromebook';
                else if (title.includes('macbook') || title.includes('apple')) category = 'Apple';
                else if (title.includes('phone') || title.includes('smartphone')) category = 'Smartphone';
                else if (title.includes('tablet') || title.includes('ipad')) category = 'Tablet';
                else if (title.includes('gaming')) category = 'Gaming';

                // Build description from available data
                const descParts = [];
                if (product.product_badge) descParts.push(product.product_badge);
                if (product.sales_volume) descParts.push(product.sales_volume);
                if (product.delivery) descParts.push(product.delivery);
                const description = descParts.join(' - ');

                // Return object matching Prisma schema
                return {
                    name: product.product_title,           // Maps to: name (String, VarChar 255)
                    price: price,                          // Maps to: price (Float)
                    Category: category,                    // Maps to: Category (String, optional)
                    imageUrl: product.product_photo,       // Maps to: imageUrl (String, Text)
                    description: description || null,      // Maps to: description (String, Text, optional)
                    rating: rating                         // Maps to: rating (Float)
                };
            }).filter(p => p.price > 0 && p.imageUrl); // Filter out invalid products

            // Output as JavaScript array
            console.log('📦 Product data fetched successfully!\n');
            console.log('const products = ' + JSON.stringify(products, null, 2) + ';\n');
            console.log(`\n✅ Generated ${products.length} valid products`);

            return products;
        } else {
            console.error('❌ No products found in API response');
            return [];
        }

    } catch (error) {
        console.error('❌ Error fetching Amazon data:', error.message);
        return [];
    }
}

fetchAmazonProducts();
