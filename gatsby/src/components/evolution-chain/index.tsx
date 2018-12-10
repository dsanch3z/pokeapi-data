import React from "react"
import { css } from "emotion"

import { IEvolutionChain } from "@typings/evolution-chain"
import EvolutionChainItems from "./evolution-chain-items"

export interface IEvolutionChainProps {
  evolutionChain: IEvolutionChain
  evolutionChainSprites: { edges: any[] }
}

const styles = {
  root: css({
    margin: 0,
    listStyle: "none",
    display: "flex",
    flexFlow: "wrap",
    alignItems: "center",
    justifyContent: "center",
  }),
}

export default ({
  evolutionChain,
  evolutionChainSprites,
}: IEvolutionChainProps) =>
  evolutionChain.chain.evolves_to!.length ? (
    <ul className={styles.root}>
      <EvolutionChainItems
        chain={evolutionChain.chain}
        sprites={evolutionChainSprites}
      />
    </ul>
  ) : (
    <p>This pokemon does not evolve.</p>
  )
