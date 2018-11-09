import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

export default ({ data }) => {
  const pokemon = data.pokemonJson
  return (
    <Layout>
      <div>
        <h1>
          {+pokemon.id}.{' '}
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h1>
        Male front
        <img alt={pokemon.name} src={pokemon.sprites.front_default} />
        Female front
        <img alt={pokemon.name} src={pokemon.sprites.front_female} />
        Male back
        <img alt={pokemon.name} src={pokemon.sprites.back_default} />
        Female back
        <img alt={pokemon.name} src={pokemon.sprites.back_female} />
        <h2>Moves</h2>
        {pokemon.moves.map(({ name }) => (
          <div>Move: {name}</div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($name: String!) {
    pokemonJson(name: { eq: $name }) {
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
`
