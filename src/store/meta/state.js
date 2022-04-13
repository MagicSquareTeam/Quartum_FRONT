export default function () {
  const tags = JSON.parse(localStorage.getItem('tags'))
  return {
    tags: !!tags
  }
}
