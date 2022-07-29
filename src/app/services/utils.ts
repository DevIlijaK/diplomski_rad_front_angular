import * as dayjs from "dayjs";


export function getMonth(month=dayjs().month()){
  month = Math.floor(month)
  const year=dayjs().year()
  const firstDayOfMonth=dayjs(new Date(year, month,0)).day()

  let currentMonthCounter = 0-firstDayOfMonth
  const daysMatrix=new Array(5).fill([]).map(() =>{
    return new Array(7).fill(null).map(()=>{
      currentMonthCounter++
      return dayjs(new Date(year,month,currentMonthCounter))
    })
  })
  return daysMatrix;
}
