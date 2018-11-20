import React, { ChangeEvent } from "react"
import { css } from "emotion"

export interface ISearchBarProps {
  searchTerm: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => {}
}

const classNames = {
  root: css({
    width: "100%",
  }),
  input: css({
    width: "100%",
    outline: 0,
    border: "none",
    borderBottom: "1px solid rgba(0, 0, 0, 0.4)",
  }),
}

export default function SearchBar({
  searchTerm = "",
  onChange,
}: ISearchBarProps) {
  return (
    <div className={classNames.root}>
      <input
        type="text"
        name={"pokemon-search"}
        value={searchTerm}
        placeholder={"Search pokemons..."}
        className={classNames.input}
        onChange={onChange}
        autoFocus={true}
      />
    </div>
  )
}
