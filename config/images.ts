import { CLOUDINARY_AUTO } from '@/config/cloudinary'

export const images = {
  favicon: '/logo.png',
  logo: '/logo.png',
  icons: {
    avatarDefault: '/favicon.png',
  },
  // Cloudinary demo images used by the mock data until uploads are wired to the API
  demo: {
    cover: `${CLOUDINARY_AUTO}/couple.jpg`,
    album: [`${CLOUDINARY_AUTO}/couple.jpg`, `${CLOUDINARY_AUTO}/sample.jpg`, `${CLOUDINARY_AUTO}/woman.jpg`, `${CLOUDINARY_AUTO}/lady.jpg`],
  },
}
