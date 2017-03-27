import React from 'react'

class Board extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="m-board">
        <div className="swiper"></div>
        <ul>
          <li>
            <div>
              <b></b>
              <i></i>
            </div>
            <ul>
              <li>
                <i></i>
                <b></b>
              </li>
              <li>
                <i></i>
                <b></b>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }
}

export default Board
