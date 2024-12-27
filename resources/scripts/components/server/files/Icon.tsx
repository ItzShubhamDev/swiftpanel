import { getIcon } from 'material-file-icons'

export default function FileIcon({
  filename,
  style,
  className,
}: {
  filename: string
  style?: React.CSSProperties
  className?: string
}) {
  return (
    <div
      style={style}
      className={className}
      dangerouslySetInnerHTML={{ __html: getIcon(filename).svg }}
    />
  )
}
