import { TravelSchedule } from "@/shared/entities";

export function scheduleInformationToString(schedule: Partial<TravelSchedule> | undefined) {
  if (!schedule) {
    return "";
  }
  if (!schedule.arrival && !schedule.departure) {
    return "";
  }
  if (schedule.arrival && schedule.departure) {
    return `${schedule.arrival.format("YYYY-MM-DD")} | ${schedule.departure.format("YYYY-MM-DD")}`;
  }

  if (schedule.arrival && !schedule.departure) {
    return `${schedule.arrival.format("YYYY-MM-DD")} | Pick Departure Date`;
  }

  if (schedule.departure && !schedule.arrival) {
    return `Pick Arrival Date | ${schedule.departure.format("YYYY-MM-DD")} `;
  }
}
