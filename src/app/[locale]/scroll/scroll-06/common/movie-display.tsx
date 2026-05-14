import Image from "next/image"

import "./style.css"

interface MovieDisplayProps {
  currentStep: number
}

const MovieDisplay = ({ currentStep }: MovieDisplayProps) => {
  const movieData = {
    backgroundImage: "/images/10_Wonder-Woman.jpg",
    title: "Wonder Woman",
    story:
      "Diana, princess of the Amazons, trained to be an unconquerable warrior. Raised on a sheltered island paradise, when a pilot crashes on their shores and tells of a massive conflict raging in the outside world, Diana leaves her home, convinced she can stop the threat. Fighting alongside man in a war to end all wars, Diana will discover her full powers and her true destiny.",
    director: "Patty Jenkins",
    writers: "Allan Heinberg, Zack Snyder",
    stars: "Gal Gadot, Chris Pine",
  }

  return (
    <div className={`movie step-${currentStep}`}>
      <div className="bg">
        <Image
          width={1000}
          height={1000}
          src={movieData.backgroundImage}
          className="w-full h-full"
          alt=""
        />
      </div>

      <div className="story">
        <div className="story-content">
          <h2>{movieData.title}</h2>
          <h4>{movieData.story}</h4>
        </div>
      </div>

      <div className="actor">
        <ul>
          <li>
            <h2>Director</h2>
            <h4>{movieData.director}</h4>
          </li>
          <li>
            <h2>Writers</h2>
            <h4>{movieData.writers}</h4>
          </li>
          <li>
            <h2>Stars</h2>
            <h4>{movieData.stars}</h4>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MovieDisplay
