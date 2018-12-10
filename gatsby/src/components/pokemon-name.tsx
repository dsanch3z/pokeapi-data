import React from "react"
import { css } from "emotion"
import { startCase } from "lodash"

export interface IPokemonNameProps {
  id: string | number
  name: string
}

const className = css({
  color: "gray",
})

function patchName(name: string): string {
  if (name.includes("nidoran-f")) {
    return "nidoran ♀"
  }

  if (name.includes("nidoran-m")) {
    return "nidoran ♂"
  }

  return name
}

export default function PokemonName({ id, name }: IPokemonNameProps) {
  return (
    <>
      {name ? startCase(patchName(name)) : null}{" "}
      <small className={className}>
        {id ? (
          <>
            N.<sup>o</sup>
            {+id}
          </>
        ) : null}
      </small>
    </>
  )
}
