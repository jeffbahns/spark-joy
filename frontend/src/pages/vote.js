import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import { CentralColumn } from "../components/styles";

const VotePage = ({ voteType }) => (
  <Layout>
    <SEO title="Thank You" />
    <CentralColumn style={{paddingTop: '2em'}}>
        <p>Thank you, you're dope!</p>
    </CentralColumn>
  </Layout>
)

export default VotePage;
