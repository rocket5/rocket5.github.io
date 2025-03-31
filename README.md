# Rocket 5 Studios
### Makers of innovative and entertaining experiences.

## Overview
Rocket 5 is an award winning game and app development studio founded in 2012 by game industry veterans Catherine Feraday Miller and Tim Miller. Located in Toronto Canada, Rocket 5 is committed to making innovative and entertaining software that can be enjoyed by children and adults alike.

## About Rocket 5
Rocket 5 has over 30 years of combined industry experience. Prior to co-founding Rocket 5, Cathy and Tim worked in several major studios including LucasArts, Crystal Dynamics, DreamWorks and Sega. We've worked on high profile properties such as Indiana Jones, Monkey Island, Tomb Raider, Zombie Apocalypse, Regular Show, The Amazing World of Gumball, The Chronicles of Narnia and Star Wars.

Rocket 5 is community minded and committed to helping create a sustainable video game industry by developing young talent through education, outreach and internships.

## Let's Work Together
Our services include: Systems, Story and Experience Design for games and interactive digital media • 3D Character art and animation • Unity 3D experts • UI and UX design • All aspects of game development including: design, code, production and product release • Project Production and Team Management • Augmented Reality and Virtual Reality game development • and more!

Send an email to hello@rocket5studios.com and let's talk about how we can help with your next project.

## Social media
- Instagram: https://www.instagram.com/rocket5/
- Bluesky: https://bsky.app/profile/rocket5.bsky.social
- Facebook: https://www.facebook.com/rocket5studios
- Contact email: hello@rocket5studios.com

## Our Games

### AR Race Car
#### Augmented Reality just got real.
From life-sized race cars out on the street, beach or backyard to toy-sized cars on your desk or living room floor, AR Race Car gives you the thrill of tire-smoking burnouts, drifting and cornering wherever you are.

Realistic high-res models, shadows, and engine-revving and tire-spinning sound effects will make it feel like the cars are right there with you! Fasten your seat belt, start your engine and prepare to be blown away as you drive your Augmented Reality Race Car anywhere you want in the REAL WORLD!

### The Phantom PI
#### A spooky family-friendly adventure.
In a mansion dripping with mystery and fraught with danger, a poltergeist lurks. Only the Phantom PI can save the day by restoring peace to beloved zombie-ghost rocker Marshall Staxx's after-life. Play as Cecil or Cecilia, paranormal investigator to the ghostly stars while exploring spooky Ravensmaw Manor. Look for clues, hunt for sprites, and solve diabolical puzzles in this charming puzzle game that's sure to provide hours of great family-friendly fun. Adventure!

## Works In Progress

### Kitty Disastrous
#### Experience life as a tiny, dangerous cat in a big world.

### Strangeways
#### Discover clues to your true identity in this VR adventure.
Strangeways is a Virtual Reality third-person action-adventure game. In Strangeways, you play as Agent Fox in an odyssey through a surreal landscape, desperately trying to piece together your lost identity. Mysterious masked villains try to stop you from collecting photographic evidence and clues that you'll need to reconstruct your lost memories on your crazy wall back at home base.

Strangeways is being develped with the financial support of the Ontario Media Development Corporation.

### Experiments and Prototypes
#### You never know when an accident may lead to something really cool.
At Rocket 5 we like to experiment with gameplay ideas in exciting new mediums like Augmented and Virtual Reality. These explorations are leading us down a path filled with creativity and discovery as we strive to develop the next wave of exciting interactive experiences.

## Website Development
This repository contains the code for the Rocket 5 Studios website. The site is built using HTML, CSS, and JavaScript with Bootstrap for responsive design and Vite for the build system.

### Project Structure
```
rocket5.github.io/
├── src/                    # Source files
│   ├── index.html          # Main landing page
│   ├── main.js             # Main JavaScript entry point
│   └── assets/             # Assets for the site
│       ├── css/            # Stylesheets
│       │   └── main.css    # Main stylesheet
│       └── js/             # JavaScript files
│           └── main.js     # Main JavaScript file
├── public/                 # Static assets that will be copied to the build
│   └── CNAME               # Custom domain configuration
├── dist/                   # Build output (generated)
├── .github/                # GitHub configuration
│   └── workflows/          # GitHub Actions workflows
│       └── deploy.yml      # Deployment workflow
├── vite.config.js          # Vite configuration
└── package.json            # NPM package configuration
```

### Development
To run the development server:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Building
To build the site for production:

```bash
npm run build
```

This will generate the site in the `dist` directory.

### Deployment
The site is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment is handled by GitHub Actions using the workflow defined in `.github/workflows/deploy.yml`.

You can also preview the built site locally:

```bash
npm run preview
```