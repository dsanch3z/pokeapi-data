import React from "react"
import { css } from "emotion"
import { isArray } from "lodash"

import { IChain } from "@typings/evolution-chain"
import PokemonThumbnailItem from "@/components/pokemon-thumbnail"
import EvolutionChainDetails from "./evolution-chain-details"

export interface IEvolutionChainItemsProps {
  chain: IChain
  sprites: { edges: any[] }
}

const styles = {
  itemParent: css({
    margin: 0,
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  }),
  item: css({
    textAlign: `center`,
    listStyle: `none`,
    // width: 120,
  }),
  imgPlaceholder: css({
    opacity: 0.6,
  }),
}

export default function EvolutionChainItems({
  chain,
  sprites,
}: IEvolutionChainItemsProps) {
  const { species, evolves_to } = chain

  const evolves = isArray(evolves_to) && evolves_to.length
  const mayEvolveDifferently = evolves && evolves_to!.length > 1

  let imgFluid = null
  try {
    imgFluid = sprites!.edges.find(
      (edge: any) => edge.node.id === `${species.name}_front`
    ).node.childImageSharp.fluid
  } catch (err) {
    console.info(`Thumbnail ${species.name}_front not available.`)
  }

  const Container = ({ children }: any) =>
    mayEvolveDifferently ? (
      <li className={styles.item}>{children}</li>
    ) : (
      <>{children}</>
    )

  return (
    <>
      <PokemonThumbnailItem id={""} name={species.name} imgFluid={imgFluid} />

      {evolves ? (
        <Container
          key={`${species.name}-evolves-to-${evolves_to}-details-container`}
        >
          {evolves_to!.map(evolution => {
            const evolvesFrom = species.name
            const evolvesInto = evolution.species.name
            const evolutionDetails = evolution.evolution_details

            return mayEvolveDifferently ? (
              <ul
                key={`${evolvesFrom}-evolves-to-${evolvesInto}-details`}
                className={styles.itemParent}
              >
                <EvolutionChainDetails
                  evolvesFrom={evolvesFrom}
                  evolvesInto={evolvesInto}
                  evolutionDetails={evolutionDetails}
                />
                <EvolutionChainItems chain={evolution} sprites={sprites} />
              </ul>
            ) : (
              <>
                <EvolutionChainDetails
                  evolvesFrom={evolvesFrom}
                  evolvesInto={evolvesInto}
                  evolutionDetails={evolutionDetails}
                />
                <EvolutionChainItems chain={evolution} sprites={sprites} />
              </>
            )
          })}
        </Container>
      ) : null}
    </>
  )
}

EvolutionChainItems.defaultProps = {
  sprites: { edges: [] },
}
