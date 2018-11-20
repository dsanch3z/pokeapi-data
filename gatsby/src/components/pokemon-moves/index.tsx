import React from "react"
import { startCase } from "lodash"
import { css } from "emotion"

import { IPokemonMove } from "@typings/pokemon-move"

export interface IPokemonMovesProps {
  moves: IPokemonMove[]
}

const classNames = {
  root: css({
    overflowX: "auto",
  }),
}

function PokemonMoves({ moves }: IPokemonMovesProps) {
  const levels: number[] = []
  const versionNames: string[] = []

  moves.forEach(move => {
    move.version_group_details.forEach(version => {
      const { level_learned_at, version_group } = version

      if (!versionNames.includes(version_group.name)) {
        versionNames.push(version_group.name)
      }
    })
  })

  return (
    <div className={classNames.root}>
      <table>
        <thead>
          <th>Move</th>
          <th>Level</th>
          {versionNames.map(versionName => (
            <th>{startCase(versionName)}</th>
          ))}
        </thead>
        <tbody>
          {moves.map(({ move, version_group_details }) => (
            <tr key={move.name}>
              <td>{startCase(move.name)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <pre>{JSON.stringify(moves, null, 4)}</pre>
    </div>
  )
}
export default PokemonMoves
