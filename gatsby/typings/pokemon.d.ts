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
