import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.team.list.path, async (req, res) => {
    const members = await storage.getTeamMembers();
    res.json(members);
  });

  app.get(api.events.list.path, async (req, res) => {
    const allEvents = await storage.getEvents();
    res.json(allEvents);
  });

  app.get(api.social.list.path, async (req, res) => {
    const links = await storage.getSocialLinks();
    res.json(links);
  });

  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      await storage.createContactMessage(input);
      res.status(201).json({ success: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed data function
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  try {
    const existingMembers = await storage.getTeamMembers();
    if (existingMembers.length === 0) {
      const members = [
        { name: "Dr. Allin Geo V", position: "Faculty Sponsor", orderPosition: 1 },
        { name: "Joshva", position: "Chair", orderPosition: 2 },
        { name: "Paradhavika", position: "Vice Chair", orderPosition: 3 },
        { name: "Varsini S.A", position: "Membership Chair", orderPosition: 4 },
        { name: "Tharsan Kanthaswamy", position: "Secretary", orderPosition: 5 },
        { name: "Sidharthan S", position: "Joint Secretary", orderPosition: 6 },
        { name: "Sharmila O", position: "Treasurer", orderPosition: 7 },
        { name: "Subashini B", position: "Social Media Head", orderPosition: 8 },
        { name: "Samitha S", position: "Web Master", orderPosition: 9 },
        { name: "Sanjana B", position: "Event Manager", orderPosition: 10 },
        { name: "Sidharth D", position: "Research Head", orderPosition: 11 },
        { name: "Blesson Sharon W S", position: "Design Head", orderPosition: 12 },
        { name: "Tanveer Haque H", position: "Technical Head", orderPosition: 13 },
      ];
      for (const m of members) {
        await storage.createTeamMember(m);
      }
    }

    const existingEvents = await storage.getEvents();
    if (existingEvents.length === 0) {
      const evts = [
        {
          title: "ACM-W Chapter Inauguration",
          eventDate: new Date("2025-03-08").toISOString(),
          shortDescription: "Official inauguration of ACM-W student chapter at St. Joseph's Institute of Technology, marking the beginning of our journey.",
          fullSummary: "Our chapter was officially inaugurated on March 8th, 2025, International Women's Day. The event brought together faculty, students, and industry professionals to celebrate women in technology and computing. This milestone marks the establishment of a supportive community dedicated to empowering women in the field of computing.",
          published: true
        },
        {
          title: "Code Herofest",
          eventDate: new Date("2025-03-28").toISOString(),
          shortDescription: "An exciting coding contest focused on prompt engineering and competitive programming challenges.",
          fullSummary: "Code Herofest challenged participants to master the art of prompt engineering and algorithmic problem-solving. Students competed in various coding challenges designed to test their technical skills, creativity, and ability to work with AI tools effectively. The event showcased the next generation of tech talent.",
          registrationDate: new Date("2025-03-24").toISOString(),
          published: true
        },
        {
          title: "Summer Tech Workshop",
          eventDate: new Date("2025-06-15").toISOString(),
          shortDescription: "Technical workshop and skill development event. Details coming soon.",
          fullSummary: "Stay tuned for details about our exciting summer event featuring hands-on workshops, industry expert sessions, and networking opportunities.",
          published: false
        },
        {
          title: "Virtual CSI",
          eventDate: new Date("2025-08-25").toISOString(),
          shortDescription: "Virtual Crime Scene Investigation - A tech-focused online event combining computing skills with investigative challenges.",
          fullSummary: "Virtual CSI engaged participants in an immersive online experience where they used computing and analytical skills to solve complex digital mysteries and cybersecurity challenges. This virtual event demonstrated the real-world applications of computing in forensics and security.",
          published: true
        },
        {
          title: "Intellecta",
          eventDate: new Date("2026-02-09").toISOString(),
          shortDescription: "A competitive intellectual event showcasing technical knowledge and problem-solving abilities.",
          fullSummary: "Intellecta brought together the brightest minds in computing for a series of technical challenges, quizzes, and presentations that tested both theoretical knowledge and practical application skills. Participants demonstrated their mastery of computer science concepts and innovative thinking.",
          published: true
        },
        {
          title: "Unglitch",
          eventDate: new Date("2026-02-13").toISOString(),
          shortDescription: "A debugging marathon and troubleshooting competition focused on identifying and fixing complex coding issues.",
          fullSummary: "Unglitch challenged participants to identify and resolve complex coding bugs, system errors, and technical issues under time pressure. The event emphasized debugging skills, systematic problem-solving approaches, and the ability to think critically under pressure. A true test of technical excellence.",
          published: true
        }
      ];
      for (const e of evts) {
        await storage.createEvent(e);
      }
    }

    const existingSocial = await storage.getSocialLinks();
    if (existingSocial.length === 0) {
      const socials = [
        { platform: "facebook", url: "https://facebook.com/acmw-sjit" },
        { platform: "instagram", url: "https://instagram.com/acmw_sjit" },
        { platform: "linkedin", url: "https://linkedin.com/company/acmw-sjit" },
        { platform: "twitter", url: "https://twitter.com/acmw_sjit" },
      ];
      for (const s of socials) {
        await storage.createSocialLink(s);
      }
    }
  } catch (err) {
    console.error("Failed to seed database", err);
  }
}
