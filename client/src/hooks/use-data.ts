import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertContactMessage } from "@shared/routes";
import { z } from "zod";

// --- TEAM HOOKS ---
export function useTeam() {
  return useQuery({
    queryKey: [api.team.list.path],
    queryFn: async () => {
      const res = await fetch(api.team.list.path);
      if (!res.ok) throw new Error("Failed to fetch team members");
      return api.team.list.responses[200].parse(await res.json());
    },
  });
}

// --- EVENTS HOOKS ---
export function useEvents() {
  return useQuery({
    queryKey: [api.events.list.path],
    queryFn: async () => {
      const res = await fetch(api.events.list.path);
      if (!res.ok) throw new Error("Failed to fetch events");
      return api.events.list.responses[200].parse(await res.json());
    },
  });
}

// --- CONTACT HOOKS ---
export function useContact() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const res = await fetch(api.contact.create.path, {
        method: api.contact.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Validation failed");
        }
        throw new Error("Failed to send message");
      }
      
      return await res.json();
    },
  });
}

// --- SOCIAL HOOKS ---
export function useSocials() {
  return useQuery({
    queryKey: [api.social.list.path],
    queryFn: async () => {
      const res = await fetch(api.social.list.path);
      if (!res.ok) throw new Error("Failed to fetch social links");
      return api.social.list.responses[200].parse(await res.json());
    },
  });
}
