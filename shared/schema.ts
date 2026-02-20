import { pgTable, text, varchar, timestamp, integer, boolean, date, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const teamMembers = pgTable("team_members", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  position: varchar("position").notNull(),
  imageUrl: text("image_url"),
  orderPosition: integer("order_position"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const events = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title").notNull(),
  eventDate: date("event_date").notNull(),
  shortDescription: varchar("short_description", { length: 200 }),
  fullSummary: text("full_summary"),
  images: text("images").array(),
  registrationOpen: boolean("registration_open"),
  registrationDate: date("registration_date"),
  published: boolean("published").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name"),
  email: varchar("email"),
  message: text("message"),
  status: varchar("status").default('new'),
  createdAt: timestamp("created_at").defaultNow(),
});

export const socialMediaLinks = pgTable("social_media_links", {
  id: uuid("id").primaryKey().defaultRandom(),
  platform: varchar("platform"),
  url: text("url"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Base Schemas
export const insertTeamMemberSchema = createInsertSchema(teamMembers).omit({ id: true, createdAt: true });
export const insertEventSchema = createInsertSchema(events).omit({ id: true, createdAt: true });
export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({ id: true, createdAt: true, status: true });
export const insertSocialMediaLinkSchema = createInsertSchema(socialMediaLinks).omit({ id: true, updatedAt: true });

// Types
export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;

export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

export type SocialMediaLink = typeof socialMediaLinks.$inferSelect;
export type InsertSocialMediaLink = z.infer<typeof insertSocialMediaLinkSchema>;
