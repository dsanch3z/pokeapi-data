import { INamedAPIResource } from "./shared"

export interface IPokemonMove {
  move: INamedAPIResource
  version_group_details: IVersionGroupDetails[]
}

export interface IVersionGroupDetails {
  level_learned_at: number
  move_learn_method: INamedAPIResource
  version_group: INamedAPIResource
}
