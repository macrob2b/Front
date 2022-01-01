export default function ({ $auth, redirect }) {
  // console.log($auth.hasScope());
  if (!$auth.user.role.includes('admin')) {
    return redirect('/product-details')
  }
}
