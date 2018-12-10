const fs = require("fs-extra")
const path = require("path")
const ora = require("ora")
const argv = require("yargs").argv

const SRC = `${path.dirname(path.dirname(__dirname))}/data/api/v2`
const DEST = `${path.dirname(__dirname)}/src/data/pokeapi`
const FILES = ["pokemon", "pokemon-species", "evolution-chain", "type"] // necessary folders only
const isProduction = process.env.NODE_ENV === "production"

const spinner = ora(`Initiating`).start()
spinner.info(`Copying files from ${SRC} to ${DEST}`)

if (fs.existsSync(DEST)) fs.removeSync(DEST)

fs.mkdirSync(DEST)

if (isProduction) {
  spinner.warn(`Production environment detected, copying all files.`)
  FILES.forEach(file => {
    const src = `${SRC}/${file}`
    const dest = `${DEST}/${file}`

    spinner.info(`Copying ${src} to ${dest}`)

    fs.copySync(`${src}`, `${dest}`)

    // There is a index.json file in each folder, so we need to delete it
    if (fs.existsSync(`${dest}/index.json`)) {
      spinner.info(`Deleting ${dest}/index.json file`)
      fs.removeSync(`${dest}/index.json`)
    }
  })
} else {
  // When using local environment we just want to copy certain files to
  // avoid memory problems.
  const LIMIT = argv.limit || 151
  if (!argv.limit) {
    spinner.warn(`No --limit arg provided, using default value: ${LIMIT}`)
  }

  FILES.forEach(file => {
    spinner.info(`Copying ${SRC}/${file}`)

    if (file !== "index.json") {
      fs.mkdirSync(`${DEST}/${file}`)

      const children = fs
        .readdirSync(`${SRC}/${file}`)
        .filter(child => child !== "index.json") // we dont need the index.json
        .sort((a, b) => +a - +b) // order in correct order

      for (let i = 0; i < LIMIT; i++) {
        const child = children[i]

        if (!child) {
          break
        }

        const src = `${SRC}/${file}/${child}`
        const dest = `${DEST}/${file}/${child}`

        fs.mkdirSync(dest)

        fs.copySync(src, dest, {
          recursive: true,
        })
      }
    }
  })
}

spinner.succeed("Done!")
