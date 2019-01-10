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
    const pokemonName = node.name
    const pokemonSpeciesName = patchPokemonSpeciesName(pokemonName)
    const pokemonSpeciesResult = await graphql(`
      {
        pokeapiPokemonSpecies(name: { eq: "${pokemonSpeciesName}" }) {
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

    try {
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
            .filter(({ pokemon }) => pokemon.name !== pokemonName)
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

      const pokemonTypeNames = node.types.map(({ type }) => type.name)

      createPage({
        path: `/pokemon/${pokemonName}`,
        component: require.resolve(`./src/templates/pokemon.js`),
        context: {
          // Data passed to context is available in page queries as GraphQL variables.
          name: pokemonName,
          speciesName: pokemonSpeciesName,
          evolutionChainId,
          evolutionChainSpriteIds,
          varietySpriteIds,
          pokemonTypeNames,
        },
      })
    } catch (err) {
      console.error(`Errors in ${pokemonName}`, err)

      throw err
    }
  })
}

/**
 *
 * @param {string} pokemonName
 * @description
 *  Some Pokémon have different name and species name,
 *  so we have to "patch" them to avoid errors
 * @example replaces "deoxys-attack" with "deoxys"
 * @returns {string}
 */
function patchPokemonSpeciesName(pokemonName = "") {
  // Generation III
  if (pokemonName.includes("deoxys")) {
    return "deoxys"
  }

  // Generation IV
  else if (pokemonName.includes("wormadam")) {
    return "wormadam"
  } else if (pokemonName.includes("giratina")) {
    return "giratina"
  } else if (pokemonName.includes("shaymin")) {
    return "shaymin"
  }

  // Generation V
  else if (pokemonName.includes("basculin")) {
    return "basculin"
  } else if (pokemonName.includes("-ordinary")) {
    return pokemonName.replace("-ordinary", "")
  } else if (pokemonName.includes("-incarnate")) {
    return pokemonName.replace("-incarnate", "")
  } else if (pokemonName.includes("-standard")) {
    return pokemonName.replace("-standard", "")
  } else if (pokemonName.includes("meloetta")) {
    return "meloetta"
  }

  // Generation VI
  else if (pokemonName.includes("aegislash")) {
    return "aegislash"
  } else if (pokemonName.includes("-male")) {
    return pokemonName.replace("-male", "")
  } else if (pokemonName.includes("-average")) {
    return pokemonName.replace("-average", "")
  }

  // Generation VII
  else if (pokemonName.includes("wishiwashi")) {
    return "wishiwashi"
  } else if (pokemonName.includes("lycanroc")) {
    return "lycanroc"
  } else if (pokemonName.includes("oricorio")) {
    return "oricorio"
  } else if (pokemonName.includes("mimikyu")) {
    return "mimikyu"
  } else if (pokemonName.includes("minior")) {
    return "minior"
  }

  // Alola, mega evolutions and other pokémon varieties
  else if (pokemonName.includes("pikachu")) {
    return "pikachu"
  } else if (pokemonName.includes("-totem-alola")) {
    return pokemonName.replace("-totem-alola", "")
  } else if (pokemonName.includes("-alola")) {
    return pokemonName.replace("-alola", "")
  } else if (pokemonName.includes("-totem")) {
    return pokemonName.replace("-totem", "")
  } else if (pokemonName.includes("-mega")) {
    if (pokemonName.includes("-mega-y")) {
      return pokemonName.replace("-mega-y", "")
    } else if (pokemonName.includes("-mega-x")) {
      return pokemonName.replace("-mega-x", "")
    }
    return pokemonName.replace("-mega", "")
  } else if (pokemonName.includes("zygarde")) {
    return "zygarde"
  } else if (pokemonName.includes("-primal")) {
    return pokemonName.replace("-primal", "")
  } else if (pokemonName.includes("-average")) {
    return pokemonName.replace("-average", "")
  } else if (pokemonName.includes("-small")) {
    return pokemonName.replace("-small", "")
  } else if (pokemonName.includes("-large")) {
    return pokemonName.replace("-large", "")
  } else if (pokemonName.includes("-super")) {
    return pokemonName.replace("-super", "")
  } else if (pokemonName.includes("-female")) {
    return pokemonName.replace("-female", "")
  } else if (pokemonName.includes("-original")) {
    return pokemonName.replace("-original", "")
  } else if (pokemonName.includes("-therian")) {
    return pokemonName.replace("-therian", "")
  } else if (pokemonName.includes("-ethernal")) {
    return pokemonName.replace("-ethernal", "")
  } else if (pokemonName.includes("-white")) {
    return pokemonName.replace("-white", "")
  } else if (pokemonName.includes("-black")) {
    return pokemonName.replace("-black", "")
  } else if (pokemonName.includes("-resolute")) {
    return pokemonName.replace("-resolute", "")
  } else if (pokemonName.includes("-zen")) {
    return pokemonName.replace("-zen", "")
  } else if (pokemonName.includes("-eternal")) {
    return pokemonName.replace("-eternal", "")
  } else if (pokemonName.includes("greninja")) {
    return "greninja"
  } else if (pokemonName.includes("hoopa")) {
    return "hoopa"
  } else if (pokemonName.includes("rotom")) {
    return "rotom"
  } else if (pokemonName.includes("castform")) {
    return "castform"
  }

  return pokemonName
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
