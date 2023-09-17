import { useCallback } from "react"
import Particles from "react-particles"
import styled from "styled-components"
import type { Container, Engine } from "tsparticles-engine"
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "tsparticles-slim" // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.
import { Theme } from "../Theme"

const StyledParticles = styled(Particles)`
  width: 200px;
  height: 200px;
  border-radius: 50px;
  position: absolute;
  z-index: 0;
`

export const PokedexParticle = () => {
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
        backgroundMode: true,
        fullScreen: {
          enable: true,
          zIndex: 0,
        },
        fpsLimit: 60,
        background: {
          color: "#e3e4db",
        },
        particles: {
          color: { value: [Theme.lightBg, "#595959", "#ff8c00", "#ff8c00"] },
          move: {
            direction: "top",
            enable: true,
            outModes: "out",
            random: false,
            speed: 2,
            straight: true,
          },
          number: {
            density: {
              enable: true,
              area: 1000,
            },
            value: 80,
          },
          opacity: {
            value: {
              min: 0.2,
              max: 2,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
      }}
    />
  )
}
