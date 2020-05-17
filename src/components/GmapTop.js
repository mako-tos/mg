import React, { Component } from 'react'
import LazyLoad from 'react-lazyload'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { GoogleApiWrapper, Map, Marker, InfoWindow } from 'google-maps-react'

const MapContainer = styled.div`
  height: 50vh;
  width: calc(100vw - 4em);
  margin: 0 auto;
  max-width: 1000px;
`

const style = {
  height: '50vh',
  width: 'calc(100vw - 4em)',
  padding: 'auto 0',
  maxWidth: '1000px'
}

class GmapTop extends Component {
  constructor(props) {
    super(props)
    var obj = {}
    props.markers.forEach(marker => {
      obj[marker.slug] = false
    })
    this.state = {
      showInfoWindow: obj
    }
  }

  clickMarker(marker) {
    const slug = marker.slug
    const state = this.state
    state.showInfoWindow[slug] = true
    this.setState(state)
  }
  render() {
    if (typeof window === 'undefined') {
      return (<MapContainer></MapContainer>)
    }

    return (
      <MapContainer>
        <LazyLoad once offset={30}>
          <Map
            google={ window.google }
            style={style}
            containerStyle={style}
            zoom={ 12 }
            center={{ lat: this.props.lat, lng: this.props.lng }}
            initialCenter={{ lat: this.props.lat, lng: this.props.lng }}
          >
            {this.props.markers.map(marker => (
              <Marker
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={e => { this.clickMarker(marker) } }
                key={marker.slug}
              />
            ))}
            {this.props.markers.map(marker => (
              <InfoWindow
                visible={ this.state.showInfoWindow[marker.slug] }
                position={{ lat: marker.lat, lng: marker.lng }}
                key={marker.slug}
              >
                <div>
                  <Link to={`${this.props.basePath}/${marker.slug}/`}>
                    { marker.text }
                  </Link>
                </div>
              </InfoWindow>
            ))}
          </Map>
        </LazyLoad>
      </MapContainer>
    )
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAtZj75-Q06Y8Kq43uWMeiIbwWXRvsLx8E',
  language: 'ja'
})(GmapTop)
