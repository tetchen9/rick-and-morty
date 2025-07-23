'use client'

import NameForm from 'components/name-form'
import AppHeading from 'components/app-heading'

export default function Home() {

  return (
    <main>
      <AppHeading title="Rick and Morty" />
      <NameForm />
    </main>
  )
}

