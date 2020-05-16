import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import PageTitle from '../components/PageTitle'
import Container from '../components/Container'
import Layout from '../components/Layout'
import WhiteWrapper from '../components/WhiteWrapper'
import SEO from '../components/SEO'

const Text = styled.p`
  text-align: center;
  line-height: 1.6;
  a {
    color: ${props => props.theme.colors.text};
  }
`

const NotFoundPage = ({location}) => (
  <Layout>
    <SEO title="404" description="Page Not Found" location={location} />
    <Container>
      <PageTitle>お探しのページが見つかりませんでした</PageTitle>
      <WhiteWrapper>
        <Text>
          <Link to="/">トップページ</Link>へお戻りください
        </Text>
      </WhiteWrapper>
    </Container>
  </Layout>
)

export default NotFoundPage
