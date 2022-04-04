exports.SESSION_SECRET = 'a48cfd314fe9d817054ae919ebba596789d5fafc507525f1b5461bc33c78b17f';
exports.PORT = '8080';
exports.API_URL =
    process.env.NODE_ENV === 'production'
        ? 'https://express-bookshelf.herokuapp.com'
        : `http://localhost:${exports.PORT}`;

//Github
exports.GITHUB_CLIENT_ID = 'bb12bf8c8f5526772c85';
exports.GITHUB_CLIENT_SECRET = '0ad2f6cd27bf5b9fe8d5928d828540bd44958863';
exports.GITHUB_CALLBACK_URL = `${exports.API_URL}/auth/github/callback`

//React App
exports.CLIENT_URL = 'http://localhost:3000';

//Download link
exports.DOWNLOAD_LINK = `${exports.API_URL}/components/`;