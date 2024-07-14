export default function cutter(sentence) {
  if (!sentence) {
    console.log('문장이 아입니다.')
    return ''
  }

  const parts = sentence.split(/1\.|2\.|3\./)
  let result = ''

  for (let i = 0; i < parts.length; i++) {
    if (i === 0) {
      result += parts[i]
    } else {
      result += '\n' + parts[i] + '\n'
    }
  }

  return result
}
