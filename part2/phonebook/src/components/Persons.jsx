const Persons = ({persons, searchName, deletePerson}) => {
  return (
    <>
      {persons.filter(person => 
        person.name.toLowerCase().includes(searchName.toLowerCase())) // case-insensitivity
        .map((person, index) => (
        <p key={index}>
           {person.name} {person.number} 
           <button onClick={() => deletePerson({person, id: person.id})}>delete</button> 
        </p>
      ))}
    </>
  )
}

export default Persons