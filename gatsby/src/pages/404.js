import React from "react"
import { css } from "emotion"

import Layout from "@/components/layout"
import Placeholder from "@/components/pokemon-placeholder"

const classNames = {
  root: css({
    textAlign: "center",
  }),
  placeholder: css({
    marginTop: 50,
    marginBottom: 50,
  }),
}

const NotFoundPage = () => (
  <Layout>
    <div className={classNames.root}>
      <h1>NOT FOUND</h1>
      <Placeholder width={300} className={classNames.placeholder} />
    </div>
  </Layout>
)

export default NotFoundPage
