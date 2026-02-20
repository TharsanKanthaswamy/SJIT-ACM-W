import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { TeamMember } from "@shared/schema";

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

export function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center group"
    >
      <div className="relative mb-4">
        <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 group-hover:scale-110 transition-transform duration-300 ease-out" />
        <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-white shadow-lg group-hover:shadow-xl transition-all">
          {member.imageUrl ? (
            <AvatarImage src={member.imageUrl} className="object-cover" />
          ) : null}
          <AvatarFallback className="text-2xl font-display bg-muted text-muted-foreground">
            {member.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      
      <h3 className="text-lg font-bold font-display text-primary">{member.name}</h3>
      <p className="text-sm text-primary/60 font-medium">{member.position}</p>
      <div className="w-8 h-1 bg-primary/20 rounded-full mt-3 group-hover:w-16 transition-all duration-300" />
    </motion.div>
  );
}
