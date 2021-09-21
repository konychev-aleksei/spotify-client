import React, { useState, useEffect, useContext } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faFastBackward, faFastForward } from '@fortawesome/free-solid-svg-icons'

import AppContext from '../../AppContext'


const Playbar = ({ audioRef, currentTrack, playing, setPlaying, handlePlayback, toggleTrack }) => {
  const { currentPlaylist, setCurrentPlaylist } = useContext(AppContext)
  const [currentTime, setCurrentTime] = useState(0)
  const { artists, name, duration, thumb } = currentTrack


  const getCurrentTime = () => {
    return `0${Math.floor(currentTime / 60)}:` + (currentTime % 60 < 10 ? '0' : '') + `${currentTime % 60}`
  }

  const getInputValue = () => {
    return isNaN(audioRef.current?.duration) ? 0 : Math.floor((currentTime / audioRef.current?.duration) * 1000)
  }

  const setInputValue = (e) => {
    if (isNaN(audioRef.current.duration)) {
      return
    }

    audioRef.current.currentTime = (e.target.value / 1000) * audioRef.current.duration
  }

  const playNext = () => {
    let newIndex = currentPlaylist.index + 1
    if (newIndex >= currentPlaylist.tracks?.length)
      newIndex = 0

    console.log(currentPlaylist)
    if (currentPlaylist.tracks?.length)
      toggleTrack(currentPlaylist.tracks[newIndex])

    setCurrentPlaylist({ ...currentPlaylist, index: newIndex })
  }

  const playPrevious = () => {
    audioRef.current.currentTime = 0
  }

  useEffect(() => {
    audioRef.current.paused ? setPlaying(false) : setPlaying(true)

    const timeInterval = setInterval(() => setCurrentTime(parseInt(audioRef.current.currentTime)), 50)
    audioRef.current.addEventListener('ended', playNext)

    return () => {
      clearInterval(timeInterval)
      //audioRef.current.removeEventListener('ended', null)
    }
  }, [audioRef.current])

  return(
    <div className="playbar">
      <img src={ thumb } alt="" />
      <h1>{ name }</h1>

      <p className="song-authors">{ artists }</p>
      <button onClick={ playPrevious } className="controls rewind-backwards">
        <FontAwesomeIcon icon={ faFastBackward } />
      </button>
      <button onClick={ handlePlayback } className="controls toggle-playback">
        {
          playing ?
          <FontAwesomeIcon icon={ faPause } />
          :
          <FontAwesomeIcon icon={ faPlay } />
        }
      </button>
      <button onClick={ playNext } className="controls rewind-forewards">
        <FontAwesomeIcon icon={ faFastForward } />
      </button>

      <input min="0" max="1000" step="1" type="range" value={ getInputValue() } onChange={ (e) => setInputValue(e) } />

      <p className="song-authors current-time">{ getCurrentTime() }</p>
      <p className="song-authors duration">{ duration }</p>
    </div>
  )
}

export default Playbar
