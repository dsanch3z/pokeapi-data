import React from "react"
import { upperFirst, startCase } from "lodash"

import { IEvolutionDetails } from "@typings/evolution-chain"

export interface IEvolutionChainDetailsTextProps {
  evolutionDetails: IEvolutionDetails
}

export default function EvolutionChainDetailsText({
  evolutionDetails,
}: IEvolutionChainDetailsTextProps) {
  const { trigger } = evolutionDetails

  switch (trigger.name) {
    case "level-up": {
      let details = ""

      if (evolutionDetails.location) {
        details += `at ${startCase(evolutionDetails.location.name)} `
      }

      if (evolutionDetails.held_item) {
        details += `while holding ${startCase(
          evolutionDetails.held_item.name
        )} `
      }

      if (evolutionDetails.time_of_day) {
        details += `at ${evolutionDetails.time_of_day} `
      }

      if (evolutionDetails.known_move) {
        details += `knowing ${upperFirst(evolutionDetails.known_move.name)} `
      }

      if (evolutionDetails.known_move_type) {
        details += `knowing a ${upperFirst(
          evolutionDetails.known_move_type.name
        )}-type move `
      }

      if (evolutionDetails.min_happiness) {
        details += `with ${evolutionDetails.min_happiness} happiness `
      }

      if (evolutionDetails.min_affection) {
        details += `with ${evolutionDetails.min_affection} affection `
      }

      /**
       * @see https://pokeapi.co/docs/v2.html#evolution-chains
       * The required relation between the Pokémon's Attack and Defense stats.
       * 1 means Attack > Defense.
       * 0 means Attack = Defense.
       * -1 means Attack < Defense.
       */
      if (typeof evolutionDetails.relative_physical_stats === "number") {
        switch (`${evolutionDetails.relative_physical_stats}`) {
          case "-1": {
            details += `with Attack > Defense `
            break
          }
          case "0": {
            details += `with Attack = Defense `
            break
          }
          case "1": {
            details += `with Attack < Defense `
            break
          }
          default:
            break
        }
      }

      return (
        <>
          level {evolutionDetails.min_level || "up"} {details}
        </>
      )
    }

    case "use-item": {
      return <>{upperFirst(evolutionDetails.item!.name.replace(/-/g, " "))}</>
    }

    case "trade": {
      let details = ""
      if (evolutionDetails.held_item) {
        details += `while holding ${startCase(evolutionDetails.held_item.name)}`
      }

      return <>Trade {details}</>
    }

    case "shed": {
      return (
        <>if there's space in the party and a (regular) pokéball in the bag</>
      )
    }
  }

  return null
}
