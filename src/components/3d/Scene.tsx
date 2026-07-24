'use client'

import { Canvas, useFrame, useThree, ThreeEvent } from '@react-three/fiber'
import { Environment, ContactShadows, Html } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, DepthOfField } from '@react-three/postprocessing'
import { Suspense, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { createNoise3D } from 'simplex-noise'

/* ------------------------------------------------------------------ */
/*  Liquid metal blob — real per-vertex geometry deformation           */
/* ------------------------------------------------------------------ */

function LiquidBlob({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const mesh = useRef<THREE.Mesh>(null)
  const noise3D = useMemo(() => createNoise3D(), [])
  const [hovered, setHovered] = useState(false)
  const hoverT = useRef(0)

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.55, 4), [])
  const basePositions = useMemo(
    () => Float32Array.from(geometry.attributes.position.array),
    [geometry]
  )

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#C9713B'),
        metalness: 1,
        roughness: 0.16,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        iridescence: 0.35,
        iridescenceIOR: 1.25,
        envMapIntensity: 1.1,
      }),
    []
  )

  useFrame((state, delta) => {
    hoverT.current = THREE.MathUtils.lerp(hoverT.current, hovered ? 1 : 0, 0.06)

    const t = state.clock.elapsedTime
    const scroll = scrollRef.current
    const amplitude = 0.14 + scroll * 0.1 + hoverT.current * 0.06
    const freq = 1.1

    const posAttr = mesh.current!.geometry.attributes.position as THREE.BufferAttribute
    const arr = posAttr.array as Float32Array

    for (let i = 0; i < arr.length; i += 3) {
      const ox = basePositions[i]
      const oy = basePositions[i + 1]
      const oz = basePositions[i + 2]

      const len = Math.sqrt(ox * ox + oy * oy + oz * oz)
      const nx = ox / len
      const ny = oy / len
      const nz = oz / len

      const n = noise3D(ox * freq + t * 0.35, oy * freq + t * 0.35, oz * freq + t * 0.2)
      const displacement = 1 + n * amplitude

      arr[i] = nx * len * displacement
      arr[i + 1] = ny * len * displacement
      arr[i + 2] = nz * len * displacement
    }

    posAttr.needsUpdate = true
    mesh.current!.geometry.computeVertexNormals()

    const warmColor = new THREE.Color('#C9713B')
    const deepColor = new THREE.Color('#7A4326')
    material.color.copy(warmColor).lerp(deepColor, scroll)

    mesh.current!.rotation.y += delta * 0.08
  })

  return (
    <mesh
      ref={mesh}
      geometry={geometry}
      material={material}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = 'auto'
      }}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Tech grid floor — procedural fading grid via shader                */
/* ------------------------------------------------------------------ */

const gridVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const gridFragment = /* glsl */ `
  varying vec2 vUv;
  uniform vec3 uColor;

  float gridLine(vec2 uv, float size) {
    vec2 grid = abs(fract(uv * size - 0.5) - 0.5) / fwidth(uv * size);
    float line = min(grid.x, grid.y);
    return 1.0 - min(line, 1.0);
  }

  void main() {
    vec2 centered = vUv - 0.5;
    float dist = length(centered);
    float fade = smoothstep(0.5, 0.0, dist);
    float g = gridLine(vUv, 24.0);
    gl_FragColor = vec4(uColor, g * fade * 0.35);
  }
`

function GridFloor() {
  const uniforms = useMemo(() => ({ uColor: { value: new THREE.Color('#B5602E') } }), [])
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]}>
      <planeGeometry args={[14, 14]} />
      <shaderMaterial
        vertexShader={gridVertex}
        fragmentShader={gridFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}

/* ------------------------------------------------------------------ */
/*  Minimal nav markers — small metallic nodes orbiting the blob       */
/* ------------------------------------------------------------------ */

