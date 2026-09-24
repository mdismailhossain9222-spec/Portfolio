import { useEffect, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { ScrollTrigger, prefersReduced } from "../lib/gsap";

/* ---------------------------------------------------------------
   The glyph: a hand-authored "N" outline, 10 vertices.
   Stems 0.30 wide, diagonal band ~0.25 perpendicular — classical.
----------------------------------------------------------------*/
function buildGlyph(): THREE.Shape {
  // A slab-serif "I" for Ismail Hossain — 12 vertices, serif 0.22 deep, stem 0.48.
  const pts: [number, number][] = [
    [-0.66, 0.86],
    [0.66, 0.86],
    [0.66, 0.64],
    [0.24, 0.64],
    [0.24, -0.64],
    [0.66, -0.64],
    [0.66, -0.86],
    [-0.66, -0.86],
    [-0.66, -0.64],
    [-0.24, -0.64],
    [-0.24, 0.64],
    [-0.66, 0.64],
  ];
  const s = new THREE.Shape();
  s.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) s.lineTo(pts[i][0], pts[i][1]);
  s.closePath();
  return s;
}

/* A procedural studio environment — canvas gradient, no network fetch. */
function StudioEnv() {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const g = ctx.createLinearGradient(0, 0, 0, 256);
    g.addColorStop(0, "#ffffff");
    g.addColorStop(0.4, "#d6cec1");
    g.addColorStop(0.56, "#8d867b");
    g.addColorStop(1, "#26231f");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 512, 256);

    // key softbox + fill window
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.fillRect(52, 24, 168, 78);
    ctx.fillStyle = "rgba(255,244,232,0.5)";
    ctx.fillRect(336, 46, 120, 54);
    // vermilion bounce off the paper
    ctx.fillStyle = "rgba(217,64,31,0.30)";
    ctx.fillRect(0, 176, 512, 26);

    const tex = new THREE.CanvasTexture(canvas);
    tex.mapping = THREE.EquirectangularReflectionMapping;
    tex.colorSpace = THREE.SRGBColorSpace;

    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromEquirectangular(tex).texture;
    scene.environment = env;

    return () => {
      scene.environment = null;
      env.dispose();
      tex.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);

  return null;
}

function Sort({ trigger }: { trigger: RefObject<HTMLElement | null> }) {
  const group = useRef<THREE.Group>(null);
  const progress = useRef(0);
  const ptr = useRef({ x: 0, y: 0 });
  const reduce = useMemo(() => prefersReduced(), []);

  // the canvas is pointer-events:none, so parallax is read from the window
  useEffect(() => {
    if (prefersReduced()) return;
    const onMove = (e: PointerEvent) => {
      ptr.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      ptr.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const glyphGeo = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(buildGlyph(), {
      depth: 0.2,
      bevelEnabled: true,
      bevelThickness: 0.028,
      bevelSize: 0.028,
      bevelSegments: 3,
      curveSegments: 2,
    });
    geo.translate(0, 0, -0.07);
    return geo;
  }, []);

  useEffect(() => () => glyphGeo.dispose(), [glyphGeo]);

  useEffect(() => {
    const el = trigger.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        progress.current = self.progress;
      },
    });
    return () => st.kill();
  }, [trigger]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const p = progress.current;
    const t = state.clock.elapsedTime;
    const px = reduce ? 0 : ptr.current.x;
    const py = reduce ? 0 : ptr.current.y;

    const targetY = -0.32 + p * 1.9 + px * 0.4;
    const targetX = 0.1 + p * 0.45 - py * 0.28;
    const targetZ = p * 0.16;

    const k = 4;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, k, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, k, delta);
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, targetZ, k, delta);

    const bob = reduce ? 0 : Math.sin(t * 0.55) * 0.055;
    g.position.y = THREE.MathUtils.damp(
      g.position.y,
      bob - p * 0.5,
      4,
      delta,
    );
    g.position.x = THREE.MathUtils.damp(g.position.x, -p * 0.35, 4, delta);
  });

  return (
    <group ref={group} rotation={[0.1, -0.32, 0]}>
      {/* the body of the sort */}
      <RoundedBox args={[2, 2.5, 0.9]} radius={0.07} smoothness={4} position={[0, 0, -0.45]}>
        <meshStandardMaterial
          color="#57534e"
          metalness={0.86}
          roughness={0.4}
          envMapIntensity={1.15}
        />
      </RoundedBox>

      {/* the nick, cut into the face */}
      <mesh position={[0, -1.06, 0.012]}>
        <boxGeometry args={[1.62, 0.05, 0.03]} />
        <meshStandardMaterial color="#211f1c" metalness={0.6} roughness={0.72} />
      </mesh>

      {/* the printing surface */}
      <mesh geometry={glyphGeo} position={[0, 0.06, 0]}>
        <meshStandardMaterial
          color="#c6381a"
          metalness={0.34}
          roughness={0.33}
          envMapIntensity={1}
        />
      </mesh>
    </group>
  );
}

export default function TypeSort({
  trigger,
  compact = false,
}: {
  trigger: RefObject<HTMLElement | null>;
  compact?: boolean;
}) {
  const mobile = typeof window !== "undefined" && window.innerWidth < 760;

  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, compact ? 4.3 : mobile ? 8.6 : 7.0], fov: 34 }}
    >
      <StudioEnv />
      <ambientLight intensity={0.5} color="#f4efe6" />
      <directionalLight position={[4.5, 6, 5]} intensity={2.4} color="#fffaf2" />
      <directionalLight position={[-5, 1.5, 3]} intensity={0.7} color="#e8dcc9" />
      <directionalLight position={[0, -3.5, -5]} intensity={0.85} color="#ffffff" />
      <Sort trigger={trigger} />
      {compact ? null : (
        <ContactShadows
          position={[0, -1.72, 0]}
          opacity={0.34}
          scale={9}
          blur={2.6}
          far={4.2}
          resolution={256}
          color="#3a3128"
        />
      )}
    </Canvas>
  );
}
