# Fish Sim

FishSim is a browser game where users can collect and raise virtual fish. Each fish has a virtual genome that determines how its image is rendered to the screen. This, along with the fact that each genome is capable of mutating, means there are endless unique fish to collect. 
FishSim uses Node.js, Express.js, EJS, and MongoDB for the back-end, along with GitHub actions for aging the fish.  I’m currently in the process of changing the back-end to TypeScript and learning React so I can better implement the front-end.

The template I used to help me get started can be found [here](https://github.com/100devs/todo-mvc-auth-local).

## Features I plan to add:
- User profiles
- Ability to upload a profile picture
- ~~Cron jobs that interact with the database~~ Added!
- Password resetting
- Ability to trade fish with other users
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

## Screenshots:

![A shreenshot of the fish in FishSim](https://github.com/ecarnovsky/ecarnovsky/blob/main/images/fish-1.png)

 
## Entity Relationship Diagram:

![ERD for FishSim](https://github.com/ecarnovsky/ecarnovsky/blob/main/images/fishsim-erd.drawio.png)
