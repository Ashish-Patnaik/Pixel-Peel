<<<<<<< HEAD
import gsap from 'https://cdn.skypack.dev/gsap';

const UPDATE = ({ x, y }) => {
  gsap.set(document.documentElement, {
    '--x': gsap.utils.mapRange(0, window.innerWidth, -1, 1, x),
    '--y': gsap.utils.mapRange(0, window.innerHeight, -1, 1, y),
  });
};

window.addEventListener('mousemove', UPDATE);

const handleOrientation = ({ beta, gamma }) => {
  const isLandscape = window.matchMedia('(orientation: landscape)').matches;
  gsap.set(document.documentElement, {
    '--x': gsap.utils.clamp(-1, 1, isLandscape ? gsap.utils.mapRange(-45, 45, -1, 1, beta) : gsap.utils.mapRange(-45, 45, -1, 1, gamma)),
    '--y': gsap.utils.clamp(-1, 1, isLandscape ? gsap.utils.mapRange(20, 70, 1, -1, Math.abs(gamma)) : gsap.utils.mapRange(20, 70, 1, -1, beta)),
  });
};

const START = () => {
  // if (BUTTON) BUTTON.remove();
  if (typeof DeviceOrientationEvent !== 'undefined' && DeviceOrientationEvent.requestPermission) {
    DeviceOrientationEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation);
        } else {
          console.error("Device orientation permission not granted."); // Handle permission denial
        }
      })
      .catch(error => {
        console.error("Error requesting device orientation permission:", error); // Handle errors
      });
  } else if (typeof DeviceOrientationEvent !== 'undefined') {  // For browsers that don't need permission
    window.addEventListener('deviceorientation', handleOrientation);
  } else {
    console.error("Device orientation not supported."); // Handle lack of support
  }
};

document.body.addEventListener('click', START, { once: true });

=======
import gsap from 'https://cdn.skypack.dev/gsap';

const UPDATE = ({ x, y }) => {
  gsap.set(document.documentElement, {
    '--x': gsap.utils.mapRange(0, window.innerWidth, -1, 1, x),
    '--y': gsap.utils.mapRange(0, window.innerHeight, -1, 1, y),
  });
};

window.addEventListener('mousemove', UPDATE);

const handleOrientation = ({ beta, gamma }) => {
  const isLandscape = window.matchMedia('(orientation: landscape)').matches;
  gsap.set(document.documentElement, {
    '--x': gsap.utils.clamp(-1, 1, isLandscape ? gsap.utils.mapRange(-45, 45, -1, 1, beta) : gsap.utils.mapRange(-45, 45, -1, 1, gamma)),
    '--y': gsap.utils.clamp(-1, 1, isLandscape ? gsap.utils.mapRange(20, 70, 1, -1, Math.abs(gamma)) : gsap.utils.mapRange(20, 70, 1, -1, beta)),
  });
};

const START = () => {
  // if (BUTTON) BUTTON.remove();
  if (typeof DeviceOrientationEvent !== 'undefined' && DeviceOrientationEvent.requestPermission) {
    DeviceOrientationEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation);
        } else {
          console.error("Device orientation permission not granted."); // Handle permission denial
        }
      })
      .catch(error => {
        console.error("Error requesting device orientation permission:", error); // Handle errors
      });
  } else if (typeof DeviceOrientationEvent !== 'undefined') {  // For browsers that don't need permission
    window.addEventListener('deviceorientation', handleOrientation);
  } else {
    console.error("Device orientation not supported."); // Handle lack of support
  }
};

document.body.addEventListener('click', START, { once: true });

>>>>>>> 5f9773d (1st commit)
