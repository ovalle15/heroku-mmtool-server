# management-tool
trial management tool

I have created a tool that could potentially help my team at Dana Farber with trial managment.

## Trial management workflow this application could support:

### Not admin users:

1) Add a row to the table with the protocol that you want to review
2) Add a comment
3) Change status

### Admin users:

1) Add a row to the table with the protocol that you want to review
2) Add a comment
3) Change status
4) Upload a trial (yml document) into a mongo database to save the trial that was approved.

### To start the application:

1) Create a mongo db called management. Three different collections will be created once you start using the application
    - items: history comments and trial status will are stored in this collection
    - users: stores user information
    - historyTrials: yml document are stored in this collection

2) Navigate to the client-side and run the following:
    -  npm i
    -  yarn start

3) Navigate to the server folder and run the following:
    - npm i
    - nodemon index.js

#### Note that many of the endpoints use in the application are only for internal use at Dana Farber.

Buttons meant to be only functional internally:
- Download cloud (main page) -> downloads a yml doc with the protocol number specified
- Oncpro (review page) -> Navigates to an internal app
- MatchMiner (review page) -> Navigates to the production environment
- Staging (review page) -> Navigates to the staging environment

