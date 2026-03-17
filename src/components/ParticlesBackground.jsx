import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "transparent"
          }
        },
        particles: {
          number: {
            value: 80
          },
          color: {
            value: "#00e5ff"
          },
          links: {
            enable: true,
            color: "#00e5ff",
            distance: 150
          },
          move: {
            enable: true,
            speed: 1
          },
          size: {
            value: 3
          }
        }
      }}
    />
  );
};

export default ParticlesBackground;