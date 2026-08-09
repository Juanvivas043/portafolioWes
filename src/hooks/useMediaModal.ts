'use client';

import { useState, useEffect, useCallback } from 'react';
import { PhotoItem } from '@/helpers/mediaData';

export function useMediaModal(items: readonly PhotoItem[]) {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  const openModal = useCallback(
    (photo: PhotoItem) => {
      const idx = items.findIndex((p) => p.id === photo.id);
      setSelectedPhoto(photo);
      setCurrentIndex(idx);
      document.body.style.overflow = 'hidden';
    },
    [items]
  );

  const closeModal = useCallback(() => {
    setSelectedPhoto(null);
    setCurrentIndex(-1);
    document.body.style.overflow = '';
  }, []);

  const nextPhoto = useCallback(() => {
    if (currentIndex >= 0 && currentIndex < items.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setSelectedPhoto(items[nextIdx]);
    } else if (items.length > 0) {
      setCurrentIndex(0);
      setSelectedPhoto(items[0]);
    }
  }, [currentIndex, items]);

  const prevPhoto = useCallback(() => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      setSelectedPhoto(items[prevIdx]);
    } else if (items.length > 0) {
      const lastIdx = items.length - 1;
      setCurrentIndex(lastIdx);
      setSelectedPhoto(items[lastIdx]);
    }
  }, [currentIndex, items]);

  useEffect(() => {
    if (!selectedPhoto) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, closeModal, nextPhoto, prevPhoto]);

  return {
    selectedPhoto,
    isOpen: selectedPhoto !== null,
    currentIndex,
    totalItems: items.length,
    openModal,
    closeModal,
    nextPhoto,
    prevPhoto,
  };
}
