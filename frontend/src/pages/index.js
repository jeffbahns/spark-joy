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
    <CentralColumn style={{paddingTop: '2em'}}>
      <p>Did your thing spark joy? Ask the fans for feedback.</p>
      <p>Fill out the widget, export to HTML, insert anywhere</p>
      <WidgetBuilder />
    </CentralColumn>
  </Layout>
)

export default IndexPage
