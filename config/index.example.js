exports.SESSION_SECRET = 'yourKeyGoesHere';
exports.PORT = '8080';
exports.API_URL =
    process.env.NODE_ENV === 'production'
        ? 'https://productionURLgoesHere'
        : `http://localhost:${exports.PORT}`;

//Github
exports.GITHUB_CLIENT_ID = 'clientId';
exports.GITHUB_CLIENT_SECRET = 'clientSecret';
exports.GITHUB_CALLBACK_URL = `${exports.API_URL}/auth/github/callback`

//React App
exports.CLIENT_URL = 'http://localhost:3000';

//Download link
exports.DOWNLOAD_LINK = `${exports.API_URL}/components/`;