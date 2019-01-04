import {h, Component} from 'preact'
import * as R from 'ramda'

import Board from './Board'
import { BoardOps } from '../logic'


interface GameState {
    board: number[]
    score: number
    noChange: boolean[] 
}

export default class Game extends Component<any, GameState> {
    constructor(props: any) {
        super(props)
        this.newGame()
    }

    newGame() {
        this.setState({
            board: BoardOps.newSquare(R.repeat(0, 16)),
            score: 0,
            noChange: R.repeat(false, 4)
        })
    } 

    onKeyDown(ev: KeyboardEvent) {
        if (ev.key === 'ArrowUp') {
            // slide up 
        }
        if (ev.key === 'ArrowRight') {
            // slide right 
        }
        else if (ev.key === 'ArrowDown') {
            // slide down
        } 
        else if (ev.key === 'ArrowLeft') {
            // slide left 
        } 
        else if (ev.key === 'Backspace') {
            // undo?
        }
    }

    render(): JSX.Element {
        return (
            <div class="game">
                <Board
                    onKeyDown={(ev: KeyboardEvent) => this.onKeyDown(ev)}
                    values={this.state.board}
                />
            </div>
        )
    }
}