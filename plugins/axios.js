export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    // do something
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    console.log('Request => ' + code);
    if (code === 400) {
      redirect('/400')
    }
  })
}
