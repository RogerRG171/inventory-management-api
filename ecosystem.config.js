module.exports = {
  apps: [
    {
      name: 'inventory-management',
      script: 'npm',
      args: 'run dev',
      env: {
        NODE_ENV: 'development',
        NODE_VAR1: 'enviroment-variable',
      },
    },
  ],
}
