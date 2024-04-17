
const baseUrl = 'https://yaem.kz/'
// All project endpoints
const apiUrls = {
    'loginUser': baseUrl + 'api/v1/auth/jwt/create/',
    'createUser':  baseUrl + 'api/v1/auth/create',
    'getUserPhoneNumber': baseUrl + 'api/v1/auth/phone-number',
    'payment': baseUrl + 'api/v1/auth/payment/',
    'client': baseUrl + 'api/v1/menu/clients/',
    'city': baseUrl + 'api/v1/menu/city/'
}



export default apiUrls
