import React, { Component, Fragment } from "react"
import { css } from "emotion"
import ReactModal from "react-modal"
import { graphql, StaticQuery, navigate } from "gatsby"
import Headroom from "react-headroom"

import SearchBar from "@/components/search-bar"
import PokemonThumbnailItem from "@/components/pokemon-thumbnail"

ReactModal.setAppElement("#___gatsby")

const styles = {
  root: css({
    margin: `0 auto`,
  }),
  count: css({
    background: "navy",
    width: "fit-content",
    color: "white",
    margin: "2px 0",
    padding: "1px 10px 1px 10px",
    borderRadius: "0 10px 10px 0",
    "& p": {
      margin: 0,
    },
  }),
  list: css({
    margin: 0,
    textAlign: "center",
  }),
}

export default class AllPokemon extends Component {
  state = {
    searchTerm: "",
    isModalOpen: false,
    pokemonName: "",
  }

  componentDidMount() {
    const searchTerm = new URLSearchParams(window.location.search).get("q")
    if (searchTerm) {
      this.setState({ searchTerm })
    }
  }

  handleSearchChange = e => {
    const searchTerm = e.target.value
    this.setState({ searchTerm })
    if (searchTerm) {
      navigate(`?q=${searchTerm}`)
    } else {
      navigate(`/`)
    }
  }

  getImgFluid = (allFrontSprite, nodeName) => {
    const imgFluidEdge = allFrontSprite.edges.find(
      sprite => sprite.node.id === `${nodeName}_front`
    )
    return imgFluidEdge ? imgFluidEdge.node.childImageSharp.fluid : null
  }

  handleModalOpen = event => {
    // console.log('handleModalOpen: ', event);
    this.setState({ isModalOpen: true })
  }

  handleModalClose = event => {
    // console.log('handleModalOpen: ', event);
    this.setState({ isModalOpen: false })
  }

  handleClick = (e, pokemonName) => {
    this.setState({ isModalOpen: true, pokemonName })
  }

  render() {
    const { handleSearchChange, getImgFluid } = this
    const { searchTerm } = this.state

    return (
      <StaticQuery
        query={graphql`
          query {
            allFrontSprite: allFile(filter: { id: { regex: "/_front/" } }) {
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
                  types {
                    slot
                    type {
                      name
                    }
                  }
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

          const filteredPokemon = allPokemon.edges
            .sort((a, b) => +a.node.id - +b.node.id)
            .filter(({ node }) => node.name.includes(searchTerm))

          return (
            <Fragment>
              <Headroom>
                <SearchBar
                  searchTerm={searchTerm}
                  onChange={handleSearchChange}
                />
                <div className={styles.count}>
                  <p>{`${filteredPokemon.length} pokémon`}</p>
                </div>
              </Headroom>
              <div className={styles.root}>
                <ul className={styles.list}>
                  {filteredPokemon.length ? (
                    filteredPokemon.map(({ node }) => (
                      <PokemonThumbnailItem
                        key={node.id}
                        id={node.id}
                        name={node.name}
                        types={node.types}
                        imgFluid={getImgFluid(allFrontSprite, node.name)}
                      />
                    ))
                  ) : (
                    <li>
                      <p>No results for "{searchTerm}"</p>
                    </li>
                  )}
                </ul>
              </div>
            </Fragment>
          )
        }}
      />
    )
  }
}
