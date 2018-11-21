const _ = require(`lodash`)
const path = require(`path`)
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.onCreateNode = async function onCreateNode({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest,
  store,
  cache,
}) {
  const { createNode, createParentChildLink } = actions

  // We only care about JSON content.
  if (node.internal.mediaType !== `application/json`) {
    return
  }

  const content = await loadNodeContent(node)
  const parsedContent = JSON.parse(content)

  if (_.isArray(parsedContent)) {
    parsedContent.forEach(async (obj, i) => {
      const type = getType({ node })
      const id =
        getId({ node, obj, type }) || createNodeId(`${node.id} [${i}] >>> JSON`)

      await transformObject(obj, id, type)
    })
  } else if (_.isPlainObject(parsedContent)) {
    const type = getType({ node })
    const id = getId({ node, obj: parsedContent, type })

    await transformObject(parsedContent, id, type)
  }

  function getType({ node }) {
    const dirs = path.dirname(node.relativePath).split(path.sep)
    const dir = dirs.pop()
    let type = isNaN(parseInt(dir)) ? dir : dirs.pop()
    type = `Pokeapi${_.upperFirst(type)}`
    return _.upperFirst(_.camelCase(type))
  }

  function getId({ node, obj, type }) {
    try {
      if (type === "PokeapiPokemon") {
        return obj.id.toLocaleString("es-MX", {
          minimumIntegerDigits: 5,
          useGrouping: false,
        })
      }

      if (obj.id) {
        return `${obj.id}-${_.lowerCase(type)
          .split(" ")
          .join("-")}`
      }

      if (obj.name) {
        return `${obj.name}-${_.lowerCase(type)
          .split(" ")
          .join("-")}`
      }

      return node.id ? createNodeId(`${node.id} >>> JSON`) : null
    } catch (err) {
      console.error("Could not get id for ", obj.name, err)
      return ""
    }
  }

  async function transformObject(obj, id, type) {
    const jsonNode = {
      ...obj,
      id,
      children: [],
      parent: node.id,
      internal: {
        contentDigest: createContentDigest(obj),
        type,
      },
    }

    if (type === "PokeapiPokemon") {
      try {
        const spriteFrontFileNode = await createRemoteFileNode({
          url: obj.sprites.front_default,
          store,
          cache,
          createNode,
          createNodeId: () => `${obj.name}_front`,
        })

        if (spriteFrontFileNode) {
          node["localFile___NODE"] = spriteFrontFileNode.id
        }
      } catch (err) {
        console.error("fucking errors", err)
      }
    }

    createNode(jsonNode)
    createParentChildLink({ parent: node, child: jsonNode })
  }
}
