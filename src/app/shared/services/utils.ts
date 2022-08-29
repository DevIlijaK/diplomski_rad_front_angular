import * as dayjs from "dayjs";


export function getMonth(month: number, selectedYear: number){
  month = Math.floor(month)
  const year=selectedYear
  const firstDayOfMonth=dayjs(new Date(year, month,0)).day()

  let currentMonthCounter = 0-firstDayOfMonth
  const daysMatrix=new Array(5).fill([]).map(() =>{
    return new Array(7).fill(null).map(()=>{
      currentMonthCounter++
      return dayjs(new Date(year,month,currentMonthCounter))
    })
  })
  console.log(year);
  return daysMatrix;
}
