import React, { Component } from "react"
import { css } from "emotion"
import { graphql, StaticQuery } from "gatsby"
import Headroom from "react-headroom"

import PokemonThumbnailItem from "@/components/pokemon-thumbnail"
import SearchBar from "@/components/search-bar"

const styles = {
  root: css({
    margin: `0 auto`,
  }),
  list: css({
    padding: 0,
  }),
}

export default class AllPokemon extends Component {
  state = {
    searchTerm: "",
  }

  handleSearchChange = e => {
    const { value } = e.target
    this.setState({
      searchTerm: value,
    })
  }

  render() {
    const { handleSearchChange } = this
    const { searchTerm } = this.state
    return (
      <StaticQuery
        query={graphql`
          query {
            allFrontSprite: allFile(filter: { ext: { eq: ".png" } }) {
              edges {
                node {
                  id
                  childImageSharp {
                    fluid(maxWidth: 800, quality: 80) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }

            allPokemon: allPokeapiPokemon {
              edges {
                node {
                  id
                  name
                  sprites {
                    front_default
                  }
                }
              }
            }
          }
        `}
        render={data => {
          const { allPokemon, allFrontSprite } = data
          return (
            <>
              <Headroom>
                <SearchBar
                  searchTerm={searchTerm}
                  onChange={handleSearchChange}
                />
              </Headroom>
              <div className={styles.root}>
                <ul className={styles.list}>
                  {allPokemon.edges
                    .sort((a, b) => +a.node.id - +b.node.id)
                    .filter(({ node }) => node.name.includes(searchTerm))
                    .map(({ node }) => (
                      <PokemonThumbnailItem
                        key={node.id}
                        id={node.id}
                        name={node.name}
                        imgFluid={
                          allFrontSprite.edges.find(
                            sprite => sprite.node.id === `${node.name}_front`
                          ).node.childImageSharp.fluid
                        }
                      />
                    ))}
                </ul>
              </div>
            </>
          )
        }}
      />
    )
  }
}
