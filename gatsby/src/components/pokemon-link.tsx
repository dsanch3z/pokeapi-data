import React from "react"
import { Link } from "gatsby"
import { upperFirst } from "lodash"
import { css } from "emotion"

export interface IPokemonLinkProps {
  name: string
  className?: string
  children?: any
}

const styles = {
  root: css({
    textDecoration: "none",
    color: "black",
  }),
}

export default ({ name, className = "", children }: IPokemonLinkProps) => (
  <Link className={`${styles.root} ${className}`} to={`/pokemon/${name}`}>
    {children ? children : upperFirst(name)}
  </Link>
)
