require("dotenv").config()
const fs = require("fs-extra")
const path = require("path")
const ora = require("ora")
const argv = require("yargs").argv
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

const pokemonIds = fs.readdirSync(POKEMONS_DIR)
const pokemonImagesJSONFolder = `${DEST}/pokemon-images`

if (fs.existsSync(pokemonImagesJSONFolder)) {
  spinner.info(`Deleting previously created: ${pokemonImagesJSONFolder}`)
  fs.removeSync(pokemonImagesJSONFolder)
}

spinner.info(`Creating: ${pokemonImagesJSONFolder}`)
fs.mkdirSync(pokemonImagesJSONFolder)

main()
  .then(() => {
    spinner.succeed(
      `Created json files containing the necessary references to the uploaded assets in ${pokemonImagesJSONFolder}`
    )
    spinner.succeed(`Done.`)
  })
  .catch(err => spinner.fail(err))

async function main() {
  for (let pokemonId of pokemonIds) {
    const pokemonJSON = fs.readJSONSync(
      `${POKEMONS_DIR}/${pokemonId}/index.json`
    )
    const pokemonName = pokemonJSON.name
    const pokemonImageJSONFile = `${pokemonImagesJSONFolder}/${pokemonName}.json`

    const id = `${pokemonName}_front_animated`
    const img = `${BASE_URL}/xy/${patchPokemonName(pokemonName)}.gif`

    try {
      spinner.info(`Uploading: ${img}`)

      fs.createFileSync(pokemonImageJSONFile)

      const result = await uploadImage(img, {
        public_id: id,
        folder: `pokeapi_sprites`,
        overwrite: true,
      })

      fs.writeJSONSync(pokemonImageJSONFile, { [id]: result.secure_url })

      spinner.succeed(`Uploaded to: ${result.secure_url}`)
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
