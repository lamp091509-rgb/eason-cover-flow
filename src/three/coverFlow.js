import * as THREE from 'three';
import { gsap } from 'gsap';

export class CoverFlow {
  constructor(scene, items) {
    this.scene = scene;
    this.items = items;
    this.index = 0;
    this.position = 0;
    this.velocity = 0;
    this.meshes = [];
    this.reflections = [];
    this.textureLoader = new THREE.TextureLoader();
    items.forEach((item, index) => this.addCover(item, index));
    this.renderPositions();
  }

  addCover(item, index) {
    const texture = this.textureLoader.load(item.cover);
    texture.colorSpace = THREE.SRGBColorSpace;
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2.7, 2.7),
      new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide })
    );
    const reflection = new THREE.Mesh(
      new THREE.PlaneGeometry(2.7, 2.7),
      new THREE.ShaderMaterial({
        uniforms: { uMap: { value: texture }, uOpacity: { value: 0.18 } },
        vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
        fragmentShader: 'uniform sampler2D uMap; uniform float uOpacity; varying vec2 vUv; void main() { vec4 color = texture2D(uMap, vUv); float fade = smoothstep(0.0, 0.82, vUv.y); gl_FragColor = vec4(color.rgb, color.a * uOpacity * fade); }',
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide
      })
    );
    mesh.userData.index = index;
    reflection.userData.index = index;
    this.scene.add(mesh);
    this.scene.add(reflection);
    this.meshes.push(mesh);
    this.reflections.push(reflection);
  }

  renderPositions() {
    this.meshes.forEach((mesh, index) => {
      const offset = index - this.position;
      const distance = Math.abs(offset);
      const side = Math.sign(offset);
      const visible = distance < 3.2;
      const scale = Math.max(0.68, 1 - distance * 0.14);
      const x = offset * 1.62;
      const y = Math.min(distance * -0.035, 0);
      const z = -distance * 0.65;
      const rotation = side * -0.48 * Math.min(distance, 1.35);
      gsap.set(mesh.position, { x, y, z });
      gsap.set(mesh.rotation, { y: rotation });
      gsap.set(mesh.scale, { x: scale, y: scale });
      mesh.material.opacity = visible ? Math.max(0.22, 1 - distance * 0.28) : 0;
      mesh.visible = visible;
      const reflection = this.reflections[index];
      gsap.set(reflection.position, { x, y: y - 2.72 * scale, z: z - 0.02 });
      gsap.set(reflection.rotation, { y: rotation });
      gsap.set(reflection.scale, { x: scale, y: -scale });
      reflection.material.uniforms.uOpacity.value = visible ? Math.max(0.015, (1 - distance * 0.28) * 0.18) : 0;
      reflection.visible = visible;
    });
  }

  snapTo(index, duration = 0.62) {
    this.index = Math.max(0, Math.min(this.items.length - 1, index));
    gsap.to(this, { position: this.index, velocity: 0, duration, ease: 'power3.out', onUpdate: () => this.renderPositions() });
  }

  step(direction) { this.snapTo(this.index + direction); }

  tick() {
    if (Math.abs(this.velocity) > 0.0005) {
      this.position += this.velocity;
      this.velocity *= 0.9;
      this.position = Math.max(-0.2, Math.min(this.items.length - 0.8, this.position));
      this.renderPositions();
    }
  }

  get hitMeshes() { return this.meshes; }
}
