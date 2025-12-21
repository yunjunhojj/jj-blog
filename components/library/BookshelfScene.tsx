"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Text } from "@react-three/drei";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { MeshProps } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";

export interface BookItem {
  slug: string;
  title: string;
}

interface BookshelfSceneProps {
  books: BookItem[];
}

type BookColorPalette = {
  spine: string;
  cover: string;
  label: string;
};

const DEFAULT_PALETTE: readonly BookColorPalette[] = [
  { spine: "#1f2937", cover: "#111827", label: "#f9fafb" },
  { spine: "#0f766e", cover: "#115e59", label: "#ecfeff" },
  { spine: "#4338ca", cover: "#312e81", label: "#eef2ff" },
  { spine: "#9a3412", cover: "#7c2d12", label: "#fff7ed" },
  { spine: "#b91c1c", cover: "#7f1d1d", label: "#fef2f2" },
  { spine: "#1d4ed8", cover: "#1e3a8a", label: "#eff6ff" },
  { spine: "#374151", cover: "#111827", label: "#f3f4f6" },
] as const;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function chunkIntoShelves<T>(items: readonly T[], perShelf: number): T[][] {
  const safePerShelf = Math.max(1, Math.floor(perShelf));
  const shelves: T[][] = [];
  for (let i = 0; i < items.length; i += safePerShelf) {
    shelves.push(items.slice(i, i + safePerShelf));
  }
  return shelves;
}

function shortenTitle(title: string, maxLen: number) {
  const t = title.trim();
  if (t.length <= maxLen) return t;
  return `${t.slice(0, Math.max(0, maxLen - 1))}…`;
}

function Book({
  slug,
  title,
  palette,
  position,
  rotation,
  onClick,
  isHovered,
}: {
  slug: string;
  title: string;
  palette: BookColorPalette;
  position: MeshProps["position"];
  rotation?: MeshProps["rotation"];
  onClick: (slug: string) => void;
  isHovered: boolean;
}) {
  const displayTitle = shortenTitle(title, 18);

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    onClick(slug);
  };

  return (
    <group position={position} rotation={rotation}>
      {/* Book body */}
      <mesh onPointerDown={handlePointerDown} castShadow receiveShadow>
        <boxGeometry args={[0.32, 1.15, 0.9]} />
        <meshStandardMaterial color={isHovered ? palette.cover : palette.spine} />
      </mesh>

      {/* Spine label */}
      <Text
        position={[0.18, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        fontSize={0.12}
        maxWidth={0.95}
        anchorX="left"
        anchorY="middle"
        color={palette.label}
      >
        {displayTitle}
      </Text>
    </group>
  );
}

function Shelf({
  width,
  y,
}: {
  width: number;
  y: number;
}) {
  return (
    <group position={[0, y, 0]}>
      <mesh receiveShadow>
        <boxGeometry args={[width, 0.12, 1.2]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
      {/* Back panel */}
      <mesh position={[0, 0.55, -0.62]} receiveShadow>
        <boxGeometry args={[width, 1.4, 0.08]} />
        <meshStandardMaterial color="#0b1220" />
      </mesh>
    </group>
  );
}

export default function BookshelfScene({ books }: BookshelfSceneProps) {
  const router = useRouter();
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const safeBooks = useMemo(() => books.filter((b) => b.slug && b.title), [books]);
  const totalBooks = clamp(safeBooks.length, 0, 60);
  const visibleBooks = safeBooks.slice(0, totalBooks);

  const shelves = useMemo(() => {
    // 3 shelves feels good for <= 60 books
    const perShelf = 20;
    return chunkIntoShelves(visibleBooks, perShelf);
  }, [visibleBooks]);

  const handleNavigate = (slug: string) => {
    router.push(`/posts/${slug}`);
  };

  const shelfWidth = 7.2;
  const startX = -3.2;
  const gapX = 0.36;

  return (
    <Canvas
      shadows
      camera={{ position: [0, 1.6, 8], fov: 45 }}
      onPointerMissed={() => setHoveredSlug(null)}
    >
      <color attach="background" args={["#05070d"]} />
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[6, 8, 6]}
        intensity={1.1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <Environment preset="city" />
      <OrbitControls
        enablePan={false}
        minDistance={5.5}
        maxDistance={11}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
      />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#0b1220" />
      </mesh>

      {/* Shelves */}
      {shelves.map((_, idx) => (
        <Shelf key={`shelf-${idx}`} width={shelfWidth} y={idx * 1.55} />
      ))}

      {/* Books */}
      {shelves.flatMap((shelfBooks, shelfIdx) =>
        shelfBooks.map((book, i) => {
          const palette = DEFAULT_PALETTE[(shelfIdx * 17 + i) % DEFAULT_PALETTE.length];
          const x = startX + i * gapX;
          const y = shelfIdx * 1.55 + 0.62;
          const z = 0;

          return (
            <group
              key={book.slug}
              onPointerEnter={(e) => {
                e.stopPropagation();
                setHoveredSlug(book.slug);
                document.body.style.cursor = "pointer";
              }}
              onPointerLeave={(e) => {
                e.stopPropagation();
                setHoveredSlug((prev) => (prev === book.slug ? null : prev));
                document.body.style.cursor = "default";
              }}
            >
              <Book
                slug={book.slug}
                title={book.title}
                palette={palette}
                position={[x, y, z]}
                rotation={[0, 0, 0]}
                isHovered={hoveredSlug === book.slug}
                onClick={handleNavigate}
              />
            </group>
          );
        })
      )}
    </Canvas>
  );
}


