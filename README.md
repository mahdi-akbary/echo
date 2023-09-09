# Chekout Plus

Provides extension to enhance your shop checkout
## App Setup

To run the application in development environment please follow these steps: 

- Clone the repo
- Copy .env.example to ./web/.env `./cp .env.example .env`
- update .env based on the your environment 
- create database in Supabase and update the .env
- run `./yarn dev` to run application
- update the extension -> src/index.jsx with the Base URL of the generated cloadflared url.

## Supabase setup
- Create New DB
- Generate [`ACCESS TOKEN`] form your supabase account 
- `cd ./web`
- `yarn supabase login` 
- Set the `SUPAbASE_PROJECT_REF` and `SUPAbASE_PROJECT_DB_PASSWORD` from your supabase account
- `yarn supabase:link` 
- `yarn db:reset`

### for running migration and creating migration please use below commands in ./web
- `yarn make:migration`
- `yarn migrate`


## Production deployment
- For Supabase please refer to above section 
- The fly is already setup and can be modified in fly.toml
- please get the shopify secret key from your acount and run following command
- `yarn shopify app env show` to display shopify api secret
- `flyctl secrets set SHOPIFY_API_SECRET=<API_SECRET>`
- run `yarn deploy-fly` from project root to deploy latest changes.

##  for deploying extensions:
- if only there is new changes for extensions
- set the BASE_URL for extesions ./recommendation/src/index.jsx  and ./free-gift/src/index.jsx 
- run `yarn deploy --reset` and select the correct store and app


