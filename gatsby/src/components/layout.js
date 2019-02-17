import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { PageRenderer, StaticQuery, graphql } from "gatsby"

import Header from "./header"

let Modal
import(`./modal`).then(modal => {
  Modal = modal.default
})

class Layout extends Component {
  static propTypes = {
    isModal: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    isModal: false,
  }

  render() {
    const { isModal, location, children } = this.props

    if (isModal && Modal) {
      return (
        <Fragment>
          <PageRenderer location={{ pathname: `/` }} />
          Motherfucker
          <Modal isOpen={true} location={location}>
            {children}
          </Modal>
        </Fragment>
      )
    }

    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <Fragment>
            <Helmet
              title={data.site.siteMetadata.title}
              meta={[
                {
                  name: "description",
                  content: "Pokémon static site powered by Pokeapi and Gatsby",
                },
                {
                  name: "keywords",
                  content: [
                    "pokeapi",
                    "pokemon",
                    "pokémon",
                    "pokedex",
                    "gatsby",
                    "static-site",
                  ].join(","),
                },
              ]}
            >
              <html lang="en" />
            </Helmet>
            <Header siteTitle={data.site.siteMetadata.title} />
            <div
              style={{
                margin: "0 auto", // padding: "0px 1.0875rem 1.45rem",
                paddingTop: 0,
              }}
            >
              {children}
            </div>
          </Fragment>
        )}
      />
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
