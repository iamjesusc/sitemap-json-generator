import xml2js from 'https://cdn.jsdelivr.net/npm/xml2js@0.6.2/+esm'

const form = document.getElementById('form')
const results = document.getElementById('results')
const button = document.getElementById('button')

async function getSitemapByDomain (e) {
  e.preventDefault()
  const formData = Object.fromEntries(new FormData(e.target))
  const siteMapUrl = formData['sitemap-url']

  button.setAttribute('disabled', '')
  button.setAttribute('aria-busy', 'true')
  try {
    const res = await fetch(`http://localhost:3500/${siteMapUrl}`)

    if (res.ok) {
      const data = await res.text()

      xml2js.parseString(data, (err, result) => {
        if (err) {
          console.error('Error parsing XML:', err)
          return
        }

        results.innerHTML = JSON.stringify(result, null, 2)
      })
    }
  } catch (err) {
    console.error('Error fetching XML:', err)
  } finally {
    button.removeAttribute('disabled')
    button.removeAttribute('aria-busy')
  }
}

form.addEventListener('submit', getSitemapByDomain)
