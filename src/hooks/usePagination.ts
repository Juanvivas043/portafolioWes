'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

interface UsePaginationOptions {
  /** Cuantas piezas se muestran de entrada y en cada tanda. */
  pageSize?: number;
}

/**
 * Muestra el catalogo por tandas en vez de montar cientos de celdas de golpe.
 *
 * El grid del portafolio pasa de 22 a 277 fotos: renderizarlas todas obliga al
 * navegador a crear cientos de nodos y contenedores de imagen antes de que se
 * vea nada. Aqui se entrega una tanda y se amplia bajo demanda.
 *
 * Al cambiar de filtro el conteo vuelve al inicio: si no, quien viene de "ver
 * todo" abriria una categoria pequenia con la tanda inflada y el boton de
 * cargar mas ya agotado.
 */
export function usePagination<T>(items: readonly T[], { pageSize = 30 }: UsePaginationOptions = {}) {
  const [visibleCount, setVisibleCount] = useState(pageSize);

  useEffect(() => {
    setVisibleCount(pageSize);
  }, [items, pageSize]);

  const visibleItems = useMemo(() => items.slice(0, visibleCount), [items, visibleCount]);

  const showMore = useCallback(() => {
    setVisibleCount((current) => Math.min(current + pageSize, items.length));
  }, [pageSize, items.length]);

  const showAll = useCallback(() => setVisibleCount(items.length), [items.length]);

  const reset = useCallback(() => setVisibleCount(pageSize), [pageSize]);

  return {
    visibleItems,
    visibleCount: visibleItems.length,
    totalCount: items.length,
    hasMore: visibleItems.length < items.length,
    remaining: items.length - visibleItems.length,
    showMore,
    showAll,
    reset,
  };
}
