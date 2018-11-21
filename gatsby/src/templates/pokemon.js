import React from "react"
import { css } from "emotion"
import { graphql } from "gatsby"

import Layout from "@/components/layout"
import EvolutionChain from "@/components/evolution-chain"
import PokemonName from "@/components/pokemon-name"
import PokemonSummary from "@/components/pokemon-summary"
import PokemonVarieties from "@/components/pokemon-varieties"

const styles = {
  root: css({
    maxWidth: 960,
    margin: "0 auto",
  }),
  animatedSprite: css({
    margin: "0 auto",
    height: 140,
  }),
  animatedSpriteImg: css({
    height: "100%",
  }),
  intro: css({
    textAlign: "center",
  }),
  flavorText: css({
    textAlign: "left",
  }),
  evolutionChain: css({}),
}

export default ({ data }) => {
  const {
    pokeapiPokemon: pokemon,
    pokeapiPokemonSpecies: pokemonSpecies,
    pokeapiEvolutionChain: evolutionChain,
    evolutionChainSprites,
    varietiesSprites,
    animatedSprite,
  } = data

  const flavorTextEntry = pokemonSpecies.flavor_text_entries.find(
    flavorText => flavorText.language.name === "en"
  )

  console.log(pokemon)
  console.log(pokemonSpecies)
  console.log(evolutionChain)
  console.log(evolutionChainSprites)
  console.log(varietiesSprites)

  return (
    <Layout>
      <div className={styles.root}>
        <div className={styles.intro}>
          <div className={styles.animatedSprite}>
            <img
              className={styles.animatedSpriteImg}
              src={animatedSprite ? animatedSprite.src : null}
              title={`${pokemon.name}`}
              alt={`${pokemon.name}`}
            />
          </div>
          <h1>
            <PokemonName id={pokemon.id} name={pokemon.name} />
          </h1>

          <PokemonSummary
            types={pokemon.types}
            height={pokemon.height}
            weight={pokemon.weight}
          />

          <p className={styles.flavorText}>{flavorTextEntry.flavor_text}</p>
        </div>

        <h2>Evolution chain</h2>

        {evolutionChain && (
          <div className={styles.evolutionChain}>
            <EvolutionChain
              evolutionChain={evolutionChain}
              evolutionChainSprites={evolutionChainSprites}
            />
          </div>
        )}

        <h2>Other forms</h2>
        <PokemonVarieties
          varieties={pokemonSpecies.varieties.filter(
            variety => variety.pokemon.name !== pokemon.name
          )}
          sprites={varietiesSprites}
        />

        {/*<h2>Moves</h2>
        <PokemonMoves moves={pokemon.moves} />*/}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query(
    $name: String!
    $evolutionChainId: String
    $evolutionChainSpriteIds: [String!]!
    $varietySpriteIds: [String]
  ) {
    evolutionChainSprites: allFile(
      filter: { id: { in: $evolutionChainSpriteIds } }
    ) {
      edges {
        node {
          id
          childImageSharp {
            fluid(maxWidth: 800, quality: 80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }

    varietiesSprites: allFile(filter: { id: { in: $varietySpriteIds } }) {
      edges {
        node {
          id
          childImageSharp {
            fluid(maxWidth: 800, quality: 80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }

    animatedSprite: pokeapiPokemonImages(name: { eq: $name }) {
      src
    }

    pokeapiPokemon(name: { eq: $name }) {
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

    pokeapiPokemonSpecies(name: { eq: $name }) {
      id
      name
      base_happiness
      capture_rate
      color {
        name
      }
      egg_groups {
        name
      }
      evolution_chain {
        url
      }
      evolves_from_species {
        name
      }
      flavor_text_entries {
        flavor_text
        language {
          name
        }
        version {
          name
        }
      }
      forms_switchable
      gender_rate
      genera {
        genus
        language {
          name
        }
      }
      generation {
        name
        url
      }
      growth_rate {
        name
        url
      }
      habitat {
        name
        url
      }
      has_gender_differences
      hatch_counter
      is_baby
      order
      pal_park_encounters {
        area {
          name
          url
        }
        base_score
        rate
      }
      pokedex_numbers {
        entry_number
        pokedex {
          name
          url
        }
      }
      shape {
        name
        url
      }
      varieties {
        is_default
        pokemon {
          name
          url
        }
      }
    }

    pokeapiEvolutionChain(id: { eq: $evolutionChainId }) {
      id
      chain {
        species {
          name
        }
        evolves_to {
          species {
            name
          }
          evolution_details {
            held_item {
              name
            }
            item {
              name
            }
            known_move {
              name
            }
            known_move_type {
              name
            }
            location {
              name
            }
            min_affection
            min_happiness
            min_level
            needs_overworld_rain
            party_species {
              name
            }
            relative_physical_stats
            time_of_day
            trigger {
              name
            }
            turn_upside_down
          }
          evolves_to {
            species {
              name
            }
            evolution_details {
              held_item {
                name
              }
              item {
                name
              }
              known_move {
                name
              }
              location {
                name
              }
              min_happiness
              min_level
              needs_overworld_rain
              time_of_day
              trigger {
                name
              }
              turn_upside_down
            }
          }
        }
      }
    }
  }
`
