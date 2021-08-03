const API_KEY = '962yUapPBtc0RIPlyedhlZ95dbHFFLQsuyk5DWuk'

async function getAPOD() {
  try {
    let content = document.getElementById('content')
    let apodTitle = document.getElementById('apod_title_h1')
    let date = document.getElementById('date_input')

    content.innerHTML = ``

    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date.value}`
    )

    const { url, title, explanation } = await response.json()

    console.log(response)
    if (!url || !title) {
      throw new Error('invalid_time')
    }

    content.innerHTML = `
          <img id="poster" src=${url}></img>
          <div id="description">
            ${explanation}
          <div>`
    apodTitle.innerHTML = title
  } catch (e) {
    console.log('error from getAPOD' + e)
    if (e.message === 'invalid_time') {
      let today = new Date().toISOString().slice(0, 10)
      content.innerHTML = `<div id="error">Please use valid time range<br/> (from 1995-06-16 to ${today}) </div>`
    } else {
      content.innerHTML = `<div id="error">Something went wrong</div>`
    }
  }
}

function initialization() {
  addListenner()
  getAPOD()
}

function addListenner() {
  const dateInput = document.getElementById('date_input')
  dateInput.addEventListener('change', () => {
    getAPOD()
  })
}
