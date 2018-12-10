require("dotenv").config()
const fs = require("fs-extra")
const path = require("path")
const ora = require("ora")
const cloudinary = require("cloudinary").v2

const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env

const BASE_URL = `http://pokestadium.com/sprites`
const DEST = `${path.dirname(__dirname)}/src/data`
const POKEAPI_DATA_DIR = `${path.dirname(__dirname)}/src/data/pokeapi`
const POKEMONS_DIR = `${POKEAPI_DATA_DIR}/pokemon`

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
})

const spinner = ora("Uploading necessary pokemon assets").start()
spinner.info(`Source path: ${POKEMONS_DIR}`)

const pokemonImagesJSONFolder = `${DEST}/pokemon-images`
const pokemonImageJSONFile = `${pokemonImagesJSONFolder}/pokemon-images.json`
let pokemonImages = []

if (fs.existsSync(pokemonImageJSONFile)) {
  spinner.info(`There is a ${pokemonImageJSONFile} already created`)

  pokemonImages = fs.readJSONSync(pokemonImageJSONFile)
} else {
  spinner.info(`Creating: ${pokemonImagesJSONFolder}`)

  fs.mkdirSync(pokemonImagesJSONFolder)

  spinner.info(`Creating ${pokemonImageJSONFile}`)

  fs.createFileSync(pokemonImageJSONFile)
}

main()
  .then(() => {
    fs.writeJSONSync(pokemonImageJSONFile, pokemonImages)

    spinner.succeed(
      `Created json files containing the necessary references to the uploaded assets in ${pokemonImagesJSONFolder}`
    )
    spinner.succeed(`Done.`)
  })
  .catch(err => spinner.fail(err))

async function main() {
  const pokemonIds = fs.readdirSync(POKEMONS_DIR)

  for (let pokemonId of pokemonIds) {
    const pokemonJSON = fs.readJSONSync(
      `${POKEMONS_DIR}/${pokemonId}/index.json`
    )
    const pokemonName = pokemonJSON.name

    const id = `${pokemonName}_front_animated`
    const img = `${BASE_URL}/xy/${patchPokemonName(pokemonName)}.gif`

    try {
      if (!pokemonImages.find(pokemonImage => pokemonImage.id === id)) {
        spinner.info(`Uploading: ${img}`)
        const result = await uploadImage(img, {
          public_id: id,
          folder: `pokeapi_sprites`,
          overwrite: true,
        })

        pokemonImages.push({
          id,
          name: pokemonName,
          src: result.secure_url,
        })

        spinner.succeed(`Uploaded to: ${result.secure_url}`)
      } else {
        spinner.text = `There's already an image with name id`
      }
    } catch (err) {
      spinner.fail(`Failed to upload ${img}, ${err}`)
    }
  }
}

function patchPokemonName(pokemonName = "") {
  if (pokemonName.includes("nidoran")) {
    return pokemonName.replace("-", "")
  }

  if (pokemonName.includes("mega-x")) {
    return pokemonName.replace("mega-x", "megax")
  }

  if (pokemonName.includes("mega-y")) {
    return pokemonName.replace("mega-y", "megay")
  }

  if (pokemonName.includes("deoxys")) {
    return pokemonName.replace("-normal", "")
  }

  return pokemonName
}

async function uploadImage(img, options) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(img, options, function callback(error, result) {
      if (error) {
        reject(error)
      }

      resolve(result)
    })
  })
}
