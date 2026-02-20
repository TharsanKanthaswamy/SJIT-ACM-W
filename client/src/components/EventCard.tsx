import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Event } from "@shared/schema";
import { format } from "date-fns";

interface EventCardProps {
  event: Event;
  index: number;
}

export function EventCard({ event, index }: EventCardProps) {
  const isUpcoming = new Date(event.eventDate) > new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="h-full flex flex-col border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 group overflow-hidden bg-white">
        {/* Image Area */}
        <div className="h-48 bg-muted relative overflow-hidden">
          {event.images && event.images.length > 0 ? (
            <img 
              src={event.images[0]} 
              alt={event.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
              <Calendar className="w-12 h-12 text-primary/20" />
            </div>
          )}
          <div className="absolute top-4 left-4">
            <Badge variant={isUpcoming ? "default" : "secondary"} className={isUpcoming ? "bg-primary" : "bg-muted-foreground text-white"}>
              {isUpcoming ? "Upcoming" : "Past Event"}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-2">
          <div className="text-sm text-primary/60 font-medium mb-2 flex items-center gap-2">
            <Calendar size={14} />
            {format(new Date(event.eventDate), "MMMM d, yyyy")}
          </div>
          <h3 className="text-xl font-bold font-display leading-tight group-hover:text-primary transition-colors">
            {event.title}
          </h3>
        </CardHeader>

        <CardContent className="flex-grow">
          <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
            {event.shortDescription || event.fullSummary}
          </p>
        </CardContent>

        <CardFooter className="pt-0 pb-6">
          <button className="text-primary text-sm font-semibold flex items-center gap-2 group/btn">
            Read details <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
