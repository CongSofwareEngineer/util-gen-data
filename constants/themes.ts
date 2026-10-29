import type { CSSProperties } from 'react'

import { THEME_KEY } from '@/constants/app'

// A theme is a token set (colors, fonts, ornament, effects); the section layout is shared by all themes
export type ThemeTokens = {
  key: THEME_KEY
  colors: {
    background: string
    surface: string
    primary: string
    accent: string
    text: string
    muted: string
  }
  fonts: {
    heading: string
    body: string
    // Couple names (handwriting for some themes)
    names: string
  }
  radius: string
  // Background effect on the cover section
  coverOverlay: string
}

const FONT = {
  app: "'Be Vietnam Pro', system-ui, sans-serif",
  playfair: "'Playfair Display', serif",
  notoSerif: "'Noto Serif', serif",
  mono: "'JetBrains Mono', monospace",
  exo: "'Exo 2', sans-serif",
  quicksand: "'Quicksand', sans-serif",
  cormorant: "'Cormorant Garamond', serif",
  dancing: "'Dancing Script', cursive",
  lora: "'Lora', serif",
}

export const THEMES: Record<THEME_KEY, ThemeTokens> = {
  [THEME_KEY.CLASSIC]: {
    key: THEME_KEY.CLASSIC,
    colors: { background: '#FBF7EF', surface: '#FFFDF8', primary: '#8A5A2B', accent: '#B8925A', text: '#3B2A1A', muted: '#8C7A66' },
    fonts: { heading: FONT.playfair, body: FONT.lora, names: FONT.playfair },
    radius: '0.25rem',
    coverOverlay: 'linear-gradient(180deg, rgba(59,42,26,0.15), rgba(59,42,26,0.55))',
  },
  [THEME_KEY.CHINESE]: {
    key: THEME_KEY.CHINESE,
    colors: { background: '#9E1B1B', surface: '#B42323', primary: '#F4C95D', accent: '#FFE29A', text: '#FFF4D6', muted: '#F2C9A0' },
    fonts: { heading: FONT.notoSerif, body: FONT.notoSerif, names: FONT.notoSerif },
    radius: '0.5rem',
    coverOverlay: 'linear-gradient(180deg, rgba(120,10,10,0.35), rgba(120,10,10,0.8))',
  },
  [THEME_KEY.TECH]: {
    key: THEME_KEY.TECH,
    colors: { background: '#0B0F14', surface: '#111821', primary: '#39FF88', accent: '#00D1FF', text: '#D7FFE9', muted: '#6B8A7A' },
    fonts: { heading: FONT.mono, body: FONT.mono, names: FONT.mono },
    radius: '0.125rem',
    coverOverlay: 'linear-gradient(180deg, rgba(11,15,20,0.4), rgba(11,15,20,0.9))',
  },
  [THEME_KEY.FUTURE]: {
    key: THEME_KEY.FUTURE,
    colors: { background: '#120A2A', surface: 'rgba(255,255,255,0.08)', primary: '#B57BFF', accent: '#3EE6FF', text: '#F2EEFF', muted: '#A99CCF' },
    fonts: { heading: FONT.exo, body: FONT.exo, names: FONT.exo },
    radius: '1.25rem',
    coverOverlay: 'linear-gradient(135deg, rgba(181,123,255,0.45), rgba(62,230,255,0.35))',
  },
  [THEME_KEY.CUTE]: {
    key: THEME_KEY.CUTE,
    colors: { background: '#FFF1F4', surface: '#FFFFFF', primary: '#F27BA0', accent: '#8ED9C4', text: '#5A3946', muted: '#B08897' },
    fonts: { heading: FONT.quicksand, body: FONT.quicksand, names: FONT.quicksand },
    radius: '1.75rem',
    coverOverlay: 'linear-gradient(180deg, rgba(255,241,244,0.1), rgba(242,123,160,0.45))',
  },
  [THEME_KEY.WESTERN]: {
    key: THEME_KEY.WESTERN,
    colors: { background: '#FFFFFF', surface: '#F7F8F4', primary: '#7D9B76', accent: '#D8C08C', text: '#2F3A2C', muted: '#7F8B7A' },
    fonts: { heading: FONT.cormorant, body: FONT.cormorant, names: FONT.dancing },
    radius: '0.75rem',
    coverOverlay: 'linear-gradient(180deg, rgba(255,255,255,0), rgba(47,58,44,0.5))',
  },
  [THEME_KEY.RUSTIC]: {
    key: THEME_KEY.RUSTIC,
    colors: { background: '#EFE3CF', surface: '#F7EEDD', primary: '#7A5232', accent: '#6E8B3D', text: '#3E2C1C', muted: '#8E7559' },
    fonts: { heading: FONT.lora, body: FONT.lora, names: FONT.lora },
    radius: '0.5rem',
    coverOverlay: 'linear-gradient(180deg, rgba(62,44,28,0.1), rgba(62,44,28,0.6))',
  },
}

export const THEME_LIST = Object.values(THEMES)

// Decorative glyph of the Chinese theme (not translated)
export const DOUBLE_HAPPINESS = '囍'

// Inline CSS variables consumed by the .inv-* classes in app/globals.css
export const themeCssVars = (theme: ThemeTokens) =>
  ({
    '--inv-bg': theme.colors.background,
    '--inv-surface': theme.colors.surface,
    '--inv-primary': theme.colors.primary,
    '--inv-accent': theme.colors.accent,
    '--inv-text': theme.colors.text,
    '--inv-muted': theme.colors.muted,
    '--inv-font-heading': theme.fonts.heading,
    '--inv-font-body': theme.fonts.body,
    '--inv-font-names': theme.fonts.names,
    '--inv-radius': theme.radius,
  }) as CSSProperties

export const APP_FONT = FONT.app
