import {getAllSlugs, getPostBySlug } from 'lib/api'
import { extractText } from 'lib/extract-text'
import Meta from 'components/meta'
import Container from 'components/container'
import PostHeader from 'components/post-header'
import PostBody from 'components/post-body' 
import ConvertBody from 'components/convert-body'
import PostCategories from 'components/post-categories'
import Image from 'next/image'
import { TwoColumn, TwoColumnMain, TwoColumnSidebar } from 'components/two-column'
import { eyecatchLocal } from 'lib/contents'
import { getPlaiceholder } from 'plaiceholder'

export default function Post({
  title,
  description,
  publish,
  content,
  eyecatch,
  categories,
}) {
  return (
    <Container>
      <Meta
        pageTitle={title}
        pageDesc={description}
        pageImg={eyecatch.url}
        pageImgW={eyecatch.width}
        pageImgH={eyecatch.height}
      />
      <article>
        <PostHeader title={title} subtitle="Blog Article" publish={publish} />

        <figure>
          <Image
            src={eyecatch.url}
            alt=""
            layout='responsive'
            width={eyecatch.width}
            height={eyecatch.height}
            sizes="(min-width: 1152px) 1152px, 100vw"
            priority
            placeholder='blur'
            blurDataURL={eyecatch.blurDataURL}
          />
        </figure>

        <TwoColumn>
          <TwoColumnMain>
            <PostBody>
              <ConvertBody contentHTML={content} />
            </PostBody>
          </TwoColumnMain>
          <TwoColumnSidebar>
            <PostCategories categories={categories} />
          </TwoColumnSidebar>
        </TwoColumn>
      </article>
    </Container>
  )
}

export async function getStaticPaths() {
  const allSlugs = await getAllSlugs()
  return {
    paths: allSlugs.map(({slug}) => `/blog/${slug}`),
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const slug = context.params.slug
  const post = await getPostBySlug(slug)
  const description = extractText(post.content)
  const eyecatch = post.eyecatch ?? eyecatchLocal

  const { base64 } = await getPlaiceholder(eyecatch.url)
  eyecatch.blurDataURL = base64

  return {
    // propsの中身はAppコンポーネントに渡され、ページコンポーネント上で利用できるようになる
    props: {
      title: post.title,
      publish: post.publishDate,
      content: post.content,
      eyecatch: eyecatch,
      categories: post.categories,
      description: description
    }
  }

  // const resPromise = client.get({
  //   endpoint: 'blogs',
  // })
  // // resPromise.then((res) => console.log(res)).catch((err) => console.log(err))

  // try {
  //   const res = await resPromise
  //   console.log(res)
  // } catch(err) {
  //   console.log(err)
  // }

  // return {
  //   props: {

  //   },
  // }
}




// export default function Schedule() {
//   return <h1>記事のタイトル</h1>
// }

// export async function getStaticProps() {
//   console.log('処理1')
//   // console.log('処理2')
//   setTimeout(()=> console.log('処理2'), 1000)
//   console.log('処理3')

//   return {
//     props: {},
//   }
// }