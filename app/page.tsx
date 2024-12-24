'use client'

import { motion } from 'framer-motion';
import { Minimize2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const width = 800;
const height = 600;

function getPlaceholderImageUrl() {
  return `https://picsum.photos/seed/${Math.round(Math.random() * 100)}/${width}/${height}`;
}

interface AnimatedImageProps {
  src: string
  width: number
  height: number
  isExpanded: boolean
}

function AnimatedImage({ src, width, height, isExpanded }: AnimatedImageProps) {
  const [isHovered, setIsHovered] = useState(false);
  return <motion.div className='p-4'>
    <motion.div
      transition={{ 
        duration: 0.5,
        ease: "easeInOut"
      }}
      animate={{
        width: isHovered || isExpanded ? width * 1.2: width,
        height: isHovered || isExpanded ? height * 1.2 : height,
      }}
      className={`relative`}
      style={{
        width: width,
        height: height,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      >
      <Image
        src={src}
        alt=''
        fill
      />
    </motion.div>
  </motion.div>
}


function AnimatedPanel({ src }: { src: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return <motion.div
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    animate={{
      width: isExpanded ? "100vw" : width,
    }}
    onClick={() => setIsExpanded(true)}
    className={`flex justify-center align-middle p-4 ${isExpanded ? "bg-white" : ""}`}
  >
    <div className={`flex items-center ${isExpanded ? "overflow-scroll" : ""}`}>
      <AnimatedImage
        src={src}
        width={width}
        height={height}
        isExpanded={isExpanded}
      />
      {
        isExpanded && <div className="flex">
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
        </div>
      }
    </div>
    {isExpanded && <div
      className='relative top-0 right-0 ml-16'
    >
      <button
        onClick={(event) => {event.stopPropagation(); setIsExpanded(false)}}
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


  return <div className="my-64 flex justify-center">
    <div
      className={`bg-black fixed h-screen w-[1120px] top-0 left-1/2 transform -translate-x-1/2 z--10`}
    />
    <div className='flex flex-col items-center z-10'>
      {imgs}
    </div>
  </div>

}
