interface EnvironmentVariables {
  // NestJS backend (auth, AI provider, wallet, pages)
  readonly NEXT_PUBLIC_API_APP: string
  readonly NEXT_PUBLIC_ENV: string
  readonly NEXT_PUBLIC_BUILD: string
}

declare namespace NodeJS {
  interface ProcessEnv extends EnvironmentVariables {}
}
