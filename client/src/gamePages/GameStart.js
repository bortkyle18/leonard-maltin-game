import React from 'react';
import GameNav from '../components/GameNav';

const GameStart = (props) => {
  return (
    <>
      <GameNav authUser={ props.authUser }/>
      {/* GameStart code here */}
    </>
  );
};

export default GameStart;