"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function PhotoModal() {
  const { id } = useParams();
  const router = useRouter();

  const onClose = () => {
    router.back();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "white",
          padding: 20,
          borderRadius: 8,
          minWidth: 320,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ marginBottom: 12 }}>Photo {id}</div>
        <Link href={`/intercepting`}>Home</Link>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={onClose}>Close</button>
          <Link href={`/intercepting/photo/${id}`}>Open full page</Link>
        </div>
      </div>
    </div>
  );
}