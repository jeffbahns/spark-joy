import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import { CentralColumn } from "../components/styles";

import WidgetBuilder from "../components/WidgetBuilder";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <CentralColumn>
      <p>Ask if it sparked joy</p>
      <WidgetBuilder />
    </CentralColumn>
  </Layout>
)

export default IndexPage
