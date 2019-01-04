import {h} from 'preact'
import * as R from 'ramda'
import Square from './Square';


interface BoardProps {
    onKeyDown: (ev: KeyboardEvent) => void
    values: number[] 
}

export default function Board(props: BoardProps): JSX.Element {
    return (        
        <div class="board" tabIndex={0} onKeyDown={(ev: KeyboardEvent) => props.onKeyDown(ev)}>
            <div class="board__background">
                {R.repeat(<div class="board__square board__square--bg" />, 16)}
            </div>
            <div class="board__actual">
                {R.times((n) => 
                    <Square     
                        value={props.values[n]}
                    />, 16
                )}
            </div>
        </div>
    )
}
