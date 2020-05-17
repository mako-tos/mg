import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Container from '../components/Container'
import PageBody from '../components/PageBody'
import TagList from '../components/TagList'
import PostLinks from '../components/PostLinks'
import PostDetails from '../components/PostDetails'
import Gmap from '../components/Gmap'
import SEO from '../components/SEO'
import WhiteWrapper from '../components/WhiteWrapper'
import Comments from '../components/Comments'
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'

const PostTemplate = ({ data, pageContext, location }) => {
  const {
    title,
    metaDescription,
    heroImage,
    body,
    publishDate,
    tags,
    lat,
    lng,
    price,
    space,
    address,
    buildAt,
    station,
    ldk,
  } = data.contentfulPost

  const { previous, next, basePath } = pageContext
  const apiKey = data.site.siteMetadata.googleMap

  let ogImage
  try {
    ogImage = heroImage.ogimg.src
  } catch (error) {
    ogImage = null
  }

  return (
    <Layout>
      <SEO
        title={title}
        description={
          metaDescription
            ? metaDescription.internal.content
            : body.childMarkdownRemark.excerpt
        }
        image={ogImage}
        location={location}
      />
      <Hero title={title} image={heroImage} height={'50vh'} />
      <Container>
        <Breadcrumb location={location} crumbLabel={title} />
        {tags && <TagList tags={tags} basePath={basePath} />}
        <WhiteWrapper>
          <PostDetails
            date={publishDate}
            timeToRead={body.childMarkdownRemark.timeToRead}
          />
          <PageBody body={body} />
          <div>{price} 万円</div>
          <div>{space} ㎡</div>
          <div>{address}</div>
          <div>築{buildAt}</div>
          <div>{station}</div>
          <div>{ldk}</div>
          <div className="to-contact">
            <Link to="/contact">お問合せ</Link>
          </div>
          <Gmap lat={lat} lng={lng} text={title} apiKey={apiKey} />
        </WhiteWrapper>
      </Container>
      <PostLinks previous={previous} next={next} basePath={basePath} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulPost(slug: { eq: $slug }) {
      title
      slug
      metaDescription {
        internal {
          content
        }
      }
      publishDate(formatString: "YYYY-MM-DD")
      publishDateISO: publishDate(formatString: "YYYY-MM-DD")
      tags {
        title
        id
        slug
      }
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
          excerpt(pruneLength: 320)
        }
      }
      lat
      lng
      price
      space
      address
      buildAt
      station
      ldk
    },
    site {
      siteMetadata {
        googleMap
      }
    }
  }
`

export default PostTemplate
