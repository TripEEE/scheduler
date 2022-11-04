//selectors are a way to create or derive data from state

// return an array of appointments for the given day
export const getAppointmentsForDay = (state, day) => {
  //selectDay grabs the object where days[*day*].name
  const selectDay = (state.days.find((dayOfWeek) => dayOfWeek.name === day) || {})
  //appointments is provided an alias of dayAppointments which will default to an empty array should the value of selectDay be falsy
  const { appointments: dayAppointments = [] } = selectDay
  return dayAppointments.map((appointmentId) => state.appointments[appointmentId])
}

export const getInterview = (state, interview) => {
  if (!interview) {
    return null
  }
  const findInterviewer = (state.interviewers[interview.interviewer])
  let obj = {
    "student": interview.student,
    "interviewer": findInterviewer
  }
  return obj
}

export const getInterviewersForDay = (state, day) => {
  const selectDay = (state.days.find((dayOfWeek) => dayOfWeek.name === day) || {})
  const { interviewers: dayInterviewers = [] } = selectDay
  return dayInterviewers.map((interviewerId) => state.interviewers[interviewerId])
}

//HOOKS FROM LECTURE
//color changer
//a variable that starts with red
//changes when something has been clicked
//method to go to next and prev

//component

// import REACT from "react"
// import useColor from "..."

// const Color = () => {
//   const { currColor, next, prev } = useColor(['skyblue', 'goldenrod', 'firebrick'])


//   return (
//     <div style={{ backgroundColor: currColor }}>
//       <button onClick={prev}>Prev</button>
//       <button onClick={next}>Next</button>
//     </div>
//   )
// }

// export default Color

// //hook

// import { useState } from "react"

// const useColor = () => {
//   const [index, setIndex] = useState(0)

//   const next = () => {
//     setIndex(prev => prev + 1)
//   }

//   const prev = () => {
//     setIndex(prev => prev - 1)
//   }

//   return { prev, currColor: arr[index], next }

// }

// export default useColor

// //tests
// //go to jest cheatsheet for lessons on how to make a test
// //install react-hooks-testing-library. this is an add-on to jest

// import useColor from "...."
// import { renderHook } from "...."

// describe('first tests', () => {
//   it('checks if 2+2 is equal to 4', () => {
//     expect(2 + 2).toBe(4)
//   })
// })

// describe('useColor Tests', () => {
//   it('takes an array of colors, returns back an object with CURRENT color being purple', () => {
//     const colors = ['purple', 'red', 'goldenrod', 'firebrick', 'limegreen']
//     const { result } = renderHook(() => useColor(colors))
//     console.log(result.current)
//     //.current is whatever your hook returns
//     expect(result.current.currColor).toBe('purple')
//   })
// })

// describe('useColor Tests, (' => {
//   it('takes an array of colors, runs the NEXT() method, and returns the next color to red', () => {
//     const colors = ['purple', 'red', 'goldenrod', 'firebrick', 'limegreen']
//     const { result } = renderHook(() => useColor(colors))
//     act(() => {
//   result.curent.next()
// })
// expect(result.current.currColor).toBe('red')
//   })
// })