import chalk from "chalk";
import type { ChalkInstance } from "chalk"; 

const logEvent = (
  eventName: string,
  message: string,
  status: "info" | "success" | "error" = "info"
) => {
  const serviceLabel = chalk.hex("#FFA500")("service");
  let eventColor: ChalkInstance;

  switch (status) {
    case "success":
      eventColor = chalk.green;
      break;
    case "error":
      eventColor = chalk.red;
      break;
    default:
      eventColor = chalk.blue;
  }

  console.log(
    `${serviceLabel} ${eventColor(eventName)} ${chalk.gray.italic(message)}`
  );
};

export { logEvent };
