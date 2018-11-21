const path = require("path")

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@": path.resolve("src"),
      },
    },
  })
}

exports.createPages = async function createPages({ graphql, actions }) {
  const { createPage } = actions

  const allPokeapiPokemonResult = await graphql(`
    {
      allPokeapiPokemon {
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
                url
              }
              version_details {
                rarity
                version {
                  name
                  url
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
  `)
  if (allPokeapiPokemonResult.errors) {
    console.error(
      "fucking allPokeapiPokemon query errors",
      allPokeapiPokemonResult.errors
    )
  }

  const {
    data: {
      allPokeapiPokemon: { edges: allPokemon },
    },
  } = allPokeapiPokemonResult

  createPage({
    path: `/`,
    component: require.resolve(`./src/templates/all-pokemon.js`),
    context: {
      slug: "/",
    },
  })

  allPokemon.forEach(async ({ node }) => {
    const pokemonSpeciesResult = await graphql(`
      {
        pokeapiPokemonSpecies(name: { eq: "${node.name}" }) {
          evolution_chain {
            url
          }
          varieties {
            pokemon {
              name
            }
          }
        }
      }
    `)

    const {
      data: { pokeapiPokemonSpecies },
    } = pokemonSpeciesResult

    const evolutionChainId = pokeapiPokemonSpecies.evolution_chain
      ? pokeapiPokemonSpecies.evolution_chain.url
        ? `${pokeapiPokemonSpecies.evolution_chain.url
            .slice(0, -1)
            .split("/")
            .pop()}-pokeapi-evolution-chain`
        : ""
      : ""

    const varietySpriteIds = Array.isArray(pokeapiPokemonSpecies.varieties)
      ? pokeapiPokemonSpecies.varieties
          .filter(({ pokemon }) => pokemon.name !== node.name)
          .map(({ pokemon }) => `${pokemon.name}_front`)
      : []

    const pokemonEvolutionChainResult = await graphql(`
      {
        pokeapiEvolutionChain(id: { eq: "${evolutionChainId}" }) {
          chain {
            species {
              name
            }
            evolves_to {
              species {
                name
              }
              evolves_to {
                species {
                  name
                }
              }
            }
          }
        }
      }
    `)

    const {
      data: { pokeapiEvolutionChain },
    } = pokemonEvolutionChainResult

    const evolutionChainNames = getEvolutionChainNames(pokeapiEvolutionChain)
    const evolutionChainSpriteIds = evolutionChainNames.map(
      name => `${name}_front`
    )

    createPage({
      path: `/pokemon/${node.name}`,
      component: require.resolve(`./src/templates/pokemon.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        name: node.name,
        evolutionChainId,
        evolutionChainSpriteIds,
        varietySpriteIds,
      },
    })
  })
}

function getEvolutionChainNames(evolutionChain) {
  try {
    const { species, evolves_to } = evolutionChain.chain

    return [species.name].concat(
      Array.isArray(evolves_to) ? flattenEvolutionChainNames(evolves_to) : []
    )

    function flattenEvolutionChainNames(evolves_to) {
      return evolves_to.reduce(function(names, chain) {
        if (chain.species && chain.species.name) {
          return names
            .concat(chain.species.name)
            .concat(flattenEvolutionChainNames(chain.evolves_to || []))
        }
      }, [])
    }
  } catch (err) {
    console.error("fucking error getEvolutionNames", evolutionChain, err)
    return []
  }
}
