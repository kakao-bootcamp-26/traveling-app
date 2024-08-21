import { TravelSchedule } from "@/shared/entities";

export function scheduleInformationToString(schedule: Partial<TravelSchedule> | undefined) {
  if (!schedule) {
    return "";
  }
  if (!schedule.arrival && !schedule.departure) {
    return "";
  }
  if (schedule.arrival && schedule.departure) {
    return `${schedule.departure.format("YYYY-MM-DD")} | ${schedule.arrival.format("YYYY-MM-DD")}`;
  }

  if (schedule.arrival && !schedule.departure) {
    return `Pick Departure Date | ${schedule.arrival.format("YYYY-MM-DD")}`;
  }

  if (schedule.departure && !schedule.arrival) {
    return `${schedule.departure.format("YYYY-MM-DD")} | Pick Arrival Date`;
  }
}
