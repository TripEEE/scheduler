##Scheduler project breakdown

##Component Map
https://raw.githubusercontent.com/FrancisBourgouin/lectures-2022-east-sep19/master/w7d2-breakout/scheduler/COMPONENT_MAP.png 

##Components

Button
DayList
DayListItem
InterviewerList
InterviewerListItem
Appointment
Appointment/Header
Appointment/Empty
Appointment/Show
Appointment/Form
Appointment/Status
Appointment/Error
Appointment/Confirm

##Button
State: NO STATE
Props: confirm (bool), disabled (bool), danger, (bool), onClick (function), clickable
Used by: EVERYONE

##DayList
State:
Props: days(arr), day{id, name, spots}, setDay(fn)
Used by: Application

##DayListItem
State:
Props: name, selected(bool), setDay(fn), spots, value, onChange
Used by: DayList

##InterviewerList
State:
Props: interviewers(arr), setInterviewer(fn), interviewer(num), value, onChange
Used by:

##InterviewerListItem
State:
Props: id, name, avatar, selected, setInterviewer(fn)
Used by: InterviewerList

##Appointment
State:
Props:
Used by:

##Appointment/Header
State:
Props: time(str)
Used by: Appointment

##Appointment/Empty
State:
Props: onAdd(fn)
Used by: Appointment

##Appointment/Show
State:
Props: student(str), interviewer(obj), onEdit(fn), onDelete(fn)
Used by: Appointment

##Appointment/Form
State:
Props: student(str), interviewer(num), interviewers(arr), onSave(fn), onCancel(fn)
Used by:

##Appointment/Status
State:
Props: message(str)
Used by:

##Appointment/Error
State:
Props: message(str), onClose(fn)
Used by:

##Appointment/Confirm
State:
Props: message(str), onConfirm(fn), onCancel(fn)
Used by: