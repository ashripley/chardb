import { useCallback } from "react"
import Particles from "react-particles"
import styled from "styled-components"
import type { Container, Engine } from "tsparticles-engine"
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "tsparticles-slim" // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.

const StyledParticles = styled(Particles)`
  width: 200px;
  height: 200px;
  border-radius: 50px;
  position: relative;
  z-index: 1;
`

export const Particle = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine)

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      await console.log(container)
    },
    []
  )

  return (
    <StyledParticles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: {
          enable: false,
          zIndex: 0,
        },
        fpsLimit: 60,
        background: {
          color: "#ffffff",
        },
        particles: {
          color: { value: "#63ac5a" },
          move: {
            direction: "none",
            enable: true,
            outModes: "out",
            random: false,
            speed: 2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 400,
            },
            value: 180,
          },
          opacity: {
            value: {
              min: 0.2,
              max: 4,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
      }}
    />
  )
}
