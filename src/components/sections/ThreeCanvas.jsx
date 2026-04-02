import { useEffect, useRef } from "react";

// ── Tech stack with devicon CDN paths ────────────────────────────────
const DEVICON_CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const techStack = [
  { name: "HTML", path: "html5/html5-original.svg", color: "#E34F26", scale: 0.52 },
  { name: "CSS", path: "css3/css3-original.svg", color: "#1572B6", scale: 0.52 },
  { name: "JavaScript", path: "javascript/javascript-original.svg", color: "#F7DF1E", scale: 0.55 },
  { name: "React", path: "react/react-original.svg", color: "#61DAFB", scale: 0.68 },
  { name: "PHP", path: "php/php-original.svg", color: "#777BB4", scale: 0.52 },
  { name: "Laravel", path: "laravel/laravel-original.svg", color: "#FF2D20", scale: 0.65 },
  { name: "MySQL", path: "mysql/mysql-original.svg", color: "#4479A1", scale: 0.50 },
  { name: "Python", path: "python/python-original.svg", color: "#3776AB", scale: 0.52 },
  { name: "MongoDB", path: "mongodb/mongodb-original.svg", color: "#47A248", scale: 0.50 },
  { name: "Node.js", path: "nodejs/nodejs-original.svg", color: "#339933", scale: 0.65 },
  { name: "Express", path: "express/express-original.svg", color: "#ffffff", invert: true, scale: 0.50 },
  { name: "Git", path: "git/git-original.svg", color: "#F05032", scale: 0.50 },
  { name: "Docker", path: "docker/docker-original.svg", color: "#2496ED", scale: 0.52 },
  { name: "n8n", path: null, color: "#EA4B71", scale: 0.48 },
];

// ── Hand-crafted screen positions for 8 icons ────────────────────────
// Each icon has a UNIQUE (x, y) that is well-separated from all others.
// z is computed to place each on the front half of the sphere surface.
// These are normalized coords (multiplied by radius at runtime).
const ICON_SCREEN_POSITIONS = [
  { x: -0.30, y: +0.82 },  // HTML       – top center-left
  { x: +0.40, y: +0.75 },  // CSS        – top right
  { x: -0.78, y: +0.42 },  // JavaScript – upper-left
  { x: +0.05, y: +0.40 },  // React      – upper center
  { x: +0.72, y: +0.35 },  // PHP        – upper right
  { x: -0.45, y: +0.02 },  // Laravel    – mid-left
  { x: +0.40, y: -0.02 },  // MySQL      – mid-right
  { x: -0.82, y: -0.30 },  // Python     – lower-left
  { x: +0.00, y: -0.38 },  // MongoDB    – lower center
  { x: +0.80, y: -0.15 },  // Node.js    – mid-right-low
  { x: -0.48, y: -0.65 },  // Express    – bottom-left
  { x: +0.22, y: -0.68 },  // Git        – bottom center
  { x: +0.68, y: -0.50 },  // Docker     – bottom right
  { x: -0.10, y: -0.88 },  // n8n        – very bottom
];

/**
 * Loads an image from URL, returns a Promise<HTMLImageElement | null>.
 */
function loadImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

/**
 * Creates a canvas texture with a tech icon drawn on a glowing backdrop.
 */
