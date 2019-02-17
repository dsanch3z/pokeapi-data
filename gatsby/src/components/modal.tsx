import * as React from "react"
import ReactModal from "react-modal"
import mousetrap from "mousetrap"
import { navigate, StaticQuery, graphql } from "gatsby"

ReactModal.setAppElement(`#___gatsby`)

let pokemonNames: any[]

export interface IPokeapiModalProps {
  isOpen: boolean
  location: any
}

export default class Modal extends React.Component<IPokeapiModalProps> {
  static defaultProps = {
    isOpen: false,
  }

  public componentDidMount() {
    mousetrap.bind(`left`, () => this.prev())
    mousetrap.bind(`right`, () => this.next())
  }

  public componentWillUnmount() {
    mousetrap.unbind(`left`)
    mousetrap.unbind(`right`)
  }

  public prev = () => {
    const currentIndex = this.findCurrentIndex()
    if (currentIndex !== -1) {
      const prev =
        currentIndex === 0
          ? pokemonNames.slice(-1)[0]
          : pokemonNames[currentIndex - 1]
      navigate(`/${prev.id}/`)
    }
  }

  public next = () => {
    const currentIndex = this.findCurrentIndex()
    if (currentIndex !== -1) {
      const next =
        currentIndex + 1 === pokemonNames.length
          ? pokemonNames[0]
          : pokemonNames[currentIndex + 1]
      navigate(`/${next.id}/`)
    }
  }

  findCurrentIndex() {
    const index = pokemonNames.findIndex(
      pokemon => pokemon.name === this.props.location.pathname.split(`/`)[1]
    )

    return index
  }

  public render() {
    const { isOpen, children } = this.props
    return (
      <StaticQuery
        query={graphql`
          query {
            pokemonNames: allPokeapiPokemon {
              edges {
                node {
                  name
                }
              }
            }
          }
        `}
        render={data => {
          if (!pokemonNames) {
            pokemonNames = data.pokemonNames.edges.map(edge => edge.node)
          }

          return (
            <ReactModal
              isOpen={isOpen}
              onRequestClose={() => navigate(`/`)}
              contentLabel="Modal"
              style={{
                zIndex: 100,
                overlay: {
                  position: `fixed`,
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 10,
                },
                content: {
                  position: `absolute`,
                  border: `none`,
                  background: `none`,
                  padding: 0,
                  top: 0,
                  bottom: 0,
                  right: 0,
                  left: 0,
                  overflow: `auto`,
                  WebkitOverflowScrolling: `touch`,
                },
              }}
            >
              {children}
            </ReactModal>
          )
        }}
      />
    )
  }
}
