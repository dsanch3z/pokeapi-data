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

export default function PokemonName({ id, name }: IPokemonNameProps) {
  return (
    <>
      {name ? startCase(name) : null}{" "}
      <small className={className}>
        {id ? (
          <>
            N.<sup>o</sup> {+id}
          </>
        ) : null}
      </small>
    </>
  )
}
