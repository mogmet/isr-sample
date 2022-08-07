import axios from 'axios'
import {NextPage} from 'next'
import {useRouter} from 'next/router'
import {Post} from "../../interfaces/post"
import {GetServerSidePropsResult} from "next/types"

export const PostComponent: NextPage<{ post: Post }> = ({post}) => {
  const router = useRouter()
  if (!router.isFallback && !post?.id) return <p>error</p>
  return (
    <div dangerouslySetInnerHTML={{__html: `${post.id} ${post.title}`}}/>
  )
}
export default PostComponent
type StaticProps = { params: { id: string } }
// export async function getServerSideProps({params}: StaticProps): Promise<GetServerSidePropsResult<any>> {
//   const props = await fetchProps(params)
//   return {
//     props
//   }
// }

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({params}: StaticProps) => {
  const props = await fetchProps(params)
  return {
    props: props,
    revalidate: 10,
  }
}

async function fetchProps(params: { id: string }): Promise<{ [key: string]: any }> {
  const post = await fetchData(params.id.toString())
  return  { post }
}

async function fetchData(id: string): Promise<Post> {
  const result = await axios.get(`http://localhost:3000/post${id}.json`)
  return result.data.result
}
