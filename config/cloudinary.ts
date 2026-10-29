// Every displayed image goes through f_auto,q_auto to cut bandwidth (design.md "Ảnh và link mạng xã hội")
export const CLOUDINARY_TRANSFORM = 'f_auto,q_auto'

export const CLOUDINARY_DEMO_BASE = 'https://res.cloudinary.com/demo/image/upload'

export const CLOUDINARY_AUTO = `${CLOUDINARY_DEMO_BASE}/${CLOUDINARY_TRANSFORM}`
