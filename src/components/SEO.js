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

  const seo = {
    title: title || site.siteMetadata.title,
    description: description || site.siteMetadata.description,
    image: image || defaultImage,
    url: site.siteMetadata.siteUrl + location.pathname,
    type: location.pathname === '/' ? 'website' : 'article'
  }
  const schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': seo.type,
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
      title={seo.title}
      defaultTitle={site.siteMetadata.title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
    >
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* General tags */}
      <meta name="image" content={seo.image} />
      <meta name="description" content={seo.description} />

      {/* OpenGraph tags */}
      <meta property="og:type" content={seo.type} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:description" content={seo.description} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:description" content={seo.description} />

      <link rel="preconnect" href="https://maps.googleapis.com" />

      <script type='application/ld+json'>
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  )
}

export default SEO
