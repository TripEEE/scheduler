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
Props: name, selected(bool), setDay(fn), spots
Used by: DayList

##InterviewerList
State:
Props:
Used by:

##InterviewerListItem
State:
Props:
Used by:

##Appointment
State:
Props:
Used by:

##Appointment/Header
State:
Props:
Used by:

##Appointment/Empty
State:
Props:
Used by:

##Appointment/Show
State:
Props:
Used by:

##Appointment/Form
State:
Props:
Used by:

##Appointment/Status
State:
Props:
Used by:

##Appointment/Error
State:
Props:
Used by:

##Appointment/Confirm
State:
Props:
Used by: