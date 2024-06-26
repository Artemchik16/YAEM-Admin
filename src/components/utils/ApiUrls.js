
const baseUrl = 'https://yaem.kz/'
// All project endpoints
const apiUrls = {
    // AUTH
    'loginUser': baseUrl + 'api/v1/auth/jwt/create/',
    'refreshTokens': baseUrl + 'api/v1/auth/jwt/refresh/',
    'createUser':  baseUrl + 'api/v1/auth/create',
    'getUserPhoneNumber': baseUrl + 'api/v1/auth/phone-number',
    // PAYMENTS
    'payment': baseUrl + 'api/v1/auth/payment/',
    // CLIENTS
    'client': baseUrl + 'api/v1/menu/clients/',
    // CITIES
    'city': baseUrl + 'api/v1/menu/city/'
    // CATEGORIES

    // SUBCATEGORIES

    // DISHES
}



export default apiUrls
