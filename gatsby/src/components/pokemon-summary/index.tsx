import React from "react"
import { css } from "emotion"
import { IPokemonType } from "@typings/pokemon"
import PokemonTypes from "@/components/pokemon-types"

export interface IPokemonSummaryProps {
  types: IPokemonType[]
  weight: number
  height: number
}

const classNames = {
  root: css({
    marginBottom: "1.45rem",
  }),
  list: css({
    padding: 0,
    margin: 0,
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  listItem: css({
    textAlign: "center",
    display: "inline-block",
    padding: "1rem",
    fontSize: 20,
    boxSizing: "border-box",
  }),
  bordered: css({
    borderLeft: "1px solid lightgray",
    borderRight: "1px solid lightgray",
  }),
  type: css({
    fontSize: 16,
  }),
  lightText: css({ color: "gray" }),
}

export default function PokemonSummary({
  types,
  height,
  weight,
}: IPokemonSummaryProps) {
  return (
    <div className={classNames.root}>
      <ul className={classNames.list}>
        <li className={classNames.listItem}>
          <p>
            {weight / 10}
            Kg.
            <br />
            <small className={classNames.lightText}>Weight</small>
          </p>
        </li>

        <li className={`${classNames.listItem} ${classNames.bordered}`}>
          <PokemonTypes types={types} itemClassName={classNames.type} />
          <p>
            <small className={classNames.lightText}>Type</small>
          </p>
        </li>

        <li className={classNames.listItem}>
          <p>
            {height / 10}
            m.
            <br />
            <small className={classNames.lightText}>Height</small>
          </p>
        </li>
      </ul>
    </div>
  )
}
