type CardItem = {
  title: string
  description: string
  imageUrl: string
  className: string
  hoverMode: "tl" | "br"
}

export const cards: CardItem[] = [
  {
    title: "Mountain View",
    description:
      "Explore the breathtaking heights of natural wonders. These majestic mountains offer spectacular views and unforgettable experiences for all adventure seekers.",
    imageUrl: "/images/image-animation-01.JPG",
    className: "h-[300px] w-full top-0 left-0 rounded-2xl",
    hoverMode: "tl",
  },
  {
    title: "Calm Waters",
    description:
      "Experience the serene beauty of this peaceful lake destination. Perfect for relaxation and connecting with nature's gentle side.",
    imageUrl: "/images/image-animation-02.JPG",
    className: "h-[200px] w-[200px] top-[305px] left-0 bottom-0 rounded-2xl",
    hoverMode: "tl",
  },
  {
    title: "Forest Journey",
    description:
      "Discover the mysteries hidden within ancient forests. A lush green sanctuary where time seems to stand still among the towering trees.",
    imageUrl: "/images/image-animation-03.JPG",
    className:
      "h-[280px] w-[305px] right-0 bottom-0 rounded-2xl border-4 border-white hover:border-0",
    hoverMode: "br",
  },
]
