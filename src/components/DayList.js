import React from "react";
import DayListItem from 'components/DayListItem'

export default function DayList(props) {

  const dayOfWeek = props.days.map((day) =>
    < DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={props.day === day.name}
      setDay={() => props.setDay(day.name)} />
    //re: selected, this is a boolean. so if 
    //props.day === props.name,
    //then it will render.
  )
  return (
    <ul>
      {dayOfWeek}
    </ul>
  )
}