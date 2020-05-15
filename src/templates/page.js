import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Container from '../components/Container'
import PageTitle from '../components/PageTitle'
import PageBody from '../components/PageBody'
import Gmap from '../components/Gmap'
import SEO from '../components/SEO'
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'

const PageTemplate = ({ data, location }) => {
  const { title, metaDescription, body, lat, lng, mapLabel } = data.contentfulPage
  return (
    <Layout>
      <SEO
        title={title}
        description={
          metaDescription
            ? metaDescription.internal.content
            : body.childMarkdownRemark.excerpt
        }
      />
      <Container>
        <Breadcrumb location={location} crumbLabel={title} />
        <PageTitle>{title}</PageTitle>
        <PageBody body={body} />
        { lat && lng ? (
          <div>
            <Gmap lat={ lat } lng={ lng } text={ mapLabel } />
          </div>
        ) : (
          <p></p>
        )}
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      title
      slug
      metaDescription {
        internal {
          content
        }
      }
      body {
        childMarkdownRemark {
          html
          excerpt(pruneLength: 320)
        }
      }
      lat
      lng
      mapLabel
    }
  }
`

export default PageTemplate