function NavMarker({
  angle,
  radius,
  label,
  onSelect,
}: {
  angle: number
  radius: number
  label: string
  onSelect: (label: string) => void
}) {
  const ref = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.15 + angle
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius
      ref.current.position.z = Math.sin(t) * radius
      ref.current.position.y = Math.sin(t * 1.5) * 0.3
    }
  })

  return (
    <mesh
      ref={ref}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation()
        onSelect(label)
      }}
    >
      <sphereGeometry args={[hovered ? 0.09 : 0.06, 24, 24]} />
      <meshPhysicalMaterial
        color="#241C15"
        metalness={1}
        roughness={0.2}
        emissive={hovered ? '#B5602E' : '#000000'}
        emissiveIntensity={hovered ? 0.6 : 0}
      />
      {hovered && (
        <Html center distanceFactor={8} style={{ pointerEvents: 'none' }}>
          <div
            style={{
              background: '#241C15',
              color: '#FAF7F2',
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: '12px',
              fontFamily: 'Inter, sans-serif',
              whiteSpace: 'nowrap',
              transform: 'translateY(-24px)',
            }}
          >
            {label}
          </div>
        </Html>
      )}
    </mesh>
  )
}

/* ------------------------------------------------------------------ */
/*  Responsive Group Helper                                            */
/* ------------------------------------------------------------------ */

function ResponsiveBlobGroup({
  scrollRef,
  markers,
  onSelect,
}: {
  scrollRef: React.MutableRefObject<number>
  markers: { label: string; angle: number; radius: number }[]
  onSelect: (label: string) => void
}) {
  const { size } = useThree()
  const isMobile = size.width < 768

  return (
    <group position={isMobile ? [0, -0.4, -0.5] : [1.8, 0, 0]} scale={isMobile ? 0.75 : 1}>
      <LiquidBlob scrollRef={scrollRef} />
      <GridFloor />

      {markers.map((m) => (
        <NavMarker key={m.label} {...m} onSelect={onSelect} />
      ))}

      <ContactShadows position={[0, -2.15, 0]} opacity={0.15} scale={10} blur={2.6} color="#241C15" />
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Scroll-driven camera rig                                           */
/* ------------------------------------------------------------------ */

function ScrollCameraRig({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const { camera, pointer, size } = useThree()
  const current = useRef({ z: 7, y: 0, angle: 0 })

  useFrame(() => {
    const s = scrollRef.current
    const isMobile = size.width < 768

    const targetZ = (isMobile ? 8.5 : 7) - s * 2.4
    const targetY = s * 0.6
    const targetAngle = s * Math.PI * 0.35 + pointer.x * 0.25

    current.current.z = THREE.MathUtils.lerp(current.current.z, targetZ, 0.05)
    current.current.y = THREE.MathUtils.lerp(current.current.y, targetY, 0.05)
    current.current.angle = THREE.MathUtils.lerp(current.current.angle, targetAngle, 0.05)

    const offsetX = isMobile ? 0 : 1.0
    camera.position.x = offsetX + Math.sin(current.current.angle) * current.current.z
    camera.position.z = Math.cos(current.current.angle) * current.current.z
    camera.position.y = current.current.y + -pointer.y * 0.4
    camera.lookAt(offsetX, 0, 0)
  })

  return null
}

/* ------------------------------------------------------------------ */
/*  Main exported scene                                                */
/* ------------------------------------------------------------------ */

export default function Scene({
  onSelect,
  scrollRef,
}: {
  onSelect: (label: string) => void
  scrollRef: React.MutableRefObject<number>
}) {
  const markers = [
    { label: 'About', angle: 0, radius: 2.6 },
    { label: 'Skills', angle: Math.PI / 2, radius: 2.9 },
    { label: 'Work', angle: Math.PI, radius: 2.6 },
    { label: 'Contact', angle: (3 * Math.PI) / 2, radius: 2.9 },
  ]

  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 42 }} gl={{ antialias: true }} dpr={[1, 2]}>
      <Suspense fallback={null}>
        <color attach="background" args={['#FAF7F2']} />
        <fog attach="fog" args={['#FAF7F2', 8, 15]} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 5, 4]} intensity={1.3} color="#FFF6EA" />
        <pointLight position={[-4, -1, -3]} intensity={0.6} color="#B5602E" />

        <ResponsiveBlobGroup scrollRef={scrollRef} markers={markers} onSelect={onSelect} />

        <Environment preset="studio" environmentIntensity={0.9} />

        <ScrollCameraRig scrollRef={scrollRef} />

        <EffectComposer multisampling={4}>
          <Bloom intensity={0.4} luminanceThreshold={0.4} luminanceSmoothing={0.85} mipmapBlur />
          <DepthOfField focusDistance={0.01} focalLength={0.04} bokehScale={2.5} />
          <Vignette eskil={false} offset={0.12} darkness={0.45} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}