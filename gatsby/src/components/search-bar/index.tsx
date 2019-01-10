import React, { ChangeEvent } from "react"
import { css } from "emotion"

export interface ISearchBarProps {
  searchTerm: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => {}
}

const classNames = {
  root: css({
    width: "100%",
    position: "relative",
  }),
  input: css({
    width: "100%",
    outline: 0,
    lineHeight: "2.5rem",
    fontSize: "18px",
    padding: "0 2rem",
    border: "none",
    borderBottom: "1px solid rgba(0, 0, 0, 0.4)",
    "& ~ .focus-border": {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: 0,
      height: 2,
      backgroundColor: "navy",
      transition: "0.4s",
    },
    "&:focus ~ .focus-border": {
      width: "100%",
      transition: "0.4s",
    },
  }),
  borderBottom: css({
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 0,
    height: 2,
    backgroundColor: "navy",
    transition: "0.4s",
    "&focus": {
      width: "100%",
      transition: "0.4s",
    },
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
        placeholder={"Search pokémon"}
        aria-label="Search pokémon"
        className={classNames.input}
        onChange={onChange}
      />
      <span className="focus-border" />
    </div>
  )
}
