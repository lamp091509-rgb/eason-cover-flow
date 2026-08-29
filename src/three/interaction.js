import * as THREE from 'three';

export function bindInteraction({ container, camera, renderer, flow, onFocus, onChange, onSelect }) {
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
  const start = (event) => { dragging = true; lastX = startX = event.clientX; flow.targetPosition = flow.position; flow.velocity = 0; container.classList.add('is-dragging'); };
  const move = (event) => {
    if (!dragging) return;
    const dx = event.clientX - lastX;
    flow.targetPosition -= dx * 0.006;
    flow.targetPosition = Math.max(0, Math.min(flow.items.length - 1, flow.targetPosition));
    flow.velocity = -dx * 0.0018;
    flow.position += (flow.targetPosition - flow.position) * 0.24;
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
      if (hit) {
        const target = hit.object.userData.index;
        target === flow.index ? onFocus(target) : (flow.snapTo(target), onChange(), onSelect(target));
      }
    } else {
      const target = Math.round(flow.targetPosition + flow.velocity * 18);
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
