import { Link } from 'react-router-dom';
import './CharacterBasicCard.scss'

function MainPageCharacterCard({name, filmsNumber, birthYear}) {
  return (
    <li className="mainPageCharacterCard">
      <Link className='name' to={`/${name}`}>{name}</Link>
      <div className='characterInfo'>
        <div>{filmsNumber} films</div>
        <div>Birth year: {birthYear}</div>
      </div>
    </li>
  );
}

export default MainPageCharacterCard;