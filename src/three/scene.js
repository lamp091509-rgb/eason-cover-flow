import * as THREE from 'three';

export function createScene(container) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#11110f');
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 0.12, 7.4);
  camera.lookAt(0, 0, 0);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);
  const ambient = new THREE.AmbientLight('#fff8ec', 1.7);
  scene.add(ambient);
  const rim = new THREE.DirectionalLight('#d6b98d', 1.2);
  rim.position.set(-3, 4, 5);
  scene.add(rim);
  const resize = () => {
    const { width, height } = container.getBoundingClientRect();
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  };
  resize();
  window.addEventListener('resize', resize);
  return { scene, camera, renderer, dispose: () => window.removeEventListener('resize', resize) };
}
