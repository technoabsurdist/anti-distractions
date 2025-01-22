// "use client"
import Image from "next/image";
import fs from "fs";
import path from "path";
import sizeOf from "image-size";

export const dynamic = 'force-dynamic';

const getRandomImageWithDimensions = (() => {
  const imageDir = path.join(process.cwd(), 'public/pics');
  const imageFiles = fs.readdirSync(imageDir)
    .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
    .map(filename => {
      const dimensions = sizeOf(path.join(imageDir, filename));
      return {
        filename,
        width: dimensions.width || 0,
        height: dimensions.height || 0
      };
    });
  
  if (imageFiles.length === 0) {
    throw new Error('No images found in the pics directory');
  }
  
  return () => imageFiles[Math.floor(Math.random() * imageFiles.length)];
})();

export default function Home() {
  const image = getRandomImageWithDimensions();
  
  const getScaledDimensions = (originalWidth: number, originalHeight: number) => {
    const maxWidth = typeof window !== 'undefined' ? window.innerWidth - 40 : 1200;
    const maxHeight = typeof window !== 'undefined' ? window.innerHeight - 40 : 800;
    if (originalWidth <= maxWidth && originalHeight <= maxHeight) {
      return { width: originalWidth, height: originalHeight };
    }
    const widthRatio = maxWidth / originalWidth;
    const heightRatio = maxHeight / originalHeight;
    const scale = Math.min(widthRatio, heightRatio);
    return {
      width: Math.floor(originalWidth * scale),
      height: Math.floor(originalHeight * scale)
    };
  };
  const dimensions = getScaledDimensions(image.width, image.height);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <Image
        src={`/pics/${image.filename}`}
        alt="Random image"
        width={dimensions.width}
        height={dimensions.height}
        priority
      />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        Work harder.
      </footer>
    </div>
  );
}
