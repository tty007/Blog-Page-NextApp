import { client, getPostBySlug } from 'lib/api'
import Container from 'components/container'

export default function Schedule({
  title,
  publish,
  content,
  eyecatch,
  categories,
}) {
  return (
    <Container>
      <h1>{title}</h1>
    </Container>
  )
}

export async function getStaticProps() {
  const slug = 'schedule'

  const post = await getPostBySlug(slug)
  console.log(post)

  return {
    // propsの中身はAppコンポーネントに渡され、ページコンポーネント上で利用できるようになる
    props: {
      title: post.title,
      publish: post.publishDate,
      content: post.content,
      eyecatch: post.eyecatch,
      categories: post.categories,
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