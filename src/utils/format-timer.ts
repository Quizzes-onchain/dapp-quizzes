const formatTime = (time: number) => time.toString().padStart(2, '0')

const formatTimer = (duration: number) => {
  if (duration <= 0)
    return {
      days: formatTime(0),
      hours: formatTime(0),
      minutes: formatTime(0),
      seconds: formatTime(0),
    }

  const totalMinutes = Math.floor(duration / 60)
  const totalHours = Math.floor(totalMinutes / 60)
  const days = Math.floor(totalHours / 24)

  const seconds = duration % 60
  const minutes = totalMinutes % 60
  const hours = totalHours % 24

  return {
    days: formatTime(days),
    hours: formatTime(hours),
    minutes: formatTime(minutes),
    seconds: formatTime(seconds),
  }
}

export default formatTimer
