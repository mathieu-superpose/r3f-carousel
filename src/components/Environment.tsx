function Environment() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.7} position={[10, 10, 5]} />
    </>
  )
}

export default Environment
