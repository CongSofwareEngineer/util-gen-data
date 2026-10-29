import { SOCIAL_DOMAINS, SOCIAL_FIELD } from '@/constants/app'

const HTTPS_PROTOCOL = 'https:'

// Social link rules: https only, each field only accepts its own domain (website is free, moderated later).
// Returns a translation key of the error, or null when valid / empty.
export const validateSocialUrl = (field: SOCIAL_FIELD, value: string): string | null => {
  if (!value) return null

  let url: URL

  try {
    url = new URL(value)
  } catch {
    return 'validate.invalidUrl'
  }

  if (url.protocol !== HTTPS_PROTOCOL) return 'validate.httpsOnly'

  const domains = SOCIAL_DOMAINS[field]
  const host = url.hostname.replace(/^www\./, '')

  if (domains.length && !domains.some((domain) => host === domain || host.endsWith(`.${domain}`))) {
    return 'validate.wrongDomain'
  }

  return null
}
