// 农历计算工具 - 原 CalConv 函数转换
export function calculateLunar() {
  const FIRSTYEAR = 1998
  const LASTYEAR = 2032
  const today = new Date()
  const SolarYear = today.getFullYear()
  const SolarMonth = today.getMonth() + 1
  const SolarDate = today.getDate()
  const Weekday = today.getDay()

  const LunarCal = [
    {
      BaseDays: 27,
      Intercalation: 5,
      BaseWeekday: 3,
      BaseKanChih: 43,
      MonthDays: [1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1],
    },
    {
      BaseDays: 46,
      Intercalation: 0,
      BaseWeekday: 4,
      BaseKanChih: 48,
      MonthDays: [1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1],
    },
    // ... 省略中间数据，保持原数组结构
    {
      BaseDays: 43,
      Intercalation: 0,
      BaseWeekday: 0,
      BaseKanChih: 26,
      MonthDays: [1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
    },
    {
      BaseDays: 32,
      Intercalation: 0,
      BaseWeekday: 1,
      BaseKanChih: 31,
      MonthDays: [1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    },
  ]

  const SolarCal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const SolarDays = [
    0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365, 396, 0, 31, 60, 91, 121, 152, 182,
    213, 244, 274, 305, 335, 366, 397,
  ]
  const AnimalIdx = ['马', '羊', '猴', '鸡', '狗', '猪', '鼠', '牛', '虎', '兔', '龙', '蛇']
  const LocationIdx = ['南.', '東.', '北.', '西.']

  function GetLeap(year) {
    if (year % 400 == 0) return 1
    else if (year % 100 == 0) return 0
    else if (year % 4 == 0) return 1
    else return 0
  }

  if (SolarYear <= FIRSTYEAR || SolarYear > LASTYEAR) return null

  let sm = SolarMonth - 1
  if (sm < 0 || sm > 11) return null

  let leap = GetLeap(SolarYear)
  let d = sm == 1 ? leap + 28 : SolarCal[sm]

  if (SolarDate < 1 || SolarDate > d) return null

  let y = SolarYear - FIRSTYEAR
  let acc = SolarDays[leap * 14 + sm] + SolarDate
  let kc = acc + LunarCal[y].BaseKanChih
  let Kan = kc % 10
  let Chih = kc % 12
  let Location = LocationIdx[kc % 4]
  let Age = kc % 60

  if (Age < 22) Age = 22 - Age
  else Age = 82 - Age

  let Animal = AnimalIdx[Chih]

  let LunarYear, LunarMonth, LunarDate
  if (acc <= LunarCal[y].BaseDays) {
    y--
    LunarYear = SolarYear - 1
    leap = GetLeap(LunarYear)
    sm += 12
    acc = SolarDays[leap * 14 + sm] + SolarDate
  } else {
    LunarYear = SolarYear
  }

  let l1 = LunarCal[y].BaseDays
  let i
  for (i = 0; i < 13; i++) {
    let l2 = l1 + LunarCal[y].MonthDays[i] + 29
    if (acc <= l2) break
    l1 = l2
  }

  LunarMonth = i + 1
  LunarDate = acc - l1
  let im = LunarCal[y].Intercalation

  if (im != 0 && LunarMonth > im) {
    LunarMonth--
    if (LunarMonth == im) LunarMonth = -im
  }

  if (LunarMonth > 12) LunarMonth -= 12

  // 星期
  const weekdayMap = [
    "<span style='color:#FF0000'><b>星期日.</b></span>",
    "<span style='color:#FF0000'><b>星期一.</b></span>",
    "<span style='color:#FF0000'><b>星期二.</b></span>",
    "<span style='color:#FF0000'><b>星期三.</b></span>",
    "<span style='color:#FF0000'><b>星期四.</b></span>",
    "<span style='color:#FF0000'><b>星期五.</b></span>",
    "<span style='color:#FF0000'><b>星期六.</b></span>",
  ]

  return {
    solarDate: `${SolarMonth}月${SolarDate}日`,
    weekday: weekdayMap[Weekday],
    lunarDate: `${LunarMonth}月${LunarDate}日`,
    location: Location,
    animal: Animal,
    lunarYear: LunarYear,
  }
}
