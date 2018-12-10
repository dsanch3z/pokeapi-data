import React from "react"

import { storiesOf } from "@storybook/react"

import pokemonStatsMock from "./mocks/pokemon-stats"
import { pokemonTypesMock, typesMock } from "./mocks/pokemon-types"
import pokemonMock from "./mocks/pokemon"
import pokemonSpeciesMock from "./mocks/pokemon-species"

import typography from "@/utils/typography"
import PokemonStats from "@/components/pokemon-stats"
import PokemonTypes from "@/components/pokemon-types"
import PokemonTypesEffectiveness from "@/components/pokemon-types/pokemon-types-effectiveness"
import PokemonDetails from "@/components/pokemon-details"
import PokemonSprites from "@/components/pokemon-sprites"
import ShowMore from "@/components/shared/show-more"
import Divider from "@/components/shared/divider"

typography.injectStyles()

storiesOf("PokemonStats", module).add("PokemonStats", () => (
  <PokemonStats stats={pokemonStatsMock} />
))

storiesOf("PokemonDetails", module).add("PokemonDetails", () => (
  <ShowMore>
    <PokemonDetails
      baseHappiness={pokemonSpeciesMock.base_happiness}
      captureRate={pokemonSpeciesMock.capture_rate}
      eggGroups={pokemonSpeciesMock.egg_groups}
      formsSwitchable={pokemonSpeciesMock.forms_switchable}
      genderRate={pokemonSpeciesMock.gender_rate}
      generation={pokemonSpeciesMock.generation}
      growthRate={pokemonSpeciesMock.growth_rate}
      habitat={pokemonSpeciesMock.habitat}
      hasGenderDifferences={pokemonSpeciesMock.has_gender_differences}
      hatchCounter={pokemonSpeciesMock.hatch_counter}
      isBaby={pokemonSpeciesMock.is_baby}
      shape={pokemonSpeciesMock.shape}
      stats={pokemonStatsMock}
    />

    <Divider />

    <PokemonSprites name={pokemonMock.name} sprites={pokemonMock.sprites} />
  </ShowMore>
))

storiesOf("PokemonTypes", module)
  .add("PokemonTypes", () => <PokemonTypes types={pokemonTypesMock} />)
  .add("PokemonTypesEffectiveness", () => (
    <PokemonTypesEffectiveness types={typesMock} />
  ))

storiesOf("ShowMore", module).add("ShowMore", () => (
  <ShowMore>
    <div>Hidden</div>
  </ShowMore>
))
