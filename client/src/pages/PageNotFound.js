import BasicNav from "../components/BasicNav"

const PageNotFound = (props) => {

  return (
    <div>
      <BasicNav authUser={ props.authUser }/>
      <div className="signInUpForm">
        <h1>This is not the page you're looking for.</h1>
        <p>Star Wars: A New Hope (1977)</p>
        <br/>
        <br/>
        <h3>404 Page Not Found.</h3>
      </div>
    </div>
  )
}

export default PageNotFound