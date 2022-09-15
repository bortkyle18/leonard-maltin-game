import BasicNav from "../components/BasicNav"

const HowToPlay = (props) => {
  
  return (
    <div>
      <BasicNav authUser={ props.authUser }/>
      <h1>How to Play the Leonard Maltin Game</h1>
      <br/>
      <p>
        The Leonard Maltin Game uses information from IMDb to create a group movie trivia game. Your group must first establish a "Maltin". The Maltin is the only person who can view the screen and will be the host of the game - giving clues, naming actors, awarding points, and settling any disputes between players. The game is played in rounds and each round begins when a category is selected by either players (based on turns/who will bid first) or the Maltin can pick the categories if desired.
        <br/>
        <br/>
        Players are given the category description, the year of the movie, the movie ratings, some unhelpful clues from the IMDb information as decided on by the Maltin of the game and the number of names in the cast list available.
        In order, each player must declare how many names they can name the movie in, knowing that the cast list will be read from the bottom up. You can only bid less than the bid before you. Players can bid negative names if they wish and if challenged must then give the name of the movie and the number of actor names they went negative in the correct order (this would be from top of the billing down).
        <br/>
        <br/>
        If a contestant doesn't know the movie, or doesn't think the person before them knows the movie, they can declare "NAME THAT MOVIE!".
        The amount of names that were bid are read (if the play did not bid negative names) and the challenged person must name the movie. If they get it right, they get the point. If they get it wrong, the challenger gets the point.
      </p>
    </div>
  )
}

export default HowToPlay