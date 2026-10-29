import type { Metadata } from 'next'

import InvitationView from './InvitationView'

import { MOCK_WEDDING } from '@/mock'
import { translate } from '@/utils/language'

// Pages are private by default: not indexed by search engines
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: translate('publicPage.metaTitle', { groom: MOCK_WEDDING.groom.name, bride: MOCK_WEDDING.bride.name }),
    robots: { index: false, follow: false },
  }
}

export default async function InvitationPage({ params }: PageProps<'/thiep/[slug]'>) {
  const { slug } = await params

  return <InvitationView slug={slug} />
}
