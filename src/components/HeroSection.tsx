import { Link } from 'react-router-dom'

export const HeroSection = () => {
  return (
    <div id="hero" className="flex items-center justify-center flex-col mb-12 texte-center">
      <div className="text-center">
        <Link to="/">
          <div alt="logo" className="h-96 bg-light-logo  bg-no-repeat bg-center bg-contain w-96"></div>
        </Link>
      </div>
      <h1>Des meubles de qualité moins chers</h1>
    </div>
  )
}
