import * as THREE from 'three';

function createChessboard(size = 8) {
  // Create a scene
  const scene = new THREE.Scene();

  // Create a camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 5);

  // Create a renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create a plane geometry for the chessboard
  const planeGeometry = new THREE.PlaneGeometry(size, size);

  // Create materials for black and white squares
  const blackMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

  // Create chessboard squares
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      // Determine the color of the square based on its position
      const isWhite = (i + j) % 2 == 0; 
      const material = isWhite ? whiteMaterial : blackMaterial;

      // Create a mesh for the square
      const square = new THREE.Mesh(planeGeometry, material);

      // Position the square on the chessboard
      square.position.set(i - size / 2 + 0.5, 0, j - size / 2 + 0.5);
      
      // Rotate the square to be facing up
      square.rotation.x = -Math.PI / 2;

      // Add the square to the scene
      scene.add(square);
    }
  }

  // Render the scene
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();
}

createChessboard(); // Create a chessboard with default size of 8