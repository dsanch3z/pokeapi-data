import React from "react"
import { startCase } from "lodash"
import styled from "react-emotion"

import { INamedAPIResource } from "@typings/shared"
import { IPokemonStat } from "@typings/pokemon"
import UnstyledList from "./shared/unstyled-list"

export interface IPokemonDetailsProps {
  baseHappiness: number
  captureRate: number
  eggGroups: INamedAPIResource[]
  formsSwitchable: boolean
  genderRate: number
  generation: INamedAPIResource
  growthRate: INamedAPIResource
  habitat?: INamedAPIResource
  hasGenderDifferences: boolean
  hatchCounter: number
  isBaby: boolean
  shape: INamedAPIResource
  stats?: IPokemonStat[]
}

const FlexContainer = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
})

export default function PokemonDetails({
  baseHappiness,
  captureRate,
  eggGroups,
  formsSwitchable,
  genderRate,
  generation,
  growthRate,
  habitat,
  hasGenderDifferences,
  hatchCounter,
  isBaby,
  shape,
  stats = [],
}: IPokemonDetailsProps) {
  console.log("eggGroups", eggGroups)
  console.log("stats", stats)
  console.log("generation", generation)
  console.log("growthRate", growthRate)
  console.log("habitat", habitat)
  return (
    <FlexContainer>
      <UnstyledList>
        <li>
          Base Happiness:{" "}
          <strong>
            {baseHappiness} ({((baseHappiness * 100) / 255).toFixed(2)}%)
          </strong>
        </li>
        <li>
          CaptureRate:{" "}
          <strong>
            {captureRate} ({((captureRate * 100) / 255).toFixed(2)}%)
          </strong>
        </li>
        <li>
          Egg Groups:{" "}
          <strong>
            {eggGroups.map(({ name }) => startCase(name)).join(", ")}
          </strong>
        </li>
        <li>
          Evs:{" "}
          <strong>
            {stats
              .filter(({ effort }) => effort !== 0)
              .map(({ stat, effort }) => `${effort} ${startCase(stat.name)}`)
              .join(", ")}
          </strong>
        </li>
        <li>
          Forms Switchable: <strong>{formsSwitchable ? "Yes" : "No"}</strong>
        </li>
        <li>
          Gender Rate:{" "}
          <strong>
            {((genderRate * 100) / 8).toFixed(2)}% ♀{" "}
            {(100 - (genderRate * 100) / 8).toFixed(2)} ♂
          </strong>
        </li>
        <li>
          Generation: <strong>{startCase(generation.name)}</strong>
        </li>
      </UnstyledList>
      <UnstyledList>
        <li>
          Growth Rate: <strong>{startCase(growthRate.name)}</strong>
        </li>
        {habitat ? (
          <li>
            Habitat: <strong>{startCase(habitat.name)}</strong>
          </li>
        ) : null}
        <li>
          Has gender differences?{" "}
          <strong>{hasGenderDifferences ? "Yes" : "No"}</strong>
        </li>
        <li>
          Hatch Steps: <strong>{255 * (hatchCounter + 1)}</strong>
        </li>
        <li>
          Is baby form? <strong>{isBaby ? "Yes" : "No"}</strong>
        </li>
        <li>
          Shape: <strong>{startCase(shape.name)}</strong>
        </li>
      </UnstyledList>
    </FlexContainer>
  )
}
