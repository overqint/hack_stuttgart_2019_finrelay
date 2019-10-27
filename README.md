# finrelay-prep
FinRelay

First install the dependencies: change to `finrelay-prep/packages/common/` directory
<br/>
execute: `npm install`

## Backend:
### Install Backend
Go to the `finrelay-prep/packages/backend/` directory
<br/>
Install with the command:
<br/>
`npm install`

### Start Backend
For running the backend execute:
<br/>
`npm run start`

## Install angular on your system:
`sudo npm i -g @angular/cli`

## Frontend
### Install Frontend
To install the  angular frontend change to the directory `finrelay-prep/packages/frontend/`
<br/>
install with command: `npm install`
<br/>
#### Start Frontend
start the frontend with the command: `ng s -o`
<br/>
(command explanation: angular serve and open default browser for viewing)
<br/>

<br/>
Open the browser (if not already opened);
<br/>
the app runs under: http://localhost:4200/

# Adding a bank account to the app

Menu, go to: accounts > manage > new

you need to enter the accounts `iban` and the genereated `access_token` to authorize the app (api) 

## generate a access_token from https://developer.db.com/

- developer.db website, go to menu: *Dashboard* > *My test users* > Create test user (or use an existing one)
- go to main menu: *Documentation* > *API Explorer* and click authorize > click all the checkboxes 
- from *My test users* choose the user and copy the `FKN + PIN` (press the copy link)
- past the copied `FKN + PIN` into the input box and the `access_token` will be generated

### Troubleshooting

If on the developer.db portal, the multiple checkboxes for authorization do not appear while creating a new `access_token`, the app will be probabyl not authorized and will not be able to get the account data 

