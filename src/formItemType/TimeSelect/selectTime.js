/**
 * @工具 selectTime
 * @属性说明 
 * selectType：选择时间的类型格式
 * @对应的值
 * Today：获取今天的年月日  格式：2021/10/13
 * Week：获取本周的日期范围  格式：2021/10/11~2021/10/17
 * Month：获取本月的年月 格式：2021/10
 * Quarter：获取本季度的月份范围 格式：2021/10~2021/12
 * Year：获取本年的月份范围 格式：2021
 * 其他值或无值：返回今天的所有时间 格式：2021/10/13 下午 12:41:17
 */
export default function selectTime(selectType){
    let value
    let date = new Date()
    let Today = date.toLocaleDateString()
    let WeekDay = date.getDay()
    let year = date.getFullYear()
    let month = date.getMonth() +1
    let day = date.getDate()
    let dayMap = {
        1:31,
        2:year/4===0?29:28,
        3:31,
        4:30,
        5:31,
        6:30,
        7:31,
        8:31,
        9:30,
        10:31,
        11:30,
        12:31
    }
    if(selectType === "Today"){
        value = Today
    }else if(selectType === "Week"){
        let weekDay = WeekDay
        if(weekDay === 0){
            let startYear = year
            let startMonth = month
            let startTime = day - 7
            if(startTime<=0){
                startMonth = startMonth - 1
                if(startMonth<=0){
                    startMonth = startMonth +12
                    startYear= startYear - 1
                }
                startTime = dayMap[startMonth] + startTime
            }
            value = `${startYear}/${startMonth}/${startTime}~${Today}`
        }else{
            let startYear = year
            let startMonth = month
            let startTime = day - (weekDay-1)
            if(startTime<=0){
                startMonth = startMonth - 1
                if(startMonth<=0){
                    startMonth = startMonth +12
                    startYear= startYear - 1
                }
                startTime = dayMap[startMonth] + startTime

            }
            let endYear = year
            let endMonth = month
            let endTime = day + (7 - weekDay)
            if(endTime>dayMap[endMonth]){
                endMonth = endMonth +1
                if(endMonth>=12){
                    endMonth = endMonth - 12
                    endYear = endYear + 1
                }
                endTime = endTime - dayMap[endMonth]
            }
            value = `${startYear}/${startMonth}/${startTime}~${endYear}/${endMonth}/${endTime}`
        }
    }else if(selectType === "Month"){
        value = year+"/"+month
    }else if(selectType === "Quarter"){
        let startMonth;
        let endMonth;
        switch(month){
            case 1:
            case 2:
            case 3:
                startMonth = 1;endMonth = 3;break;
            case 4:
            case 5:
            case 6:
                startMonth = 4;endMonth = 6;break;
            case 7:
            case 8:
            case 9:
                startMonth = 7;endMonth = 9;break;
            case 10:
            case 11:
            case 12:
                startMonth = 10;endMonth = 12;break;
        }
        value = `${year}/${startMonth}~${year}/${endMonth}`
    }else if(selectType === "Year"){
        value = year
    }else{
        value = date.toLocaleString()
    }
    return value
}