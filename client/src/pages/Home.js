const Home = (props) => {
  
  return (
    <div>
      <h1>Hello!</h1>

      { props.authUser && props.authUser.username !== undefined && (
        <p>Welcome { props.authUser.fname }!</p>
      )}
    </div>
  )
}

export default Home