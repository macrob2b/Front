export default function ({ $auth, redirect }) {
  if ($auth.user.role.includes('admin')) {
    return redirect('/admin/dashboard')
  }
}
