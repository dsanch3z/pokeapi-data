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

const DEST = `${path.dirname(__dirname)}/src/data`
const pokemonImagesJSONFolder = `${DEST}/pokemon-images`
const pokemonImageJSONFile = `${pokemonImagesJSONFolder}/pokemon-images.json`

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
})

const spinner = ora("Initiating").start()

if (!fs.existsSync(pokemonImageJSONFile)) {
  spinner.info("Creating pokemon-images.json file")

  fs.createFileSync(pokemonImageJSONFile)

  spinner.info("Searching in cloudinary")

  cloudinary.search
    .expression("folder=pokeapi_sprites")
    .max_results(300)
    .execute()
    .then(result => {
      console.log(result)
      const pokemonImages = result.resources.map(resource => ({
        id: resource.filename,
        name: resource.filename.replace("_front_animated", ""),
        src: resource.secure_url,
      }))

      fs.writeJSONSync(pokemonImageJSONFile, pokemonImages)
    })
    .catch(err => console.error(err))
} else {
  return
}
