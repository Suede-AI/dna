/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useRef, useState } from 'react';
import type { Rig } from '@/lib/manifest';

const ZOOM_STEPS = [1, 1.5, 2, 3] as const;

export function getNextLightboxIndex(current: number, total: number, direction: -1 | 1): number {
  if (total <= 0) return 0;
  return (current + direction + total) % total;
}

export function getNextZoom(current: number, direction: -1 | 1): number {
  const index = ZOOM_STEPS.findIndex((step) => step === current);
  const nextIndex = Math.min(Math.max((index === -1 ? 0 : index) + direction, 0), ZOOM_STEPS.length - 1);
  return ZOOM_STEPS[nextIndex];
}

export function Lightbox({
  rigs,
  initialIndex,
  open,
  onOpenChange,
}: {
  rigs: Rig[];
  initialIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastActiveElement = useRef<HTMLElement | null>(null);
  const dragRef = useRef<{ pointerId: number; x: number; y: number; originX: number; originY: number } | null>(null);
  const [index, setIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const rig = rigs[index] ?? rigs[0];

  useEffect(() => {
    setIndex(initialIndex);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [initialIndex, open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      lastActiveElement.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
      lastActiveElement.current?.focus();
    }
  }, [open]);

  if (!rig) return null;

  const stepRig = (direction: -1 | 1) => {
    setIndex((current) => getNextLightboxIndex(current, rigs.length, direction));
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const close = () => onOpenChange(false);
  const handleDialogClose = () => {
    onOpenChange(false);
    lastActiveElement.current?.focus();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label={`${rig.artistName} rig diagram lightbox`}
      aria-modal="true"
      className="rig-lightbox m-auto max-h-[92vh] w-[min(96vw,1600px)] max-w-none bg-[color:var(--color-ink-0)] p-0 text-white backdrop:bg-transparent"
      onClose={handleDialogClose}
      onCancel={close}
      onMouseDown={(event) => {
        if (event.target === dialogRef.current) close();
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') stepRig(-1);
        if (event.key === 'ArrowRight') stepRig(1);
      }}
    >
      <div className="flex min-h-[80vh] flex-col">
        <header className="flex flex-wrap items-center gap-3 border-b hairline px-4 py-3">
          <p className="mono-label text-[color:var(--color-bone)]">
            {rig.artistName} · {rig.year}
          </p>
          <div className="ml-auto flex items-center gap-2">
            <button type="button" className="mono-label hairline px-3 py-2" onClick={() => stepRig(-1)} aria-label="Previous rig">
              ←
            </button>
            <button type="button" className="mono-label hairline px-3 py-2" onClick={() => setZoom((value) => getNextZoom(value, -1))} aria-label="Zoom out">
              -
            </button>
            <p className="mono-label min-w-12 text-center text-[color:var(--color-bone)]">{Math.round(zoom * 100)}%</p>
            <button type="button" className="mono-label hairline px-3 py-2" onClick={() => setZoom((value) => getNextZoom(value, 1))} aria-label="Zoom in">
              +
            </button>
            <button type="button" className="mono-label hairline px-3 py-2" onClick={() => stepRig(1)} aria-label="Next rig">
              →
            </button>
            <button type="button" className="mono-label hairline px-3 py-2" onClick={close} aria-label="Close lightbox" autoFocus>
              CLOSE
            </button>
          </div>
        </header>
        <div
          className="relative flex flex-1 touch-none items-center justify-center overflow-hidden bg-[color:var(--color-ink-1)]"
          onDoubleClick={() => {
            setZoom((value) => (value === 1 ? 2 : 1));
            setPan({ x: 0, y: 0 });
          }}
          onPointerDown={(event) => {
            if (zoom === 1) return;
            event.currentTarget.setPointerCapture(event.pointerId);
            dragRef.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, originX: pan.x, originY: pan.y };
          }}
          onPointerMove={(event) => {
            const drag = dragRef.current;
            if (!drag || drag.pointerId !== event.pointerId) return;
            setPan({ x: drag.originX + event.clientX - drag.x, y: drag.originY + event.clientY - drag.y });
          }}
          onPointerUp={(event) => {
            if (dragRef.current?.pointerId === event.pointerId) dragRef.current = null;
          }}
        >
          <img
            src={rig.src}
            alt={`${rig.artistName} guitar rig setup, ${rig.year} — full size`}
            className="max-h-[76vh] max-w-full select-none object-contain"
            draggable={false}
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transition: dragRef.current ? 'none' : 'transform var(--duration-fast) var(--ease-sweep)',
              cursor: zoom === 1 ? 'zoom-in' : 'grab',
            }}
          />
        </div>
      </div>
    </dialog>
  );
}
