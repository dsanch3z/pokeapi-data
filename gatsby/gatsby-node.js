const _ = require(`lodash`)
const path = require(`path`)

async function onCreateNode(
  { node, actions, loadNodeContent, createNodeId, createContentDigest },
  pluginOptions
) {
  function getPokeType(pokePath) {
    const dirs = path.dirname(pokePath).split(path.sep)
    const dir = dirs.pop()
    const type = isNaN(parseInt(dir)) ? dir : dirs.pop()
    return type.includes('pokemon') ? type : `Pokemon${_.upperFirst(type)}`
  }

  function getType({ node, object, isArray }) {
    if (pluginOptions && _.isFunction(pluginOptions.typeName)) {
      return pluginOptions.typeName({ node, object, isArray })
    } else if (pluginOptions && _.isString(pluginOptions.typeName)) {
      return pluginOptions.typeName
    } else if (node.internal.type !== `File`) {
      return _.upperFirst(_.camelCase(`${node.internal.type} Json`))
    } else if (isArray) {
      return _.upperFirst(_.camelCase(`${getPokeType(node.relativePath)} Json`))
    } else {
      return _.upperFirst(
        _.camelCase(
          `${getPokeType(node.relativePath) || path.basename(node.dir)} Json`
        )
      )
    }
  }

  function transformObject(obj, id, type) {
    const jsonNode = {
      ...obj,
      id: id,
      children: [],
      parent: node.id,
      internal: {
        contentDigest: createContentDigest(obj),
        type,
      },
    }
    createNode(jsonNode)
    createParentChildLink({ parent: node, child: jsonNode })
  }

  const { createNode, createParentChildLink } = actions

  // We only care about JSON content.
  if (node.internal.mediaType !== `application/json`) {
    return
  }

  const content = await loadNodeContent(node)
  const parsedContent = JSON.parse(content)

  function formatId(id) {
    return id.toLocaleString('es-MX', {
      minimumIntegerDigits: 5,
      useGrouping: false,
    })
  }

  if (_.isArray(parsedContent)) {
    parsedContent.forEach((obj, i) => {
      transformObject(
        obj,
        obj.id ? formatId(obj.id) : createNodeId(`${node.id} [${i}] >>> JSON`),
        getType({ node, object: obj, isArray: true })
      )
    })
  } else if (_.isPlainObject(parsedContent)) {
    transformObject(
      parsedContent,
      parsedContent.id
        ? formatId(parsedContent.id)
        : createNodeId(`${node.id} >>> JSON`),
      getType({ node, object: parsedContent, isArray: false })
    )
  }
}

function createPages({ graphql, actions }) {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allPokemonJson {
          edges {
            node {
              id
              name
              abilities {
                ability {
                  name
                }
                is_hidden
                slot
              }
              base_experience
              forms {
                name
              }
              game_indices {
                game_index
                version {
                  name
                }
              }
              height
              held_items {
                item {
                  name
                }
                version_details {
                  rarity
                  version {
                    name
                  }
                }
              }
              is_default
              location_area_encounters
              moves {
                move {
                  name
                }
                version_group_details {
                  level_learned_at
                  move_learn_method {
                    name
                  }
                  version_group {
                    name
                  }
                }
              }
              order
              species {
                name
              }
              sprites {
                front_default
                back_default
                front_female
                back_female
              }
              stats {
                stat {
                  name
                }
                base_stat
                effort
              }
              types {
                slot
                type {
                  name
                }
              }
              weight
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        console.error('fucking errors', result.errors)
        reject(result.errors)
      }
      result.data.allPokemonJson.edges.forEach(({ node }) => {
        createPage({
          path: node.name,
          component: path.resolve(`./src/templates/pokemon.js`),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            name: node.name,
          },
        })
      })
      resolve()
    })
  })
}

exports.onCreateNode = onCreateNode
exports.createPages = createPages
