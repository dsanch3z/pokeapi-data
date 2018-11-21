<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Pokedex static site powered by Pokeapi & Gatsby
</h1>

This project is a fork of https://github.com/PokeAPI/api-data, it contains all the Pokeapi JSON files and a `gatsby` folder containing the static site and additional data and assets generated using custom scripts and gatsby plugins.

## 🚀 Quick start

1.  **Clone the project and install dependencies.**

    ```sh
    git clone https://github.com/cube5/pokeapi-data
    ```

    ```sh
    # Navigate to gatsby folder and install dependencies
    cd gatsby && npm i
    ```

1.  **Seed the `data` folder.**

    Run the `seed` script (see `gatsby/package.json`).

    ```sh
    # You can use the --limit {number} arg to copy just the files you specify
    npm run seed
    ```

1.  **Upload the images to [Coludinary](https://cloudinary.com/) and create references to them in JSON files**

    This script takes the `pokemon` folder from the folder generated with the `seed` script and uploads the necessary sprites to a cloudinary account (you'll need to provide the env keys included in the `.env.example` file). Currently the source of those images is [Pokestadium](http://pokestadium.com/).

    After each uploaded img, the script creates a JSON file inside `data/pokemon-images` containing the uploaded asset url.

    ```sh
    npm run images
    ```

1.  **Star the project (finally xD)**

    ```sh
    npm run develop
    ```

    Your site is now running at `http://localhost:8000`!

    \_Note: You'll also see a second link: `http://localhost:8000/___graphql`. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql).\_

## 🧐 What's inside?

A quick look at the important files and directories to undestand what do they do and how the project works.

    .
    ├── src
      ├── data
        ├── pokeapi
        ├── pokemon-images
    ├── plugins
      ├── gatsby-source-pokeapi-local
    ├── scripts
      ├── seed.js
      ├── images.js
    ├── gatsby-config.js
    ├── gatsby-node.js

1.  **`src/data`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

1.  **`src/data/pokeapi`**: This folder remains empty until you run the `seed` script, then it contains the necessary json files extracted from the `../data/api/v2` folder.

1.  **`src/data/pokemon-images`**: This folder remains empty until yo run the `images` script, then it contains one JSON file for each pokemon in `src/data/pokeapi/pokemon` (you have to run the `seed` script first) with the uploaded images urls so we can use them in the project.

1.  **`/plugins/gatsby-source-pokeapi-local`**: This is a local gatsby plugin that takes the pokeapi data (`src/data/pokeapi`) and create the GraphQL nodes so we can query them in the project with some Gatsby magic.

1.  **`/scripts/seed.js`**: It takes the pokeapi data from `../data/api/v2` folder and copies the indicated files to `src/data/pokeapi`. During development it only copies a limit of 151 children (you can use the `--limit {number}` flag to indicate a different quantity) of each specified folder to avoid memory issues. In the production build it copies everything. It detects the current environment with the `NODE_ENV` env variable.

1.  **`/scripts/images.js`**: It reads the `src/data/pokeapi/pokemon` folder and uploads an image for each pokemon you have in there, it also generates the JSON files to reference them into `src/data/pokemon-images`.

1.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

1.  **`gatsby-node.js`**: This is were we query some GraphQL nodes and generate the necessary pages using the templates from the `src/templates` folder.

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.org/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.org/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.org/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.

## 💫 Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/gatsbyjs/gatsby-starter-default)

## 🙏🏽 Credits

This project wolud not exist whitout these guys.

[Gatsby](https://github.com/gatsbyjs/gatsby) - REALLY FUCKING FAST

[Pokeapi Data](https://github.com/PokeAPI/api-data) - Well, I'm using all their data so this project would not be possible whitout those guys, it contains a BUNCH of data, it is an incredible project and great effort.

[Pokedex.org](https://pokedex.org) (ideas and inspiration) - Great project

[Pokestadium](http://pokestadium.com/) - I'm pokemon sprites they host to upload them to Cloudinary.

[CSS Animated Pokeball Codepen](https://codepen.io/raubaca/pen/obaZmG) by [Rau](https://codepen.io/raubaca/#) - Awesome css only animated pokeball.

[Cloudinary](https://cloudinary.com) - Great free tier and fast CDN for images.

[Netlify](https://www.netlify.com) - Incredible static hosting.
