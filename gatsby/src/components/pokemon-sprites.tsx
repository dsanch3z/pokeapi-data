import React from "react"
import { IPokemonSprites } from "@typings/pokemon"
import styled from "react-emotion"

export interface IPokemonSpritesProps {
  name: string
  sprites: IPokemonSprites
}

const FlexContainer = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  textAlign: "center",
  justifyContent: "space-around",
})

export default function PokemonSprites({ sprites }: IPokemonSpritesProps) {
  const {
    back_default,
    back_female,
    back_shiny,
    back_shiny_female,
    front_default,
    front_female,
    front_shiny,
    front_shiny_female,
  } = sprites

  return (
    <FlexContainer>
      {front_default ? (
        <div>
          <img src={front_default} alt={`${name} front male`} />
          <p>Front Male</p>
        </div>
      ) : null}
      {front_female ? (
        <div>
          <img src={front_female} alt={`${name} front female`} />
          <p>Front Female</p>
        </div>
      ) : null}

      {back_default ? (
        <div>
          <img src={back_default} alt={`${name} back male`} />
          <p>Back Male</p>
        </div>
      ) : null}
      {back_female ? (
        <div>
          <img src={back_female} alt={`${name} back female`} />
          <p>Back Female</p>
        </div>
      ) : null}

      {front_shiny ? (
        <div>
          <img src={front_shiny} alt={`${name} front shiny male`} />
          <p>Front Shiny Male</p>
        </div>
      ) : null}
      {front_shiny_female ? (
        <div>
          <img src={front_shiny_female} alt={`${name} front shiny female`} />
          <p>Front Shiny Female</p>
        </div>
      ) : null}

      {back_shiny ? (
        <div>
          <img src={back_shiny} alt={`${name} back shiny male`} />
          <p>Back Shiny Male</p>
        </div>
      ) : null}
      {back_shiny_female ? (
        <div>
          <img src={back_shiny_female} alt={`${name} back shiny female`} />
          <p>Back Shiny Female</p>
        </div>
      ) : null}
    </FlexContainer>
  )
}
