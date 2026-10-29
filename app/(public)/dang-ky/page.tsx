import { Suspense } from 'react'

import RegisterForm from './RegisterForm'

// useSearchParams (invite code) needs a Suspense boundary to prerender
export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  )
}
