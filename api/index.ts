import "dotenv/config";
import { createExpressApp } from "../server/_core/app";

const app = createExpressApp();

export default function handler(req: any, res: any) {
  return app(req, res);
}

