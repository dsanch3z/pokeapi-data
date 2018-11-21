[![CircleCI](https://circleci.com/gh/PokeAPI/api-data.svg?style=shield)](https://circleci.com/gh/PokeAPI/api-data)

# This is a Fork

This project is a fork of https://github.com/PokeAPI/api-data, it contains all the Pokeapi JSON files and a `gatsby` folder containing the static site and additional data and assets generated using custom scripts and gatsby plugins.

# PokeAPI Data

This repository contains:

- [data/api](data/api): a static copy of the JSON data generated with the above script
- [data/schema](data/schema): a static copy of the PokeAPI schema generated from the above data
- [updater](updater): a [Ditto][1] based bot that runs in docker and can update the data stored in this repo
- [gatsby](gatsby) a folder containing the Gatsby project to create a static site using all this data. I was created in this fork.

# Usage

If you'd like to use the JSON for your own purposes, you can apply your own base URL using [Ditto][1]:

```
ditto transform --base-url='https://pokeapi.co'
```

# Updater Bot

You can manually update the data if necessary. See [the updater bot](updater).
You can run the bot in docker, or read and adapt its update script yourself.

[1]: https://github.com/pokeapi/ditto
