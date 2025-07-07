const Header = ({name}) => {
  console.log(name)
  return (
    <h1>{name}</h1>
  )
}

const Part = ({name, exercises}) => {
  return (
    <p>{name} {exercises}</p>
  )
}

const Content = ({parts}) => {
  return (
    <>
        {parts.map((part, index) => (
            <Part key={index} name={part.name} exercises={part.exercises}/>
        ))}
    </>
  )
}

const Total = ({totalExercises}) => {
  return (
    <h3>total of {totalExercises} exercises</h3>
  )
}

const Course = ({course}) => {

    // const totalExercises = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises + course.parts[3].exercises
    const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
        <div>
            <Header name={course.name}/>
            <Content parts={course.parts} />
            <Total totalExercises={totalExercises}/>
        </div>
    )
}

export default Course