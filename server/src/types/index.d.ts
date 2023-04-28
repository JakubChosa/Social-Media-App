declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URL: string;
      PORT: string;
      JWT_SECRET: string;
      JWT_LIFETIME: string;
      DANGEROUSLY_DISABLE_HOST_CHECK: string;
      ENV?: "dev" | "prod";
    }
  }
  namespace Express {
    export interface Request {
      user?: string | jwt.JwtPayload;
    }
  }
}

export {};
