export default function cutter(sentence) {
  if (!sentence) {
    return ''
  }

  const parts = sentence.split('개선점')
  let result = ''

  for (let i = 0; i < parts.length; i++) {
    if (i === 0) {
      result += parts[i]
    } else {
      result += '\n' + '개선점' + parts[i]
    }
  }

  return result
}
