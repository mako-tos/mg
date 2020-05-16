import React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const SEO = ({ title, description, location, image }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            image
            siteUrl
          }
        }
      }
    `
  )

  const defaultImage = `${site.siteMetadata.siteUrl}${site.siteMetadata.image}`
  const metaDescription = description || site.siteMetadata.description
  const metaImage = image || defaultImage

  const seo = {
    title: title || site.siteMetadata.title,
    description: metaDescription,
    image: metaImage,
    url: site.siteMetadata.siteUrl + location.pathname
  }
  const schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      '@id': seo.url,
      url: seo.url,
      name: seo.title,
      alternateName: seo.title,
      headline: seo.title,
      image: {
        '@type': 'ImageObject',
        url: seo.image
      },
      author: {
        '@type': 'Person',
        name: '篠田　誠'
      },
      mainEntityOfPage: {
        '@type': 'WebSite',
        '@id': seo.url
      }
    }
  ]
  return (
    <Helmet
      htmlAttributes={{
        lang: `ja-JP`,
      }}
      title={title}
      defaultTitle={site.siteMetadata.title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
    >
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* General tags */}
      <meta name="image" content={image} />
      <meta name="description" content={metaDescription} />

      {/* OpenGraph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:description" content={metaDescription} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:description" content={metaDescription} />

      <script type='application/ld+json'>
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  )
}

export default SEO
