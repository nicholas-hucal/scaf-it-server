
![Logo](https://scafit.ca/assets/logo@3x.png)


# SCAFit - Server

SCAFit Server is the complementing app to provide the backend logic to it's companinion SCAFit - Client. This app handles user authorization via Github OAuth login and then provides access to the user to create React components for download to be used in a React project


## Tech Stack

**Client:** React, Sass, React Router Dom, Axios

**Server:** Node, Express, Passport, Knex, MySQL, OAuth


## Features

- Authorization provided by Github login
- User account including saving, editing, deleting components
- Construction of components into corresponding ```.js``` ```.scss``` files
- Zipping into an archive of constructed files
- Files are created on demand
## Run Locally

To deploy this project download or clone the project locally.

You will need the client app available [here](https://github.com/nicholas-hucal/scaf-it)

```cd``` to the project directory

Run ```npm install``` to install dependencies

Open the config folder and enter the required details in .env.example to your current production and development domains.

You will need to create a github application and get your clientId and clientSecret from there. [Setup github application](https://github.com/settings/applications/new).


Change the filename to .env once complete.

```
SESSION_SECRET=yourSecretGoesHere
PORT=8080
API_URL=http://localhost:8080

//Github
GITHUB_CLIENT_ID=clientId
GITHUB_CLIENT_SECRET=clientSecret
GITHUB_CALLBACK_URL=http://localhost:8080/auth/github/callback

//React App
CLIENT_URL=http://localhost:3000

//Download link
DOWNLOAD_LINK=http://localhost:8080/components/
```

Now create a database, using MySQL CLI or GUI Client

Next run ```npx knex init``` to create a knexfile.js in the main directory

Edit the knexfile with your; user, password and database details and change to this structure

```
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'user',
      password: 'password',
      database: 'scaf_it',
      charset: 'utf8',
    },
  }
};
```

Now run ```npm run migrate``` to add the required structure to your database.


Run ```npm start``` to run application


## Roadmap

- Live deployment, due to the complex nature of file creation, deletion and serving, Heroku was unable to handle this application. A more robust server will be required.

- File selection; to allow for the user to determine the types of files to be exported

- Projects; allow users to create a project that will house many components and allow one larger download

- Implement sorting of sibling elements, rows and projects

## Lessons Learned

Throughout development of this project I found a few challenges

OAuth

- The complexity of handling a safe user login while maintaining user details in a database is a delicate balance. There were many lessons learned implementing OAuth into this project such as; handling server callbacks cross-domain, using other companies API's to connect to your own application and how to manage sessions.

RESTful development

- By incorporating multiple small requests to the api on each row add/edit/delete the app runs much smoother than it's original iteration of saving one object at final save. This proved difficult at first to handle all of these requests, however once completed this allowed for much more complex data structures.