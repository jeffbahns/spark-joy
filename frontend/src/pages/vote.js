import React, { useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { CentralColumn } from "../components/styles"

import { useApolloClient } from "react-apollo-hooks"
import { WIDGET_VOTE_QUERY } from "../queries"

async function saveVote({ widgetId, voteType, apolloClient }) {
  const result = await apolloClient.mutate({
    mutation: WIDGET_VOTE_QUERY,
    variables: {
      widgetId: widgetId,
      thumbsup: voteType === "thumbsup",
      thumbsdown: voteType === "thumbsdown",
    },
  })
  console.log(result)
}

const VotePage = ({ pageContext }) => {
  const apolloClient = useApolloClient()
  
  const widgetId = pageContext.widgetId
  const voteType = pageContext.voteType

  useEffect(() => {
    saveVote({ widgetId, voteType, apolloClient })
  }, [])

  console.log('asdfasdfasd' + widgetId)
  return (
    <Layout>
      <SEO title="Thank You" />
      <CentralColumn style={{ paddingTop: "2em" }}>
        <p>Thank you, you're dopee! widgetId: {widgetId}, vote: {voteType} </p>
      </CentralColumn>
    </Layout>
  )
}

export default VotePage
