import React from "react"
import { css } from "emotion"

import { IEvolutionDetails } from "@typings/evolution-chain"
import EvolutionChainDetailsText from "./evolution-chain-details-text"

export interface IEvolutionDetailsProps {
  evolvesFrom: string
  evolvesInto: string
  evolutionDetails: IEvolutionDetails[]
}

const styles = {
  item: css({
    textAlign: `center`,
    listStyle: `none`,
    display: `inline-block`,
    margin: `1rem`,
  }),
  arrow: css({
    fontSize: 26,
  }),
}

export default function EvolutionChainDetails({
  evolvesInto,
  evolutionDetails,
}: IEvolutionDetailsProps) {
  return (
    <>
      {evolutionDetails.map((evolutionDetail, i) => (
        <li
          key={`evolves-to-${evolvesInto}-details-${i}`}
          className={styles.item}
        >
          <p className={styles.arrow}>
            <strong>{i === 0 ? "->" : <small>or</small>}</strong>
          </p>
          <EvolutionChainDetailsText evolutionDetails={evolutionDetail} />
        </li>
      ))}
    </>
  )
}
