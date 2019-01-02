import {h, render} from 'preact'
import Game from './components/Game'

let app = document.querySelector('#app')

if (app !== null) {
    render(<Game />, app)
}
else {
    console.log('App query selector failed')
}
