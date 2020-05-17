import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/Layout'
import CardList from '../components/CardList'
import Card from '../components/Card'
import Container from '../components/Container'
import Pagination from '../components/Pagination'
import SEO from '../components/SEO'
import GmapTop from '../components/GmapTop'
import { startCase } from 'lodash'
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import 'gatsby-plugin-breadcrumb/gatsby-plugin-breadcrumb.css'

const Posts = ({ data, pageContext, location }) => {
  const posts = data.allContentfulPost.edges
  const topImage = data.contentfulAsset
  const apiKey = data.site.siteMetadata.googleMap
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
    ogImage = data.contentfulAsset.ogimg.src
  } catch (error) {
    ogImage = null
  }

  const markers = posts.map(post => {
    const node = post.node
    return {
      lat: node.lat,
      lng: node.lng,
      slug: node.slug,
      text: node.title,
    }
  })
  return (
    <Layout>
      <SEO title={startCase(basePath)} image={ogImage} location={location} />
      <Container>
        <Breadcrumb location={location} crumbLabel="Home" />
        {isFirstPage ? (
          <div>
            <div className="header-image-container">
              <Img fluid={topImage.fluid} alt={topImage.title} />
              <img
                className="logo-image"
                src="/images/logo_white_96.jpg"
                alt="企業ロゴ"
              />
            </div>
            <h3 style={{ padding: '0.5em 0', color: 'white' }}>New</h3>
            <CardList>
              <Card {...featuredPost} featured basePath={basePath} />
              {posts.slice(1).map(({ node: post }) => (
                <Card key={post.id} {...post} basePath={basePath} />
              ))}
            </CardList>
            <h3 style={{ padding: '0.5em 0', color: 'white' }}>
              弊社取り扱い物件
            </h3>
            <GmapTop
              lat={35.640913}
              lng={139.68925}
              markers={markers}
              basePath={basePath}
              apiKey={apiKey}
            />
            <div className="to-contact">
              <Link to="/contact">お問合せ</Link>
            </div>
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
            fluid(quality: 80, maxWidth: 1000) {
              ...GatsbyContentfulFluid_withWebp_noBase64
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
    contentfulAsset(contentful_id: { eq: "4CBG0pj2AqgZwBAzkhZG9f" }) {
      fluid(quality: 80, maxWidth: 1000) {
        ...GatsbyContentfulFluid_withWebp_noBase64
      }
      ogimg: resize(width: 1000) {
        src
      }
      title
    },
    site {
      siteMetadata {
        googleMap
      }
    }
  }
`

export default Posts
