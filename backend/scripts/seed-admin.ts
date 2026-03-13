import { connectDb } from "../src/config/db.js";
import { logger } from "../src/config/logger.js";
import { ROLES } from "../src/constants/roles.js";
import { UserModel } from "../src/models/User.model.js";
import { hashPassword } from "../src/utils/password.js";
import mongoose from "mongoose";

const ADMIN_EMAIL = "admin@guides.local";
const ADMIN_PASSWORD = "Admin@12345";
const ADMIN_PHONE = "9999999999";

const seedAdmin = async () => {
  await connectDb();

  const hashed = await hashPassword(ADMIN_PASSWORD);
  const existing = await UserModel.findOne({ email: ADMIN_EMAIL });

  if (existing) {
    existing.name = "Guide Admin";
    existing.phone = existing.phone || ADMIN_PHONE;
    existing.password = hashed;
    existing.role = ROLES.ADMIN;
    await existing.save();
  } else {
    await UserModel.create({
      name: "Guide Admin",
      email: ADMIN_EMAIL,
      phone: ADMIN_PHONE,
      password: hashed,
      role: ROLES.ADMIN
    });
  }

  logger.info("Seeded admin account", { email: ADMIN_EMAIL });
  console.log(`Admin credentials:\nEmail: ${ADMIN_EMAIL}\nPassword: ${ADMIN_PASSWORD}`);
};

seedAdmin()
  .catch((error) => {
    logger.error("Failed to seed admin user", { error: String(error) });
    process.exit(1);
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
