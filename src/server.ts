import express, { Application, Router } from "express";
import bodyParser from "body-parser";
import testRouter from "./routers/test/testRouter";
import router from "./routers/index";
import pool from "./dbconfig/dbconnector";
import cors from "cors";
import { CorsOption } from "./interfaces";
import DB from "./models";
import authenticationRouter from "./routers/auth.routes";
import authorizationRouter from "./routers/user.routes";
import gameRouter from "./routers/games/games.router";
import "dotenv/config";
import e from "express";

class Server {
  private app;
  private Role;

  constructor() {
    this.app = express();
    this.config();
    this.routerConfig();
    this.dbConnect();
  }

  private config() {
    const corsOption: CorsOption = {
      origin: "http://localhost:4000",
    };

    this.app.use(express.json());
    this.app.use(cors(corsOption));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json({ limit: "1mb" })); // 100kb default

    // Auth config
    this.app.use((req, res, next) => {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  }

  private routerConfig() {
    // default route
    this.app.use(router);

    // api routes
    this.app.use("/apiTest", testRouter);

    this.app.use("/api", authenticationRouter);

    this.app.use("/api", authorizationRouter);

    this.app.use("/api", gameRouter);
  }

  private dbConnect() {
    pool.connect((err, client, done) => {
      if (err) throw new Error(err);
      console.log("Connected");
    });
  }

  public dbSync = async () => {
    const db = new DB();
    this.Role = db.role.role;
    // db.sequelize.sync({ force: true })

    if (process.env.NODE_ENV === "Development") {
      await db.sequelize.sync();
      console.log("Does not drop or sync database");
    } else {
      await db.sequelize.sync({ force: true });
      console.log("Drop and Resync Database with { force: true }");
      this.initialize();
    }
  };
  public initialize = async () => {
    try {
      await this.Role.create({
        id: 1,
        name: "user",
      });

      await this.Role.create({
        id: 2,
        name: "moderator",
      });

      await this.Role.create({
        id: 3,
        name: "admin",
      });
    } catch (error) {
      console.log(error);
    }
  };

  public start = (port: number) => {
    return new Promise((resolve, reject) => {
      this.app
        .listen(port, () => {
          resolve(port);
        })
        .on("error", (err: Object) => reject(err));
    });
  };
}

export default Server;
