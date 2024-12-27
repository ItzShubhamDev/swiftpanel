import { differenceInHours, format, formatDistanceToNow } from 'date-fns'

export default function LastSeen({ date }: { date: Date }) {
  return (
    <span>
      {Math.abs(differenceInHours(date, new Date())) > 48
        ? format(date, 'MMM do, yyyy h:mm a')
        : formatDistanceToNow(date, { addSuffix: true })}
    </span>
  )
}
