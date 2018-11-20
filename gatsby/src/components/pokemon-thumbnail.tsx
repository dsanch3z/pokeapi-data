import React from "react"
import styled, { css } from "react-emotion"
import Img from "gatsby-image"

import PokemonLink from "@/components/pokemon-link"
import PokemonName from "@/components/pokemon-name"
import PokemonPlaceholder from "@/components/pokemon-placeholder"

export interface IPokemonThumbnailItemProps {
  id: string | number
  name: string
  imgFluid?: any
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
    background-color: #f2f2f2;
  }
`

export default function PokemonThumbnailItem({
  id,
  name,
  imgFluid,
  size = "md",
  className = "",
}: IPokemonThumbnailItemProps) {
  return (
    <Li width={getWidth(size)} className={className}>
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
