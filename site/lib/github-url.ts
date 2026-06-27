import { config, type Lang } from '@/config'

export function buildRawUrl(domain: string, lang: Lang): string {
  return `https://raw.githubusercontent.com/${config.repoOwner}/${config.repoName}/${config.branch}/design/${domain}.design.${lang}.md`
}
