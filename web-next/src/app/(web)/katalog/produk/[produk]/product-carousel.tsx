'use client';

import { cn } from '@/utils/ui';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useCallback, useEffect, useState, type HTMLAttributes } from 'react';

interface ProductCarouselProps extends HTMLAttributes<HTMLElement> {
  items: {
    id: string | number;
    url: string;
    alt: string;
  }[];
}

/* TODO: Add accessibility attributes */
export default function ProductCarousel({ items = [], className, ...attrs }: ProductCarouselProps) {
  const [selected, setSelected] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel();
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'keepSnaps',
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelected(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelected]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on('select', onSelect).on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div {...attrs} className={cn('grid grid-cols-3 auto-rows-[20vh] gap-x-3 gap-y-4', className)}>
      <div
        ref={emblaMainRef}
        className="col-span-3 row-span-2 overflow-hidden"
      >
        <div className="size-full flex touch-pan-y touch-pinch-zoom">
          {items.map((item, i) => (
            <Image
              key={item.id}
              src={item.url}
              alt={item.alt}
              width={650}
              height={400}
              priority={i === selected}
              className="basis-full grow-0 shrink-0 size-full rounded-md object-contain bg-gray-100"
            />
          ))}
        </div>
      </div>

      <div ref={emblaThumbsRef} className="col-span-2 overflow-hidden">
        <div className="size-full flex gap-3 touch-pan-y touch-pinch-zoom p-2">
          {items.map((item, i) => (
            <div
              key={item.id}
              className={cn('basis-2/5 shrink-0 rounded overflow-hidden', { 'ring-2 ring-offset-1': i === selected })}
              onClick={() => onThumbClick(i)}
            >
              <Image
                src={item.url}
                alt={item.alt}
                width={300}
                height={200}
                className={cn('size-full object-contain bg-gray-100 rounded border border-input hover:brightness-[0.99]', { 'brightness-[0.98]': i === selected })}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="grow flex gap-1">
          <button
            type="button"
            aria-label="Gambar sebelumnya"
            disabled={!emblaMainApi?.canScrollPrev()}
            className="grow bg-gray-100 hover:bg-gray-200/75 active:bg-gray-200 disabled:bg-gray-200/25 text-gray-500 disabled:text-gray-300 focus:rounded ring-0 focus:ring ring-primary transition-shadow flex flex-col justify-center items-center"
            onClick={() => emblaMainApi?.scrollPrev()}
          >
            <ChevronLeftIcon className="size-6" />
          </button>
          <button
            type="button"
            aria-label="Gambar selanjutnya"
            disabled={!emblaMainApi?.canScrollNext()}
            className="grow bg-gray-100 hover:bg-gray-200/75 active:bg-gray-200 disabled:bg-gray-200/25 text-gray-500 disabled:text-gray-300 focus:rounded ring-0 focus:ring ring-primary transition-shadow flex flex-col justify-center items-center"
            onClick={() => emblaMainApi?.scrollNext()}
          >
            <ChevronRightIcon className="size-6" />
          </button>
        </div>

        <div className="text-gray-300">
          Total {items.length} gambar
        </div>
      </div>
    </div>
  );
}