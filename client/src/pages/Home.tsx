import { motion } from "framer-motion";
import { ArrowRight, Users, Calendar, Award, GraduationCap, Send, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { EventCard } from "@/components/EventCard";
import { TeamMemberCard } from "@/components/TeamMemberCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useTeam, useEvents, useContact } from "@/hooks/use-data";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";

export default function Home() {
  const { data: team, isLoading: teamLoading } = useTeam();
  const { data: events, isLoading: eventsLoading } = useEvents();
  const { mutate: sendMessage, isPending: isSending } = useContact();
  const { toast } = useToast();

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    sendMessage(data, {
      onSuccess: () => {
        toast({
          title: "Message Sent!",
          description: "Thank you for reaching out. We'll get back to you soon.",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navigation />

      {/* --- HERO SECTION --- */}
      <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-primary text-white pt-20">
        <div className="absolute inset-0 z-0">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1B3C53] via-[#234C6A] to-[#152E40] opacity-90" />
          
          {/* Abstract Pattern */}
          <svg className="absolute top-0 right-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 L100 0 L100 100 Z" fill="white" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium tracking-wide mb-6 border border-white/20">
              Welcome to St. Joseph's Institute of Technology
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight tracking-tight">
              ACM-W Student <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Chapter</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10 font-light leading-relaxed">
              Empowering women in computing, fostering leadership, and celebrating diversity in technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="rounded-full bg-white text-primary hover:bg-blue-50 text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all"
                onClick={() => document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Upcoming Events
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 backdrop-blur-sm"
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-12 bg-white relative z-20 -mt-8 mx-4 md:mx-12 lg:mx-24 rounded-2xl shadow-xl border border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border">
          {[
            { label: "Founded", value: "2025" },
            { label: "Members", value: "100+" },
            { label: "Events", value: "6+" },
            { label: "Office Bearers", value: "13" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center px-4">
              <div className="text-3xl md:text-4xl font-bold text-primary font-display mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Our Mission" 
            subtitle="We support, celebrate, and advocate for the full engagement of women in all aspects of the computing field."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Users className="w-10 h-10 text-primary" />, 
                title: "Community", 
                desc: "Building a supportive network of women in technology to foster collaboration and growth." 
              },
              { 
                icon: <GraduationCap className="w-10 h-10 text-primary" />, 
                title: "Learning", 
                desc: "Providing workshops, technical sessions, and resources to enhance technical skills." 
              },
              { 
                icon: <Award className="w-10 h-10 text-primary" />, 
                title: "Excellence", 
                desc: "Celebrating achievements and inspiring members to reach their full potential in computing." 
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl border border-border hover:border-primary/30 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 bg-primary/5 rounded-xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold font-display mb-3 text-primary">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* lecture hall students listening */}
              <img 
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop" 
                alt="Students collaborating" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-display font-bold mb-6 text-primary">A Legacy of Innovation</h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                St. Joseph's Institute of Technology has always been at the forefront of technical education. 
                With the establishment of the ACM-W Student Chapter, we are taking a significant step towards 
                bridging the gender gap in technology.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our chapter provides a platform for students to connect with industry professionals, participate 
                in hackathons, and develop leadership skills that will serve them throughout their careers.
              </p>
              <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white">
                Read our History
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- EVENTS SECTION --- */}
      <section id="events" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Upcoming Events" 
            subtitle="Join us for workshops, tech talks, and networking sessions."
          />

          {eventsLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : events && events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-2xl border border-dashed border-border">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground">No events scheduled yet</h3>
              <p className="text-muted-foreground">Check back soon for upcoming activities!</p>
            </div>
          )}
        </div>
      </section>

      {/* --- TEAM SECTION --- */}
      <section id="team" className="py-24 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Meet Our Team" 
            subtitle="The dedicated students and faculty behind our chapter's success."
          />

          {teamLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : team && team.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
              {team.map((member, i) => (
                <TeamMemberCard key={member.id} member={member} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Team members data is being updated.</p>
            </div>
          )}
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-24 bg-primary text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading 
            title="Get In Touch" 
            subtitle="Have questions? Want to collaborate? We'd love to hear from you." 
            light={true}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary font-medium">Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Jane Doe" 
                            {...field} 
                            className="bg-muted/30 border-muted-foreground/20 focus:border-primary text-foreground placeholder:text-muted-foreground/50 h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary font-medium">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="jane@example.com" 
                            {...field} 
                            className="bg-muted/30 border-muted-foreground/20 focus:border-primary text-foreground placeholder:text-muted-foreground/50 h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-medium">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="How can we help you?" 
                          className="min-h-[150px] bg-muted/30 border-muted-foreground/20 focus:border-primary text-foreground placeholder:text-muted-foreground/50 resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={isSending}
                  className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
