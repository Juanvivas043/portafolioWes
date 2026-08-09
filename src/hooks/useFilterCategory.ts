'use client';

import { useState, useCallback } from 'react';

export function useFilterCategory<T extends string>(initialCategory: T = 'all' as T) {
  const [activeCategory, setActiveCategory] = useState<T>(initialCategory);

  const setCategory = useCallback((cat: T) => {
    setActiveCategory(cat);
  }, []);

  const resetCategory = useCallback(() => {
    setActiveCategory('all' as T);
  }, []);

  return {
    activeCategory,
    setCategory,
    resetCategory,
    isFiltered: activeCategory !== 'all',
  };
}
