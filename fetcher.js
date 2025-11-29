const url = 'https://realtime-amazon-data.p.rapidapi.com/product-details?asin=B09J9X8DLR&country=us';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '9a4a00eb96msh4abc67f0e62ad78p16b6afjsnfbf1de091569',
		'x-rapidapi-host': 'realtime-amazon-data.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}