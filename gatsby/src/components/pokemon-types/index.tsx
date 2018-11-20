import React from "react"
import styled, { css } from "react-emotion"
import { upperFirst } from "lodash"

import { IPokemonType } from "@typings/pokemon"

export interface IPokemonTypesProps {
  types: IPokemonType[]
  className?: string
  itemClassName?: string
}

export interface IPokemonTypeProps {
  type: string
}

const List = styled("ul")`
  padding: 0;
  margin: 0;
`

const PokemonType = styled("li")`
  text-align: center;
  list-style: none;
  display: inline-block;
  margin: 0.5rem;
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  background: ${({ type }: IPokemonTypeProps) => getTypeBackgroundColor(type)};
`

export default function PokemonTypes({
  types,
  className = "",
  itemClassName = "",
}: IPokemonTypesProps) {
  return (
    <List className={className}>
      {types
        .sort((curr, next) => curr.slot - next.slot)
        .map(({ type }) => (
          <PokemonType
            key={type.name}
            type={type.name}
            className={itemClassName}
          >
            {upperFirst(type.name)}
          </PokemonType>
        ))}
    </List>
  )
}

export function getTypeBackgroundColor(type: string) {
  const typeColor = {
    bug: "#729f3f",
    dark: "#707070",
    dragon: ["#53a4cf", "#f16e57"],
    electric: "#eed535",
    fairy: "#fdb9e9",
    fighthing: "#d56723",
    fire: "#fd7d24",
    flying: ["#3dc7ef", "#bdb9b8"],
    ghost: "#7b62a3",
    grass: "#729f3f",
    ground: ["#f7de3f", "#ab9842"],
    ice: "#51c4e7",
    normal: "#a4acaf",
    poison: "#b97fc9",
    psychic: "#f366b9",
    rock: "#a38c21",
    steel: "#9eb7b8",
    water: "#4592c4",
  }

  const color = typeColor[type]

  return Array.isArray(color)
    ? `linear-gradient(180deg, ${color[0]} 50%, ${color[1]} 50%)`
    : color
}
