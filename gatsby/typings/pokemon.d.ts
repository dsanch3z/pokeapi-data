import { INamedAPIResource } from "@typings/shared"

export interface IPokemonStat {
  base_stat: number
  effort: number
  stat: INamedAPIResource
}

export interface IPokemonType {
  slot: 1 | 2
  type: INamedAPIResource
}

export interface IPokemonVariety {
  is_default: boolean
  pokemon: INamedAPIResource
}

export interface IPokemonSprites {
  back_default: null | string
  back_female: null | string
  back_shiny: null | string
  back_shiny_female: null | string
  front_default: null | string
  front_female: null | string
  front_shiny: null | string
  front_shiny_female: null | string
}
