import React from "react"
import styled, { css } from "react-emotion"
import Img from "gatsby-image"

import PokemonLink from "@/components/pokemon-link"
import PokemonName from "@/components/pokemon-name"
import PokemonPlaceholder from "@/components/pokemon-placeholder"
import { getPokemonTypeColor } from "@/components/pokemon-types"
import { IPokemonType } from "@typings/pokemon"

export interface IPokemonThumbnailItemProps {
  id: string | number
  name: string
  imgFluid?: any
  types?: IPokemonType[]
  size?: "sm" | "md" | "lg"
  className?: string
}

const classNames = {
  link: css`
    &:hover,
    &:focus {
      background-color: #f2f2f2;
    }
  `,
  imgPlaceholder: css({
    opacity: 0.6,
  }),
}

function getWidth(size: string): number {
  switch (size) {
    case "sm":
      return 120
    case "md":
      return 150
    case "lg":
      return 180
    default:
      return 150
  }
}

const Li = styled("li")`
  margin: 0;
  text-align: center;
  list-style: none;
  display: inline-block;
  width: ${({ width }: { width: number }) => width}px;

  &:hover {
    background: #f2f2f2;
  }
`

export default function PokemonThumbnailItem({
  id,
  name,
  imgFluid,
  types = [],
  size = "md",
  className = "",
}: IPokemonThumbnailItemProps) {
  return (
    <Li width={getWidth(size)} className={className} types={types}>
      <PokemonLink name={name} className={classNames.link}>
        {imgFluid ? (
          <Img fluid={imgFluid} alt={name} title={name} fadeIn={true} />
        ) : (
          <PokemonPlaceholder
            className={classNames.imgPlaceholder}
            width={40}
          />
        )}
        <p>
          <PokemonName id={id} name={name} />
        </p>
      </PokemonLink>
    </Li>
  )
}

PokemonThumbnailItem.defaultProps = {
  size: "md",
}

function getThumbnailBackgroundColor(types: IPokemonType[]): string {
  const defaultBackgroundColor = "#f2f2f2"
  const colors = types
    .sort((a, b) => a.slot - b.slot)
    .map(({ type }) => getPokemonTypeColor(type.name))

  const background = getBackgroundColor(colors)

  function getBackgroundColor(colors: string[]) {
    if (colors.length === 1) {
      return Array.isArray(colors[0])
        ? getVerticalGradient(colors[0][0], colors[0][1])
        : colors[0]
    } else {
      if (typeof colors[0] === "string" && typeof colors[1] === "string") {
        return getHorizontalGradient(colors[0], colors[1])
      } else if (typeof colors[0] === "string" && Array.isArray(colors[1])) {
        const horizontalGradient = getHorizontalGradient(
          colors[0],
          "transparent"
        )
        const verticalGradient = getVerticalGradient(colors[1][0], colors[1][1])
        return `${horizontalGradient}, ${verticalGradient}`
      } else if (Array.isArray(colors[0]) && typeof colors[1] === "string") {
        const horizontalGradient = getHorizontalGradient(
          "transparent",
          colors[0]
        )
        const verticalGradient = getVerticalGradient(colors[1][0], colors[1][0])
        return `${horizontalGradient}, ${verticalGradient}`
      }

      return defaultBackgroundColor
    }

    function getVerticalGradient(color1: string, color2: string): string {
      return `linear-gradient(to bottom, ${color1} 50%, ${color2} 50%)`
    }

    function getHorizontalGradient(color1: string, color2: string): string {
      return `linear-gradient(to right, ${color1} 50%, ${color2} 50%)`
    }
  }

  return background
}
