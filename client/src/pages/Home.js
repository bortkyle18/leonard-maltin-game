import BasicNav from "../components/BasicNav"

const Home = (props) => {
  
  return (
    <div>
      <BasicNav authUser={ props.authUser }/>
      <h1>Hello!</h1>

      { props.authUser && props.authUser.username !== undefined && (
        <p>Welcome { props.authUser.pname }!</p>
      )}
    </div>
  )
}

export default Home