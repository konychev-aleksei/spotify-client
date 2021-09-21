import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic, faSignOutAlt, faPlus, faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons'

import { auth } from '../../firebase'


const Topbar = ({ showPlaylists, setShowPlaylists }) => {
  const history = useHistory()

  const handleLeft = async () => {
    if (showPlaylists) {
      setShowPlaylists(false)
    }
    else {
      history.push('/')
      await auth.signOut()
    }
  }

  const handleMiddle = () => {
    setShowPlaylists(false)
    history.push('/')
  }

  const handleRight = () => {
    if (showPlaylists) {
      setShowPlaylists(false)
      history.push('/new')
    }
    else {
      setShowPlaylists(true)
    }
  }


  return(
    <div class="top-bar">
      <button onClick={ handleLeft }>
        {
          showPlaylists ?
          <FontAwesomeIcon icon={ faArrowLeft } />
          :
          <FontAwesomeIcon icon={ faSignOutAlt } />
        }
      </button>
      <h1>{ showPlaylists ? 'Collection' : 'Home' }</h1>
      {
        showPlaylists ?
        <button onClick={ handleMiddle }>
          <FontAwesomeIcon icon={ faSearch } />
        </button>
        : null
      }
      <button onClick={ handleRight }>
        {
          showPlaylists ?
          <FontAwesomeIcon icon={ faPlus } />
          :
          <FontAwesomeIcon icon={ faMusic } />
        }
      </button>
    </div>
  )
}

export default Topbar
