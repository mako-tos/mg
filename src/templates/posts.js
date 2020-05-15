import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import CardList from '../components/CardList'
import Card from '../components/Card'
import Container from '../components/Container'
import Pagination from '../components/Pagination'
import SEO from '../components/SEO'
import GmapTop from '../components/GmapTop'
import { startCase } from 'lodash'
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'

const Posts = ({ data, pageContext, location }) => {
  const posts = data.allContentfulPost.edges
  const { humanPageNumber, basePath } = pageContext
  const isFirstPage = humanPageNumber === 1
  let featuredPost
  let ogImage

  try {
    featuredPost = posts[0].node
  } catch (error) {
    featuredPost = null
  }
  try {
    ogImage = posts[0].node.heroImage.ogimg.src
  } catch (error) {
    ogImage = null
  }

  const markers = posts.map(post => {
    const node = post.node
    return {
      lat: node.lat,
      lng: node.lng,
      slug: node.slug,
      text: node.title
    }
  })

  return (
    <Layout>
      <SEO title={startCase(basePath)} image={ogImage} />
      <Container>
        <Breadcrumb location={location} crumbLabel="Home" />
        {isFirstPage ? (
          <div>
            <h3 style={{ padding: '0.5em 0' }}>
              ★新しいマンションのご紹介！★
            </h3>
            <CardList>
              <Card {...featuredPost} featured basePath={basePath} />
              {posts.slice(1).map(({ node: post }) => (
                <Card key={post.id} {...post} basePath={basePath} />
              ))}
            </CardList>
            <h3 style={{ padding: '0.5em 0' }}>
              弊社取り扱い物件
            </h3>
            <GmapTop lat={ 35.63317 } lng={ 139.708868 } markers={ markers } basePath={basePath} />
          </div>
        ) : (
          <CardList>
            {posts.map(({ node: post }) => (
              <Card key={post.id} {...post} basePath={basePath} />
            ))}
          </CardList>
        )}
      </Container>
      <Pagination context={pageContext} />
    </Layout>
  )
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allContentfulPost(
      sort: { fields: [publishDate], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          title
          id
          slug
          publishDate(formatString: "YYYY-MM-DD")
          heroImage {
            title
            fluid(maxWidth: 1800) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
            ogimg: resize(width: 1800) {
              src
            }
          }
          body {
            childMarkdownRemark {
              timeToRead
              html
              excerpt(pruneLength: 80)
            }
          }
          lat
          lng
        }
      }
    }
  }
`

export default Posts