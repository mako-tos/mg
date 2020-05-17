import React, { Component } from 'react'
import LazyLoad from 'react-lazyload'
import styled from '@emotion/styled'
import { GoogleApiWrapper, Map, Marker, InfoWindow } from 'google-maps-react'

const MapContainer = styled.div`
  height: 25vh;
  width: calc(100vw - 4em);
  max-width: 650px;
  margin: 0 auto;
`

const style = {
  height: '25vh',
  width: 'calc(100vw - 4em)',
  maxWidth: 'calc(650px - 1em)',
  padding: 'auto 0'
}

class Gmap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showInfoWindow: false
    }
  }

  clickMarker() {
    this.setState({ showInfoWindow: true })
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
            zoom={ 15 }
            center={{ lat: this.props.lat, lng: this.props.lng }}
            initialCenter={{ lat: this.props.lat, lng: this.props.lng }}
          >
            <Marker
              position={{ lat: this.props.lat, lng: this.props.lng }}
              onClick={e => { this.clickMarker() } }
            />
            <InfoWindow
              visible={ this.state.showInfoWindow }
              position={{ lat: this.props.lat, lng: this.props.lng }}
            >
              <div>
                { this.props.text }
              </div>
            </InfoWindow>
          </Map>
        </LazyLoad>
      </MapContainer>
    )
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAtZj75-Q06Y8Kq43uWMeiIbwWXRvsLx8E',
  language: 'ja'
})(Gmap)
