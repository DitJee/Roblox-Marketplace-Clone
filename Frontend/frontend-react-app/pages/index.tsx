import Link from 'next/link'
import Layout from '../components/Layout'

import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ReactChild, ReactFragment, ReactPortal } from 'react'
import Header from '../components/header'


export async function getStaticProps() {
  const exploreData = await fetch("https://links.papareact.com/pyp").then(
    (res) => res.json()
  )
  // var fetchedData = await fetch("https://links.papareact.com/pyp")
  // const exploreData = await fetchedData.json()

  return {
    props:{
      exploreData:exploreData
    },
  }
}



export default function Home(props){
 
  return (
    <div className="4er">
      <Head>
        <title>Jee's App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>

      <main className='max-w-4xl mx-auto px-8 sm:px-16'>
        <section className = "pt-4">
         
        </section>
      </main>
    </div>
  )
}

