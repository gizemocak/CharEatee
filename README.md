# Chareatee

## Project description:
- The application is to create opportunity for grocery stores to reduce waste as more than half of all food produced in Canada is lost or wasted, report says, this also create hugh enviromental impacts.

- The app built connection between grocery stores and charity organization in Greater Toronto area. Food near or past its best-before date will be posted/donated by gorcey store on daily basis, certified charity organization will be able to search/select food from those stores on map, and then distribute to their community.


### Target audience
- Gorcery stores
- Charity Organizations (food banks)

## User Stories

#### As grocery owner, I follow regulation strictly to provide fresh food to my customers, but there are still a lot of perishable food wasted everyday. Once food hits its sell-by date, they became unsaleables, I will be able to use the app: 
- Login as grocery store owner / register if first time using the app
- Post Food near or past its best-before date with prodcut photos, name, qty on daily basis
- Once I got SMS and order from app, I will be able to contact with charity organization to arrange food delivery.
![](https://github.com/gizemocak/final-project/blob/master/client/public/images/donation.gif)

#### As charity orgnization, I want to help my community and collect information from grocery store:
- Login as charity organization/ register if first time using the app
- check on map to see all stores posted food for donation around me
- when I click one store, I will have the detailed list of donation food
- I could select and add to my cart, then place order with no money traction though
- The App will send SMS to grocer once order being placed
![](https://github.com/gizemocak/final-project/blob/master/client/public/images/charity.gif)


## Stack Choice
- Front-End: React.JS
- Back-End: Express.JS
- Database: Postgres
- Others: React_router, State managment, Axios, HTML, SCSS, Google Map API, Firebase, Twilio

## Stretch:
- Websocket
- WebAPI for courier service for donation transporation


## Team members
- Gizem Ocak 
- ChenChen Kuang
- Tammy Ji


## Getting Started

1. Front-End
- Start with -> finalproject/client npm start
- React runs on localhost:3000

2. Back-End
- Express server runs on localhost:8080
- start with -> finalproject npm start

3. If you would like to receive an SMS confirmation from Twilio, you will need to create a free account
- Once you have obtained your Account SID and Authentication Token, create a .env file in the main folder
- In that file, enter the following:
- TWILIO_ACCOUNT_SID=your_account_sid_here
- TWILIO_AUTH_TOKEN=your_auth_token_here

4. Enjoy!