function createIconTexture(THREE, img, tech) {
  const canvas = document.createElement("canvas");
  const size = 256;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, size, size);

  // ── Dark glass circle ──────────────────────────────────────────────
  ctx.fillStyle = "rgba(5, 5, 12, 0.7)";
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2.6, 0, Math.PI * 2);
  ctx.fill();

  // Highlight/Border ring
  ctx.strokeStyle = tech.color + "50";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2.6, 0, Math.PI * 2);
  ctx.stroke();

  if (img) {
    ctx.save();
    if (tech.invert) {
      ctx.filter = "brightness(0) invert(1)";
    }
    const iconSize = size * 0.45;
    const offset = (size - iconSize) / 2;
    ctx.drawImage(img, offset, offset, iconSize, iconSize);
    ctx.restore();
  } else {
    const fontSize = tech.name.length > 5 ? 28 : 36;
    ctx.font = `bold ${fontSize}px 'Syne', 'Segoe UI', sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = tech.color;
    ctx.shadowColor = tech.color;
    ctx.shadowBlur = 15;
    ctx.fillText(tech.name, size / 2, size / 2);
    ctx.shadowBlur = 8;
    ctx.fillText(tech.name, size / 2, size / 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function ThreeCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.onload = () => initThree();
    document.head.appendChild(script);

    let cleanup = null;

    async function initThree() {
      const THREE = window.THREE;
      const canvas = canvasRef.current;
      if (!canvas) return;

      // ── Load all tech icons from devicon CDN ─────────────────────────
      const iconImages = await Promise.all(
        techStack.map((tech) =>
          tech.path ? loadImage(`${DEVICON_CDN}/${tech.path}`) : Promise.resolve(null)
        )
      );

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        60,
        canvas.offsetWidth / canvas.offsetHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      // ── Background particles (subtle ambient) ──────────────────────
      const particleGeo = new THREE.BufferGeometry();
      const particleCount = 600;
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 25;
      }
      particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const particleMat = new THREE.PointsMaterial({
        size: 0.015,
        color: 0x7affd4,
        transparent: true,
        opacity: 0.25,
      });
      const particles = new THREE.Points(particleGeo, particleMat);
      scene.add(particles);

      // ── Scene container ─────────────────────────────────────────────
      const sceneGroup = new THREE.Group();
      sceneGroup.position.set(0, -0.1, 0);
      scene.add(sceneGroup);

      const SPHERE_RADIUS = 2.0;
      const ICON_RADIUS = SPHERE_RADIUS * 0.85;

      // ── Wireframe sphere (rotates independently for visual effect) ─
      const wireframeGroup = new THREE.Group();
      sceneGroup.add(wireframeGroup);

      const geoSphere = new THREE.IcosahedronGeometry(SPHERE_RADIUS, 2);
      const matSphere = new THREE.MeshBasicMaterial({
        color: 0x7affd4,
        wireframe: true,
        transparent: true,
        opacity: 0.015,
      });
      const wireframeSphere = new THREE.Mesh(geoSphere, matSphere);
      wireframeGroup.add(wireframeSphere);

      // ── Icons group (does NOT rotate, icons stay fixed) ─────────────
      const iconsGroup = new THREE.Group();
      sceneGroup.add(iconsGroup);

      // ── Place each icon at its fixed position ──────────────────────
      const iconSprites = [];

      techStack.forEach((tech, i) => {
        const texture = createIconTexture(THREE, iconImages[i], tech);
        const spriteMat = new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
          opacity: 0.92,
          depthWrite: false,
        });
        const sprite = new THREE.Sprite(spriteMat);

        // Get hand-crafted screen position
        const sp = ICON_SCREEN_POSITIONS[i];
        const x = sp.x * ICON_RADIUS;
        const y = sp.y * ICON_RADIUS;
        // z = front of sphere surface (always positive = visible)
        const zSq = ICON_RADIUS * ICON_RADIUS - x * x - y * y;
        const z = Math.sqrt(Math.max(0.01, zSq));

        sprite.position.set(x, y, z);
        const s = tech.scale;
        sprite.scale.set(s, s, 1);

        // Store base position for floating animation
        sprite.userData = {
          baseX: x,
          baseY: y,
          baseZ: z,
          // Each icon gets unique float phase & speed
          floatPhase: (i / techStack.length) * Math.PI * 2,
          floatSpeed: 0.4 + i * 0.06,
        };

        iconsGroup.add(sprite);
        iconSprites.push(sprite);
      });

      // ── Mouse interaction ──────────────────────────────────────────
      let mx = 0;
      let my = 0;
      const handleMouseMove = (e) => {
        mx = (e.clientX / window.innerWidth - 0.5) * 2;
        my = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("mousemove", handleMouseMove);

      // ── Animation loop ─────────────────────────────────────────────
      let frame;
      const animate = () => {
        frame = requestAnimationFrame(animate);
        const t = Date.now() * 0.001;

        // Wireframe rotates slowly (icons DON'T move with it)
        wireframeGroup.rotation.y = t * 0.1 + mx * 0.3;
        wireframeGroup.rotation.x = t * 0.05 + my * 0.15;

        // Each icon floats VERY gently in place (tiny movement)
        iconSprites.forEach((sprite) => {
          const d = sprite.userData;
          // Tiny oscillation: ±0.03 units max
          sprite.position.x = d.baseX + Math.sin(t * d.floatSpeed + d.floatPhase) * 0.03;
          sprite.position.y = d.baseY + Math.cos(t * d.floatSpeed * 0.8 + d.floatPhase) * 0.03;
          sprite.position.z = d.baseZ + Math.sin(t * d.floatSpeed * 0.5 + d.floatPhase * 1.5) * 0.02;
        });

        // Wireframe subtle pulse
        const pulse = 1 + Math.sin(t * 0.4) * 0.015;
        wireframeSphere.scale.set(pulse, pulse, pulse);

        // Background particles drift
        particles.rotation.y = t * 0.015;
        particles.rotation.x = t * 0.008;

        // Camera subtle parallax with mouse
        camera.position.x += (mx * 0.15 - camera.position.x) * 0.03;
        camera.position.y += (-my * 0.12 - camera.position.y) * 0.03;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      };
      animate();

      // ── Resize ─────────────────────────────────────────────────────
      const handleResize = () => {
        renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
        camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", handleResize);

      cleanup = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        renderer.dispose();
      };
    }

    return () => {
      if (cleanup) cleanup();
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="three-canvas" />;
}
