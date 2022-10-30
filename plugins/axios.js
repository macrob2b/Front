export default function ({$axios, app, redirect}) {
  $axios.onRequest(config => {
    // do something
  })

  $axios.onResponse(response => {
    // do something
  })

  $axios.onResponseError(error => {
    const code = parseInt(error.response && error.response.status);
    if (code == 401) {
      if (app.$auth.loggedIn) {
        app.$auth.logout();
      } else
        redirect("/login");
    }
  })


  $axios.onError(error => {
    // const code = parseInt(error.response && error.response.status);

  })
}
