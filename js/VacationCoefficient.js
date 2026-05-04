class VacationCoefficient {
  static getWorkingDays() {
    const PERIOD = Period.getPeriod();
    const PERIOD_ARR = `${PERIOD}`.split("-");
    const YEAR = PERIOD_ARR[0];
    const MONTH_INDEX = PERIOD_ARR[1];

    const DATE = new Date(YEAR, MONTH_INDEX, 1);

    const DAYS_ARRAY = [];

    while (DATE.getMonth() == MONTH_INDEX) {
      DAYS_ARRAY.push({
        year: DATE.getFullYear(),
        month_index: DATE.getMonth(),
        month: DATE.getMonth() + 1, // 1-12
        date: DATE.getDate(),
        day_index: DATE.getDay(),
        day: DATE.toLocaleDateString("en-US", {
          weekday: "short",
        }).toUpperCase(),
        isCurrentPeriod: true,
      });
      DATE.setDate(DATE.getDate() + 1);
    }

    let workingDays = 0;
    for (let i = 0; i < DAYS_ARRAY.length; i += 1) {
      if (DAYS_ARRAY[i].day_index >= 1 && DAYS_ARRAY[i].day_index <= 5) {
        workingDays += 1;
      }
    }

    return workingDays;
  }

  static getVacationWorkingDays_byEmployeeId(employeeId) {
    const PERIOD = Period.getPeriod();

    const PERIOD_ARR = `${PERIOD}`.split("-");
    const YEAR = PERIOD_ARR[0];
    const MONTH_INDEX = PERIOD_ARR[1];

    const DATE = new Date(YEAR, MONTH_INDEX, 1);

    const DAYS_ARRAY = [];

    while (DATE.getMonth() == MONTH_INDEX) {
      DAYS_ARRAY.push({
        year: DATE.getFullYear(),
        month_index: DATE.getMonth(),
        month: DATE.getMonth() + 1, // 1-12
        date: DATE.getDate(),
        day_index: DATE.getDay(),
        day: DATE.toLocaleDateString("en-US", {
          weekday: "short",
        }).toUpperCase(),
        isCurrentPeriod: true,
      });
      DATE.setDate(DATE.getDate() + 1);
    }

    const VACATION_DAYS = Storage.getVacationDays_byEmployeeId(employeeId);

    let vacationWorkingDays = 0;
    for (let i = 0; i < DAYS_ARRAY.length; i += 1) {
      if (DAYS_ARRAY[i].day_index >= 1 && DAYS_ARRAY[i].day_index <= 5) {
        if (VACATION_DAYS.includes(DAYS_ARRAY[i].date)) {
          vacationWorkingDays += 1;
        }
      }
    }

    return vacationWorkingDays;
  }
}
