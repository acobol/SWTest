import './LigthSaberButton.scss';

function LigthSaberButton({onClick}) {
  return (
    <div className='buttonWrapper'>
      <button className='loadButton' onClick={onClick}>
        <span className='buttonText'>Load more</span>
      </button>
    </div>
  )
}

export default LigthSaberButton;