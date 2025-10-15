import Link from 'next/link'

interface SectionTitleProps {
  text: string
  url?: string
}

export default function SectionTitle({ text, url }: SectionTitleProps) {
  return (
    <h2 className="text-xl font-bold text-primary">
      {url ? (
        <Link title={text} href={url}>
          {text}
        </Link>
      ) : (
        text
      )}
    </h2>
  )
}
