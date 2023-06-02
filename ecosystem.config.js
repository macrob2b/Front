module.exports = {
  apps: [
    {
      name: 'MacroB2BApp',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      max_memory_restart: '500M'
    }
  ]
}
