import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Container from '../components/Container'
import PageTitle from '../components/PageTitle'
import PageBody from '../components/PageBody'
import Gmap from '../components/Gmap'
import SEO from '../components/SEO'
import WhiteWrapper from '../components/WhiteWrapper'
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'

const PageTemplate = ({ data, location }) => {
  const {
    title,
    metaDescription,
    body,
    lat,
    lng,
    mapLabel,
  } = data.contentfulPage
  const apiKey = data.site.siteMetadata.googleMap
  return (
    <Layout>
      <SEO
        title={title}
        description={
          metaDescription
            ? metaDescription.internal.content
            : body.childMarkdownRemark.excerpt
        }
        location={location}
      />
      <Container>
        <Breadcrumb location={location} crumbLabel={title} />

        <PageTitle>{title}</PageTitle>
        <WhiteWrapper>
          <PageBody body={body} />
          {lat && lng ? (
            <div>
              <Gmap lat={lat} lng={lng} text={mapLabel} apiKey={apiKey} />
            </div>
          ) : (
            <></>
          )}
        </WhiteWrapper>
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
    },
    site {
      siteMetadata {
        googleMap
      }
    }
  }
`

export default PageTemplate
