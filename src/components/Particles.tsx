import React, { Component } from "react"
import Particles from "react-tsparticles"

class Canvas extends Component {
  render() {
    return (
      <Particles
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          height: "100%",
          width: "100%",
          margin: "0",
          padding: "0",
          zIndex: "0",
        }}
        options={{
          fullScreen: {
            enable: false,
          },
          particles: {
            number: {
              value: 80,
              density: {
                enable: true,
                area: 800,
              },
            },
            color: {
              value: "#fbc106",
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: { min: 0.1, max: 0.4 },
              animation: {
                enable: true,
                speed: 1,
                sync: false,
              },
            },
            size: {
              value: { min: 0.1, max: 3 },
              animation: {
                enable: true,
                speed: 2,
                sync: false,
              },
            },
            links: {
              enable: true,
              distance: 100,
              color: "#fbc106",
              opacity: 1,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: false,
              straight: false,
              outModes: {
                default: "out",
              },
            },
          },
          interactivity: {
            detectsOn: "window",
            events: {
              onHover: {
                enable: false,
              },
              onClick: {
                enable: false,
              },
              resize: true,
            },
          },
          detectRetina: true,
        }}
      />
    )
  }
}

export default Canvas
