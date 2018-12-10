import React from "react"
import { css } from "emotion"
import { upperFirst } from "lodash"

import { GatsbyConnection, INamedAPIResource } from "@typings/shared"
import { IType, IDamageRelations } from "@typings/type"
import { getPokemonTypeBackgroundColor } from "@/components/pokemon-types"

export interface IPokemonTypesEffectivenessProps {
  types: GatsbyConnection<IType>
}

export interface IPokemonTypeDamageRelationProps {
  types: INamedAPIResource[]
  toOrFrom: "to" | "from"
  damageRelation: IDamageRelations
}

const classNames = {
  root: css({
    textAlign: "center",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  }),
  column: css({}),
  list: css({
    listStyle: "none",
    textAlign: "left",
  }),
  listItem: css({
    display: "block",
  }),
  table: css({
    borderCollapse: "separate",
    borderSpacing: 0,
    width: "100%",
  }),
  thead: css({
    backgroundColor: "#f2f2f2",
    textTransform: "uppercase",
    fontSize: 12,
    "th:first-child": {
      padding: "0 10px",
      borderBottom: "1px solid #eaeaea",
      borderLeft: "1px solid #eaeaea",
      borderRadius: "4px 0px 0px 4px",
      borderTop: "1px solid #eaeaea",
    },
    "th:last-child": {
      padding: "0 10px",
      borderBottom: "1px solid #eaeaea",
      borderRadius: "0 4px 4px 0",
      borderRight: "1px solid #eaeaea",
      borderTop: "1px solid #eaeaea",
    },
  }),
  row: css({
    padding: "0 10px",
    "&:hover": { backgroundColor: "#eaeaea" },
    "&:not(:last-child) td": { borderBottom: "1px solid #eaeaea" },
  }),
  th: css({
    color: "#666",
    fontWeight: 400,
  }),
  cell: css({
    padding: "0 10px",
    textAlign: "left",
    verticalAlign: "top",
  }),
  td: css({
    color: "#444444",
    fontSize: 14,
    "&:first-child": {
      borderLeft: "1px solid transparent",
      padding: "0 10px",
    },
  }),
  pokemonType: css({
    borderRadius: "5px",
    padding: 4,
    margin: "4px 0",
  }),
}

export default function PokemonTypesEffectiveness({
  types,
}: IPokemonTypesEffectivenessProps) {
  const typeDamageRelationTo = getTypeDamageRelation(types, "to")
  const typeDamageRelationFrom = getTypeDamageRelation(types, "from")
  return (
    <div className={classNames.root}>
      <div className={classNames.column}>
        <h3>Strengths:</h3>
        <TypeDamageRelationTable typeDamageRelation={typeDamageRelationTo} />
      </div>
      <div className={classNames.column}>
        <h3>Weaknesses:</h3>
        <TypeDamageRelationTable typeDamageRelation={typeDamageRelationFrom} />
      </div>
    </div>
  )
}

function TypeDamageRelationTable({
  typeDamageRelation,
}: {
  typeDamageRelation: string[]
}) {
  return (
    <table className={classNames.table}>
      <thead className={classNames.thead}>
        <tr>
          <th className={`${classNames.cell} ${classNames.th}`}>Type</th>
          <th className={`${classNames.cell} ${classNames.th}`}>
            Effectiveness
          </th>
        </tr>
      </thead>
      <tbody>
        {typeDamageRelation.map(type => (
          <tr key={`${type}`} className={classNames.row}>
            <td className={`${classNames.cell} ${classNames.td}`}>
              <div
                className={classNames.pokemonType}
                style={{
                  fontWeight: 500,
                  background: getPokemonTypeBackgroundColor(type.split(" ")[0]),
                }}
              >
                {upperFirst(type.split(" ")[0])}
              </div>
            </td>
            <td
              className={`${classNames.cell} ${classNames.td}`}
              style={{ color: +type.split("x")[1] > 1 ? "#c01919" : "black" }}
            >
              <div className={classNames.pokemonType}>{type.split(" ")[1]}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function getTypeDamageRelation(
  types: GatsbyConnection<IType>,
  toOrFrom: "to" | "from"
): string[] {
  const [type1, type2] = [...types.edges]

  const sortByMultiplierDesc = (a: string, b: string) =>
    +b.split("x")[1] - +a.split("x")[1]

  const mapToString = ({
    name,
    multiplier,
  }: {
    name: string
    multiplier: number
  }) => `${name} x${multiplier}`

  function toParsedArray(damageRelations: IDamageRelations) {
    const parse = (types: INamedAPIResource[], multiplier = 0) =>
      types.map(({ name }) => ({ name, multiplier }))

    const double = parse(damageRelations[`double_damage_${toOrFrom}`], 2)
    const half = parse(damageRelations[`half_damage_${toOrFrom}`], 0.5)
    const none = parse(damageRelations[`no_damage_${toOrFrom}`], 0)

    return [...double, ...half, ...none]
  }

  if (!type2) {
    const damageRelations = type1.node.damage_relations

    return toParsedArray(damageRelations)
      .map(mapToString)
      .sort(sortByMultiplierDesc)
  } else {
    const mapExtractName = ({ name }: { name: string }) => name
    const damageRelations1 = toParsedArray(type1.node.damage_relations)
    const damageRelations2 = toParsedArray(type2.node.damage_relations)

    const intersection1 = damageRelations1.filter(({ name }) =>
      damageRelations2.map(mapExtractName).includes(name)
    )
    const intersection2 = damageRelations2.filter(({ name }) =>
      damageRelations1.map(mapExtractName).includes(name)
    )

    const difference1 = damageRelations1.filter(
      ({ name }) => !damageRelations2.map(mapExtractName).includes(name)
    )

    const difference2 = damageRelations2.filter(
      ({ name }) => !damageRelations1.map(mapExtractName).includes(name)
    )

    const result = intersection1
      .map(({ name, multiplier }) => {
        const match = intersection2.find(type2 => name === type2.name)

        if (multiplier === 0) {
          return `${name} x0`
        } else if (match!.multiplier === 0) {
          return `${match!.name} x0`
        }

        return `${name} x${multiplier * match!.multiplier}`
      })
      .filter(typeName => typeName.split("x")[1] !== "1")

    const rest = [...difference1, ...difference2].map(
      ({ name, multiplier }) => `${name} x${multiplier}`
    )
    return [...result, ...rest].sort(sortByMultiplierDesc)
  }
}
