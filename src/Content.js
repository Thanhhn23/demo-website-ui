import { memo} from "react"



function Content({onIncrease}) {

  console.log('re-render');

  
  return (
    <>
    <h1>Hello Hello</h1>
    <button onClick={onIncrease}>Click</button> 
    </>
  )
}

export default memo(Content);
