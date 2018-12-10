import React from "react"
import styled from "react-emotion"
import { upperFirst } from "lodash"

import { IPokemonType } from "@typings/pokemon"

export interface IPokemonTypeListProps {
  types: IPokemonType[]
  className?: string
  itemClassName?: string
}

export interface IPokemonTypePillProps {
  type: string
}

const UnstyledList = styled("ul")`
  padding: 0;
  margin: 0;
`

export const PokemonTypeListItem = styled("li")`
  text-align: center;
  display: inline-block;
  margin: 0.5rem;
  padding: 0.2rem 0.5rem;
  fontweight: 400;
  border-radius: 5px;
  background: ${({ type }: IPokemonTypePillProps) =>
    getPokemonTypeBackgroundColor(type)};
`

export default function PokemonTypes({
  types,
  className = "",
  itemClassName = "",
}: IPokemonTypeListProps) {
  return (
    <UnstyledList className={className}>
      {types
        .sort((curr, next) => curr.slot - next.slot)
        .map(({ type }) => (
          <PokemonTypeListItem
            key={type.name}
            className={itemClassName}
            type={type.name}
          >
            {upperFirst(type.name)}
          </PokemonTypeListItem>
        ))}
    </UnstyledList>
  )
}

export function getPokemonTypeBackgroundColor(type: string): string {
  const color = getPokemonTypeColor(type)

  if (Array.isArray(color)) {
    return `linear-gradient(to bottom, ${color[0]} 50%, ${color[1]} 50%)`
  }

  return color
}

export function getPokemonTypeColor(type: string): string | string[] {
  const typeColor = {
    bug: "#729f3f",
    dark: "#707070",
    dragon: ["#53a4cf", "#f16e57"],
    electric: "#eed535",
    fairy: "#fdb9e9",
    fighting: "#d56723",
    fire: "#fd7d24",
    flying: ["#3dc7ef", "#bdb9b8"],
    ghost: "#7b62a3",
    grass: "#9bcc50",
    ground: ["#f7de3f", "#ab9842"],
    ice: "#51c4e7",
    normal: "#a4acaf",
    poison: "#b97fc9",
    psychic: "#f366b9",
    rock: "#a38c21",
    steel: "#9eb7b8",
    water: "#4592c4",
  }

  return typeColor[type]
}
