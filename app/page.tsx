'use client'

import { AnimatePresence, motion } from 'framer-motion';
import { Minimize2 } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';

const width = 600
const height = 400
const zoomFactor = 1.2

function getPlaceholderImageUrl() {
  return `https://picsum.photos/seed/${Math.round(Math.random() * 100)}/${width}/${height}`;
}

function AnimatedPanel({ src }: { src: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false)

  let showOverlay = isHovered && !isExpanded
  let isZoomed = isHovered || isExpanded
  let zoomedWidth = width * zoomFactor
  let zoomedHeight = height * zoomFactor
  let scrollRef = useRef<HTMLDivElement>(null)

  return <motion.div
    className={`debug flex justify-center p-4}`}
  >
    <motion.div
      ref={scrollRef}
      onClick={() => setIsExpanded(true)}
      className={`flex items-center bg-white ${isExpanded ? "overflow-scroll gap-x-4" : "overflow-hidden"}`}
      initial={false}
      transition={{ duration: 0.5 }}
      animate={{
        width: isExpanded ? "100vw" : `${isZoomed ? zoomedWidth : width}px`
      }}
    >
      {/* Cover image */}
      <div className="relative">
        {/* Image */}
        <motion.div
          className={`relative`}
          transition={{ duration: 0.5 }}
          initial={false}
          animate={{
            width: isZoomed ? zoomedWidth: width,
            height: isZoomed ? zoomedHeight : height,
          }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <Image src={src} alt='' fill />
        </motion.div>
        {/* Translucent overlay */}
        <motion.div
          transition={{ duration: 0.5 }}
          className='text-white absolute top-0 bg-black flex justify-center items-center text-2xl'
          initial={false}
          animate={{
            opacity: showOverlay ? 0.7 : 0,
            width: isZoomed ? zoomedWidth: width,
            height: isZoomed ? zoomedHeight : height,
          }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          Click to see more
        </motion.div>
      </div>

      {/* Expanded info */}
      <motion.div
        className={`flex`}
      >
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
        <div>This is a slightly longer sentence.</div>
      </motion.div>
    </motion.div>


    {/* Minimize button */}
    {isExpanded && <div
      className='relative top-0 right-0 ml-16'
    >
      <button
        onClick={(event) => {
          event.stopPropagation()
          console.log(scrollRef.current)
          scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })
          // setIsExpanded(false)
        }}
        className='justify-end'
      >
        <Minimize2/>
      </button>
    </div>}

  </motion.div>
}

export default function Home() {

  const srcs = [];
  const imgs = [];
  for (let i = 0; i < 10; i++) {
    srcs.push(getPlaceholderImageUrl());
    imgs.push(
      <AnimatedPanel 
        key={i} 
        src={srcs[srcs.length - 1]} 
      />
    );
  }

  const [expanded, setExpanded] = useState(false)

  return <div className="my-64 flex justify-center">
    <div
      className={`bg-black fixed h-screen w-[1120px] top-0 left-1/2 transform -translate-x-1/2 z--10`}
    />
    <div className='flex flex-col items-center z-10'>
      {imgs}
    </div>
  </div>

}
