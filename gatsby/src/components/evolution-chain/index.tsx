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
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
}

export default ({
  evolutionChain,
  evolutionChainSprites,
}: IEvolutionChainProps) => (
  <ul className={styles.root}>
    <EvolutionChainItems
      chain={evolutionChain.chain}
      sprites={evolutionChainSprites}
    />
  </ul>
)
