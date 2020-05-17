import React from 'react'
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'
import { useStaticQuery, graphql } from 'gatsby'
import WhiteWrapper from '../components/WhiteWrapper'
import styled from '@emotion/styled'

const Wrapped = styled(WhiteWrapper)`
  margin-top: 2em;
`

const PostTemplate = ({post, location}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `
  )
  let disqusConfig = {
    url: `${site.siteMetadata.siteUrl+location.pathname}`,
    identifier: post.id,
    title: post.title,
  }
  return (
    <Wrapped>
      <h1>{post.title} へのコメント</h1>
      <CommentCount config={disqusConfig} placeholder={'...'} />
      <Disqus config={disqusConfig} />
    </Wrapped>
  )
}

export default PostTemplate