import { INamedAPIResource } from "./shared"

export interface IEvolutionChain {
  id: string
  baby_trigger_item: null
  chain: IChain
}

export interface IChain {
  species: INamedAPIResource
  evolution_details: IEvolutionDetails[]
  evolves_to?: IChain[]
  is_baby: boolean
}

export interface IEvolutionDetails {
  gender: 1 | 2 | null
  held_item: INamedAPIResource | null
  item: INamedAPIResource | null
  known_move: INamedAPIResource | null
  known_move_type: INamedAPIResource | null
  location: INamedAPIResource | null
  min_affection: number | null
  min_beauty: number | null
  min_happiness: number | null
  min_level: number | null
  needs_overworld_rain: boolean | null
  party_species: INamedAPIResource | null
  party_type: INamedAPIResource | null
  relative_physical_stats: number | null
  time_of_day: string
  trade_species: INamedAPIResource | null
  trigger: INamedAPIResource
  turn_upside_down: false | null
}
