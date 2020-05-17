import React from 'react'
import Layout from '../components/Layout'
import Container from '../components/Container'
import PageTitle from '../components/PageTitle'
import ContactForm from '../components/ContactForm'
import SEO from '../components/SEO'
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import 'gatsby-plugin-breadcrumb/gatsby-plugin-breadcrumb.css'

const Contact = ({ data, location }) => {
  const title = 'Contact'
  return (
    <Layout>
      <SEO
        title={title}
        description="お問合せはこちらから"
        location={location}
      />
      <Container>
        <Breadcrumb location={location} crumbLabel={title} />
        <PageTitle>{title}</PageTitle>
        <ContactForm />
      </Container>
    </Layout>
  )
}

export default Contact
