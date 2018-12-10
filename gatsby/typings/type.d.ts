import { INamedAPIResource } from "./shared"

export interface IType {
  id: string
  name: string
  damage_relations: IDamageRelations
  move_damage_class: INamedAPIResource
}

export interface IDamageRelations {
  [key: string]: INamedAPIResource[]
  double_damage_from: INamedAPIResource[]
  double_damage_to: INamedAPIResource[]
  half_damage_from: INamedAPIResource[]
  half_damage_to: INamedAPIResource[]
  no_damage_from: INamedAPIResource[]
  no_damage_to: INamedAPIResource[]
}
