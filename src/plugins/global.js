global.component = function component(name) {
  return () => import('@/components/' + name)
}
