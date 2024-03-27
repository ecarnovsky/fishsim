# Fish Sim

Fish Sim is my first ever back-end project. In it users can manage their own virtual fish tank and raise unique fish. I made Fish Sim mainly to gain practice setting up and interacting with databases. Currently Fish Sim uses MongoDB Atlas to store data, but I plan on moving it to a relational database in the future.
Fish Sim is still very much so a work in progress. Currently I’m focusing on database interactions and making sure the code is written in a scalable way. Once I get to the point where I’m really to start working on the UI, I plan to learn and use React.

You can see FishSim [here](https://fishsim.onrender.com/). (Please wait a few minutes for everything to boot up after clicking the link)
WARNING: FishSim is still in testing, so I am regularly resetting the database. Your account will be deleted at some point in the future.

The template I used to help me get started can be found [here](https://github.com/100devs/todo-mvc-auth-local).

## Features I plan to add:
- Ability to upload a profile picture
- ~~Cron jobs that interact with the database~~ Added!
- Discussion forums
- Koi and Bettas
- More realistic guppy color genetics
- Convert all server-side JavaScript code to TypeScript

## To build:
- Do `npm install`
- Create `/config/.env`
- Inside define `PORT, DB_STRING`, `CRON_JOB_SERVER_KEY`, and `CRON_JOB_GITHUB_KEY` environment variables.
  - `PORT`: Set to whatever port you would like to use.
  - `DB_STRING`: Use MongoDB to generate a unique string that can connect you to your database.
  - `CRON_JOB_SERVER_KEY` & `CRON_JOB_GITHUB_KEY`: I use these to make sure that aging up fish can only be done through nightly cron jobs or through testing. Set `CRON_JOB_SERVER_KEY` to a hard to guess passphrase in `/config/.env`, then set up `CRON_JOB_GITHUB_KEY` as a secret on GitHub that's equal to the same passphrase. Locally, you can set `CRON_JOB_GITHUB_KEY` to equal the passphrase for testing, but be sure to set it as undefined on the live server.
 
## Logical Data Model:

![A screenshot of my blog](https://github.com/ecarnovsky/ecarnovsky/blob/main/images/fishsim-3-26-dark.drawio.png)
