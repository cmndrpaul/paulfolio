import {
  siBootstrap, siCss, siFirebase, siFlutter,
  siGithub, siHtml5, siJavascript, siLaravel, siMysql, siNextdotjs,
  siPhp, siReact, siSupabase, siTailwindcss, siTypescript, siVercel,
  siFigma, type SimpleIcon,
} from 'simple-icons'

type Tool = SimpleIcon | { title: string; src: string }

export const frontendTools = [
  siReact, siNextdotjs, siTypescript, siJavascript, siHtml5, siCss, siTailwindcss, siBootstrap,
]

export const backendTools = [siLaravel, siPhp, siMysql, siSupabase, siFirebase]
export const designTools = [siFigma, { title: 'Canva', src: '/icons/canva.svg' }]
export const editingTools = [{ title: 'CapCut', src: '/icons/capcut.svg' }]

export const portfolioTools = [
  ...frontendTools,
  ...backendTools,
  siVercel,
  siGithub,
  ...designTools,
  ...editingTools,
  { title: 'ChatGPT', src: '/icons/openai.svg' },
  siFlutter,
  { title: 'Claude', src: '/icons/ai/claude-color.svg' },
  { title: 'Visual Studio Code', src: '/icons/vscode.svg' },
  { title: 'Google Workspace', src: '/icons/googleworkspace.svg' },
]

export default function ToolLogos({ items = portfolioTools }: { items?: readonly Tool[] }) {
  return (
    <ul className="tool-logos" role="list">
      {items.map((tool) => (
        <li key={tool.title}>
          {'src' in tool ? (
            <img src={tool.src} alt={tool.title} width="24" height="24" decoding="async" />
          ) : (
            <svg viewBox="0 0 24 24" width="24" height="24" role="img" aria-label={tool.title}
              fill={tool.hex === '000000' || tool === siGithub ? 'currentColor' : '#' + tool.hex}>
              <path d={tool.path} />
            </svg>
          )}
        </li>
      ))}
    </ul>
  )
}
