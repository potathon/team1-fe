export function formatDate(dateString) {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토']

  const date = new Date(dateString)
  const month = date.getMonth() + 1 // 월은 0부터 시작하므로 +1
  const day = date.getDate()
  const dayOfWeek = daysOfWeek[date.getDay()]

  return `${month}월 ${day}일 (${dayOfWeek})`
}
