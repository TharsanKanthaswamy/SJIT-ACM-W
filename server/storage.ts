import { db } from "./db";
import {
  teamMembers, events, contactMessages, socialMediaLinks,
  type TeamMember, type InsertTeamMember,
  type Event, type InsertEvent,
  type ContactMessage, type InsertContactMessage,
  type SocialMediaLink, type InsertSocialMediaLink
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Team
  getTeamMembers(): Promise<TeamMember[]>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;

  // Events
  getEvents(): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;

  // Contact
  createContactMessage(msg: InsertContactMessage): Promise<ContactMessage>;

  // Social
  getSocialLinks(): Promise<SocialMediaLink[]>;
  createSocialLink(link: InsertSocialMediaLink): Promise<SocialMediaLink>;
}

export class DatabaseStorage implements IStorage {
  async getTeamMembers(): Promise<TeamMember[]> {
    return await db.select().from(teamMembers).orderBy(teamMembers.orderPosition);
  }
  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const [result] = await db.insert(teamMembers).values(member).returning();
    return result;
  }

  async getEvents(): Promise<Event[]> {
    return await db.select().from(events).orderBy(events.eventDate);
  }
  async createEvent(event: InsertEvent): Promise<Event> {
    // Drizzle maps camelCase to snake_case based on schema definitions, but here we provide camelCase keys
    // wait, actually InsertEvent will have the property names corresponding to schema.ts keys
    const [result] = await db.insert(events).values(event).returning();
    return result;
  }

  async createContactMessage(msg: InsertContactMessage): Promise<ContactMessage> {
    const [result] = await db.insert(contactMessages).values(msg).returning();
    return result;
  }

  async getSocialLinks(): Promise<SocialMediaLink[]> {
    return await db.select().from(socialMediaLinks);
  }
  async createSocialLink(link: InsertSocialMediaLink): Promise<SocialMediaLink> {
    const [result] = await db.insert(socialMediaLinks).values(link).returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
