const Filter = ({searchName, setSearchName}) => {
  return (
    <p>
        filter shown with 
        <input value={searchName} onChange={(e)=>setSearchName(e.target.value)} /> 
    </p>
  )
}

export default Filter