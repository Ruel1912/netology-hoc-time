import { FC } from 'react'

interface Item {
  url: string
  date: string
}

interface VideoListProps {
  list: Item[]
}

interface DateTimeProps {
  date: string
}

interface DateTimePrettyProps extends DateTimeProps {
  formatDate?: (date: string) => string
}

const formatDate = (date: string) => {
  const now = new Date()
  const pastDate = new Date(date)
  const diffInMs = now.getTime() - pastDate.getTime()

  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInMinutes < 60) {
    return `${diffInMinutes} минут назад`
  }
  if (diffInHours < 24) {
    return `${diffInHours} часов назад`
  }
  return `${diffInDays} дней назад`
}

const dateTimePretty = (
  Component: FC<DateTimePrettyProps>,
  formatDate: (date: string) => string
) => {
  return function dateTimeWrapper({ date }: DateTimeProps) {
    return <Component date={formatDate(date)} />
  }
}

const PrettyDateTime = dateTimePretty(DateTime, formatDate)

function DateTime({ date }: DateTimeProps) {
  return <p className="date">{date}</p>
}

function Video({ url, date }: Item) {
  return (
    <div className="video">
      <iframe
        src={url}
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
      <PrettyDateTime date={date} />
    </div>
  )
}

function VideoList({ list }: VideoListProps) {
  return list.map((item) => (
    <Video key={item.url} url={item.url} date={item.date} />
  ))
}

export default function App() {
  const list = [
    {
      url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2017-07-31 13:24:00',
    },
    {
      url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-03-03 12:10:00',
    },
    {
      url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-02-03 23:16:00',
    },
    {
      url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-01-03 12:10:00',
    },
    {
      url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-01-01 16:17:00',
    },
    {
      url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2017-12-02 05:24:00',
    },
  ]

  return <VideoList list={list} />
}
