import Redis, { Command } from "ioredis";

class RedisService {
  private redisClient: Redis | null;

  constructor() {
    this.redisClient = null;

    //init the connection after init class
    this.initConnection();
  }

  initConnection() {
    try {
      this.redisClient = new Redis({
        host: process.env.REDIS_HOST,
        port:
          typeof process.env.REDIS_PORT !== "undefined"
            ? +process.env.REDIS_PORT
            : 6379,
        password: process.env.REDIS_PASSWORD,
        keyPrefix: process.env.REDIS_KEY_PREFIX,

        lazyConnect: false,
        showFriendlyErrorStack: true,
        enableAutoPipelining: true,
        maxRetriesPerRequest: 0,
        connectTimeout: 60000,
        autoResubscribe: false,
        autoResendUnfulfilledCommands: false,
        socketTimeout: 10000, //ms
        retryStrategy: (times: number) => {
          const delay = Math.min(times * 50, 2000);
          return delay;
        },
      });

      // Event listeners for various Redis connection events
      this.redisClient.on("connect", () => {
        console.log("[Redis] Success connected.");
      });

      this.redisClient.on("close", async () => {
        console.info("[Redis] connection closed");

        // Reconnect logic with a 10-second delay
        setTimeout(() => {
          if (this.redisClient !== null) {
            this.redisClient
              .connect()
              .catch((error: any) => {
                console.error("[Redis] Retry connection failed", error);
              })
              .then(() => {
                console.info("[Redis] Retry connection success");
              });
          }
        }, 10000);
      });

      this.redisClient.on("error", (err: any) => {
        console.error("[Redis] Connection error", err);
      });

      this.redisClient.on("connecting", () => {
        console.info("[Redis] Connecting...");
      });

      this.redisClient.on("ready", () => {
        console.info("[Redis] Connection is ready.");
      });

      this.redisClient.on("reconnecting", () => {
        console.info("[Redis] Reconnecting...");
      });

      //set the name
      const setClientNameCommand = new Command("CLIENT", [
        "SETNAME",
        `${process.env.REDIS_CLIENT_NAME}-${new Date().toISOString()}`,
      ]);
      this.redisClient.sendCommand(setClientNameCommand);
    } catch (e) {
      throw new Error(`[Redis] Could not create a Redis instance`);
    }
  }

  getRedisClient() {
    if (this.redisClient === null) {
      this.initConnection();
    }

    return this.redisClient;
  }
}

const myRedisService = new RedisService();

// Exporting an instance of the RedisService to be used across the application
export default myRedisService;
