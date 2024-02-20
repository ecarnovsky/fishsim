# Fish Sim

Fish Sim is my first ever back-end project. In it users can manage their own virtual fish tank and raise unique fish. I made Fish Sim mainly to gain practice setting up and interacting with databases. Currently Fish Sim uses MongoDB Atlas to store data, but I plan on moving it to a relational database in the future.
Fish Sim is still very much so a work in progress. Currently I’m focusing on database interactions and making sure the code is written in a scalable way. Once I get to the point where I’m really to start working on the UI, I plan to learn and use React.

The template I used to help me get started can be found [here](https://github.com/100devs/todo-mvc-auth-local).

## 2/13/2024 Update 
I went ahead and added a fish image generator to the client-side code. It draws a simple image on a canvas element using information from the DB about what the fish should look like. 

## 2/20/2024 Update 
Fish now age in real time. Everyday at 2am EST all the fish in the database have their age increased by one.

## Features I plan to add:
- Ability to upload a profile picture
- ~~Cron jobs that interact with the database~~
- Discussion forums
- Koi and Bettas
- More realistic guppy color genetics

## To build:
- Do npm install
- Create /config/.env
- Inside define a PORT and DB_STRING environment variable. Use your unique MongoDB database to generate the string.
- The DB_STRING needs to also be defined as a secret in your environment on GitHub. This allows the cron jobs to run. 
