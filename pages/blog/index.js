import Meta from 'components/meta'
import Hero from 'components/hero'
import Container from 'components/container'

export default function Blog() {
  return (
    <Container>
      <Meta pageTitle="ブログ" pageDesc="ブログの記事一覧" />
      <Hero title="Blog" subtitle="Recent Posts" />
    </Container>
  )
}