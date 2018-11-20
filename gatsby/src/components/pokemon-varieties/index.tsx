import React from "react"
import { css } from "emotion"

import { IPokemonVariety } from "@typings/pokemon"
import { GatsbyConnection, GatsbyFileImageSharp } from "@typings/shared"
import UnstyledList from "@/components/shared/unstyled-list"
import PokemonThumbnailItem from "@/components/pokemon-thumbnail"

export interface IPokemonVarietiesProps {
  varieties: IPokemonVariety[]
  sprites: GatsbyConnection<GatsbyFileImageSharp>
}

const classNames = {
  center: css({
    display: "flex",
    justifyContent: "space-around",
  }),
}

export default function PokemonVarieties({
  varieties,
  sprites,
}: IPokemonVarietiesProps) {
  if (!varieties.length) {
    return "This Pokemon does not have any other forms."
  }

  let imgFluid: any = null
  try {
    imgFluid = sprites.edges.find(
      ({ node }) => node.id === `${node.name}_front`
    )!.node.childImageSharp.fluid
  } catch (err) {
    console.info("Sprite not available")
  }

  return (
    <UnstyledList className={classNames.center}>
      {varieties.map(({ pokemon }) => (
        <PokemonThumbnailItem
          key={`${pokemon.name}-variety`}
          id={""}
          name={pokemon.name}
          imgFluid={imgFluid}
        />
      ))}
    </UnstyledList>
  )
}
