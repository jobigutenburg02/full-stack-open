const Header = ({course}) => {
  console.log(course)
  return (
    <h1>{course}</h1>
  )
}

const Part = ({name, exercises}) => {
  return (
    <p>{name} {exercises}</p>
  )
}

const Content = ({part1, part2, part3}) => {
  return (
    <>
      <Part name={part1.name} exercises={part1.exercises}/>
      <Part name={part2.name} exercises={part2.exercises}/>
      <Part name={part3.name} exercises={part3.exercises}/>
    </>
  )
}

const Total = ({totalExercises}) => {
  return (
    <p>Number of exercises {totalExercises}</p>
  )
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const totalExercises = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises

  return (
    <div>
      <Header course={course.name}/>
      <Content part1={course.parts[0]} part2={course.parts[1]} part3={course.parts[2]} />
      <Total totalExercises={totalExercises}/>
    </div>
  )
}

export default App