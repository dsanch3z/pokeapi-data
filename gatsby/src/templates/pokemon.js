import React, { Component } from "react"
import PropTypes from "prop-types"
import { css } from "emotion"
import { graphql } from "gatsby"

import Layout from "@/components/layout"
import Divider from "@/components/shared/divider"
import EvolutionChain from "@/components/evolution-chain"
import PokemonName from "@/components/pokemon-name"
import PokemonSummary from "@/components/pokemon-summary"
import PokemonStats from "@/components/pokemon-stats"
import PokemonDetails from "@/components/pokemon-details"
import PokemonSprites from "@/components/pokemon-sprites"
import PokemonVarieties from "@/components/pokemon-varieties"
import PokemonTypesEffectiveness from "@/components/pokemon-types/pokemon-types-effectiveness"
import { getPokemonTypeColor } from "@/components/pokemon-types"
import ShowMore from "@/components/shared/show-more"

const styles = {
  root: css({
    padding: 40,
  }),
  pokemon: css({
    maxWidth: 640,
    margin: "0 auto",
    background: "rgb(250, 250, 250)",
    boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.12)",
    borderRadius: 5,
    padding: "10px 30px",
    // transform: "translateY(100%)",
    // transition: "transform 0.4s ease",
  }),
  animatedSprite: css({
    margin: "0 auto",
    height: 120,
  }),
  animatedSpriteImg: css({
    height: "100%",
  }),
  intro: css({
    textAlign: "center",
  }),
  genera: css({
    color: "gray",
  }),
  flavorText: css({
    textAlign: "left",
  }),
  evolutionChain: css({}),
}

export default ({ data, location }) => {
  const {
    pokeapiPokemon: pokemon,
    pokeapiPokemonSpecies: pokemonSpecies,
    pokeapiEvolutionChain: evolutionChain,
    evolutionChainSprites,
    varietiesSprites,
    animatedSprite,
    pokemonTypes,
  } = data

  // if (!pokemon) {
  //   console.log(`------- Dude I'm ${pokemonSpecies.name}`)
  // }

  // if (!pokemonSpecies) {
  //   console.log(`------- Dude I'm ${pokemon.name}, no pokemon species found`)
  // }

  // console.log(pokemon)
  // console.log(pokemonSpecies)
  // console.log(evolutionChain)
  // console.log(evolutionChainSprites)
  // console.log(varietiesSprites)
  // console.log(pokemonTypes)

  let isModal = false
  // We don't want to show the modal if a user navigates
  // directly to a post so if this code is running on Gatsby's
  // initial render then we don't show the modal, otherwise we
  // do.
  if (
    typeof window !== `undefined` &&
    window.___GATSBYPOKEAPI_INITIAL_RENDER_COMPLETE
  ) {
    isModal = true
  }

  const genera = pokemonSpecies.genera.find(g => g.language.name === "en").genus

  const flavorTextEntry = pokemonSpecies.flavor_text_entries.find(
    flavorText => flavorText.language.name === "en"
  )

  const pokemonColor = pokemonSpecies.color.name
  const pokemonPrimaryType = pokemon.types.find(({ slot }) => slot === 1).type
    .name
  const pokemonTypeColor = getPokemonTypeColor(pokemonPrimaryType)

  return (
    <Layout location={location} isModal={isModal}>
      <div
        className={styles.root}
        style={{
          background: `linear-gradient(135deg, ${pokemonColor}, ${pokemonTypeColor} 50%)`,
        }}
      >
        <div className={styles.pokemon}>
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
            <p className={styles.genera}>{genera}</p>

            <PokemonSummary
              types={pokemon.types}
              height={pokemon.height}
              weight={pokemon.weight}
            />

            <PokemonStats stats={pokemon.stats} />

            <p className={styles.flavorText}>{flavorTextEntry.flavor_text}</p>

            <ShowMore>
              <PokemonDetails
                baseHappiness={pokemonSpecies.base_happiness}
                captureRate={pokemonSpecies.capture_rate}
                eggGroups={pokemonSpecies.egg_groups}
                formsSwitchable={pokemonSpecies.forms_switchable}
                genderRate={pokemonSpecies.gender_rate}
                generation={pokemonSpecies.generation}
                growthRate={pokemonSpecies.growth_rate}
                habitat={pokemonSpecies.habitat}
                hasGenderDifferences={pokemonSpecies.has_gender_differences}
                hatchCounter={pokemonSpecies.hatch_counter}
                isBaby={pokemonSpecies.is_baby}
                shape={pokemonSpecies.shape}
                stats={pokemon.stats}
              />

              <Divider />

              <PokemonSprites name={pokemon.name} sprites={pokemon.sprites} />
            </ShowMore>
          </div>

          <Divider />

          <div className={styles.evolutionChain}>
            <EvolutionChain
              evolutionChain={evolutionChain}
              evolutionChainSprites={evolutionChainSprites}
            />
          </div>

          <Divider />

          <PokemonTypesEffectiveness types={pokemonTypes} />

          <Divider />

          <div>
            <h2>Other forms</h2>
            <PokemonVarieties
              varieties={pokemonSpecies.varieties.filter(
                variety => variety.pokemon.name !== pokemon.name
              )}
              sprites={varietiesSprites}
            />
          </div>

          {/*<h2>Moves</h2>
        <PokemonMoves moves={pokemon.moves} />*/}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query(
    $name: String!
    $speciesName: String!
    $evolutionChainId: String
    $evolutionChainSpriteIds: [String!]!
    $varietySpriteIds: [String]
    $pokemonTypeNames: [String]
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
      height
      is_default
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

    pokemonTypes: allPokeapiType(filter: { name: { in: $pokemonTypeNames } }) {
      edges {
        node {
          id
          name
          damage_relations {
            double_damage_from {
              name
            }
            double_damage_to {
              name
            }
            half_damage_from {
              name
            }
            half_damage_to {
              name
            }
            no_damage_from {
              name
            }
            no_damage_to {
              name
            }
          }
          move_damage_class {
            name
          }
        }
      }
    }

    pokeapiPokemonSpecies(name: { eq: $speciesName }) {
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
      }
      growth_rate {
        name
      }
      habitat {
        name
      }
      has_gender_differences
      hatch_counter
      order
      shape {
        name
      }
      varieties {
        is_default
        pokemon {
          name
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
