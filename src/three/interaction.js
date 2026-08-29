import * as THREE from 'three';

export function bindInteraction({ container, camera, renderer, flow, onFocus, onChange }) {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let dragging = false;
  let lastX = 0;
  let startX = 0;
  const updatePointer = (event) => {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  };
  const start = (event) => { dragging = true; lastX = startX = event.clientX; container.classList.add('is-dragging'); };
  const move = (event) => {
    if (!dragging) return;
    const dx = event.clientX - lastX;
    flow.position -= dx * 0.006;
    flow.velocity = -dx * 0.003;
    flow.position = Math.max(-0.2, Math.min(flow.items.length - 0.8, flow.position));
    flow.renderPositions();
    lastX = event.clientX;
  };
  const end = (event) => {
    if (!dragging) return;
    dragging = false; container.classList.remove('is-dragging');
    const moved = Math.abs(event.clientX - startX);
    if (moved < 8) {
      updatePointer(event); raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(flow.hitMeshes)[0];
      if (hit) { const target = hit.object.userData.index; target === flow.index ? onFocus(target) : (flow.snapTo(target), onChange()); }
    } else {
      const target = Math.round(flow.position + flow.velocity * 5);
      flow.snapTo(target, 0.75);
      onChange();
    }
  };
  renderer.domElement.addEventListener('pointerdown', start);
  window.addEventListener('pointermove', move);
  window.addEventListener('pointerup', end);
  renderer.domElement.addEventListener('wheel', (event) => { event.preventDefault(); flow.step(event.deltaY > 0 ? 1 : -1); }, { passive: false });
  return () => { renderer.domElement.removeEventListener('pointerdown', start); window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', end); };
}
