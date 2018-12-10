import React, { Component } from "react"
import styled from "react-emotion"
import { startCase } from "lodash"
import {
  VictoryChart,
  VictoryGroup,
  VictoryArea,
  VictoryLabel,
  VictoryPolarAxis,
  VictoryTheme,
} from "victory"

import { IPokemonStat } from "@typings/pokemon"

export interface IPokemonStatsProps {
  stats: IPokemonStat[]
}

const Container = styled("div")`
  height: 400px;
`

export default function PokemonStats({ stats }: IPokemonStatsProps) {
  return (
    <Container>
      <PokemonStatsRadarChart stats={stats} />
    </Container>
  )
}

function PokemonStatsRadarChart({ stats }: IPokemonStatsProps) {
  const data = stats.reduce((stats, nextStat) => {
    const statName = nextStat.stat.name
    stats[statName] = nextStat.base_stat
    return stats
  }, {})

  const maxima = {
    hp: 250,
    attack: 250,
    defense: 250,
    speed: 250,
    "special-attack": 250,
    "special-defense": 250,
  }

  const processedData = Object.keys(data)
    .sort()
    .map(key => ({
      x: key,
      y: data[key] / maxima[key],
    }))

  return (
    <VictoryChart
      polar={true}
      theme={VictoryTheme.material}
      domain={{ y: [0, 1] }}
    >
      <VictoryGroup
        colorScale={["green"]}
        style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
      >
        <VictoryArea data={processedData} />
      </VictoryGroup>
      {Object.keys(maxima)
        .sort()
        .map((key, i) => {
          return (
            <VictoryPolarAxis
              key={i}
              dependentAxis={true}
              style={{
                axisLabel: { padding: 15 },
                axis: { stroke: "back" },
                grid: { stroke: "grey", opacity: 0.5, strokeWidth: 0.25 },
              }}
              tickLabelComponent={<VictoryLabel labelPlacement="vertical" />}
              labelPlacement="perpendicular"
              axisValue={i + 1}
              axisLabelComponent={
                <VictoryLabel
                  text={[startCase(key), data[key]]}
                  desc={startCase(key)}
                  labelPlacement="vertical"
                  style={{ fontSize: 16, strokeWidth: 2 }}
                />
              }
              label={startCase(key)}
              tickFormat={() => ""}
              tickValues={[0.2, 0.4, 0.6, 0.8]}
            />
          )
        })}
      <VictoryPolarAxis
        labelPlacement="parallel"
        tickFormat={() => ""}
        style={{
          axis: { stroke: "none" },
          grid: { stroke: "grey", opacity: 0.5 },
        }}
      />
    </VictoryChart>
  )
}
