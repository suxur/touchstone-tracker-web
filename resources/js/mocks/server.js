import { setupWorker } from "msw";
import { handlers } from "./handlers";

export const working = setupWorker(...handlers);
