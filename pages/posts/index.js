import React from 'react'
import Head from 'next/head'

import AllPosts from '../../components/posts/all-posts'

import { getAllPosts } from '../../lib/posts-util'

const AllPostsPage = ({ posts }) => {
  return (
    <>
      <Head>
        <title>ContactMe</title>
        <meta name="description" content="A list of all programming-related tutorials and posts!" />
      </Head>
      <AllPosts posts={posts} />
    </>
  )
}

export function getStaticProps() {
  const allPosts = getAllPosts()

  return {
    props: {
      posts: allPosts
    }
  }
}

export default AllPostsPage
