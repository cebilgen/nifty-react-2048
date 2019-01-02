import {h} from 'preact'
import * as R from 'ramda'
import Square from './Square';


interface BoardProps {
    values: number[] 
}

export default function Board(props: BoardProps): JSX.Element {
    return (
        <div class="board" tabIndex={0}>
            {R.times((n) => 
                <Square     
                    value={props.values[n]}
                />, 16
            )}
        </div>
    )
}
